<script lang="ts">
	import { wizard } from 'wizard/store';

	wizard.toggleComplete('introduction');
</script>

<div class="deposit-introduction">
	<p>
		Ready to invest in <strong>{$wizard.data.strategyName}</strong>? Deposit USDC to add this strategy to your DeFi
		trading portfolio. Connect your wallet, review your balances, enter your desired investment amount, and make your
		payment. Let's get started!
	</p>
</div>
