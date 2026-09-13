/**
 * functions/api/auth/users.js
 * Cloudflare Pages Edge Function — Public Operator Profiles
 *
 * Returns sanitized list of active operators for the UI operator selector.
 * NEVER exposes PIN hashes, salts, or credentials to the client browser.
 */
export async function onRequestGet(context) {
	const { env } = context;

	try {
		const supabaseUrl =
			env.SUPABASE_URL || "https://wiapnhpdgjbtkblowfig.supabase.co";
		const supabaseKey =
			env.SUPABASE_SECRET_KEY ||
			env.SUPABASE_PUBLISHABLE_KEY ||
			"sb_publishable_BBEJNs18ooZ-IHRPxJtDUA_KiKLcQ-g";

		const storeId = "STORE-BM-856CFAC8";
		const res = await fetch(
			`${supabaseUrl}/rest/v1/settings?key=eq.users_roster_${storeId}&select=value`,
			{
				headers: {
					apikey: supabaseKey,
					Authorization: `Bearer ${supabaseKey}`,
				},
			},
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
				} catch (_) {}
			}
		}

		// Fail-safe initial owner profile if roster is empty
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

		return new Response(JSON.stringify({ success: true, users: publicUsers }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "public, max-age=60",
			},
		});
	} catch (err) {
		return new Response(
			JSON.stringify({ success: false, error: err.message, users: [] }),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
}
