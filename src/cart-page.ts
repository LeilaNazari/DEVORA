import { getCart, onCartChange, totalCount, subtotal } from "./cart";
import { itemsHTML, emptyHTML, bindActions, money } from "./cart-ui";
import { syncBag } from "./drawer";
import "./cart.css";

const layout = document.querySelector("#cart-layout") as HTMLElement;
const list = document.querySelector("#cart-items") as HTMLElement;
const summary = document.querySelector("#cart-summary") as HTMLElement;
const pageCount = document.querySelector("#page-count") as HTMLElement;
const sumSub = document.querySelector("#sum-sub") as HTMLElement;
const sumTotal = document.querySelector("#sum-total") as HTMLElement;
const checkout = document.querySelector("#checkout") as HTMLElement;
const note = document.querySelector("#checkout-note") as HTMLElement;

function render() {
  const items = getCart();
  const n = totalCount();
  syncBag();
  pageCount.textContent = n === 1 ? "1 item" : `${n} items`;
  list.innerHTML = items.length ? itemsHTML(items) : emptyHTML("/#shop");
  layout.classList.toggle("is-empty", items.length === 0);
  summary.hidden = items.length === 0;
  sumSub.textContent = money(subtotal());
  sumTotal.textContent = money(subtotal());
}

bindActions(list);
checkout.addEventListener("click", () => {
  note.hidden = false;
});
onCartChange(render);
render();
