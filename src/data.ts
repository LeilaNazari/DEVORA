import type { Product } from "./types";

export const products: Product[] = [
  { id: 1, name: "Works On My Machine Tee", price: 28, category: "apparel", mood: "minimalist", featured: true, image: "images/t-shirt.webp" },
  { id: 2, name: "Midnight Developer Notebook", price: 18, category: "stationery", mood: "night", featured: true, image: "images/book.webp" },
  { id: 3, name: "Night Shift Bomber Jacket", price: 79, category: "apparel", mood: "night", featured: true, image: "images/cot.webp" },
  { id: 4, name: "Noise-Cancelling Earbuds", price: 59, category: "hardware", mood: "night", featured: true, image: "images/headphone.webp" },
  { id: 5, name: "Ergonomic Mouse", price: 48, category: "hardware", mood: "minimalist", featured: true, image: "images/mouse.webp" },
  { id: 6, name: "Fast Charge Power Bank", price: 32, category: "accessories", mood: "creative", featured: true, image: "images/power.webp" },
  { id: 7, name: "Debug Blue Pen Pack", price: 8, category: "stationery", mood: "minimalist", featured: false, image: "images/pen.webp" },
  { id: 8, name: "Runtime Sneakers", price: 75, category: "apparel", mood: "creative", featured: false, image: "images/shoes.webp" },
];