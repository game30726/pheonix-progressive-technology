// lib/getAllProducts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllProductOwners() {
  const dir = path.join(process.cwd(), "content/products");
  const files = fs.readdirSync(dir);

  const owners = new Set();

  files.forEach((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    if (data.owner) {
      owners.add(data.owner.toLowerCase());
    }
  });

  return Array.from(owners);
}

export function getAllProducts() {
  const dir = path.join(process.cwd(), "content/products");
  const files = fs.readdirSync(dir);

  const allProducts = [];

  files.forEach((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent); // ดึง frontmatter

    // ถ้ามี field `product` เป็น array
    if (Array.isArray(data.product)) {
      allProducts.push(...data.product);
    }
  });

  return allProducts;
}
