import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ProductCard from "../../layouts/components/ProductCard";
import Link from "next/link";

export async function getAllProducts() {
  const productsDir = path.join(process.cwd(), "content", "products");
  const files = fs.readdirSync(productsDir);
  let allProducts = [];

  for (const file of files) {
    const fullPath = path.join(productsDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(content);
    
    if (Array.isArray(data.products)) {
      allProducts = allProducts.concat(data.products);
    }
  }
  
  return allProducts;
}

export default async function AllProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-300 to-orange-400 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 rounded-full p-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 tracking-tight">
              All Products
            </h1>
            <p className="text-xl text-orange-50 max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of premium pump and motor solutions 
              from leading brands across Thailand and Southeast Asia
            </p>
            <div className="mt-8 flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{products.length}</div>
                <div className="text-orange-200 text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3</div>
                <div className="text-orange-200 text-sm">Premium Brands</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">✨</div>
                <div className="text-orange-200 text-sm">Quality</div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-16 fill-current text-orange-50">
            <path d="M0,60 C240,100 480,40 720,60 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"/>
          </svg>
        </div>
      </div>

      {/* Brand Showcase */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Trusted Brand Partners
            </h2>
            <p className="text-gray-600">Premium quality from industry leaders</p>
          </div>
          <div className="flex justify-center items-center space-x-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-gradient-to-r from-orange-300 to-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              LOWARA
            </div>
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              MICROPUMP
            </div>
            <div className="bg-gradient-to-r from-orange-300 to-red-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
              ORLANDO
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-6 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We're currently updating our product catalog. Please check back soon for our latest offerings.
            </p>
            <button className="bg-gradient-to-r from-orange-300 to-orange-400 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Us for Information
            </button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Products
                  <span className="text-lg font-normal text-gray-500 ml-2">
                    ({products.length} items)
                  </span>
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">Sort by:</span>
                  <select className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent bg-white">
                    <option>Latest</option>
                    <option>Name A-Z</option>
                    <option>Name Z-A</option>
                    <option>Price Low-High</option>
                    <option>Price High-Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-16">
              <button className="bg-gradient-to-r from-orange-300 to-orange-400 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-400 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Load More Products
                <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-300 to-orange-400 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
            Our expert team is here to help you find the perfect pump and motor solutions for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
                <button className="bg-white text-orange-400 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Contact Our Experts
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}