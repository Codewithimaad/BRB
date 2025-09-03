import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

// Icons (Using SVG for better quality)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: t("about"), href: "/about" },
    { name: t("countries"), href: "/countries" },
    { name: t("blogs"), href: "/blogs" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsOpen(false);
    
    // Set active item based on current path
    const currentPath = window.location.pathname;
    const active = navItems.find(item => item.href === currentPath);
    if (active) {
      setActiveItem(active.href);
    }
  }, [window.location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4'} border-b border-gray-100`}>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                BRP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeItem === item.href 
                    ? 'text-xl font-bold bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent bg-emerald-50/80' 
                    : 'text-xl font-bold bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent hover:text-emerald-700 hover:bg-gray-50/50'
                  }`}
                  onClick={() => setActiveItem(item.href)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />

              {/* CTA Button */}
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("get_started")}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100/50 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  BRP
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 p-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveItem(item.href);
                  }}
                  className={`block px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    activeItem === item.href 
                    ? 'text-emerald-700 bg-emerald-50' 
                    : 'text-gray-600 hover:text-emerald-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100">
              <Link
                to="/contact"
                onClick={() => {
                  setIsOpen(false);
                  setActiveItem("/contact");
                }}
                className="w-full inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t("get_started")}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add padding to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;