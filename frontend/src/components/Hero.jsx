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
    <div className="relative min-h-[100vh] bg-green-900 py-16 md:py-24">
      {/* Background Image + Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 max-w-3xl">
        <div
          className={`transition-all duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6">
            {t("hero_title")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8 md:mb-12 leading-relaxed">
            {t("hero_subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            <a
              href="/contact"
              className="bg-green-600/90 backdrop-blur-sm hover:bg-green-700/90 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {t("get_started")}
            </a>
            <a
              href="/services"
              className="bg-green-500/90 backdrop-blur-sm hover:bg-green-600/90 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {t("explore")}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
