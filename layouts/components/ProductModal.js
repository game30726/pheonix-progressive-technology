"use client";
import React, { useState, useEffect } from "react";
import { X, User, Tag, Star, Heart, Share2, ShoppingCart, MapPin, Calendar, Eye } from "lucide-react";

export default function ProductModal({ product, onClose }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-bold text-gray-900 truncate pr-4">{name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative">
              {allImages.length > 0 ? (
                <img
                  src={allImages[selectedImage]}
                  alt={name}
                  className="w-full h-80 object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Tag className="w-12 h-12 mx-auto mb-3" />
                    <span>No Image Available</span>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              {status && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                  status === 'available' ? 'bg-green-100 text-green-800' :
                  status === 'sold' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
              )}

              {/* Discount Badge */}
              {discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}%
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden transition-all ${
                      selectedImage === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${name} ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="space-y-3">
              {(rating || reviews > 0) && (
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < (rating || 0) ? 'fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {rating && `${rating}/5`} {reviews > 0 && `(${reviews} รีวิว)`}
                  </span>
                </div>
              )}

              {price && (
                <div className="flex items-center gap-3">
                  {originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      ฿{originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ฿{price.toLocaleString()}
                  </span>
                  {discount && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      ประหยัด {discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Owner and Category */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="font-medium">Owner:</span>
                <span className="ml-2">{owner}</span>
              </div>

              {category && (
                <div className="flex items-center text-gray-600">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="font-medium">Category:</span>
                  <span className="ml-2">{category}</span>
                </div>
              )}

              {location && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="font-medium">Location:</span>
                  <span className="ml-2">{location}</span>
                </div>
              )}

              {createdAt && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">Created At:</span>
                  <span className="ml-2">{new Date(createdAt).toLocaleDateString('th-TH')}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {(description || fullDescription) && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {fullDescription || description}
                </p>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Features</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {Object.keys(specifications).length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">ข้อมูลจำเพาะ</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}