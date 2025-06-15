"use client";
import Logo from "@components/Logo";
import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import config from "../../config/config.json";

const Header = () => {
  const pathname = usePathname();
  const { main } = menu;
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const { logo } = config.site;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownOpen({});
  };

  const closeNavigation = () => {
    setNavOpen(false);
    closeAllDropdowns();
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      {navOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeNavigation}
        />
      )}

      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
            : 'bg-white shadow-sm'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <Logo src={logo} className="h-8 w-auto lg:h-10" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {main.map((menuItem, i) => (
                <div key={`menu-${i}`} className="relative group">
                  {menuItem.hasChildren ? (
                    <>
                      <button
                        className={`flex items-center px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-200 ${
                          menuItem.children?.some(child => pathname === child.url)
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                        }`}
                        onMouseEnter={() => toggleDropdown(i)}
                        onMouseLeave={() => toggleDropdown(i)}
                      >
                        {menuItem.name}
                        <svg
                          className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Desktop Dropdown */}
                      <div
                        className={`absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg transition-all duration-200 ${
                          dropdownOpen[i] 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                        onMouseEnter={() => toggleDropdown(i)}
                        onMouseLeave={() => toggleDropdown(i)}
                      >
                        <div className="py-2">
                          {menuItem.children?.map((child, j) => (
                            <Link
                              key={`child-${j}`}
                              href={child.url}
                              className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                                pathname === child.url
                                  ? 'text-orange-600 bg-orange-50 border-r-2 border-orange-600'
                                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                              }`}
                            >
                              {child.text}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menuItem.url}
                      className={`px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all duration-200 ${
                        pathname === menuItem.url
                          ? 'text-orange-600 bg-orange-50'
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      {menuItem.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden relative z-50 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    navOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current top-3 transition-opacity duration-300 ${
                    navOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    navOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-sm bg-white transform transition-transform duration-300 ease-in-out z-40 ${
              navOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="pt-20 pb-6 px-6 h-full overflow-y-auto">
              <nav className="space-y-2">
                {main.map((menuItem, i) => (
                  <div key={`mobile-menu-${i}`}>
                    {menuItem.hasChildren ? (
                      <>
                        <button
                          className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                          onClick={() => toggleDropdown(i)}
                        >
                          {menuItem.name}
                          <svg
                            className={`h-5 w-5 transform transition-transform duration-200 ${
                              dropdownOpen[i] ? 'rotate-180' : ''
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* Mobile Submenu */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            dropdownOpen[i] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="ml-4 space-y-1 pt-2">
                            {menuItem.children?.map((child, j) => (
                              <Link
                                key={`mobile-child-${j}`}
                                href={child.url}
                                className={`block px-4 py-2 text-sm rounded-lg transition-colors duration-200 ${
                                  pathname === child.url
                                    ? 'text-orange-600 bg-orange-50'
                                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                                onClick={closeNavigation}
                              >
                                {child.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={menuItem.url}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                          pathname === menuItem.url
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                        }`}
                        onClick={closeNavigation}
                      >
                        {menuItem.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;