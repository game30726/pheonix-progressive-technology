"use client";

import { useState } from "react";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

// แก้ชื่อฟังก์ชันให้ตรงกับที่ใช้งานจริง
export default function GallerySection({ data }) {
  const { frontmatter } = data;
  const { title, images: markdownImages } = frontmatter;
  const IMAGES_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(markdownImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const selectedImages = markdownImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section className="section">
      <div className="container">
      <div className="section row pb-0 mb-8">
        {markdownify(title, "h1", "text-center font-normal mb-8")}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {selectedImages.map((image, index) => (
            <div key={index} className="w-full h-full overflow-hidden rounded-xl shadow-md">
              <Image
                src={image}
                alt={`Gallery Image ${startIndex + index + 1}`}
                width={500}
                height={400}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </section>
  );
}
