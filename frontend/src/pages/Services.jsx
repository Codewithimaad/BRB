import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import servicesHeroImg from '../assets/hero.jpg';

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Services() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const servicesRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const servicesControls = useAnimation();

  useEffect(() => {
    if (servicesInView) servicesControls.start("visible");
  }, [servicesInView, servicesControls]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${base}/api/services`);
        if (res.data.success) {
          const fetched = res.data.services
            .filter(s => s.isActive)
            .map(s => ({
              title: s.title,
              titleAr: s.titleAr,
              description: s.description,
              descriptionAr: s.descriptionAr,
              image: s.imageUrl || servicesHeroImg,
            }));
          setServices(fetched);
        }
      } catch (e) {
        console.error('Failed to load services', e);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="min-h-screen font-inter relative overflow-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-500/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-green-700 bg-green-100 rounded-full"
          >
            {t("our_services")}
          </motion.span>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            {t("services_title")}
          </h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-gradient-to-r from-green-500 to-teal-400 mx-auto mb-8 rounded-full"
          ></motion.div>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("services_subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="relative py-24">
        <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-slate-50 to-transparent -translate-y-full"></div>
        
        <motion.div
          ref={servicesRef}
          initial="hidden"
          animate={servicesControls}
          variants={fadeIn}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={servicesControls}
                variants={cardVariants}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                className="group flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden"
              >
                <div className="relative overflow-hidden rounded-xl mb-6 h-48 bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                  <img
                    src={service.image}
                    alt={i18n.language === 'ar' ? service.titleAr : service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                
                </div>

                <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-green-600 transition-colors duration-500">
                  {i18n.language === 'ar' ? service.titleAr : service.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                  {i18n.language === 'ar' ? service.descriptionAr : service.description}
                </p>
                
              
              </motion.div>
            ))}
          </div>

        
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            {t("ready_transform")}
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1.5 bg-gradient-to-r from-green-400 to-teal-400 mx-auto mb-8 rounded-full"
          ></motion.div>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("ready_transform_desc")}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center"
            >
              {t("schedule_consultation")}
            </a>
           
          </div>
        </motion.div>
      </section>
    </div>
  );
}