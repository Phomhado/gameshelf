<script lang="ts">
  import games from '$lib/data/games.json';
  import GameCard from '$lib/components/GameCard.svelte';
  import type { Category, Game } from '$lib/types';

  const allGames = games as Game[];
  const featuredGames = allGames.filter((g) => g.featured);
  const categories: Category[] = ['Action', 'RPG', 'Adventure', 'Strategy', 'Indie', 'Sport', 'Horror'];

  let search = $state('');
  let selectedCategory = $state<Category | null>(null);
  let sortBy = $state<'relevant' | 'price-asc' | 'rating'>('relevant');

  const filteredGames = $derived.by(() => {
    let result = allGames;

    if (search.trim()) {
      result = result.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter((g) => g.category === selectedCategory);
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  });
</script>

<div class="min-h-screen bg-brand-dark">

  <!-- Featured Section -->
  <section class="max-w-7xl mx-auto px-4 py-10">
    <h2 class="text-2xl font-bold text-text-on-dark mb-6">Featured</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {#each featuredGames as game (game.id)}
        <GameCard {game} />
      {/each}
    </div>
  </section>

  <!-- Catalog Section -->
  <section class="max-w-7xl mx-auto px-4 py-10 border-t border-brand-primary/20">
    <h2 class="text-2xl font-bold text-text-on-dark mb-6">Catalog</h2>

    <!-- Search + Sort -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search games..."
        bind:value={search}
        class="flex-1 bg-brand-primary/10 border border-brand-primary/30 rounded px-4 py-2 text-text-on-dark placeholder:text-text-on-dark/40 focus:outline-none focus:border-brand-primary"
      />
      <select
        bind:value={sortBy}
        class="bg-brand-primary/10 border border-brand-primary/30 rounded px-4 py-2 text-text-on-dark focus:outline-none focus:border-brand-primary"
      >
        <option value="relevant">Most Relevant</option>
        <option value="price-asc">Lowest Price</option>
        <option value="rating">Highest Rating</option>
      </select>
    </div>

    <!-- Category Filter -->
    <div class="flex flex-wrap gap-2 mb-8">
      <button
        onclick={() => selectedCategory = null}
        class="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors {selectedCategory === null ? 'bg-brand-primary text-text-on-primary border-brand-primary' : 'text-text-on-dark border-brand-primary/30 hover:border-brand-primary'}"
      >
        All
      </button>
      {#each categories as category}
        <button
          onclick={() => selectedCategory = category}
          class="px-4 py-1.5 rounded-full text-sm font-medium border transition-colors {selectedCategory === category ? 'bg-brand-primary text-text-on-primary border-brand-primary' : 'text-text-on-dark border-brand-primary/30 hover:border-brand-primary'}"
        >
          {category}
        </button>
      {/each}
    </div>

    <!-- Game Grid -->
    {#if filteredGames.length === 0}
      <p class="text-text-on-dark/50 text-center py-20">No games found for your search.</p>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {#each filteredGames as game (game.id)}
          <GameCard {game} />
        {/each}
      </div>
    {/if}
  </section>

</div>
