import { useState, useEffect, useRef } from "react";
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

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ModernAbout() {
  // Refs for scroll animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const visionRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation controls
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  
  const heroControls = useAnimation();
  const statsControls = useAnimation();
  const featuresControls = useAnimation();
  const visionControls = useAnimation();
  const ctaControls = useAnimation();

  useEffect(() => {
    if (heroInView) heroControls.start("visible");
    if (statsInView) statsControls.start("visible");
    if (featuresInView) featuresControls.start("visible");
    if (visionInView) visionControls.start("visible");
    if (ctaInView) ctaControls.start("visible");
  }, [heroInView, statsInView, featuresInView, visionInView, ctaInView]);

  // Stats data
  const stats = [
    { number: "299+", label: "Satisfied Clients", icon: "👥" },
    { number: "15", label: "Countries We Operate", icon: "🌍" },
    { number: "311+", label: "Companies Established", icon: "🏢" },
    { number: "10+", label: "Years of Experience", icon: "⭐" }
  ];

  // Features data
  const features = [
    {
      title: "Deep Legal Expertise",
      description: "Deep expertise in local and international laws",
      icon: "⚖️",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Expert Team",
      description: "Specialized team of experts and consultants",
      icon: "🎯",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Comprehensive Services",
      description: "Comprehensive services from establishment to growth",
      icon: "🚀",
      gradient: "from-teal-500 to-teal-600"
    },
    {
      title: "Global Partnerships",
      description: "Strategic partnerships in 15 countries",
      icon: "🤝",
      gradient: "from-lime-500 to-lime-600"
    },
    {
      title: "Continuous Support",
      description: "Continuous support and excellent customer service",
      icon: "💬",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Custom Solutions",
      description: "Customized solutions for each client",
      icon: "⚙️",
      gradient: "from-jade-500 to-jade-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
        className="relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text Content */}
              <motion.div variants={slideInLeft} className="space-y-8">
                <motion.div
                  variants={scaleIn}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-sm font-semibold text-green-800"
                >
                  🏆 Leading Business Establishment Company
                </motion.div>
                
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black">
                  <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    About
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-800 bg-clip-text text-transparent">
                    Our Story
                  </span>
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
                  We are a specialized company in business establishment in the Kingdom of Saudi Arabia, with extensive experience extending to 15 countries worldwide.
                </motion.p>
                
                <motion.p variants={fadeInUp} className="text-lg text-slate-600 leading-relaxed">
                  We help citizens, Gulf residents, and foreign investors achieve their business dreams through our integrated and specialized services.
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                  <a href="/services" className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    Explore Services
                  </a>
                  <a href="/countries" className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-2xl font-bold text-lg border border-slate-200 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    See Our Reach
                  </a>
                </motion.div>
              </motion.div>

              {/* Hero Image */}
              <motion.div variants={slideInRight} className="relative">
                <div className="relative">
                  {/* Main Image */}
                  <motion.div
                    variants={scaleIn}
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Modern Business Office"
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent"></div>
                  </motion.div>

                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                        🌍
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-slate-900">15</div>
                        <div className="text-sm text-slate-600">Countries</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                        ⭐
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-slate-900">10+</div>
                        <div className="text-sm text-slate-600">Years Exp</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-r from-green-900 via-emerald-900 to-green-900 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Over a decade of excellence in business establishment and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-emerald-200 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={staggerContainer}
        className="py-24 relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-sm font-semibold text-green-800 mb-6"
            >
              ✨ Why Choose Us
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Our Competitive Advantages
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover what makes us the preferred partner for business establishment and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
               
              </motion.div>
            ))}
          </div>
          
          {/* Get Started Link Below Features */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <a
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              View All Services
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        ref={visionRef}
        initial="hidden"
        animate={visionControls}
        variants={staggerContainer}
        className="py-24 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} className="space-y-8">
              <motion.div
                variants={scaleIn}
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold text-white"
              >
                🎯 Our Vision
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-white">
                Shaping the Future of Business
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl text-emerald-100 leading-relaxed">
                To be the first and most trusted partner in establishing and growing businesses, providing innovative and integrated solutions that meet our clients' needs worldwide.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-4">
                <a href="/contact" className="inline-block px-8 py-4 bg-white text-green-600 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-emerald-50 transition-all duration-300">
                  Start Your Journey
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className="relative">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Business Vision"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent"></div>
                
                {/* Floating Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-lg">Global Reach</div>
                      <div className="text-slate-600 text-sm">Serving clients worldwide</div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                      🌐
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        ref={ctaRef}
        initial="hidden"
        animate={ctaControls}
        variants={fadeInUp}
        className="py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-sm font-semibold text-green-800 mb-8"
          >
            🚀 Ready to Get Started?
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Let's Build Your Business Together
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Join hundreds of successful businesses that have trusted us to establish and grow their companies across 15 countries.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="inline-block px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              Start Your Business
            </a>
            <a href="/contact" className="inline-block px-10 py-5 bg-white text-slate-700 rounded-2xl text-xl font-bold border-2 border-slate-200 hover:border-green-300 hover:bg-emerald-50 hover:-translate-y-2 transition-all duration-500">
              Schedule Consultation
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}