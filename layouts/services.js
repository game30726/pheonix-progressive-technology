import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { markdownify } from "@lib/utils/textConverter";

export default async function ServicePage() {
  const serviceFilePath = path.join(process.cwd(), "content/services.md");
  const fileContent = await fs.readFile(serviceFilePath, "utf8");
  const { data } = matter(fileContent);
  const { title, service, solution, market } = data;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Service Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 text-gray-300 text-6xl animate-bounce">
          🚀
        </div>
        <div className="absolute top-40 right-20 text-gray-300 text-5xl animate-pulse">
          ⚡
        </div>
        <div className="absolute bottom-40 left-20 text-gray-300 text-5xl animate-bounce">
          💡
        </div>
        <div className="absolute bottom-20 right-10 text-gray-300 text-5xl animate-pulse">
          🎯
        </div>
      </div>

      <section className="relative z-10 py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-gray-200 shadow-lg">
              <span className="text-blue-500 text-xl">🚀</span>
              <span className="text-gray-700 font-medium">Our Services</span>
              <span className="text-blue-500 text-xl">🚀</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to drive your business forward with cutting-edge technology and expertise.
            </p>
          </div>
          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Service Section */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 shadow-lg h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🛠️</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {service?.title}
                </h3>
                
                {/* Description List */}
                <ul className="space-y-4">
                  {service?.description?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 shadow-lg h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">💡</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {solution?.title}
                </h3>
                
                {/* Description List */}
                <ul className="space-y-4">
                  {solution?.description?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/30 transition-all duration-300"></div>
              </div>
            </div>

            {/* Market Section */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 shadow-lg h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {market?.title}
                </h3>
                
                {/* Description List */}
                <ul className="space-y-4">
                  {market?.description?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-orange-400/30 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-700 font-medium">Ready to transform your business?</span>
              <Link href="/contact">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}