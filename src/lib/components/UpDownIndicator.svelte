<!--
@component
Utility component for displaying a value with red/green value color. Use in inline contexts where
a lightweight visual representation is needed. See `UpDownCell.svelte` for a more stylized variant.

#### Usage:
```tsx
	<UpDownIndicator value={priceChange} formatter={formatPriceChange} />
	<UpDownIndicator value={100}>Slot content</UpDownIndicator>
```
-->
<script lang="ts">
	export let value: MaybeNumberOrString;

	type ValueFormatter = Formatter<MaybeNumberOrString>;
	export let formatter: Maybe<ValueFormatter> = undefined;

	type CompareFn = (value: MaybeNumberOrString) => number;
	const defaultCompare: CompareFn = (value) => (value ? Math.sign(Number(value)) : 0);
	export let compareFn: CompareFn = defaultCompare;

	$: direction = compareFn(value);
	$: formatted = formatter ? formatter(value) : value;
</script>

<span class="up-down-indicator" class:bullish={direction > 0} class:bearish={direction < 0}>
	<slot {direction} {formatted}>{formatted}</slot>
</span>

<style lang="postcss">
	.up-down-indicator {
		color: hsla(var(--hsl-text-light));

		&.bullish {
			color: hsla(var(--hsl-bullish));
		}

		&.bearish {
			color: hsla(var(--hsl-bearish));
		}
	}
</style>
