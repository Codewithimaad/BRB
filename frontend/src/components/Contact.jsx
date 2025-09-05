import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useAnimation } from "framer-motion";

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

export default function Contact() {
  const { t } = useTranslation();
  const contactRef = useRef(null);
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const contactInfo = [
    {
      icon: "📧",
      title: t("email_address"),
      value: "hello@company.com",
      link: "mailto:hello@company.com",
      description: t("send_message")
    },
    {
      icon: "📞",
      title: t("phone"),
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: t("business_hours")
    },
    {
      icon: "📍",
      title: t("office"),
      value: "123 Business Ave, Suite 100",
      link: "#",
      description: t("visit_office_desc")
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background from ModernAbout component */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
      </div>

      <motion.section
        ref={contactRef}
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
                💬 {t("get_in_touch")}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              {t("contact_title")}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {t("contact_subtitle")}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="relative group h-full"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <a
                  href={info.link}
                  className="relative h-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden flex flex-col items-center text-center transition-all duration-700 group-hover:border-green-500/30 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
                    {info.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-colors duration-700 mb-2">
                    {info.title}
                  </h3>

                  {/* Value */}
                  <span className="block text-slate-400 group-hover:text-white font-medium mb-3 transition-colors duration-300">
                    {info.value}
                  </span>

                  {/* Description */}
                  <p className="text-slate-500 group-hover:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                    {info.description}
                  </p>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact Button */}
          <motion.div variants={fadeInUp} className="text-center">
            <a
              href="/contact-form"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">
                {t("contact_us")}
              </span>
              <div className="relative w-5 h-5 overflow-hidden ml-2 z-10">
                <svg className="absolute w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-8 group-hover:opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <svg className="absolute w-5 h-5 transform -translate-x-8 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}