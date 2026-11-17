export type Category =
  | "hardware"
  | "apparel"
  | "drinkware"
  | "stationery"
  | "accessories";
export type Mood = "minimalist" | "night" | "creative";
export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  mood: Mood;
  featured: boolean;
  image: string;
}
export interface ProductCount extends Product {
  quantity: number;
}
