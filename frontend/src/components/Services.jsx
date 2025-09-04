import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import axios from "axios";

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
};

export default function Services() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  const heroControls = useAnimation();
  const servicesControls = useAnimation();
  const ctaControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (servicesInView) servicesControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [heroInView, servicesInView, ctaInView, heroControls, servicesControls, ctaControls]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${base}/api/services`);
        if (res.data.success) {
          const fetched = res.data.services
            .filter(s => s.isActive)
            .map(s => ({
              id: s._id,
              title: s.title,
              titleAr: s.titleAr,
              image: s.imageUrl,
            }));
          setServices(fetched.slice(0, 4));
        }
      } catch (e) {
        console.error('Failed to load services', e);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="min-h-screen font-inter relative overflow-hidden">

    

      {/* Services Grid - only show 4 */}
      <motion.div
        ref={servicesRef}
        initial="hidden"
        animate={servicesControls}
        variants={cardVariants}
        className="relative py-24"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={servicesControls}
                variants={cardVariants}
                transition={{ delay: 0.1 * index }}
                className="relative rounded-2xl shadow-lg overflow-hidden group border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white flex flex-col"
              >
                <div className="w-full flex items-center justify-center overflow-hidden rounded-2xl bg-gray-50 p-2">
                  <div className="w-full h-full overflow-hidden rounded-2xl">
                    <img
                      src={service.image}
                      alt={i18n.language === 'ar' && service.titleAr ? service.titleAr : service.title}
                      className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>

                <div className="px-4 pb-5 text-center bg-gray-50">
                  <h3 className="text-lg font-bold" style={{ color: "#60a685" }}>
                    {i18n.language === 'ar' && service.titleAr ? service.titleAr : service.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <div className="mt-12 text-center">
            <a
              href="/services"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {t("view_more_services")}
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        initial="hidden"
        animate={ctaControls}
        variants={textVariants}
        className="relative py-24"
      >
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t("ready_transform")}
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {t("ready_transform_desc")}
          </p>
          <a
            href="/contact"
            className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-xl font-bold shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {t("schedule_consultation")}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
