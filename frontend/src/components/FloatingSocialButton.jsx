import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaShareAlt } from "react-icons/fa";

const FloatingSocialButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebook size={20} />, url: "#" },
    { name: "Twitter", icon: <FaTwitter size={20} />, url: "#" },
    { name: "Instagram", icon: <FaInstagram size={20} />, url: "#" },
    { name: "LinkedIn", icon: <FaLinkedin size={20} />, url: "#" },
    { name: "YouTube", icon: <FaYoutube size={20} />, url: "#" },
    { name: "Pinterest", icon: <FaPinterest size={20} />, url: "#" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Social buttons */}
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ease-in-out
          ${isOpen ? "scale-y-100 opacity-100 mb-3" : "scale-y-0 opacity-0 mb-0"} origin-bottom
        `}
      >
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="flex items-center justify-center w-12 h-12 rounded-full shadow-md
                       bg-white/10 text-white backdrop-blur-sm transition-all duration-200
                       hover:bg-white/20 hover:scale-110"
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        onClick={toggleOpen}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg
                   bg-green-600 text-white transition-all duration-300 ease-in-out
                   hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <FaShareAlt
          className={`text-xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
        />
      </button>
    </div>
  );
};

export default FloatingSocialButton;
