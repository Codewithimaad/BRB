import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Import all flag images
import pakFlag from '../assets/Pak.png';
import egyptFlag from '../assets/egypt.png';
import qaFlag from '../assets/Qatar.png';
import uaeFlag from '../assets/UAE.png';
import kuwaitFlag from '../assets/kuwait.png';
import saFlag from '../assets/sa.png'

export default function Countries() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCountry, setActiveCountry] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const countries = [
    {
      name: "Saudi Arabia",
      flag: saFlag,
      description: "Main Market",
      tagline: "The heart of our operations in the Middle East",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Egypt",
      flag: egyptFlag,
      description: "Gateway to Africa",
      tagline: "Strategic access to emerging African markets",
      color: "from-green-500 to-emerald-600",

    },
    {
      name: "Qatar",
      flag: qaFlag,
      description: "Growing Economy",
      tagline: "Rapidly expanding market with high potential",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "United Arab Emirates",
      flag: uaeFlag,
      description: "Financial Hub",
      tagline: "Center of commerce and innovation in the region",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Kuwait",
      flag: kuwaitFlag,
      description: "Energy Leader",
      tagline: "Strong economic foundation with oil reserves",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Pakistan",
      flag: pakFlag,
      description: "Emerging Market",
      tagline: "Diversifying economy with investment opportunities",
      color: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent mb-6 leading-tight">
            {t("countries_title")}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
            {t("countries_subtitle")}
          </p>
        </div>

        {/* Countries Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          {countries.map((country, index) => (
            <div
              key={index}
              className={`group relative bg-white border border-slate-200/60 hover:border-slate-300/70 shadow-lg hover:shadow-xl p-8 rounded-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] cursor-pointer`}
              onMouseEnter={() => setActiveCountry(index)}
            >
              {/* Flag */}
              <div className="text-center mb-6">
                <img
                  src={country.flag}
                  alt={`${country.name} Flag`}
                  className="mx-auto h-16 w-24 object-cover rounded-md shadow-sm"
                />
                <h3 className="text-2xl font-bold text-slate-800 mt-4 mb-2">
                  {country.name}
                </h3>
                <span
                  className={`inline-flex items-center px-4 py-2  text-slate-700 text-sm rounded-full border border-slate-200/50 backdrop-blur-sm font-medium`}
                >
                  {country.description}
                </span>
              </div>

              {/* Tagline */}
              <p className="text-slate-600 text-center text-sm leading-relaxed">
                {country.tagline}
              </p>

              {/* Hover underline effect */}
              <div
                className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${country.color} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
