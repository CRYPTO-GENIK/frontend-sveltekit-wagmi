<!--
@component
Use in conjunction with HudMetric to display chart HUD (heads-up-display) data.

#### Usage:
```tsx
  <HudRow>
    <HudMetric ... />
  </HudRow>
```
-->
<script lang="ts">
	export let align: 'left' | 'right' = 'left';
</script>

<dl class="hud-row {align}">
	<slot />
</dl>

<style lang="postcss">
	.hud-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-ss);
		font: var(--hud-font, var(--f-ui-xs-roman));
		letter-spacing: var(--hud-letter-spacing, var(--f-ui-xs-spacing, normal));
		padding-block: var(--space-xxxs);
		white-space: nowrap;

		&:first-of-type {
			margin-top: var(--space-xxs);
		}
	}

	.right {
		justify-content: flex-end;
	}
</style>
