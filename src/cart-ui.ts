import type { ProductCount } from "./types";
import { changeQty, removeItem } from "./cart";

export const money = (n: number) => `$${n.toFixed(2)}`;

const trash = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>`;
const bagIcon = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>`;

export function itemsHTML(items: ProductCount[]): string {
  const rows = items
    .map(
      (c) => `
    <li class="cart-item">
      <img src="${c.image}" alt="${c.name}" />
      <div class="ci-info">
        <p class="cat">${c.category}</p>
        <h3>${c.name}</h3>
        <p class="ci-price">${money(c.price * c.quantity)}${
          c.quantity > 1 ? ` <small>${money(c.price)} each</small>` : ""
        }</p>
      </div>
      <div class="qty" role="group" aria-label="Quantity of ${c.name}">
        <button data-action="dec" data-id="${c.id}" aria-label="Decrease quantity">−</button>
        <span aria-live="polite">${c.quantity}</span>
        <button data-action="inc" data-id="${c.id}" aria-label="Increase quantity">+</button>
      </div>
      <button class="ci-remove" data-action="remove" data-id="${c.id}" aria-label="Remove ${c.name}">${trash}</button>
    </li>`,
    )
    .join("");
  return `<ul class="cart-list">${rows}</ul>`;
}

export const emptyHTML = (href: string) => `
  <div class="cart-empty">
    <span class="empty-icon">${bagIcon}</span>
    <h3>Your cart is currently empty.</h3>
    <p>Pick something for the desk and it will show up here.</p>
    <a class="btn btn-lime" href="${href}" data-start>Start Shopping</a>
  </div>`;

// One listener per container: handles +, - and remove
export function bindActions(root: HTMLElement) {
  root.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement).closest<HTMLElement>(
      "[data-action]",
    );
    if (!button) return;
    const id = Number(button.dataset.id);
    if (button.dataset.action === "inc") changeQty(id, 1);
    if (button.dataset.action === "dec") changeQty(id, -1);
    if (button.dataset.action === "remove") removeItem(id);
  });
}
