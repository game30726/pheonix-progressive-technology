"use client";
import React, { useState, useEffect } from "react";
import { X, User, Tag, Star, Heart, Share2, ShoppingCart, MapPin, Calendar, Eye, Plus, Minus } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const {
    name,
    owner,
    image,
    images = [],
    category,
    description,
    fullDescription,
    price,
    originalPrice,
    rating,
    reviews = 0,
    status,
    location,
    createdAt,
    features = [],
    specifications = {},
    discount
  } = product;

  const allImages = images.length > 0 ? images : (image ? [image] : []);

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient */}
        <div className="sticky top-0 bg-gradient-to-r from-white via-white to-gray-50 border-b border-gray-100 px-8 py-6 flex items-center justify-between rounded-t-3xl z-10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {name}
            </h2>
            {status && (
              <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                status === 'available' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
                status === 'sold' ? 'bg-red-100 text-red-700 border border-red-200' :
                'bg-amber-100 text-amber-700 border border-amber-200'
              }`}>
                {status}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isFavorite 
                  ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg shadow-red-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-all duration-300 transform hover:scale-110">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              className="p-3 rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-100px)]">
          <div className="grid lg:grid-cols-2 gap-10 p-8">
            {/* Enhanced Image Section */}
            <div className="space-y-6">
              <div className="relative group">
                {allImages.length > 0 ? (
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={allImages[selectedImage]}
                      alt={name}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200">
                    <div className="text-center">
                      <Tag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <span className="text-lg font-medium">No Image Available</span>
                    </div>
                  </div>
                )}

                {/* Floating Discount Badge */}
                {discount && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg transform rotate-3 animate-pulse">
                    -{discount}% OFF
                  </div>
                )}
              </div>

              {/* Enhanced Image Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative flex-shrink-0 border-3 rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                        selectedImage === index 
                          ? 'border-blue-500 ring-4 ring-blue-200 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${name} ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                      {selectedImage === index && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced Product Details */}
            <div className="space-y-8">
              {/* Rating and Price Section */}
              <div className="space-y-4">
                {(rating || reviews > 0) && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 transition-colors duration-200 ${
                            i < (rating || 0) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {rating && (
                        <span className="font-semibold text-gray-700">{rating}/5</span>
                      )}
                      {reviews > 0 && (
                        <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {reviews} รีวิว
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {price && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        {originalPrice && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 line-through text-lg">
                              ฿{originalPrice.toLocaleString()}
                            </span>
                            {discount && (
                              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-lg text-xs font-bold">
                                ประหยัด {((originalPrice - price) / originalPrice * 100).toFixed(0)}%
                              </span>
                            )}
                          </div>
                        )}
                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ฿{price.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 bg-white rounded-xl p-2 border border-gray-200">
                        <button
                          onClick={() => handleQuantityChange('decrease')}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange('increase')}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Info Cards */}
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: User, label: "Owner", value: owner },
                  { icon: Tag, label: "Category", value: category },
                  { icon: MapPin, label: "Location", value: location },
                  { icon: Calendar, label: "Created", value: createdAt ? new Date(createdAt).toLocaleDateString('th-TH') : null }
                ].filter(item => item.value).map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 font-medium">{item.label}</span>
                      <p className="font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <a href="/contact"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                    Contact Seller
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Description and Details */}
          <div className="px-8 pb-8 space-y-8">
            {(description || fullDescription) && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {fullDescription || description}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Enhanced Features */}
              {features.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Enhanced Specifications */}
              {Object.keys(specifications).length > 0 && (
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                    ข้อมูลจำเพาะ
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                        <span className="text-gray-600 font-medium">{key}</span>
                        <span className="font-semibold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}