"use client";
import { useState, useEffect } from "react";
import { markdownify } from "@lib/utils/textConverter";

export default function GallerySection({ data }) {
  const { frontmatter } = data;
  const { title, images: markdownImages } = frontmatter;
  const IMAGES_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [animationClass, setAnimationClass] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const totalPages = Math.ceil(markdownImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const selectedImages = markdownImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setAnimationClass("animate-pulse");
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setAnimationClass("");
      }, 150);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setAnimationClass("animate-pulse");
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setAnimationClass("");
      }, 150);
    }
  };

  // Auto-scroll animation for floating elements
  useEffect(() => {
    const interval = setInterval(() => {
      const elements = document.querySelectorAll('.floating-element');
      elements.forEach((el, index) => {
        const delay = index * 200;
        setTimeout(() => {
          el.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 10}px)`;
        }, delay);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-32 left-10 text-gray-300 text-6xl">
          🏢
        </div>
        <div className="floating-element absolute top-40 right-20 text-gray-300 text-5xl">
          🏆
        </div>
        <div className="floating-element absolute bottom-40 left-20 text-gray-300 text-5xl">
          👥
        </div>
        <div className="floating-element absolute bottom-20 right-10 text-gray-300 text-5xl">
          ✨
        </div>
      </div>

      <section className="relative z-10 py-32 px-4">
        <div className="container">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-gray-200 shadow-lg">
              <span className="text-blue-500 text-xl">✨</span>
              <span className="text-gray-700 font-medium">Trusted Customers</span>
              <span className="text-blue-500 text-xl">✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover the industry leaders who trust our solutions. Over {markdownImages.length}+ prestigious clients worldwide.
            </p>
            
            <div className="flex justify-center gap-8 text-gray-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{markdownImages.length}+</div>
                <div className="text-sm">Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{totalPages}</div>
                <div className="text-sm">Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">100%</div>
                <div className="text-sm">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 ${animationClass}`}>
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white backdrop-blur-md border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 shadow-md"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Image Container */}
                <div className="relative p-6 h-32 flex items-center justify-center">
                  <img
                    src={image}
                    alt={`Customer ${startIndex + index + 1}`}
                    className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to company name if image fails to load
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback Text */}
                  <div className="w-full h-full bg-gray-100 rounded-lg items-center justify-center text-gray-700 font-bold text-xs transform group-hover:scale-110 transition-transform duration-300 hidden">
                    {image.split('/').pop().replace('.png', '').toUpperCase()}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-600 transition-all duration-300"></div>
                
                {/* Index Number */}
                <div className="absolute top-2 right-2 bg-gray-800/80 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {startIndex + index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pagination */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="group flex items-center gap-2 px-8 py-4 bg-white backdrop-blur-md rounded-full border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 shadow-md"
            >
              <span className="text-xl text-gray-600 group-hover:-translate-x-1 transition-transform duration-300">‹</span>
              <span className="text-gray-700 font-medium">Previous</span>
            </button>

            <div className="flex items-center gap-4">
              {/* Page Dots */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/50 scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="text-gray-600 font-medium bg-white backdrop-blur-md rounded-full px-4 py-2 border border-gray-200 shadow-md">
                {currentPage} of {totalPages}
              </div>
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="group flex items-center gap-2 px-8 py-4 bg-white backdrop-blur-md rounded-full border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 shadow-md"
            >
              <span className="text-gray-700 font-medium">Next</span>
              <span className="text-xl text-gray-600 group-hover:translate-x-1 transition-transform duration-300">›</span>
            </button>
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-lg">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">Join {markdownImages.length}+ satisfied customers</span>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}