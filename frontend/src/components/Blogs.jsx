import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useInView, useAnimation } from "framer-motion";
import axios from "axios";

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

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const blogsRef = useRef(null);
  const isInView = useInView(blogsRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`);
        if (res.data.success) {
          const fetched = res.data.blogs
            .filter((b) => b.isPublished)
            .slice(0, 4)
            .map((b) => ({
              id: b._id,
              title: i18n.language === "ar" && b.titleAr ? b.titleAr : b.title,
              excerpt: i18n.language === "ar" && b.excerptAr ? b.excerptAr : b.excerpt,
              category: Array.isArray(b.category) ? b.category[0] : b.category,
              date: new Date(b.publishedAt || b.createdAt).toLocaleDateString(),
              author: b.author || t("adminitraion"),
              imageUrl: b.imageUrl || "https://via.placeholder.com/600x400?text=Blog+Cover",
            }));
          setBlogs(fetched);
        }
      } catch (e) {
        console.error("Failed to load blogs", e);
      }
    };
    load();
  }, []);

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
        </div>
      </div>

      <motion.section
        ref={blogsRef}
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="relative z-10 py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">
               {t("blogs_section_tagline")}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent mb-6">
              {t("blogs_title")}
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              {t("blogs_subtitle")}
            </p>
          </motion.div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.a
                key={blog.id}
                href={`/blogs/${blog.id}`}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                <div className="relative h-full p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden group-hover:border-green-500/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                  
                  {/* Cover Image */}
                  <div className="w-full h-56 rounded-xl overflow-hidden mb-6 shadow-xl">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-3">
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-500/20">
                        {blog.category}
                      </span>
                      <span>{blog.date}</span>
                    </div>

                    <h3 className="text-xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-colors line-clamp-2 mb-3">
                      {blog.title}
                    </h3>
                    <p className="text-slate-400 text-base line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>

                    {/* Author */}
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 text-green-400 flex items-center justify-center font-bold text-sm">
                          {blog.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-sm text-slate-400 font-medium">
                          {blog.author}
                        </span>
                      </div>
                      <svg
                        className="w-6 h-6 text-green-400 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <a
              href="/blogs"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">
                {t("view_all_blogs")}
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