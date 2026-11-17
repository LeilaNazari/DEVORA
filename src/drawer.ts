import "./cart.css";
import { getCart, onCartChange, totalCount, subtotal } from "./cart";
import { itemsHTML, emptyHTML, bindActions, money } from "./cart-ui";

// Updates the number on the bag icon (used on every page)
export function syncBag() {
  const n = totalCount();
  const badge = document.querySelector<HTMLElement>(".bag-count");
  const bag = document.querySelector<HTMLElement>(".bag");
  if (badge) badge.textContent = String(n);
  if (bag) bag.setAttribute("aria-label", `Shopping bag, ${n} items`);
}

export function mountDrawer() {
  const root = document.createElement("div");
  root.className = "drawer-root";
  root.innerHTML = `
    <div class="drawer-overlay" data-close></div>
    <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">
      <header class="drawer-head">
        <div>
          <h2 id="drawer-title">Your Cart</h2>
          <p class="drawer-count"></p>
        </div>
        <button class="icon-btn" data-close aria-label="Close cart">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
      </header>
      <div class="drawer-body"></div>
      <footer class="drawer-foot">
        <div class="sub-row"><span>Subtotal</span><strong class="sub-val"></strong></div>
        <a class="btn btn-lime" href="/cart.html">Complete Purchase</a>
        <button class="btn-link" data-close>Continue Shopping</button>
      </footer>
    </aside>`;
  document.body.append(root);

  const panel = root.querySelector(".drawer") as HTMLElement;
  const body = root.querySelector(".drawer-body") as HTMLElement;
  const foot = root.querySelector(".drawer-foot") as HTMLElement;
  const count = root.querySelector(".drawer-count") as HTMLElement;
  const sub = root.querySelector(".sub-val") as HTMLElement;
  const bagBtn = document.querySelector<HTMLElement>(".bag");

  function render() {
    const items = getCart();
    const n = totalCount();
    syncBag();
    count.textContent = n === 1 ? "1 item" : `${n} items`;
    body.innerHTML = items.length ? itemsHTML(items) : emptyHTML("/#shop");
    foot.hidden = items.length === 0;
    sub.textContent = money(subtotal());
  }

  function open() {
    root.classList.add("is-open");
    document.body.classList.add("no-scroll");
    panel.focus();
  }

  function close() {
    root.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    bagBtn?.focus();
  }

  bindActions(body);
  bagBtn?.addEventListener("click", open);
  root.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-close], [data-start]")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && root.classList.contains("is-open")) close();
  });

  onCartChange(render);
  render();
}