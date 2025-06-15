"use client";

import React from "react";

export default function ProductCard({ product, onClick }) {
  if (!product) return null;

  const { name, owner, image, category } = product;

  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col"
      onClick={onClick}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded mb-4"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded mb-4 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}

      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-600 mb-1">Owner: {owner}</p>
      {category && <p className="text-sm text-gray-600">Category: {category}</p>}
    </div>
  );
}
