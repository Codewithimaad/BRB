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
    <div className="relative py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("contact_title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </div>

        {/* Three Contact Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer bg-white"
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
              
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-800 transition-colors duration-300 mb-2">
                {info.title}
              </h3>
              
              {/* Value */}
              <a 
                href={info.link}
                className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 block mb-3 font-medium"
              >
                {info.value}
              </a>
              
              {/* Description */}
              <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                {info.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Us Button */}
        <div className={`text-center transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-300 font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            {t("contact_us")}
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}