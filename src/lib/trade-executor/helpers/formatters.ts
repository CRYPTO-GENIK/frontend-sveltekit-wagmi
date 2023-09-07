/**
 * Formatting helpers specific to trade execution
 *
 * (see $lib/helpers/formatters for other general-use formatters)
 */
import { formatNumber, notFilledMarker } from '$lib/helpers/formatters';
import { PROFITABILITY_THRESHOLD } from './profit';

/**
 * Format extreme large or small amounts human friendly manner.
 *
 * Useful to display token amounts.
 *
 * @param n
 * @param minFrag
 * @param maxFrag
 */
export function formatTokenAmount(x: MaybeNumberOrString, minFrag = 2, maxFrag = 2, prefix = ''): string {
	// Token quantities come from the API as strings,
	// because JavaScript float 64 bit cannot present quantities accurately.
	// Because we are presenting this number to the user,
	// the accuracy can be lost here.
	if (typeof x == 'string') {
		x = parseFloat(x);
	}

	// Plz avoid ending here
	if (!Number.isFinite(x)) return notFilledMarker;

	// Consider negative quantities
	const n = Math.abs(x);

	if (n === 0) {
		return `${prefix}0`;
	}

	if (n < 0.000001) {
		return (
			prefix +
			x.toLocaleString('en', {
				minimumFractionDigits: 10,
				maximumFractionDigits: 10
			})
		);
	} else if (n < 0.0001) {
		return (
			prefix +
			x.toLocaleString('en', {
				minimumFractionDigits: 7,
				maximumFractionDigits: 7
			})
		);
	} else if (n < 1) {
		// Format funny tokens
		const res =
			prefix +
			x.toLocaleString('en', {
				maximumFractionDigits: 5
			});
		return res;
	}

	if (n >= 1000 * 1000 * 1000) {
		return (
			prefix +
			(x / (1000 * 1000 * 1000)).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'B'
		);
	} else if (n >= 1000 * 1000) {
		return (
			prefix +
			(x / (1000 * 1000)).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'M'
		);
	} else if (n >= 1000) {
		return (
			prefix +
			(x / 1000).toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			}) +
			'k'
		);
	} else {
		return (
			prefix +
			x.toLocaleString('en', {
				minimumFractionDigits: minFrag,
				maximumFractionDigits: maxFrag
			})
		);
	}
}

/**
 * Format how much profit a position has made.
 * @param n
 */
export function formatProfitability(n: number): string {
	const absN = Math.abs(n);
	const symbol = absN < PROFITABILITY_THRESHOLD ? '▪️' : n > 0 ? '▲' : '▼';
	const percentStr = formatNumber(absN, 1, 1, { style: 'percent' });
	return `${symbol} ${percentStr}`;
}

/**
 * Format basis points (BPS)
 *
 * No unit suffix added.
 *
 * @param n
 */
export function formatBPS(n: number): string {
	if (!n) {
		return notFilledMarker;
	}

	return (Math.abs(n) * 10000).toLocaleString('en', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	});
}
