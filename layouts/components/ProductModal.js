"use client";
import React from "react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-xl w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-contain mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-1">Owner: {product.owner}</p>
        <p className="text-gray-600 mb-1">Category: {product.category}</p>
      </div>
    </div>
  );
}
