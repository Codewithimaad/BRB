import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import axios from "axios";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Countries() {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);
  const countriesRef = useRef(null);
  
  const isInView = useInView(countriesRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const baseURL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${baseURL}/api/countries`);

        if (response.data.success) {
          const fetchedCountries = response.data.countries
            .filter((c) => c.isActive)
            .slice(0, 4)
            .map(c => ({
              name: c.name,
              nameAr: c.nameAr,
              code: c.titleShort,
              codeAr: c.titleShortAr,
              flag: c.flag || "🌍", // Use a default emoji if flag is missing
              image: c.flagUrl || "https://via.placeholder.com/400x300"
            }));
          setCountries(fetchedCountries);
        }
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };

    fetchCountries();
  }, [t]);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background from ModernAbout component */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.section
        ref={countriesRef}
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="relative z-10 py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
                🌍 {t("countries_section_subtitle")}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              {t("countries_title")}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {t("countries_subtitle")}
            </p>
          </motion.div>

          {/* Countries Grid with Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <div className="relative h-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden group-hover:border-green-500/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <img
                      src={country.image}
                      alt={`${country.name} Flag`}
                      className="w-16 h-12 object-cover rounded-md shadow-lg"
                    />
                    <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-colors duration-700">
                        {i18n.language === "ar" && country.nameAr ? country.nameAr : country.name}
                    </h3>
                    <span className="inline-flex items-center px-4 py-1 text-sm font-medium text-slate-400 rounded-full border border-slate-700/50 backdrop-blur-sm">
                        {i18n.language === "ar" && country.codeAr ? country.codeAr : country.code}
                    </span>
                    <p className="text-slate-400 text-sm leading-relaxed">{country.tagline}</p>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}