'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ฟังก์ชันโหลดข้อมูลจากไฟล์ .md
  useEffect(() => {
    const loadAboutData = async () => {
      try {
        // อ่านไฟล์ about.md
        const response = await fetch('/api/about'); // สร้าง API route สำหรับอ่านไฟล์
        if (response.ok) {
          const data = await response.json();
          setAboutData(data.about);
        } else {
          // ใช้ข้อมูล fallback หากไม่สามารถอ่านไฟล์ได้
          setAboutData({
            title: "Phoenix Progressive Technology",
            description: [
              "The company started by taking over the pump division business of Jebsen & Jessen Technology Thailand.",
              "12 employees from Sales, Services and Business Admin, with a combined Pump and Motors experience of more than 30 years.",
              "We provide a wide range of fluid pumping solutions to the commercial and residential building sectors including those for water treatment, irrigation, booster pumps and service water as well as industrial sectors including power plant, fertilizer, mining, petrochemical, chemical, steel, sugar, pulp & paper and palm oil.",
              "Business operations are located in Lad Krabang with a fully operational workshop and warehouse facility.",
              "Representing Top Tier Pumps and Motors brands in Thailand and Southeast Asia.",
              "Serving more than 500 customers and through a nationwide dealer network."
            ],
            image: "/images/favicon.png"
          });
        }
      } catch (error) {
        console.error('Error loading about data:', error);
        // ใช้ข้อมูล fallback
        setAboutData({
          title: "Phoenix Progressive Technology",
          description: [
            "The company started by taking over the pump division business of Jebsen & Jessen Technology Thailand.",
            "12 employees from Sales, Services and Business Admin, with a combined Pump and Motors experience of more than 30 years.",
            "We provide a wide range of fluid pumping solutions to the commercial and residential building sectors including those for water treatment, irrigation, booster pumps and service water as well as industrial sectors including power plant, fertilizer, mining, petrochemical, chemical, steel, sugar, pulp & paper and palm oil.",
            "Business operations are located in Lad Krabang with a fully operational workshop and warehouse facility.",
            "Representing Top Tier Pumps and Motors brands in Thailand and Southeast Asia.",
            "Serving more than 500 customers and through a nationwide dealer network."
          ],
          image: "/images/favicon.png"
        });
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  useEffect(() => {
    // Animation สำหรับ floating elements
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!aboutData) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

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
        <div className="floating-element absolute top-32 left-10 text-gray-300 text-6xl">🏢</div>
        <div className="floating-element absolute top-40 right-20 text-gray-300 text-5xl">⚙️</div>
        <div className="floating-element absolute bottom-40 left-20 text-gray-300 text-5xl">💧</div>
        <div className="floating-element absolute bottom-20 right-10 text-gray-300 text-5xl">🚀</div>
      </div>

      <section className="relative z-10 py-20 px-4">
        <br></br><br></br>
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-gray-200 shadow-lg">
              <span className="text-blue-500 text-xl">🏆</span>
              <span className="text-gray-700 font-medium">About Our Company</span>
              <span className="text-blue-500 text-xl">🏆</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              {aboutData.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Leading provider of fluid pumping solutions with over 30 years of combined experience in the industry.
            </p>
            
            <div className="flex justify-center gap-8 text-gray-500">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">2022</div>
                <div className="text-sm">Established</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">500+</div>
                <div className="text-sm">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">12</div>
                <div className="text-sm">Expert Team</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Image Section */}
            {aboutData.image && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-white backdrop-blur-md p-4 rounded-3xl shadow-2xl border border-gray-200 transform hover:scale-105 transition-all duration-500">
                  <Image
                    src={aboutData.image}
                    alt="About Phoenix Progressive Technology"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent rounded-2xl"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white backdrop-blur-md rounded-full p-4 shadow-lg border border-gray-200">
                  <span className="text-2xl">🏭</span>
                </div>
              </div>
            )}

            {/* Content Cards */}
            <div className="space-y-6">
              {aboutData.description?.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    animationDelay: `${idx * 100}ms`
                  }}
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon and Content */}
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="w-4 h-4 bg-white rounded-full opacity-90"></div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                        {item}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated Border */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Index Number */}
                  <div className="absolute top-2 right-2 bg-gray-800/80 backdrop-blur-sm rounded-full w-6 h-6 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive fluid pumping solutions for commercial, residential, and industrial sectors
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🏢", title: "Commercial Buildings", desc: "Water treatment & booster pumps" },
                { icon: "🏠", title: "Residential", desc: "Service water & irrigation systems" },
                { icon: "⚡", title: "Power Plants", desc: "Industrial grade pumping solutions" },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="group bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 hover:border-gray-300"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">Trusted by 500+ customers nationwide</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}