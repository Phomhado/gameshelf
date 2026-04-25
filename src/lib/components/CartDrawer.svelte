<script lang="ts">
  import {
    cartItems,
    cartTotal,
    isCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  } from '$lib/stores/cart';

  function checkout() {
    alert('Purchase completed successfully! 🎮');
    clearCart();
    isCartOpen.set(false);
  }
</script>

{#if $isCartOpen}
  <div
    class="fixed inset-0 bg-black/50 z-50"
    onclick={() => isCartOpen.set(false)}
    aria-hidden="true"
  ></div>
{/if}

<aside
  class="fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark z-50 flex flex-col shadow-2xl transition-transform duration-300"
  class:translate-x-full={!$isCartOpen}
  class:translate-x-0={$isCartOpen}
>
  <div class="flex items-center justify-between px-6 py-4 border-b border-brand-primary">
    <h2 class="text-lg font-semibold text-text-on-dark">Your Cart</h2>
    <button
      onclick={() => isCartOpen.set(false)}
      aria-label="Close cart"
      class="text-text-on-dark opacity-60 hover:opacity-100 transition-opacity"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <div class="flex-1 overflow-y-auto px-6 py-4">
    {#if $cartItems.length === 0}
      <div class="flex flex-col items-center justify-center h-full gap-4 text-center">
        <p class="text-text-on-dark opacity-60">Your cart is empty.</p>
        <a
          href="/"
          onclick={() => isCartOpen.set(false)}
          class="text-sm text-brand-primary underline"
          style="filter: brightness(2)"
        >
          Browse the catalog
        </a>
      </div>
    {:else}
      <ul class="flex flex-col gap-4">
        {#each $cartItems as item (item.game.id)}
          <li class="flex gap-4 items-start">
            <img
              src={item.game.coverImage}
              alt={item.game.title}
              class="w-16 h-20 object-cover rounded"
            />
            <div class="flex-1 min-w-0">
              <p class="text-text-on-dark font-medium text-sm truncate">{item.game.title}</p>
              <p class="text-text-on-dark opacity-60 text-xs mt-1">
                R$ {(item.game.price * item.quantity).toFixed(2)}
              </p>
              <div class="flex items-center gap-2 mt-2">
                <button
                  onclick={() => decreaseQuantity(item.game.id)}
                  disabled={item.quantity === 1}
                  aria-label="Decrease quantity"
                  class="w-6 h-6 rounded bg-brand-primary text-text-on-primary text-sm flex items-center justify-center disabled:opacity-30"
                >−</button>
                <span class="text-text-on-dark text-sm w-4 text-center">{item.quantity}</span>
                <button
                  onclick={() => increaseQuantity(item.game.id)}
                  aria-label="Increase quantity"
                  class="w-6 h-6 rounded bg-brand-primary text-text-on-primary text-sm flex items-center justify-center"
                >+</button>
              </div>
            </div>
            <button
              onclick={() => removeFromCart(item.game.id)}
              aria-label="Remove item"
              class="text-text-on-dark opacity-40 hover:opacity-100 transition-opacity mt-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if $cartItems.length > 0}
    <div class="px-6 py-4 border-t border-brand-primary flex flex-col gap-3">
      <div class="flex justify-between text-text-on-dark">
        <span class="font-medium">Total</span>
        <span class="font-bold">R$ {$cartTotal.toFixed(2)}</span>
      </div>
      <button
        onclick={checkout}
        class="w-full bg-brand-primary text-text-on-primary font-semibold py-3 rounded hover:opacity-90 transition-opacity"
      >
        Checkout
      </button>
      <button
        onclick={clearCart}
        class="w-full text-text-on-dark opacity-50 hover:opacity-100 text-sm transition-opacity"
      >
        Clear cart
      </button>
    </div>
  {/if}
</aside>
