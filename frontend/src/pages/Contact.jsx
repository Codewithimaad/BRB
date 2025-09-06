import { useTranslation } from "react-i18next";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t("name_required");
    if (!formData.email.trim()) {
      newErrors.email = t("email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("email_invalid");
    }
    if (!formData.message.trim()) newErrors.message = t("message_required");

    if (formData.company.trim() && (formData.company.length < 2 || formData.company.length > 100)) {
      newErrors.company = t("company_invalid");
    }

    const phoneRegex = /^\+?(\d[\d\s-()]{7,20})\d$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = t("phone_invalid");
    }

    if (formData.service && formData.service === t("select_service")) {
      newErrors.service = t("service_required");
    }
    if (formData.budget && formData.budget === t("select_budget")) {
      newErrors.budget = t("budget_required");
    }
    if (formData.timeline && formData.timeline === t("select_timeline")) {
      newErrors.timeline = t("timeline_required");
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Professional WhatsApp message
    const phone = '+966573672733';
    const text = `New Contact Inquiry:
- Name: ${formData.name}
- Email: ${formData.email}
- Company: ${formData.company || 'N/A'}
- Phone: ${formData.phone || 'N/A'}
- Service Interest: ${formData.service || 'N/A'}
- Budget Range: ${formData.budget || 'N/A'}
- Project Timeline: ${formData.timeline || 'N/A'}
- Message: ${formData.message}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');

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
    setSuccessMessage("Your message is ready to send via WhatsApp.");
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
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

  const fadeInUp = { initial: { y: 60, opacity: 0 }, animate: { y: 0, opacity: 1, transition: { duration: 0.6 } } };
  const staggerContainer = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { staggerChildren: 0.3 } } };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-inter">
      {/* Background */}
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

      {/* Header */}
      <motion.div
        className="relative z-10 pt-32 pb-20 text-center"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
          {t("contact_title")}
        </h1>
        <p className="text-base px-6 md:px-2 md:text-2xl text-slate-400 max-w-4xl mx-auto mb-8 leading-relaxed">
          {t("contact_subtitle")}
        </p>
      </motion.div>

      {/* Contact Section */}
      <div className="relative py-16 pb-24 z-10">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div className="flex flex-col justify-center" variants={fadeInUp}>
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">{t("lets_conversation")}</h3>
                <p className="text-slate-400 leading-relaxed text-base md:text-lg">{t("conversation_desc")}</p>
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
                      <p className="text-slate-300 transition-colors duration-300 font-medium block mb-1">{info.value}</p>
                      <p className="text-slate-500 text-sm">{info.description}</p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="md:bg-slate-900/50 md:backdrop-blur-sm md:shadow-2xl md:shadow-green-500/5 rounded-2xl p-4 md:p-10 md:border md:border-slate-800" variants={fadeInUp}>
              <h2 className="text-2xl font-bold text-white mb-8">{t("send_us_message")}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {successMessage && (
                  <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    {successMessage}
                  </div>
                )}
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">{t("full_name")} <span className="text-green-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                      placeholder="Enter full name"
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">{t("email_address")} <span className="text-green-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* Company & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="company" className="block text-sm font-medium text-slate-400 mb-2">{t("company")}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                      placeholder="Enter company name"
                    />
                    {errors.company && <p className="mt-2 text-sm text-red-500">{errors.company}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-400 mb-2">{t("phone_number")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <p className="mt-2 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* Service & Budget */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="service" className="block text-sm font-medium text-slate-400 mb-2">Service Interest</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                    >
                      <option value="">{t("select_service")}</option>
                      {services.map((service, index) => <option key={index} value={service}>{service}</option>)}
                    </select>
                    {errors.service && <p className="mt-2 text-sm text-red-500">{errors.service}</p>}
                  </div>
                  <div className="relative">
                    <label htmlFor="budget" className="block text-sm font-medium text-slate-400 mb-2">Budget Range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                    >
                      <option value="">{t("select_budget")}</option>
                      {budgets.map((budget, index) => <option key={index} value={budget}>{budget}</option>)}
                    </select>
                    {errors.budget && <p className="mt-2 text-sm text-red-500">{errors.budget}</p>}
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                  <label htmlFor="timeline" className="block text-sm font-medium text-slate-400 mb-2">Project Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.timeline ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                  >
                    <option value="">{t("select_timeline")}</option>
                    {timelines.map((timeline, index) => <option key={index} value={timeline}>{timeline}</option>)}
                  </select>
                  {errors.timeline && <p className="mt-2 text-sm text-red-500">{errors.timeline}</p>}
                </div>

                {/* Message */}
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">{t("your_message")} <span className="text-green-500">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700'}`}
                    placeholder="Type your message here"
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {t("send_message")}
                </button>
              </form>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
