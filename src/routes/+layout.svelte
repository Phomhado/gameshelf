<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import CartDrawer from '$lib/components/CartDrawer.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
<CartDrawer />

<main class="pt-16">
	{@render children()}
</main>
