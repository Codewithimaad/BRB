import { useTranslation } from "react-i18next";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import heroImage from "../assets/hero.jpg";

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

export default function Hero() {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div className="relative min-h-[100vh] overflow-hidden font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Subtle gradient overlay to match the 'about' page's dark theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
            {/* The same grid pattern and blur effects for visual consistency */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="relative z-10 flex flex-col justify-center h-full min-h-[100vh] px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="max-w-3xl space-y-8">
          {/* Added a subtle animated badge at the top */}
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-300">
              🏆 {t("hero_tagline")}
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp} 
            className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p 
            variants={fadeInUp} 
            className="text-xl md:text-2xl text-slate-400 leading-relaxed font-medium"
          >
            {t("hero_subtitle")}
          </motion.p>

          {/* Buttons with the same hover and gradient effects */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
            <a
              href="/contact"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {t("get_consultation")}
            </a>
            <a
              href="/services"
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-slate-700/50 hover:bg-slate-700/50 hover:border-green-500/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {t("explore")}
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}