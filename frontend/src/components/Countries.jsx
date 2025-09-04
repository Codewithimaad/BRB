import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Countries() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const baseURL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${baseURL}/api/countries`);

        if (response.data.success) {
          const fetchedCountries = response.data.countries
            .filter((c) => c.isActive)
            .slice(0, 4)
            .map((c) => ({
              name: c.name,
              nameAr: c.nameAr,
              code: c.titleShort,
              codeAr: c.titleShortAr,
              flag: c.flagUrl,
              color: "from-green-400 to-green-800",
              tagline: "",
            }));
          setCountries(fetchedCountries);
        }
      } catch (error) {
        console.error("Failed to load countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-transform duration-1000 ease-out transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-green-400 to-green-800 bg-clip-text text-transparent mb-4 leading-tight">
            {t("countries_title")}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("countries_subtitle")}
          </p>
        </div>

        {/* Countries Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-transform duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {countries.map((country, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-md border border-slate-200/30 shadow-lg rounded-2xl p-6 md:p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl"
            >
              {/* Flag */}
              <img
                src={country.flag}
                alt={`${country.name} Flag`}
                className="h-16 w-24 object-cover rounded-md shadow-sm mb-4"
              />

              {/* Name & Code */}
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{country.name}</h3>
              <span className="inline-flex items-center px-4 py-1 text-sm font-medium text-slate-700 rounded-full border border-slate-200/30 backdrop-blur-sm mb-4">
                {country.code}
              </span>

              {/* Tagline */}
              <p className="text-slate-600 text-sm leading-relaxed">{country.tagline}</p>

              {/* Hover Gradient Underline */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${country.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
