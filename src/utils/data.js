// src/utils/data.js

const brands = ["KLEO", "SIRAN", "IRAM", "LUXURY"];
const karats = ["18K", "21K", "24K", "925"];

export const products = Array.from({ length: 400 }, (_, i) => ({
  id: i + 1,
  name: `قطعة مجوهرات رقم ${i + 1}`,
  brand: brands[i % brands.length],
  karat: karats[i % karats.length],
  grams: (Math.random() * 20 + 1).toFixed(2), // وزن عشوائي بين 1 و 21 جرام
  price: Math.floor(Math.random() * 50000 + 1000), // سعر عشوائي
  image: `/images/product-${(i % 10) + 1}.png`, // بيفترض عندك 10 صور متكررة
  isNew: i % 5 === 0, // علامة منتج جديد
}));