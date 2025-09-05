import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import servicesHeroImg from '../assets/hero.jpg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const textReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const servicesControls = useAnimation();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${base}/api/services`);
        if (res.data.success) {
          const fetched = res.data.services
            .filter((s) => s.isActive)
            .map((s) => ({
              id: s._id,
              title: s.title,
              titleAr: s.titleAr,
              description: s.description,
              descriptionAr: s.descriptionAr,
              image: s.imageUrl || servicesHeroImg,
            }));
          setServices(fetched);
        }
      } catch (e) {
        console.error("Failed to load services", e);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    loadServices();
  }, []);

  // Use a separate useEffect to handle the animations
  useEffect(() => {
    if (servicesInView && services.length > 0) {
      servicesControls.start("visible");
    }
  }, [servicesInView, servicesControls, services]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-green-400/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="relative z-10 pt-24 pb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8 backdrop-blur-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-300">
            {t("our_services")}
          </span>
        </motion.div>

        <motion.h1
          variants={textReveal}
          className="text-4xl md:text-8xl font-black mb-6 bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent leading-tight"
        >
          {t("services_title")}
        </motion.h1>

        <motion.p
          variants={textReveal}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          {t("services_subtitle")}
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        </motion.div>
      </motion.section>

      {/* Services Grid */}
      <section ref={servicesRef} className="relative z-10 px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate={servicesControls}
            variants={containerVariants}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div
                  key={service.id || index}
                  variants={itemVariants}
                  className="group relative h-full"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                  <div className="relative h-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden group-hover:border-green-500/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                    <div className="relative">
                      <div className="relative mb-6">
                        <div className="aspect-video w-full relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-green-500/5 rounded-2xl group-hover:from-green-400/10 group-hover:to-green-500/10 transition-all duration-700"></div>
                          <div className="relative w-full h-full p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 group-hover:border-green-500/20 transition-all duration-700 backdrop-blur-sm">
                            <img
                              src={service.image}
                              alt={i18n.language === 'ar' ? service.titleAr : service.title}
                              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                            />
                            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-green-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-green-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                          </div>
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-60 animate-ping group-hover:animate-pulse"></div>
                          <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-green-500 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                      </div>
                      <div className="text-center space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-all duration-700">
                          {i18n.language === 'ar' ? service.titleAr : service.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{i18n.language === 'ar' ? service.descriptionAr : service.description}</p>
                        <div className="flex justify-center">
                          <div className="w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-500 group-hover:w-16 transition-all duration-700 ease-out"></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100 shadow-lg shadow-green-500/50">
                    <div className="absolute inset-0.5 bg-slate-900 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-lg text-slate-400">{t("no_services_found")}</p>
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-bold text-gray-200 mb-6">
              {t("ready_transform")}
            </motion.h2>

            <motion.div variants={itemVariants} className="h-1.5 bg-gradient-to-r from-green-400 to-teal-400 mx-auto mb-8 rounded-full w-20"></motion.div>

            <motion.p variants={textReveal} className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("ready_transform_desc")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>
                <a
                  href="/contact"
                  className="relative inline-flex items-center gap-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl hover:shadow-green-500/25 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 border border-green-400/20"
                >
                  <span className="relative z-10 text-lg">{t("schedule_consultation")}</span>
                  <div className="relative w-6 h-6 overflow-hidden">
                    <svg className="absolute w-6 h-6 transform transition-transform duration-500 group-hover:translate-x-8 group-hover:opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <svg className="absolute w-6 h-6 transform -translate-x-8 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}