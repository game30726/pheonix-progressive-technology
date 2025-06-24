import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-6000"></div>
      </div>

      {/* Floating Contact Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-10 text-gray-300 text-6xl animate-bounce">
          📞
        </div>
        <div className="absolute top-40 right-20 text-gray-300 text-5xl animate-pulse">
          ✉️
        </div>
        <div className="absolute bottom-40 left-20 text-gray-300 text-5xl animate-bounce">
          💬
        </div>
        <div className="absolute bottom-20 right-10 text-gray-300 text-5xl animate-pulse">
          🌐
        </div>
        <div className="absolute top-1/2 left-10 text-gray-300 text-4xl animate-pulse">
          📍
        </div>
      </div>

      <section className="relative z-10 py-32 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-gray-200 shadow-lg">
              <span className="text-blue-500 text-xl">📞</span>
              <span className="text-gray-700 font-medium">Get In Touch</span>
              <span className="text-blue-500 text-xl">📞</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
              Contact Us
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your next project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Information & Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 shadow-lg h-full">
                {/* Contact Image */}
                {info && info.image && (
                  <div className="mb-8 relative overflow-hidden rounded-xl">
                    <Image
                      src={info.image}
                      alt="Contact"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent"></div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl text-white">📞</span>
                  </div>

                  {/* Title */}
                  {markdownify(
                    info.title,
                    "h3",
                    "text-2xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  )}

                  {/* Description */}
                  {markdownify(
                    info.description,
                    "p",
                    "text-gray-600 mb-6 leading-relaxed"
                  )}

                  {/* Contact List */}
                  <ul className="space-y-4">
                    {info.contacts.map((contact, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        {markdownify(contact, "span", "leading-relaxed font-medium")}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300"></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 shadow-lg h-full">
                {/* Form Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl text-white">✉️</span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Send us a message
                </h3>

                <form action={contact_form_action} method="POST" className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-gray-300 resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-cyan-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 transform focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>Send Message</span>
                      <span className="text-lg">🚀</span>
                    </span>
                  </button>
                </form>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400/30 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Phone */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📞</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h4>
                <p className="text-gray-600">+6662 646 4219</p>
              </div>
            </div>

            {/* Email */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-300 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">✉️</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h4>
                <p className="text-gray-600">Quick Response</p>
              </div>
            </div>

            {/* Location */}
            <div className="group relative">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📍</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Visit Us</h4>
                <p className="text-gray-600">Come say hello</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-8 py-4 border border-gray-200 shadow-lg">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-700 font-medium">Let's start building something amazing together!</span>
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;