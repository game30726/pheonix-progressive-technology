// components/ProductCard.js
"use client";
import { useState } from 'react';

export default function ProductCard(props) {
  console.log(">>> Full props received in ProductCard:", props);

  const { product, onClick } = props;
  const [imageError, setImageError] = useState(false);

  // Debug props
  console.log('ProductCard props:', {
    product: product?.name,
    onClick: typeof onClick,
    onClickExists: !!onClick
  });

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('ProductCard clicked!', {
      productName: product?.name,
      onClickType: typeof onClick,
      onClickExists: !!onClick
    });
    
    if (onClick && typeof onClick === 'function') {
      try {
        onClick(product);
        console.log('onClick called successfully');
      } catch (error) {
        console.error('Error calling onClick:', error);
      }
    } else {
      console.error('onClick prop is missing or not a function!', {
        onClick,
        type: typeof onClick
      });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatPrice = (price) => {
    if (!price) return 'ไม่ระบุราคา';
    return `฿${price.toLocaleString()}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-300"
      onClick={handleClick}
      style={{ minHeight: '400px' }}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100">
        {!imageError && product.image ? (
          <img
            src={product.image}
            alt={product.name || 'Product Image'}
            className="w-full h-full object-cover"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}

        {/* Status Badge */}
        {product.status && (
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.status === 'available' ? 'bg-green-100 text-green-800' :
              product.status === 'out_of_stock' ? 'bg-red-100 text-red-800' :
              product.status === 'limited' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {product.status === 'available' ? 'พร้อมจำหน่าย' :
               product.status === 'out_of_stock' ? 'สินค้าหมด' :
               product.status === 'limited' ? 'จำนวนจำกัด' :
               product.status}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.name || 'ไม่ระบุชื่อสินค้า'}
        </h3>

        {/* Category */}
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">
            Category: {product.category}
          </p>
        )}

        {/* Owner/Store */}
        {product.owner && (
          <p className="text-sm text-blue-600 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
            {product.owner}
          </p>
        )}

        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          
          <button 
            onClick={handleClick}
            className="bg-orange-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 active:bg-blue-800"
          >
            More Info
          </button>
        </div>
      </div>

    </div>
  );
}