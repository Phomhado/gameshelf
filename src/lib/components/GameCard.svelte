<script lang="ts">
  import type { Game } from '$lib/types';

  let { game }: { game: Game } = $props();

  const discount = game.originalPrice
    ? Math.round((1 - game.price / game.originalPrice) * 100)
    : null;
</script>

<a
  href="/games/{game.slug}"
  class="group flex flex-col bg-brand-primary/10 rounded-lg overflow-hidden border border-brand-primary/20 hover:border-brand-primary/60 transition-all duration-200"
>
  <div class="relative aspect-[3/4] overflow-hidden">
    <img
      src={game.coverImage}
      alt={game.title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    {#if discount}
      <span class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
        -{discount}%
      </span>
    {/if}
  </div>

  <div class="flex flex-col gap-1 p-3">
    <p class="text-text-on-dark text-sm font-medium leading-tight line-clamp-2">{game.title}</p>
    <div class="flex items-baseline gap-2 mt-1">
      <span class="text-text-on-dark font-bold">R$ {game.price.toFixed(2)}</span>
      {#if game.originalPrice}
        <span class="text-text-on-dark/40 text-xs line-through">R$ {game.originalPrice.toFixed(2)}</span>
      {/if}
    </div>
  </div>
</a>
