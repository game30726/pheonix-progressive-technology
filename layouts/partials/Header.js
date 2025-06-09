"use client";
import Logo from "@components/Logo";
import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import config from "../../config/config.json";

const Header = () => {
  const pathname = usePathname();
  // distructuring the main menu from menu object
  const { main } = menu;
  // states declaration
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({}); // เพิ่ม state สำหรับ dropdown
  
  // logo source
  const { logo } = config.site;
  const { enable, link } = config.nav_button;

  // ฟังก์ชันสำหรับจัดการ dropdown
  const toggleDropdown = (index) => {
    setDropdownOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // ฟังก์ชันปิด dropdown เมื่อคลิกข้างนอก
  const closeDropdown = (index) => {
    setDropdownOpen(prev => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <header className="header fixed top-0 left-0 w-full bg-white z-50 shadow">
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0">
          <Logo src={logo} />
        </div>
        
        {/* navbar toggler */}
        <button
          id="show-button"
          className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-6 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V15z" />
            </svg>
          )}
        </button>
        
        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 md:order-1 ${
            navOpen ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          <ul className="navbar-nav block w-full md:flex md:w-auto lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    {/* Desktop: hover, Mobile: click */}
                    <span 
                      className="nav-link inline-flex items-center cursor-pointer"
                      onClick={() => toggleDropdown(i)} // เพิ่ม onClick สำหรับ mobile
                    >
                      {menu.name}
                      <svg className="h-4 w-4 fill-current ml-1" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul 
                      className={`nav-dropdown-list ${
                        dropdownOpen[i] 
                          ? 'block' 
                          : 'hidden'
                      } md:absolute md:top-full md:left-0 md:bg-white md:shadow-lg md:rounded-md md:min-w-[200px] md:z-50 
                      md:group-hover:block md:group-hover:opacity-100`}
                    >
                      {menu.children.map((child, j) => (
                        <li className="nav-dropdown-item" key={`children-${j}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setNavOpen(false);
                              closeDropdown(i);
                            }}
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${
                        pathname === menu.url ? "nav-link-active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {enable && (
              <li className="md:hidden">
                <Link
                  className="btn btn-primary z-0 py-[14px]"
                  href={link}
                  rel=""
                >
                  Get Started
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;