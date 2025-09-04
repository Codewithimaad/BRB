import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <section className="relative py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-transform duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {t("contact_title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </div>

        {/* Contact Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-transform duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="relative group bg-white p-8 rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.03] cursor-pointer overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl -z-10"></div>

              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors duration-300 mb-2">
                {info.title}
              </h3>

              {/* Value */}
              <a 
                href={info.link}
                className="block text-gray-600 group-hover:text-gray-900 font-medium mb-3 transition-colors duration-300"
              >
                {info.value}
              </a>

              {/* Description */}
              <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                {info.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <div className={`text-center transition-transform duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <a
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-green-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:bg-green-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {t("contact_us")}
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
