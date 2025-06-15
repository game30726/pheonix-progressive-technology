"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Autoplay, Pagination, EffectFade, EffectCube, EffectFlip, EffectCreative, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// ฟังก์ชันสำหรับสุ่มรูปภาพ
const getRandomImages = (images, count = 10) => {
  if (images.length <= count) return images;
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ServiceCard = ({ service, index }) => {
  const [currentImages, setCurrentImages] = useState([]);
  const [currentEffect, setCurrentEffect] = useState('fade');
  const isOdd = index % 2 > 0;

  // Array ของ effects ที่เหมาะกับรูป PNG แบบใส
  const effects = [
    { name: 'fade', config: { crossFade: true } },
    { name: 'creative', config: {
      prev: { shadow: false, translate: ['-100%', 0, 0], opacity: 0 },
      next: { translate: ['100%', 0, 0], opacity: 0 },
    }},
    { name: 'creative', config: {
      prev: { shadow: false, translate: [0, '-100%', 0], opacity: 0 },
      next: { translate: [0, '100%', 0], opacity: 0 },
    }},
    { name: 'creative', config: {
      prev: { shadow: false, translate: ['-50%', 0, 0], scale: 0.8, opacity: 0 },
      next: { translate: ['50%', 0, 0], scale: 0.8, opacity: 0 },
    }},
    { name: 'creative', config: {
      prev: { shadow: false, translate: [0, 0, -400], rotate: [0, 0, -90], opacity: 0 },
      next: { translate: [0, 0, -400], rotate: [0, 0, 90], opacity: 0 },
    }}
  ];

  // สุ่มรูปใหม่เมื่อ component mount และทุกๆ 25 วินาที
  useEffect(() => {
    const updateImages = () => {
      const randomImages = getRandomImages(service.images, 10);
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      setCurrentImages(randomImages);
      setCurrentEffect(randomEffect);
    };

    // สุ่มรูปครั้งแรก
    updateImages();

    // สุ่มรูปใหม่ทุกๆ 25 วินาที
    const interval = setInterval(updateImages, 25000);

    return () => clearInterval(interval);
  }, [service.images]);

  if (currentImages.length === 0) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${
        isOdd 
          ? "lg:flex-row-reverse" 
          : "lg:flex-row"
      } flex flex-col lg:flex mb-16 border border-gray-200/30`}
    >
      {/* Background Decorative Elements - ลบออก */}

      {/* Carousel Section */}
      <div className="relative lg:w-1/2 h-[300px] lg:h-[500px] overflow-hidden bg-white">
        <Swiper
          key={`${currentImages.join(',')}-${currentEffect.name}`}
          modules={[Autoplay, Pagination, EffectFade, EffectCreative, Parallax]}
          spaceBetween={0}
          slidesPerView={1}
          loop={currentImages.length > 1}
          speed={1000}
          pagination={currentImages.length > 1 ? { 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white !opacity-60 hover:!opacity-100 transition-all duration-500 hover:scale-110',
            bulletActiveClass: '!bg-orange-500 !opacity-100 scale-125 shadow-lg shadow-orange-500/50'
          } : false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            waitForTransition: true,
          }}
          effect={currentEffect.name}
          fadeEffect={currentEffect.name === 'fade' ? currentEffect.config : undefined}
          creativeEffect={currentEffect.name === 'creative' ? currentEffect.config : undefined}
          parallax={true}
          className="h-full w-full"
          style={{ 
            '--swiper-navigation-color': '#f97316',
            '--swiper-pagination-color': '#f97316',
          }}
        >
          {currentImages.map((slide, slideIndex) => (
            <SwiperSlide key={`${slide}-${slideIndex}`} className="relative">
              <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
                {/* Background Pattern สำหรับรูปใส */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-white"></div>
                </div>
                
                {/* Parallax Background */}
                <div 
                  className="relative z-10 w-full h-full flex items-center justify-center p-8" 
                  data-swiper-parallax="-23%"
                >
                  <div className="relative w-full h-full max-w-md max-h-96">
                    <Image
                      src={slide}
                      alt={`${service?.title} - Image ${slideIndex + 1}`}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={slideIndex === 0}
                    />
                  </div>
                </div>
                
                {/* Animated Overlays - ลดความเข้มลง */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                
                {/* Subtle Animation Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-orange-300/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Floating Sparkles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-2/3 right-1/3 w-0.5 h-0.5 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-orange-400/70 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Content Section */}
      <div className="relative lg:w-1/2 flex items-center p-8 lg:p-12">
        <div className="w-full space-y-6">
          {/* Title with Animation Line */}
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight tracking-tight">
              {service?.title}
            </h3>
            <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Content */}
          <div className="prose prose-lg text-gray-600 leading-relaxed">
            <p className="text-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              {service?.content}
            </p>
          </div>

          {/* Button */}
          {service.button.enable && (
            <div className="pt-4">
              <Link
                href={service?.button.link}
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {service?.button.label}
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
              </Link>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-orange-300/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

const Services = ({ services }) => {
  return services.map((service, index) => (
    <ServiceCard key={index} service={service} index={index} />
  ));
};

export default Services;