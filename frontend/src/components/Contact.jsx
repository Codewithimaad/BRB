import { useState, useEffect, useRef } from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";


export default function Contact() {
  // Removed unsupported dependencies: react-i18next and framer-motion.
  // The translations are now hardcoded in English, and animations are handled with CSS.
  
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  // Replaces useInView and useAnimation from framer-motion.
  // We use a simple useEffect to trigger the visibility state when the component mounts.
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Simulate form submission. In a real app, you would send this to a backend.
    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    // Hide the success message after a few seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: <MdEmail />,
      title: "Email Address",
      value: "hello@company.com",
      link: "mailto:hello@company.com",
      description: "Send us a message directly to our inbox."
    },
    {
      icon: <MdPhone />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      description: "Reach our support team during business hours."
    },
    {
      icon: <MdLocationOn />,
      title: "Office",
      value: "123 Business Ave, Suite 100",
      link: "#",
      description: "Visit our office for a personalized meeting."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white font-sans min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
      </div>

      <section className="relative z-10 py-24 px-6 transition-all duration-1000" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 transition-all duration-700" style={{ transitionDelay: '200ms', opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm transition-all duration-500" style={{ transitionDelay: '400ms', opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.8)' }}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
                💬 Get in Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              We're here to help! Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="relative group h-full transition-all duration-700" style={{ transitionDelay: `${400 + index * 100}ms`, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(60px)' }}>
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <a
                  href={info.link}
                  className="relative h-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden flex flex-col items-center text-center transition-all duration-700 group-hover:border-green-500/30 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2"
                >
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="p-4 rounded-xl text-white text-3xl mb-4 transition-transform duration-300 group-hover:scale-110">
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
              </div>
            ))}
          </div>

         
          {/* Custom Success Message Box */}
          {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="relative p-8 bg-slate-900 border border-green-500/50 rounded-2xl shadow-lg w-full max-w-sm text-center transform scale-95 animate-fade-in transition-all duration-300">
                <h4 className="text-xl font-bold text-green-400 mb-2">Success!</h4>
                <p className="text-sm text-slate-300">Your message has been sent successfully. We will be in touch shortly.</p>
                <button onClick={() => setShowSuccess(false)} className="mt-4 px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
