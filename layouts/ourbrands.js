"use client";
import { useState, useEffect } from "react";
import { markdownify } from "@lib/utils/textConverter";

export default function GallerySection({ data }) {
  const { frontmatter } = data;
  const { title, images: markdownImages, brandtitle } = frontmatter;
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-gray-200 shadow-lg">
              <span className="text-blue-500 text-xl">✨</span>
              <span className="text-gray-700 font-medium">Our Brands</span>
              <span className="text-blue-500 text-xl">✨</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              {brandtitle}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            We proudly collaborate with top-tier pump and motor brands in Thailand and Southeast Asia.
            </p>
            
            <div className="flex justify-center gap-8 text-gray-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">{markdownImages.length}</div>
                <div className="text-sm">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">Premium</div>
                <div className="text-sm">Quality</div>
              </div>
            </div>
          </div>

          {/* Gallery Grid - Centered for 3 images */}
          <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {markdownImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 shadow-md"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Container - Optimized for transparent images */}
                  <div className="relative p-8 h-48 flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Partner ${index + 1}`}
                      className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-110 filter drop-shadow-lg"
                      style={{
                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-300"></div>
                  
                  {/* Index Number */}
                  <div className="absolute top-3 right-3 bg-gray-800/80 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-lg">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">Join our exclusive partner network</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}