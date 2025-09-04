import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, useInView, useAnimation } from "framer-motion";
import servicesHeroImg from '../assets/hero.jpg'

import companyEstablishmentImg from '../assets/company_establishment.png'
import enternalCompanyIquisition from '../assets/external_company.png'
import taxesImg from '../assets/taxes.png'
import humanResourcesImg from '../assets/human_resources.png'
import feasibilityStudyImg from '../assets/Business_fes.png'
import marketResearchImg from '../assets/market.png'
import investmentImg from '../assets/investment.png'
import projectImg from '../assets/projects.png'
import licencesImg from '../assets/licences.png'
import certificateImg from '../assets/certificates.png'
import headquarterImg from '../assets/headquarter.png'
import trainingImg from '../assets/training.png'

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
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Refs & animations
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
            .map(s => ({ title: s.title, description: s.description, image: s.imageUrl || servicesHeroImg }));
          setServices(fetched);
        }
      } catch (e) {
        console.error('Failed to load services', e);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="min-h-screen  font-inter relative overflow-hidden">
     {/* Hero Section */}
<motion.div
  ref={heroRef}
  initial="hidden"
  animate={heroControls}
  variants={textVariants}
  className="relative pt-32 pb-24"
>
  <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
    {/* Added image container */}
    <motion.div 
      className="mb-12 mx-auto w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <img 
        src={servicesHeroImg} 
        alt="Services" 
        className="w-full h-full object-cover"
      />
    </motion.div>
    
    <h1 className="text-6xl mt-10 md:text-7xl font-black bg-gradient-to-r from-green-700 to-green-400 bg-clip-text text-transparent mb-8">
      {t("services_title")}
    </h1>
    <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium">
      {t("services_subtitle")}
    </p>
  </div>
</motion.div>

      {/* Services Grid */}
      <motion.div
        ref={servicesRef}
        initial="hidden"
        animate={servicesControls}
        variants={cardVariants}
        className="relative py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      alt={service.title}
      className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
    />
  </div>
</div>




  {/* Title Section */}
  <div className="px-4 pb-5 text-center bg-gray-50">
    <h3 className="text-lg font-bold" style={{ color: "#60a685" }}>
      {service.title}
    </h3>
  </div>
</motion.div>

            ))}
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
