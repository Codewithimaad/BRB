import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(t("all"));
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([t("all")]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${base}/api/blogs`);
        if (res.data.success) {
          const fetched = res.data.blogs.map(b => {
            const raw = b.category;
            const categoriesArray = Array.isArray(raw)
              ? raw.filter(Boolean)
              : typeof raw === 'string' && raw.length > 0
                ? [raw]
                : [];
            return {
              id: b._id,
              title: b.title,
              titleAr: b.titleAr,
              excerpt: b.excerpt || (b.content || '').slice(0, 140),
              excerptAr: b.excerptAr,
              author: 'Administrator',
              date: new Date(b.publishedAt || b.createdAt).toLocaleDateString(),
              readTime: '',
              category: categoriesArray[0] || t("all"),
              categories: categoriesArray,
              imageUrl: b.imageUrl,
              content: b.content,
              contentAr: b.contentAr,
              isPublished: b.isPublished,
            };
          });
          setBlogs(fetched);
          const catSet = new Set([t("all")]);
          fetched.forEach(b => (b.categories || []).forEach(c => catSet.add(c)));
          setCategories(Array.from(catSet));
        }
      } catch (e) {
        console.error('Failed to load blogs', e);
      } finally {
        setLoading(false);
        // Add a small delay to allow the loading state to be visible
        // before the content transitions in.
        setTimeout(() => setIsLoaded(true), 100);
      }
    };
    loadBlogs();
  }, []);

  const filteredBlogs = activeCategory === t("all") 
    ? blogs 
    : blogs.filter(blog => (blog.categories || []).includes(activeCategory));

  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at-center,black_50%,transparent_100%)]"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-green-400/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {loading ? (
        <div className="min-h-screen relative z-10 flex items-center justify-center p-4">
          <div className="relative text-center p-8 w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-xl max-w-sm">
            <svg className="animate-spin h-10 w-10 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-white text-lg font-medium">Loading content...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className={`relative z-10 pt-24 pb-16 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-8 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-300">{t("latest_insights")}</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black mb-6 bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent leading-tight">
              Our <span className="bg-gradient-to-br from-green-400 to-green-500 bg-clip-text text-transparent">Insights</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 max-w-2xl px-6 md:px-0 mx-auto mb-8 leading-relaxed">
              {t("blogs_subtitle")}
            </p>
            
            <div className="flex justify-center">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            </div>
          </div>

          {/* Category Filter */}
          <div className={`relative py-8 z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(category)}
                    className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm ${
                      activeCategory === category
                        ? 'bg-green-500/20 text-green-300 border border-green-500/40 shadow-lg shadow-green-500/10' 
                        : 'text-slate-400 hover:text-green-300 bg-slate-800/30 hover:bg-green-500/10 border border-slate-700/50 hover:border-green-500/30'
                    }`}
                  >
                    {activeCategory === category && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-400/10 rounded-xl blur-sm"></div>
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="relative py-12 pb-20 z-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                {filteredBlogs.map((blog, index) => (
                  <Link to={`/blogs/${blog.id}`} 
                    key={blog.id}
                    className={`group block transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    {/* Card Background Glow */}
                    <div className="absolute -inset-px bg-gradient-to-br from-green-500/20 via-transparent to-green-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>
                    
                    {/* Main Card */}
                    <div className="relative h-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl overflow-hidden group-hover:border-green-500/30 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-green-500/5 group-hover:-translate-y-2">
                      
                      {/* Top Border Gradient */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                      
                      {/* Image Header */}
                      <div className="relative w-full h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-green-500/5 group-hover:from-green-400/10 group-hover:to-green-500/10 transition-all duration-700"></div>
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm text-green-300 text-xs rounded-lg font-medium border border-green-500/20">
                            {blog.category}
                          </span>
                        </div>
                        
                        {/* Corner Accents */}
                        <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-green-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">Published: {blog.date}</span>
                          <span className="text-slate-600">By Administrator</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent group-hover:from-green-100 group-hover:to-green-300 transition-all duration-700 leading-tight line-clamp-2">
                          {isArabic && blog.titleAr ? blog.titleAr : blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                          {isArabic && blog.excerptAr ? blog.excerptAr : blog.excerpt}
                        </p>

                        {/* Author Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold border border-green-500/20">
                              {blog.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-slate-300 text-xs font-medium">{blog.author}</div>
                            </div>
                          </div>
                          
                          {/* Read More */}
                          <div className="text-green-400 text-xs font-medium flex items-center group-hover:text-green-300 transition-colors">
                            {t("read_more")}
                            <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="pt-4 border-t border-slate-800/50">
                          <div className="flex flex-wrap gap-2">
                            {(blog.categories || [blog.category]).slice(0, 2).map((cat, idx) => (
                              <span key={idx} className="px-2 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-lg font-medium border border-slate-700/30">
                                #{cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom Shine Effect */}
                      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100 shadow-lg shadow-green-500/50">
                      <div className="absolute inset-0.5 bg-slate-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={`relative py-16 z-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '800ms' }}>
            <div className="max-w-3xl mx-auto px-6 text-center">
              {/* Newsletter Card */}
              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-12 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute -inset-px bg-gradient-to-br from-green-500/10 via-transparent to-green-400/10 rounded-3xl blur-sm"></div>
                
                {/* Top Border */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-6 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-300">{t("newsletter")}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-br from-white via-green-100 to-green-400 bg-clip-text text-transparent">
                    {t("stay_updated_with_our")} <span className="bg-gradient-to-br from-green-400 to-green-500 bg-clip-text text-transparent">{t("insights")}</span>
                  </h2>
                  
                  <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                    {t("newsletter_desc")}
                  </p>
                  
                  {/* Email Form */}
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="flex-1 relative">
                      <input
                        type="email"
                        placeholder={t("enter_email_newsletter")}
                        className="w-full px-4 py-4 bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 text-sm rounded-xl border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-green-500/5 rounded-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                      <button className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105">
                        {t("subscribe")}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Border */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
