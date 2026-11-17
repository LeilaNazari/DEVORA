import { products } from "./data";
import type { Product, ProductCount } from "./types";
import { addToCart } from "./cart";
import { mountDrawer } from "./drawer";
let grid = document.querySelector(".grid") as HTMLElement;
const featuredProducts = products.filter(
  (product) => product.featured === true,
);
let showProduct = featuredProducts.map((product) => {
  return `      <article class="product p2">
            <div class="visual v-hood">
              <label class="fav"
                ><input type="checkbox" /><span class="sr"
                  >Favorite ${product.name}</span
                >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.600-7 10-7 10Z"
                  /></svg
              ></label>
              
            
  
  <img src="${product.image}" alt="${product.name}" />

            </div>
            <div class="info">
              <div>
                <p class="cat">${product.category}</p>
                <h3>${product.name}</h3>
              </div>
              <p class="price">$${product.price}</p>
              <button class="btn btn-lime btn-sm" data-id="${product.id}">Add to Cart</button>
            </div>
          </article>
`;
});

grid.innerHTML = showProduct.join("");
// const bagCount = document.querySelector(".bag-count") as HTMLElement;
// const btn = document.querySelectorAll<HTMLElement>(".btn");

// console.log(showProduct);
// console.log(btn);
// const saved = localStorage.getItem("cart");
// const cart: ProductCount[] = saved ? JSON.parse(saved) : [];
// updateBag();
// btn.forEach((item) => {
//   item.addEventListener("click", () => {
//     const id = Number(item.dataset.id);
//     const product = products.find((product) => product.id === id);

//     const existing = cart.find((c) => c.id === id);
//     console.log(existing);
//     if (existing) {
//       existing.quantity++;
//     } else if (product) {
//       const newRow: ProductCount = { ...product, quantity: 1 };
//       cart.push(newRow);
//       updateBag();
//     }
//     updateBag();
//     console.log(cart);
//     localStorage.setItem("cart", JSON.stringify(cart));
//   });
// });
// function updateBag() {
//   const total = cart.reduce((sum, c) => sum + c.quantity, 0);
//   bagCount.textContent = String(total);
// }
mountDrawer();

document.querySelectorAll<HTMLElement>(".btn-sm").forEach((button) => {
  button.addEventListener("click", () => {
    const product = products.find((p) => p.id === Number(button.dataset.id));
    if (product) addToCart(product);
  });
});