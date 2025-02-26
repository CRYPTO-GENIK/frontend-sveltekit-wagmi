import type { TradingPosition } from 'trade-executor/state/interface';

export async function load({ params, parent }) {
	const { status } = params;
	const { state } = await parent();

	// status can be `open`, `closed` or `frozen` (see params/positionStatus.ts)
	const positions = state.portfolio[`${status}_positions`] ?? {};

	return {
		status,
		positions: Object.values(positions) satisfies TradingPosition[]
	};
}
