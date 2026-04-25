<script lang="ts">
  import { cartCount, toggleCart } from '$lib/stores/cart';
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-brand-dark border-b border-brand-primary">
  <nav class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
    <a href="/" class="text-xl font-bold text-text-on-dark tracking-tight">
      Game<span class="text-brand-primary" style="filter: brightness(2)">Shelf</span>
    </a>

    <button
      onclick={toggleCart}
      aria-label="Open cart"
      class="relative p-2 text-text-on-dark opacity-80 hover:opacity-100 transition-opacity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>

      {#if $cartCount > 0}
        <span class="absolute -top-1 -right-1 bg-brand-primary text-text-on-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {$cartCount}
        </span>
      {/if}
    </button>
  </nav>
</header>
