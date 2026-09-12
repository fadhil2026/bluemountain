/**
 * functions/api/health.js
 * Cloudflare Pages Edge Function — Health & System Diagnostics
 */
export async function onRequestGet(_context) {
	return new Response(
		JSON.stringify({
			status: "ok",
			app: "Blue Mountain POS",
			version: "1.5.0",
			edge: "Cloudflare Pages Functions (Free Tier)",
			timestamp: new Date().toISOString(),
		}),
		{
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store",
			},
		},
	);
}
