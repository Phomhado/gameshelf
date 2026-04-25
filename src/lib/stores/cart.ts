import { writable, derived } from 'svelte/store';
import type { Game } from '$lib/types';

export interface CartItem {
  game: Game;
  quantity: number;
}

export const cartItems = writable<CartItem[]>([]);

export const isCartOpen = writable(false);

export const toggleCart = () => isCartOpen.update((open) => !open);

export const cartCount = derived(cartItems, ($items) =>
  $items.reduce((acc, item) => acc + item.quantity, 0)
);

export const cartTotal = derived(cartItems, ($items) =>
  $items.reduce((acc, item) => acc + item.game.price * item.quantity, 0)
);

export function addToCart(game: Game) {
  cartItems.update((items) => {
    const existing = items.find((i) => i.game.id === game.id);
    if (existing) {
      return items.map((i) =>
        i.game.id === game.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    return [...items, { game, quantity: 1 }];
  });
}

export function removeFromCart(gameId: string) {
  cartItems.update((items) => items.filter((i) => i.game.id !== gameId));
}

export function increaseQuantity(gameId: string) {
  cartItems.update((items) =>
    items.map((i) =>
      i.game.id === gameId ? { ...i, quantity: i.quantity + 1 } : i
    )
  );
}

export function decreaseQuantity(gameId: string) {
  cartItems.update((items) =>
    items
      .map((i) =>
        i.game.id === gameId ? { ...i, quantity: i.quantity - 1 } : i
      )
      .filter((i) => i.quantity > 0)
  );
}

export function clearCart() {
  cartItems.set([]);
}
