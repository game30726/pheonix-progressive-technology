// components/ProductCard.js
"use client";
import { useState } from 'react';

export default function ProductsGrid({
  products = [],
  title = "สินค้า",
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    console.log('Product clicked in ProductsGrid:', product);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    console.log('Closing modal');
    setSelectedProduct(null);
  };

  // Debug logs
  console.log('ProductsGrid render - products count:', products?.length);
  console.log('Selected product:', selectedProduct);

  if (!products || products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2C5.03 2 1 6.03 1 11s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm0 8a1 1 0 112 0v.01a1 1 0 11-2 0V13z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">ไม่พบสินค้า</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          {title}
        </h2>
      )}
      
      <div className={`grid ${gridCols} gap-6`}>
        {products.map((product, index) => {
          console.log(`Rendering ProductCard ${index}:`, product?.name, 'onClick:', typeof handleProductClick);
          return (
            <ProductCard
              key={product.id || product.name || index}
              product={product}
              onClick={handleProductClick} // ✅ ส่ง function ตรงๆ ไม่ต้องใส่ arrow function
            />
          );
        })}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}