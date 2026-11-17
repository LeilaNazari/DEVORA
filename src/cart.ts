import type { Product, ProductCount } from "./types";

const KEY = "cart";
const listeners: Array<() => void> = [];

function load(): ProductCount[] {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : [] ;
  } catch {
    return [];
  }
}

let cart: ProductCount[] = load();

function commit() {
  localStorage.setItem(KEY, JSON.stringify(cart));
  listeners.forEach((fn) => fn());
}

export const getCart = () => cart;
export const onCartChange = (fn: () => void) => listeners.push(fn);
export const totalCount = () => cart.reduce((sum, c) => sum + c.quantity, 0);
export const subtotal = () =>
  cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

export function addToCart(product: Product) {
  const existing = cart.find((c) => c.id === product.id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  commit();
}

export function changeQty(id: number, delta: number) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter((c) => c.id !== id);
  commit();
}

export function removeItem(id: number) {
  cart = cart.filter((c) => c.id !== id);
  commit();
}
