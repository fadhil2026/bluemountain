/**
 * js/api.js — Unified Full-Stack Edge API Client
 * Centralizes all HTTP communication between frontend and Cloudflare Pages Hono Edge API.
 * Automatically injects Bearer JWT authentication and handles response serialization.
 */

const getAuthToken = () => {
	try {
		return (
			localStorage.getItem("bm_jwt_token") ||
			localStorage.getItem("BM_AUTH_JWT_SESSION") ||
			null
		);
	} catch (_) {
		return null;
	}
};

const request = async (path, options = {}) => {
	const token = getAuthToken();
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		...(token ? { Authorization: `Bearer ${token}` } : {}),
		...(options.headers || {}),
	};

	const url = path.startsWith("/api") ? path : `/api${path}`;

	try {
		const res = await fetch(url, {
			...options,
			headers,
		});

		const data = await res.json().catch(() => null);

		if (!res.ok) {
			const errorMsg =
				data?.error ||
				`Request failed with status ${res.status} (${res.statusText})`;
			const err = new Error(errorMsg);
			err.status = res.status;
			err.data = data;
			throw err;
		}

		return data;
	} catch (err) {
		// Differentiate network failure vs application HTTP error
		if (!err.status) {
			err.isNetworkError = true;
		}
		throw err;
	}
};

export const apiClient = {
	get: (path, options) => request(path, { method: "GET", ...options }),
	post: (path, body, options) =>
		request(path, {
			method: "POST",
			body: JSON.stringify(body),
			...options,
		}),
	put: (path, body, options) =>
		request(path, {
			method: "PUT",
			body: JSON.stringify(body),
			...options,
		}),
	patch: (path, body, options) =>
		request(path, {
			method: "PATCH",
			body: JSON.stringify(body),
			...options,
		}),
	delete: (path, options) => request(path, { method: "DELETE", ...options }),
};

export default apiClient;
