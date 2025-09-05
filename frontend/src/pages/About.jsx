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
  }, [heroInView, statsInView, featuresInView, visionInView, ctaInView, heroControls, statsControls, featuresControls, visionControls, ctaControls]);

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
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-green-400/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
        className="relative z-10 pt-32 pb-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div variants={slideInLeft} className="space-y-8">
              <motion.div
                variants={scaleIn}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-300">
                  🏆 Leading Business Establishment Company
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                  About
                </span>
                <br />
                <span className="bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                  Our Story
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium">
                We are a specialized company in business establishment in the Kingdom of Saudi Arabia, with extensive experience extending to 15 countries worldwide.
              </motion.p>
              
              <motion.p variants={fadeInUp} className="text-lg text-slate-400 leading-relaxed">
                We help citizens, Gulf residents, and foreign investors achieve their business dreams through our integrated and specialized services.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <a href="/services" className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  Explore Services
                </a>
                <a href="/countries" className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-green-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  See Our Reach
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div variants={slideInRight} className="relative">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Modern Business Office"
                    className="w-full h-96 md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                        🌍
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-white">15</div>
                        <div className="text-sm text-green-300">Countries</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute -top-6 -right-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-700/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl">
                        ⭐
                      </div>
                      <div>
                        <div className="font-bold text-2xl text-white">10+</div>
                        <div className="text-sm text-emerald-300">Years Exp</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={staggerContainer}
        className="py-20 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
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
                  className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-800/50 hover:border-green-500/30 transition-all duration-500"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 font-medium">
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
        className="py-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
                ✨ Why Choose Us
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              Our Competitive Advantages
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Discover what makes us the preferred partner for business establishment and growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <div className="relative h-full p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden group-hover:border-green-500/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                  <div className="flex flex-col items-start space-y-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.gradient} text-white text-3xl transition-transform duration-300 group-hover:scale-105`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-colors duration-700">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed">{feature.description}</p>
                    <div className="flex justify-start">
                      <div className="w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-500 group-hover:w-16 transition-all duration-700 ease-out"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <a
              href="/services"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <span className="relative z-10">View All Services</span>
              <div className="relative w-5 h-5 overflow-hidden ml-2">
                <svg className="absolute w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-8 group-hover:opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <svg className="absolute w-5 h-5 transform -translate-x-8 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
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
        className="py-24 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={slideInLeft} className="space-y-8">
              <motion.div
                variants={scaleIn}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-emerald-300">
                  🎯 Our Vision
                </span>
              </motion.div>
              
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">
                Shaping the Future of Business
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-xl text-slate-400 leading-relaxed">
                To be the first and most trusted partner in establishing and growing businesses, providing innovative and integrated solutions that meet our clients' needs worldwide.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="pt-4">
                <a href="/contact" className="inline-block px-10 py-5 bg-green-500/20 border border-green-500/30 text-green-300 rounded-2xl font-bold text-lg hover:bg-green-500/30 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 hover:-translate-y-1 transition-all duration-300">
                  Start Your Journey
                </a>
              </motion.div>
            </motion.div>

            <motion.div variants={slideInRight} className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-500/10">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Business Vision"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                
                {/* Floating Element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute bottom-6 left-6 right-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-lg">Global Reach</div>
                      <div className="text-green-300 text-sm">Serving clients worldwide</div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-800 rounded-xl flex items-center justify-center text-white text-xl">
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
        className="py-24 relative z-10"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-300">
              🚀 Ready to Get Started?
            </span>
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
            Let's Build Your Business Together
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Join hundreds of successful businesses that have trusted us to establish and grow their companies across 15 countries.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/services" className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
  <span className="relative z-10">Start Your Business</span>
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
            <a href="/contact" className="inline-block px-10 py-5 bg-slate-800/50 backdrop-blur-sm text-white rounded-2xl text-xl font-bold border border-slate-700/50 hover:border-green-500/30 hover:bg-slate-700/50 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-2 transition-all duration-500">
              Schedule Consultation
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}