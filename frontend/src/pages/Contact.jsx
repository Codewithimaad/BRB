import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../context/apiContext";


export default function Contact() {
    const { backendUrl } = useContext(ApiContext);
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const { data } = await axios.post(`${backendUrl}/api/contact`, formData);

    if (data.success) {
      alert(t("message_sent_success"));
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
    } else {
      alert("❌ Failed to send message");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server error, try again later");
  }

  setIsSubmitting(false);
};

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const contactInfo = [
    {
      icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      title: t("phone"),
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: t("business_hours")
    },
    {
      icon: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: t("email_address"),
      value: "hello@company.com",
      link: "mailto:hello@company.com",
      description: t("send_message")
    },
    {
      icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
      title: t("office"),
      value: "123 Business Ave, Suite 100, City, State 12345",
      link: "#",
      description: t("visit_office_desc")
    }
  ];

  const services = [
    t("digital_marketing"),
    t("web_development"), 
    t("business_strategy"),
    t("data_analytics"),
    t("performance_optimization"),
    t("support_24_7")
  ];

  const budgets = [
    t("under_5000"),
    t("5000_10000"),
    t("10000_25000"),
    t("25000_50000"),
    t("50000_plus")
  ];

  const timelines = [
    t("immediate_1_2_weeks"),
    t("quick_1_2_months"),
    t("standard_3_6_months"),
    t("extended_6_plus_months")
  ];

  // Animation variants for different sections
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-inter">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '10%',
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
            right: '10%',
            top: '20%',
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 pt-32 pb-20 text-center "
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl  md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
          {t("contact_title")}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">
          {t("contact_subtitle")}
        </p>
      </motion.div>

      

      {/* Contact Form Section */}
      <div className="relative py-16 pb-24 z-10">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <motion.div className="flex flex-col justify-center" variants={fadeInUp}>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">{t("lets_conversation")}</h3>
                <p className="text-slate-400 leading-relaxed text-lg">{t("conversation_desc")}</p>
              </div>

              <motion.div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="group flex items-start space-x-5 p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                      <p className="text-slate-300 transition-colors duration-300 font-medium block mb-1">
                        {info.value}
                      </p>
                      <p className="text-slate-500 text-sm">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* Additional Info Section */}
              <motion.div className="mt-12 p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm" variants={fadeInUp}>
                <h4 className="text-lg font-semibold text-white mb-3">{t("business_hours_title")}</h4>
                <div className="space-y-2 text-slate-400">
                  <div className="flex justify-between">
                    <span>{t("monday_friday")}</span>
                    <span className="font-medium">{t("hours_mon_fri")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("saturday")}</span>
                    <span className="font-medium">{t("hours_sat")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("sunday")}</span>
                    <span className="font-medium text-red-400">{t("hours_sun")}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="bg-slate-900/50 backdrop-blur-sm shadow-2xl shadow-green-500/5 rounded-2xl p-8 md:p-10 border border-slate-800" variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-8">
                {t("send_us_message")}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("full_name")} <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={t("enter_full_name")}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("email_address")} <span className="text-green-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={t("enter_email")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={t("enter_company")}
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("phone_number")}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder={t("enter_phone_number")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="service" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("service_interest")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">{t("select_service")}</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative">
                    <label htmlFor="budget" className="block text-sm font-medium text-slate-400 mb-2">
                      {t("budget_range")}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">{t("select_budget")}</option>
                      {budgets.map((budget, index) => (
                        <option key={index} value={budget}>{budget}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-400 mb-2">
                    {t("project_timeline")}
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">{t("select_timeline")}</option>
                    {timelines.map((timeline, index) => (
                      <option key={index} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">
                    {t("message")} <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder={t("tell_about_project")}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`relative overflow-hidden bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-md transition-all duration-300 w-full flex items-center justify-center ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t("sending")}
                    </>
                  ) : (
                    <>
                      {t("send_message")}
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Map Section Placeholder */}
      <div className="relative py-16 z-10">
        <motion.div
          className="max-w-6xl mx-auto px-6"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-green-500/5 p-8 h-96 flex items-center justify-center border border-slate-800">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-slate-400 font-medium">{t("interactive_map")}</p>
              <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                {t("open_maps")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}