"use client";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// ฟังก์ชันสำหรับสุ่มรูปภาพ
const getRandomImages = (images, count = 4) => {
  if (images.length <= count) return images;
  const shuffled = [...images].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Services = ({ services }) => {
  return services.map((service, index) => {
    const isOdd = index % 2 > 0;
    // สุ่มรูปภาพ 4 รูป
    const randomImages = getRandomImages(service.images, 10);

    return (
      <div
        key={index}
        className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-orange-50 to-orange-100 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] ${
          isOdd 
            ? "lg:flex-row-reverse" 
            : "lg:flex-row"
        } flex flex-col lg:flex mb-16 border border-orange-200/30`}
      >
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-300 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-orange-200 to-transparent rounded-full transform -translate-x-24 translate-y-24"></div>
        </div>

        {/* Carousel Section */}
        <div className="relative lg:w-1/2 h-[300px] lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            loop={randomImages.length > 1}
            pagination={randomImages.length > 1 ? { 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white !opacity-60 hover:!opacity-100 transition-opacity duration-300',
              bulletActiveClass: '!bg-orange-500 !opacity-100 scale-125'
            } : false}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            className="h-full w-full"
          >
            {randomImages.map((slide, slideIndex) => (
              <SwiperSlide key={slideIndex} className="relative">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={slide}
                    alt={`${service?.title} - Image ${slideIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={slideIndex === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
  });
};

export default Services;