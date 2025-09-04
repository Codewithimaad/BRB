import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import countriesHeroImg from '../assets/hero.jpg'; // You'll need to add this image

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
};

export default function Countries() {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);

  // Refs & animations
  const heroRef = useRef(null);
  const countriesRef = useRef(null);
  const ctaRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const countriesInView = useInView(countriesRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  const heroControls = useAnimation();
  const countriesControls = useAnimation();
  const ctaControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (countriesInView) countriesControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [heroInView, countriesInView, ctaInView, heroControls, countriesControls, ctaControls]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
const res = await axios.get(`${base}/api/countries`);
        if (res.data.success) {
          const fetched = res.data.countries
            .filter(c => c.isActive)
            .map(c => ({ name: c.name, nameAr: c.nameAr, code: c.titleShort, codeAr: c.titleShortAr, flag: '', image: c.flagUrl }));
          setCountries(fetched);
        }
      } catch (e) {
        console.error('Failed to load countries', e);
      }
    };
    loadCountries();
  }, []);

  return (
    <div className="min-h-screen font-inter relative overflow-hidden">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={textVariants}
        className="relative pt-32 pb-24"
      >
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
         
          
          <h1 className="text-6xl mt-10 md:text-7xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            {t("countries_title")}
          </h1>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
            {t("countries_subtitle")}
          </p>
        </div>
      </motion.div>

      {/* Countries Grid */}
      <motion.div
        ref={countriesRef}
        initial="hidden"
        animate={countriesControls}
        variants={cardVariants}
        className="relative py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={countriesControls}
                variants={cardVariants}
                transition={{ delay: 0.1 * index }}
                className="relative rounded-2xl shadow-lg overflow-hidden group border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white flex flex-col"
              >
                {/* Country image */}
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Flag and country info */}
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">{country.flag}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {i18n.language === 'ar' && country.nameAr ? country.nameAr : country.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mb-4">
                    {i18n.language === 'ar' && country.codeAr ? country.codeAr : country.code}
                  </p>
                  
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-400 rounded-full mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}