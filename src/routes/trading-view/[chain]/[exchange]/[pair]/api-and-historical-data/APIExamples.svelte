<!--
@compontent
Trading pair API examples. Display inline curl examples for retreiving trading pair data.
-->
<script lang="ts">
	import { backendUrl } from '$lib/config';

	export let summary: Record<string, MaybeNumberOrString>;
	const { exchange_slug, chain_slug, pair_slug, pair_id, exchange_type, pair_symbol } = summary;

	function getApiUrl(path: string, params: Record<string, MaybeNumberOrString>) {
		return `${backendUrl}/${path}?${new URLSearchParams(params)}`;
	}
</script>

<div class="api-info">
	<h2>Trading pair info</h2>

	<p>Get trading pair overview as JSON over HTTP GET.</p>

	<pre>curl "{getApiUrl('pair-details', { exchange_slug, chain_slug, pair_slug })}"</pre>

	<h2>Daily OHLCV data</h2>

	<h3>JSONL</h3>

	<p>
		Download daily as <a class="body-link" href="https://tradingstrategy.ai/docs/glossary.html#term-OHLCV">OHLCV</a>
		candles as <a class="body-link" href="https://tradingstrategy.ai/glossary/jsonl">JSONL</a> over HTTP GET. This is
		preferred method for getting large amounts of OHLCV data. Find more information about streaming JSONL data
		line-by-line in our
		<a class="body-link" href="https://tradingstrategy.ai/api/explorer/#/Trading%20pair/web_candles_jsonl"
			>API specification</a
		>.
	</p>

	<pre>curl "{getApiUrl('candles-jsonl', { pair_ids: pair_id, time_bucket: '1d' })}"</pre>

	<h3>JSON</h3>

	<p>
		Download daily <a class="body-link" href="https://tradingstrategy.ai/docs/glossary.html#term-OHLCV">OHLCV</a>
		candles as <a class="body-link" href="https://tradingstrategy.ai/glossary/json">JSON</a> over HTTP GET.
	</p>

	<pre>curl "{getApiUrl('candles', { pair_id, exchange_type, time_bucket: '1d' })}"</pre>

	<h2>Backtesting datasets</h2>

	<p>
		Backtesting datasets are available as a separate download. The datasets include <strong>{pair_symbol}</strong> data.
		View <a class="body-link" href="/trading-view/backtesting">backtesting datasets</a>.
	</p>
</div>

<style lang="postcss">
	.api-info {
		display: grid;
		gap: var(--space-md);

		h2 {
			margin-top: var(--space-lg);
			font: var(--f-h2-medium);
		}

		h3 {
			margin-top: var(--space-sm);
			font: var(--f-h4-medium);
		}

		pre {
			background: var(--c-background-7-v1);
			border: 1px solid var(--c-border-1-v1);
			border-radius: var(--radius-xxs);
			color: var(--c-parchment);
			padding: var(--space-md);
		}
	}
</style>
