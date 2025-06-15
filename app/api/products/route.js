import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  const productsDir = path.join(process.cwd(), "content", "products");
  const files = fs.readdirSync(productsDir);

  let allProducts = [];

  for (const file of files) {
    const fullPath = path.join(productsDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    if (data.products && Array.isArray(data.products)) {
      allProducts = allProducts.concat(data.products);
    }
  }

  return new Response(JSON.stringify(allProducts), {
    headers: { "Content-Type": "application/json" },
  });
}
