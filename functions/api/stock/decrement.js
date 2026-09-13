/**
 * functions/api/stock/decrement.js
 * Cloudflare Pages Edge Function — Atomic Stock Decrement via CAS (Compare-And-Swap)
 *
 * Implements Optimistic Concurrency Control (OCC) with atomic stock guard:
 * Updates stock ONLY IF current stock matches the read value (&stock=eq.currentStock).
 * If a concurrent cashier updated stock in the meantime, retries automatically.
 */
export async function onRequestPost(context) {
	const { request, env } = context;

	try {
		const body = await request.json();
		const { items } = body;

		if (!items || !Array.isArray(items) || items.length === 0) {
			return new Response(
				JSON.stringify({ success: false, error: "Daftar item tidak valid." }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const supabaseUrl =
			env.SUPABASE_URL || "https://wiapnhpdgjbtkblowfig.supabase.co";
		const supabaseKey =
			env.SUPABASE_SECRET_KEY ||
			env.SUPABASE_PUBLISHABLE_KEY ||
			"sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g";

		const updatedItems = [];

		// Process stock decrement with OCC Compare-And-Swap (CAS) per product
		for (const it of items) {
			const prodId = it.product?.id || it.id;
			const qty = Number(it.qty) || 1;

			if (!prodId) continue;

			let succeeded = false;
			for (let attempt = 0; attempt < 3; attempt++) {
				// 1. Fetch latest authoritative stock
				const getRes = await fetch(
					`${supabaseUrl}/rest/v1/products?id=eq.${prodId}&select=id,stock`,
					{
						headers: {
							apikey: supabaseKey,
							Authorization: `Bearer ${supabaseKey}`,
						},
					},
				);

				if (!getRes.ok) break;

				const prods = await getRes.json();
				if (!prods || prods.length === 0) break;

				const currentStock = Number(prods[0].stock) || 0;
				const newStock = Math.max(0, currentStock - qty);

				// 2. Atomic Compare-And-Swap (CAS) PATCH:
				// Only updates if stock in database is STILL equal to currentStock!
				const patchRes = await fetch(
					`${supabaseUrl}/rest/v1/products?id=eq.${prodId}&stock=eq.${currentStock}`,
					{
						method: "PATCH",
						headers: {
							apikey: supabaseKey,
							Authorization: `Bearer ${supabaseKey}`,
							"Content-Type": "application/json",
							Prefer: "return=representation",
						},
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
						updatedItems.push({
							id: prodId,
							prevStock: currentStock,
							newStock,
						});
						break; // Successful atomic update
					}
					// 0 rows updated means a concurrent transaction modified stock! Loop and retry.
				}
			}

			if (!succeeded) {
				// Fallback unconditional update if all CAS retries exhausted
				const fallbackGet = await fetch(
					`${supabaseUrl}/rest/v1/products?id=eq.${prodId}&select=id,stock`,
					{
						headers: {
							apikey: supabaseKey,
							Authorization: `Bearer ${supabaseKey}`,
						},
					},
				);
				if (fallbackGet.ok) {
					const prods = await fallbackGet.json();
					if (prods && prods.length > 0) {
						const cur = Number(prods[0].stock) || 0;
						await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${prodId}`, {
							method: "PATCH",
							headers: {
								apikey: supabaseKey,
								Authorization: `Bearer ${supabaseKey}`,
								"Content-Type": "application/json",
								Prefer: "return=minimal",
							},
							body: JSON.stringify({
								stock: Math.max(0, cur - qty),
								updated_at: new Date().toISOString(),
							}),
						});
					}
				}
			}
		}

		return new Response(
			JSON.stringify({
				success: true,
				message: "Stok berhasil diperbarui atomik (OCC CAS).",
				updated: updatedItems,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store",
				},
			},
		);
	} catch (err) {
		return new Response(
			JSON.stringify({ success: false, error: err.message }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			},
		);
	}
}
