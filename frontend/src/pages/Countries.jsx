import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../context/apiContext";

export default function Countries() {
  const { backendUrl } = useContext(ApiContext);
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  const containerRefs = useRef([]);

  useEffect(() => {
    if (!backendUrl) return;

    const loadCountries = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/countries`);
        if (res.data.success) {
          const fetched = res.data.countries
            .filter(c => c.isActive !== false)
            .map(c => ({
              name: c.name,
              nameAr: c.nameAr,
              code: c.titleShort,
              codeAr: c.titleShortAr,
              flag: c.flag || "🌍", // Use a default emoji if flag is missing
              image: c.flagUrl || "https://via.placeholder.com/400x300"
            }));
          setCountries(fetched);
        }
      } catch (e) {
        console.error("Failed to load countries", e);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, [backendUrl]);

  // Intersection Observer for all cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleIndexes(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    containerRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => observer.disconnect();
  }, [countries]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-inter">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-24 text-center">
        <h1 className="text-6xl md:text-7xl font-black mb-8">
          <span className="bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
            {t("countries_title")}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium">
          {t("countries_subtitle")}
        </p>
      </div>

      {/* Countries Grid */}
      <div className="relative py-24 z-10">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {countries.map((country, index) => (
                <div
                  key={index}
                  ref={el => (containerRefs.current[index] = el)}
                  data-index={index}
                  className={`relative rounded-2xl overflow-hidden group border border-slate-800 bg-slate-900/50 backdrop-blur-sm
                    transition-all duration-700 ease-out transform will-change-transform hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10
                    ${visibleIndexes.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 via-transparent to-green-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                  
                  {/* Country image */}
                  <div className="relative w-full h-56 md:h-64 overflow-hidden">
                    <img
                      src={country.image}
                      alt={i18n.language === "ar" && country.nameAr ? country.nameAr : country.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
                  </div>

                  {/* Flag and country info */}
                  <div className="relative p-6 flex flex-col items-center text-center">
                   
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-2">
                        {i18n.language === "ar" && country.nameAr ? country.nameAr : country.name}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium mb-4">
                        {i18n.language === "ar" && country.codeAr ? country.codeAr : country.code}
                      </p>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-4 opacity-70 group-hover:w-24 group-hover:opacity-100 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}