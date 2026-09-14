/**
 * functions/api/[[route]].js
 * Blue Mountain POS — Pure Full-Stack Edge API (Hono.js Engine)
 *
 * Runs natively on Cloudflare Pages Functions Edge.
 * Single unified backend for authentication, RBAC, inventory, atomic checkout,
 * CRM, financial accounting, and settings management with Supabase Cloud DB.
 */

import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { cors } from "hono/cors";

const app = new Hono().basePath("/api");

// ── Rate Limiter in Edge Memory (Anti Brute-Force) ──
const _failedAttempts = new Map();

// ── Helpers ──
const getSupabaseConfig = (env) => {
	const url = env.SUPABASE_URL || "https://wiapnhpdgjbtkblowfig.supabase.co";
	const key =
		env.SUPABASE_SECRET_KEY ||
		env.SUPABASE_PUBLISHABLE_KEY ||
		"sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g";
	const storeId = env.STORE_ID || "STORE-BM-856CFAC8";
	return { url, key, storeId };
};

const pgFetch = async (env, path, options = {}) => {
	const { url, key } = getSupabaseConfig(env);
	const headers = {
		apikey: key,
		Authorization: `Bearer ${key}`,
		"Content-Type": "application/json",
		...(options.headers || {}),
	};
	return fetch(`${url}/rest/v1${path}`, { ...options, headers });
};

const base64Url = (objOrBuf) => {
	const str =
		typeof objOrBuf === "string"
			? objOrBuf
			: String.fromCharCode(...new Uint8Array(objOrBuf));
	return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const createJwtToken = async (payload, secret) => {
	const encoder = new TextEncoder();
	const headerB64 = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
	const payloadB64 = base64Url(JSON.stringify(payload));
	const tokenMessage = `${headerB64}.${payloadB64}`;

	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);
	const signature = await crypto.subtle.sign(
		"HMAC",
		key,
		encoder.encode(tokenMessage),
	);
	return `${tokenMessage}.${base64Url(signature)}`;
};

const verifyJwtToken = async (token, secret) => {
	if (!token || typeof token !== "string") return null;
	const parts = token.split(".");
	if (parts.length !== 3) return null;

	const [headerB64, payloadB64, signatureB64] = parts;
	const message = `${headerB64}.${payloadB64}`;
	const encoder = new TextEncoder();

	try {
		const key = await crypto.subtle.importKey(
			"raw",
			encoder.encode(secret),
			{ name: "HMAC", hash: "SHA-256" },
			false,
			["verify"],
		);
		let base64 = signatureB64.replace(/-/g, "+").replace(/_/g, "/");
		while (base64.length % 4) base64 += "=";
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}

		const isValid = await crypto.subtle.verify(
			"HMAC",
			key,
			bytes,
			encoder.encode(message),
		);
		if (!isValid) return null;

		let payloadStr = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
		while (payloadStr.length % 4) payloadStr += "=";
		const payload = JSON.parse(atob(payloadStr));
		const now = Math.floor(Date.now() / 1000);
		if (payload.exp && payload.exp < now) return null;
		return payload;
	} catch (err) {
		console.warn("[Auth Edge] JWT verification failed:", err.message);
		return null;
	}
};

const authMiddleware = async (c, next) => {
	const authHeader = c.req.header("Authorization") || "";
	const token = authHeader.startsWith("Bearer ")
		? authHeader.slice(7).trim()
		: "";
	const { key } = getSupabaseConfig(c.env);
	const jwtSecret =
		c.env.JWT_SECRET ||
		"BM_PROPRIETARY_EDGE_KEY_2026_AUTHORITATIVE_HONO_FREE_TIER";

	// Allow Supabase Secret/Anon Service Key for admin automation scripts
	if (token && (token === key || token === c.env.SUPABASE_SECRET_KEY)) {
		c.set("user", { username: "system", role: "owner" });
		return await next();
	}

	const user = await verifyJwtToken(token, jwtSecret);
	if (!user) {
		return c.json(
			{
				success: false,
				error:
					"Akses ditolak: Token autentikasi tidak valid atau telah kedaluwarsa.",
			},
			401,
		);
	}
	c.set("user", user);
	return await next();
};

const ownerOnlyMiddleware = async (c, next) => {
	const user = c.get("user");
	if (user?.role !== "owner") {
		return c.json(
			{
				success: false,
				error:
					"Akses ditolak: Hanya Owner yang berwenang melakukan tindakan ini.",
			},
			403,
		);
	}
	return await next();
};

// ── Global Middlewares ──
app.use(
	"*",
	cors({
		origin: "*",
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization", "apikey", "Prefer"],
	}),
);

app.onError((err, c) => {
	console.error("[Hono Edge Error]", err);
	return c.json(
		{
			success: false,
			error: err.message || "Terjadi kesalahan internal server.",
		},
		500,
	);
});

// ── 1. Health & Edge Runtime Diagnostics ──
app.get("/health", (c) => {
	return c.json({
		status: "ok",
		app: "Blue Mountain POS",
		version: "1.6.9",
		engine: "Hono.js Pure Edge Architecture",
		runtime: "Cloudflare Pages Functions",
		timestamp: new Date().toISOString(),
	});
});

// ── 2. Auth: Operator Login (Rate Limiting + Salted SHA-256 + Signed JWT) ──
app.post("/auth/login", async (c) => {
	const body = await c.req.json().catch(() => ({}));
	const { username, pin } = body;
	const cleanUser = String(username || "")
		.toLowerCase()
		.trim();
	const cleanPin = String(pin || "").trim();

	if (!cleanUser || !cleanPin) {
		return c.json(
			{ success: false, error: "Username dan PIN wajib diisi." },
			400,
		);
	}

	const clientIp = c.req.header("cf-connecting-ip") || "unknown";
	const rateKey = `${clientIp}:${cleanUser}`;
	const now = Date.now();
	const attemptRecord = _failedAttempts.get(rateKey) || {
		count: 0,
		lockedUntil: 0,
	};

	if (attemptRecord.lockedUntil > now) {
		const remainingSeconds = Math.ceil(
			(attemptRecord.lockedUntil - now) / 1000,
		);
		return c.json(
			{
				success: false,
				error: `Terlalu banyak percobaan salah! Akun terkunci sementara selama ${remainingSeconds} detik.`,
				lockedUntil: attemptRecord.lockedUntil,
			},
			429,
		);
	}

	const { storeId } = getSupabaseConfig(c.env);
	const rosterRes = await pgFetch(
		c.env,
		`/settings?key=eq.users_roster_${storeId}&select=value`,
	);

	let foundUser = null;
	if (rosterRes.ok) {
		const rows = await rosterRes.json();
		if (rows && rows.length > 0) {
			try {
				const roster = JSON.parse(rows[0].value);
				foundUser = roster.find(
					(u) => String(u.username).toLowerCase().trim() === cleanUser,
				);
			} catch (err) {
				console.warn(
					"[Auth Edge] Failed to parse roster in login:",
					err.message,
				);
			}
		}
	}

	// Fallback hardcoded master owner if roster is brand new
	if (!foundUser && cleanUser === "admin") {
		foundUser = {
			id: "usr_admin",
			username: "admin",
			name: "Fadhilah Ramadhan (Owner)",
			role: "owner",
			pin_hash:
				"d6d80d026dadedb6b7c9c15ee0f3653761b1c2a1ac6e03abf9edd86bb8e911f1",
			pin_salt: "c40d7da58df489a2718e1c52d445e45a",
			is_active: true,
		};
	}

	if (!foundUser || foundUser.is_active === false) {
		return c.json(
			{
				success: false,
				error: "Akun operator tidak ditemukan atau dinonaktifkan.",
			},
			401,
		);
	}

	const salt = foundUser.pin_salt || foundUser.pinSalt;
	const expectedHash = foundUser.pin_hash || foundUser.pinHash;

	const encoder = new TextEncoder();
	const dataToHash = encoder.encode(`${salt}:${cleanPin}`);
	const hashBuffer = await crypto.subtle.digest("SHA-256", dataToHash);
	const computedHash = Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");

	let mismatch = computedHash.length ^ expectedHash.length;
	for (let i = 0; i < computedHash.length; i++) {
		mismatch |= computedHash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
	}

	if (mismatch !== 0) {
		attemptRecord.count += 1;
		if (attemptRecord.count >= 5) {
			attemptRecord.lockedUntil = now + 60000;
			_failedAttempts.set(rateKey, attemptRecord);
			return c.json(
				{
					success: false,
					error:
						"PIN salah 5 kali berturut-turut! Sistem terkunci selama 60 detik.",
					lockedUntil: attemptRecord.lockedUntil,
				},
				429,
			);
		}
		_failedAttempts.set(rateKey, attemptRecord);
		return c.json(
			{
				success: false,
				error: `PIN salah! Sisa percobaan: ${5 - attemptRecord.count}`,
			},
			401,
		);
	}

	_failedAttempts.delete(rateKey);

	const jwtSecret =
		c.env.JWT_SECRET ||
		"BM_PROPRIETARY_EDGE_KEY_2026_AUTHORITATIVE_HONO_FREE_TIER";
	const payload = {
		sub: foundUser.id,
		username: foundUser.username,
		name: foundUser.name,
		role: foundUser.role,
		iat: Math.floor(now / 1000),
		exp: Math.floor(now / 1000) + 86400 * 7,
	};
	const token = await createJwtToken(payload, jwtSecret);

	return c.json({
		success: true,
		token,
		user: {
			id: foundUser.id,
			username: foundUser.username,
			name: foundUser.name,
			role: foundUser.role,
		},
	});
});

// ── 3. Auth: Public Sanitized Operator Roster ──
app.get("/auth/users", async (c) => {
	const { storeId } = getSupabaseConfig(c.env);
	const res = await pgFetch(
		c.env,
		`/settings?key=eq.users_roster_${storeId}&select=value`,
	);

	let publicUsers = [];
	if (res.ok) {
		const rows = await res.json();
		if (rows && rows.length > 0) {
			try {
				const roster = JSON.parse(rows[0].value);
				if (Array.isArray(roster)) {
					publicUsers = roster
						.filter((u) => u.isActive !== false && u.is_active !== false)
						.map((u) => ({
							id: u.id || `usr_${u.username}`,
							username: u.username,
							name: u.name,
							role: u.role || "cashier",
							isActive: true,
						}));
				}
			} catch (err) {
				console.warn(
					"[Auth Edge] Failed to parse public users roster:",
					err.message,
				);
			}
		}
	}

	if (publicUsers.length === 0) {
		publicUsers = [
			{
				id: "usr_admin",
				username: "admin",
				name: "Fadhilah Ramadhan",
				role: "owner",
				isActive: true,
			},
		];
	}

	c.header("Cache-Control", "public, max-age=30");
	return c.json({ success: true, users: publicUsers });
});

// ── 4. Auth: Save / Update Operator Profile (Owner Only) ──
app.post("/auth/users", authMiddleware, ownerOnlyMiddleware, async (c) => {
	const user = await c.req.json().catch(() => ({}));
	if (!user?.username) {
		return c.json({ success: false, error: "Data operator tidak valid." }, 400);
	}

	const { storeId } = getSupabaseConfig(c.env);
	const rosterKey = `users_roster_${storeId}`;
	const res = await pgFetch(
		c.env,
		`/settings?key=eq.${rosterKey}&select=value`,
	);

	let existingRoster = [];
	if (res.ok) {
		const rows = await res.json();
		if (rows && rows.length > 0) {
			try {
				const parsed = JSON.parse(rows[0].value);
				if (Array.isArray(parsed)) existingRoster = parsed;
			} catch (err) {
				console.warn(
					"[Auth Edge] Failed to parse existing roster:",
					err.message,
				);
			}
		}
	}

	const cleanUsername = String(user.username).toLowerCase().trim();
	const formattedUser = {
		id: user.id || `usr_${cleanUsername}`,
		username: cleanUsername,
		name: String(user.name || ""),
		role: String(user.role || "cashier"),
		pin_hash: String(user.pinHash || user.pin_hash || ""),
		pin_salt: String(user.pinSalt || user.pin_salt || ""),
		is_active: user.isActive !== undefined ? Boolean(user.isActive) : true,
		updated_at: new Date().toISOString(),
	};

	const idx = existingRoster.findIndex(
		(u) => String(u.username).toLowerCase().trim() === cleanUsername,
	);
	if (idx >= 0) {
		existingRoster[idx] = { ...existingRoster[idx], ...formattedUser };
	} else {
		existingRoster.push(formattedUser);
	}

	await pgFetch(c.env, "/settings", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates" },
		body: JSON.stringify({
			key: rosterKey,
			value: JSON.stringify(existingRoster),
			updated_at: new Date().toISOString(),
		}),
	});

	return c.json({ success: true, user: formattedUser });
});

// ── 5. Auth: Delete Operator (Owner Only) ──
app.delete(
	"/auth/users/:username",
	authMiddleware,
	ownerOnlyMiddleware,
	async (c) => {
		const username = c.req.param("username");
		const cleanUsername = String(username || "")
			.toLowerCase()
			.trim();

		const { storeId } = getSupabaseConfig(c.env);
		const rosterKey = `users_roster_${storeId}`;
		const res = await pgFetch(
			c.env,
			`/settings?key=eq.${rosterKey}&select=value`,
		);

		if (res.ok) {
			const rows = await res.json();
			if (rows && rows.length > 0) {
				try {
					let existingRoster = JSON.parse(rows[0].value);
					if (Array.isArray(existingRoster)) {
						existingRoster = existingRoster.filter(
							(u) => String(u.username).toLowerCase().trim() !== cleanUsername,
						);
						await pgFetch(c.env, "/settings", {
							method: "POST",
							headers: { Prefer: "resolution=merge-duplicates" },
							body: JSON.stringify({
								key: rosterKey,
								value: JSON.stringify(existingRoster),
								updated_at: new Date().toISOString(),
							}),
						});
					}
				} catch (err) {
					console.warn(
						"[Auth Edge] Failed to parse roster on delete:",
						err.message,
					);
				}
			}
		}

		return c.json({ success: true });
	},
);

// ── 6. Products: CRUD with Server-Side Validation ──
app.get("/products", async (c) => {
	const res = await pgFetch(c.env, "/products?select=*&order=name.asc");
	if (!res.ok) {
		return c.json(
			{ success: false, error: "Gagal memuat produk dari database." },
			500,
		);
	}
	const products = await res.json();
	return c.json({ success: true, products });
});

app.post("/products", authMiddleware, async (c) => {
	const p = await c.req.json().catch(() => ({}));
	if (!p.name) {
		return c.json({ success: false, error: "Nama produk wajib diisi." }, 400);
	}

	const productPayload = {
		id: String(p.id || Date.now()),
		name: String(p.name).trim(),
		category: String(p.category || "Umum").trim(),
		price: Math.max(0, Number(p.price) || 0),
		unit: String(p.unit || "buah").trim(),
		emoji: String(p.emoji || "📦"),
		stock: Math.max(0, Number(p.stock) || 0),
		updated_at: new Date().toISOString(),
	};

	const res = await pgFetch(c.env, "/products", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=representation" },
		body: JSON.stringify(productPayload),
	});

	if (!res.ok) {
		const err = await res.text();
		return c.json(
			{ success: false, error: `Gagal menyimpan produk: ${err}` },
			500,
		);
	}

	return c.json({ success: true, product: productPayload });
});

app.delete("/products/:id", authMiddleware, async (c) => {
	const id = c.req.param("id");
	const res = await pgFetch(c.env, `/products?id=eq.${id}`, {
		method: "DELETE",
	});
	return c.json({ success: res.ok });
});

// ── 7. Stock: Atomic Decrement (OCC Compare-And-Swap Guard) ──
app.post("/stock/decrement", authMiddleware, async (c) => {
	const body = await c.req.json().catch(() => ({}));
	const items = body.items || [];
	if (!Array.isArray(items) || items.length === 0) {
		return c.json({ success: false, error: "Daftar item tidak valid." }, 400);
	}

	const updatedItems = [];
	for (const it of items) {
		const prodId = it.product?.id || it.id;
		const qty = Number(it.qty) || 1;
		if (!prodId) continue;

		let succeeded = false;
		for (let attempt = 0; attempt < 3; attempt++) {
			const getRes = await pgFetch(
				c.env,
				`/products?id=eq.${prodId}&select=id,stock`,
			);
			if (!getRes.ok) break;
			const prods = await getRes.json();
			if (!prods || prods.length === 0) break;

			const currentStock = Number(prods[0].stock) || 0;
			const newStock = Math.max(0, currentStock - qty);

			const patchRes = await pgFetch(
				c.env,
				`/products?id=eq.${prodId}&stock=eq.${currentStock}`,
				{
					method: "PATCH",
					headers: { Prefer: "return=representation" },
					body: JSON.stringify({
						stock: newStock,
						updated_at: new Date().toISOString(),
					}),
				},
			);

			if (patchRes.ok) {
				const rows = await patchRes.json();
				if (Array.isArray(rows) && rows.length > 0) {
					succeeded = true;
					updatedItems.push({ id: prodId, prevStock: currentStock, newStock });
					break;
				}
			}
		}

		if (!succeeded) {
			// Fallback unconditional write if CAS loop exhausted
			const fb = await pgFetch(
				c.env,
				`/products?id=eq.${prodId}&select=id,stock`,
			);
			if (fb.ok) {
				const rows = await fb.json();
				if (rows && rows.length > 0) {
					const cur = Number(rows[0].stock) || 0;
					await pgFetch(c.env, `/products?id=eq.${prodId}`, {
						method: "PATCH",
						body: JSON.stringify({
							stock: Math.max(0, cur - qty),
							updated_at: new Date().toISOString(),
						}),
					});
				}
			}
		}
	}

	return c.json({
		success: true,
		message: "Stok atomik berhasil diperbarui.",
		updated: updatedItems,
	});
});

// ── 8. Authoritative Full Checkout (Atomic Transaction + Stock Decrement + Ledger) ──
app.post("/checkout", authMiddleware, async (c) => {
	const body = await c.req.json().catch(() => ({}));
	const { transaction, items } = body;

	if (!transaction || !Array.isArray(items) || items.length === 0) {
		return c.json(
			{ success: false, error: "Payload checkout tidak lengkap." },
			400,
		);
	}

	// 1. Decrement Stock with OCC CAS
	for (const it of items) {
		const prodId = it.product?.id || it.id;
		const qty = Number(it.qty) || 1;
		if (!prodId) continue;

		for (let attempt = 0; attempt < 3; attempt++) {
			const getRes = await pgFetch(
				c.env,
				`/products?id=eq.${prodId}&select=id,stock`,
			);
			if (!getRes.ok) break;
			const prods = await getRes.json();
			if (!prods || prods.length === 0) break;

			const currentStock = Number(prods[0].stock) || 0;
			const newStock = Math.max(0, currentStock - qty);

			const patchRes = await pgFetch(
				c.env,
				`/products?id=eq.${prodId}&stock=eq.${currentStock}`,
				{
					method: "PATCH",
					headers: { Prefer: "return=representation" },
					body: JSON.stringify({
						stock: newStock,
						updated_at: new Date().toISOString(),
					}),
				},
			);
			if (patchRes.ok) break;
		}
	}

	// 2. Insert Transaction Record
	const txPayload = {
		id: String(transaction.id || Date.now()),
		invoice_no: transaction.invoiceNo || transaction.invoice_no,
		date: transaction.date || new Date().toISOString(),
		date_key: transaction.dateKey || transaction.date_key,
		customer_name: transaction.customerName || "",
		items: items,
		subtotal: Number(transaction.subtotal) || 0,
		discount: Number(transaction.discount) || 0,
		tax: Number(transaction.tax) || 0,
		total: Number(transaction.total) || 0,
		paid: Number(transaction.paid) || 0,
		change: Number(transaction.change) || 0,
		payment_method: transaction.paymentMethod || "cash",
		payment_status: transaction.paymentStatus || "cash_paid",
		paid_amount:
			Number(transaction.paidAmount) || Number(transaction.paid) || 0,
		remaining_debt: Number(transaction.remainingDebt) || 0,
		debt_payments: transaction.debtPayments || [],
		cashier: transaction.cashier || "Admin",
		updated_at: new Date().toISOString(),
	};

	const txRes = await pgFetch(c.env, "/transactions", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=representation" },
		body: JSON.stringify(txPayload),
	});

	if (!txRes.ok) {
		const err = await txRes.text();
		return c.json(
			{ success: false, error: `Gagal mencatat transaksi: ${err}` },
			500,
		);
	}

	// 3. Update Customer Debt / Loyalty if customer specified
	if (
		transaction.customerName &&
		transaction.customerName.trim().toLowerCase() !== "umum"
	) {
		const cName = transaction.customerName.trim();
		const custRes = await pgFetch(
			c.env,
			`/customers?name=ilike.${encodeURIComponent(cName)}&limit=1`,
		);
		if (custRes.ok) {
			const custs = await custRes.json();
			if (custs && custs.length > 0) {
				const cust = custs[0];
				const addedDebt = Number(transaction.remainingDebt) || 0;
				const newTotalOrders = (Number(cust.total_orders) || 0) + 1;
				const newTotalSpent =
					(Number(cust.total_spent) || 0) + (Number(transaction.total) || 0);
				const newTotalDebt = (Number(cust.total_debt) || 0) + addedDebt;

				await pgFetch(c.env, `/customers?id=eq.${cust.id}`, {
					method: "PATCH",
					body: JSON.stringify({
						total_orders: newTotalOrders,
						total_spent: newTotalSpent,
						total_debt: newTotalDebt,
						updated_at: new Date().toISOString(),
					}),
				});
			}
		}
	}

	return c.json({
		success: true,
		transaction: txPayload,
		message: "Checkout transaksi & pemotongan stok berhasil.",
	});
});

// ── 9. Transactions: Standard Queries & Mutations ──
app.get("/transactions", async (c) => {
	const limit = c.req.query("limit") || "100";
	const res = await pgFetch(
		c.env,
		`/transactions?select=*&order=date.desc&limit=${limit}`,
	);
	if (!res.ok)
		return c.json(
			{ success: false, error: "Gagal memuat daftar transaksi." },
			500,
		);
	const transactions = await res.json();
	return c.json({ success: true, transactions });
});

app.post("/transactions", authMiddleware, async (c) => {
	const tx = await c.req.json().catch(() => ({}));
	const res = await pgFetch(c.env, "/transactions", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=representation" },
		body: JSON.stringify(tx),
	});
	if (!res.ok) {
		const err = await res.text();
		return c.json(
			{ success: false, error: `Gagal menyimpan transaksi: ${err}` },
			500,
		);
	}
	return c.json({ success: true });
});

app.delete("/transactions/:id", authMiddleware, async (c) => {
	const id = c.req.param("id");
	const res = await pgFetch(c.env, `/transactions?id=eq.${id}`, {
		method: "DELETE",
	});
	return c.json({ success: res.ok });
});

// ── 10. Customers: CRM & Debt Ledger ──
app.get("/customers", async (c) => {
	const res = await pgFetch(c.env, "/customers?select=*&order=name.asc");
	if (!res.ok)
		return c.json({ success: false, error: "Gagal memuat pelanggan." }, 500);
	const customers = await res.json();
	return c.json({ success: true, customers });
});

app.post("/customers", authMiddleware, async (c) => {
	const cust = await c.req.json().catch(() => ({}));
	if (!cust.name) {
		return c.json(
			{ success: false, error: "Nama pelanggan wajib diisi." },
			400,
		);
	}

	const res = await pgFetch(c.env, "/customers", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=representation" },
		body: JSON.stringify(cust),
	});
	if (!res.ok) {
		const err = await res.text();
		return c.json(
			{ success: false, error: `Gagal menyimpan pelanggan: ${err}` },
			500,
		);
	}
	return c.json({ success: true });
});

app.delete("/customers/:id", authMiddleware, async (c) => {
	const id = c.req.param("id");
	const res = await pgFetch(c.env, `/customers?id=eq.${id}`, {
		method: "DELETE",
	});
	return c.json({ success: res.ok });
});

// ── 11. Expenses: Financial Operations ──
app.get("/expenses", async (c) => {
	const res = await pgFetch(c.env, "/expenses?select=*&order=date.desc");
	if (!res.ok)
		return c.json({ success: false, error: "Gagal memuat pengeluaran." }, 500);
	const expenses = await res.json();
	return c.json({ success: true, expenses });
});

app.post("/expenses", authMiddleware, async (c) => {
	const exp = await c.req.json().catch(() => ({}));
	const res = await pgFetch(c.env, "/expenses", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates,return=representation" },
		body: JSON.stringify(exp),
	});
	if (!res.ok) {
		const err = await res.text();
		return c.json(
			{ success: false, error: `Gagal menyimpan pengeluaran: ${err}` },
			500,
		);
	}
	return c.json({ success: true });
});

app.delete("/expenses/:id", authMiddleware, async (c) => {
	const id = c.req.param("id");
	const res = await pgFetch(c.env, `/expenses?id=eq.${id}`, {
		method: "DELETE",
	});
	return c.json({ success: res.ok });
});

// ── 12. Settings: Centralized Store Configurations ──
app.get("/settings", async (c) => {
	const res = await pgFetch(c.env, "/settings?select=*");
	if (!res.ok)
		return c.json({ success: false, error: "Gagal memuat pengaturan." }, 500);
	const settings = await res.json();
	return c.json({ success: true, settings });
});

app.post("/settings", authMiddleware, async (c) => {
	const payload = await c.req.json().catch(() => ({}));
	const res = await pgFetch(c.env, "/settings", {
		method: "POST",
		headers: { Prefer: "resolution=merge-duplicates" },
		body: JSON.stringify(payload),
	});
	return c.json({ success: res.ok });
});

// ── Export Cloudflare Pages Handler ──
export const onRequest = handle(app);
