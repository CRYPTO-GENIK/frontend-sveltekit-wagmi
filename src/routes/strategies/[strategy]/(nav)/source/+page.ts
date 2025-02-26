/**
 * Fetch the source code page.
 */
import { error } from '@sveltejs/kit';
import { publicApiError } from '$lib/helpers/public-api';

export async function load({ parent, fetch }) {
	const { strategy } = await parent();

	const url = `${strategy.url}/source`;
	let resp;
	try {
		resp = await fetch(url);
	} catch (e) {
		const stack = [`Error loading data from URL: ${url}`, e.message];
		throw error(503, { message: 'Service Unavailable', stack });
	}

	if (!resp.ok) {
		throw await publicApiError(resp);
	}

	return {
		code: resp.text()
	};
}
