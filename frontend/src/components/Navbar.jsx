import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/brp_logo.png";

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("services"), href: "/services" },
    { name: t("about"), href: "/about" },
    { name: t("countries"), href: "/countries" },
    { name: t("blogs"), href: "/blogs" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    closed: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const backdropVariants = {
    open: { opacity: 1, pointerEvents: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, pointerEvents: "none", transition: { duration: 0.3 } }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-slate-900/90 backdrop-blur-md py-2 shadow-md border-b border-slate-700" 
            : "bg-slate-900 py-4"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           {/* Logo */}
<Link
  to="/"
  className="flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105"
  onClick={() => setActiveItem("/")}
>
  <img
    src={logo}
    alt="Business Registration Portal Logo"
    className="h-35 md:h-50 w-auto"
  />
</Link>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeItem === item.href 
                      ? 'text-green-400 font-semibold' 
                      : 'text-slate-300 hover:text-green-400'
                  }`}
                  onClick={() => setActiveItem(item.href)}
                >
                  {item.name}
                  {activeItem === item.href && (
                    <motion.span 
                      layoutId="underline"
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-green-500 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />

              {/* CTA Button */}
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {t("get_consultation")}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-all duration-300 transform hover:rotate-90"
                aria-label="Toggle menu"
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Menu using Framer Motion */}
      <motion.div
        className="lg:hidden fixed inset-0 z-60"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={backdropVariants}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-slate-950/70" onClick={() => setIsOpen(false)} />

        {/* Menu Content */}
        <motion.div
          className="absolute top-0 right-0 h-full w-full bg-slate-900 shadow-xl border-l border-slate-800"
          variants={menuVariants}
        >
          <div className="flex flex-col h-full text-white">
            {/* Header */}
            <motion.div variants={itemVariants} className="flex items-center justify-between p-6 border-b border-slate-800">
              <Link
                to="/"
                className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors duration-300 transform hover:rotate-90"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </motion.div>

            {/* Navigation Items */}
            <div className="flex-1 p-6 space-y-2">
              {navItems.map((item) => (
                <motion.div variants={itemVariants} key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveItem(item.href);
                    }}
                    className={`block px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300 transform hover:translate-x-2 ${
                      activeItem === item.href 
                        ? 'text-green-400 bg-slate-800' 
                        : 'text-slate-300 hover:text-green-400 hover:bg-slate-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div variants={itemVariants} className="p-6 border-t border-slate-800">
              <Link
                to="/contact"
                onClick={() => {
                  setIsOpen(false);
                  setActiveItem("/contact");
                }}
                className="w-full inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                {t("get_started")}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Navbar;