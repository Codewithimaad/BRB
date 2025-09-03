import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import heroImage from "../assets/hero.jpg"; // Replace with your hero image

export default function Hero() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[120vh] bg-green-900 py-20">
      {/* Background Image + Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-top"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/70 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-start px-6 md:px-16 py-32 md:py-40 max-w-3xl">
        <div
          className={`transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            {t("hero_title")}
          </h1>
          <p
            className={`text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed transition-all duration-1000 ease-out`}
          >
            {t("hero_subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {t("get_started")}
            </a>
            <a
              href="/services"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {t("explore")}
            </a>
          </div>
        </div>
      </section>
     

     
    </div>

  );
}
