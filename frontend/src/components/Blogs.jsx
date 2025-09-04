import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Blogs() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${base}/api/blogs`);
        if (res.data.success) {
          const fetched = res.data.blogs
            .filter(b => b.isPublished)
            .slice(0, 4)
            .map(b => ({
              id: b._id,
              title: b.title,
              titleAr: b.titleAr,
              excerpt: b.excerpt,
              excerptAr: b.excerptAr,
              category: Array.isArray(b.category) ? b.category[0] : b.category,
              date: new Date(b.publishedAt || b.createdAt).toLocaleDateString(),
              image: '📝',
              color: 'from-green-800 to-green-400',
              shadowColor: 'shadow-emerald-500/20',
              author: 'Administrator'
            }));
          setBlogs(fetched);
        }
      } catch (e) {
        console.error('Failed to load blogs', e);
      }
    };
    load();
  }, []);

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Ultra Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with glow */}
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Advanced geometric patterns */}
        <div className="absolute inset-0 opacity-[0.02]">
          <svg className="absolute inset-0 h-full w-full" fill="currentColor" viewBox="0 0 100 100">
            <defs>
              <pattern id="ultraModernGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="1.5" fill="currentColor" opacity="0.8" />
                <circle cx="0" cy="0" r="0.8" fill="currentColor" opacity="0.4" />
                <circle cx="25" cy="25" r="0.8" fill="currentColor" opacity="0.4" />
                <circle cx="12.5" cy="0" r="0.6" fill="currentColor" opacity="0.3" />
                <circle cx="0" cy="12.5" r="0.6" fill="currentColor" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ultraModernGrid)" />
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-30"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-25" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 right-10 w-1 h-1 bg-orange-400 rounded-full animate-pulse opacity-35" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Premium Section Header */}
        <div className={`text-center mb-24 transition-all duration-1000 ease-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[1.5rem] bg-gradient-to-br from-white/80 to-slate-50/80 backdrop-blur-xl border border-slate-200/50 shadow-2xl shadow-slate-200/50 mb-10 hover:scale-110 hover:rotate-3 transition-all duration-700 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/30 transition-all duration-500">
              <span className="text-2xl text-white">📝</span>
            </div>
          </div>
          
          <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            {t("blogs_title")}
          </h2>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-10 font-medium">
            {t("blogs_subtitle")}
          </p>
          <div className="relative mx-auto w-40">
            <div className="h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full shadow-lg shadow-blue-300/50"></div>
            <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur-sm opacity-60"></div>
            <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur-lg opacity-30"></div>
          </div>
        </div>

        {/* Ultra Premium Blogs Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24 transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`} style={{ transitionDelay: '300ms' }}>
          {blogs.map((blog, index) => (
            <div 
              key={index}
              className={`group relative bg-white/90 backdrop-blur-2xl border border-slate-200/50 hover:border-slate-300/50 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:${blog.shadowColor} p-10 rounded-[2rem] transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] cursor-pointer overflow-hidden`}
              style={{ transitionDelay: `${500 + index * 150}ms` }}
            >
              {/* Advanced background effects */}
              <div className={`absolute inset-0 bg-gradient-to-br ${blog.color}/5 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-[2rem]`}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-slate-50/30 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-[2rem]"></div>
              
              {/* Floating micro-elements */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className={`absolute top-6 right-6 w-2 h-2 bg-gradient-to-r ${blog.color} rounded-full animate-ping`}></div>
                <div className={`absolute bottom-8 left-8 w-1 h-1 bg-gradient-to-r ${blog.color} rounded-full animate-pulse`}></div>
                <div className={`absolute top-12 left-12 w-1.5 h-1.5 bg-gradient-to-r ${blog.color} rounded-full animate-ping opacity-60`} style={{animationDelay: '0.5s'}}></div>
              </div>
              
              <div className="relative z-10">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`px-4 py-2 bg-gradient-to-r ${blog.color}/20 text-slate-700 text-sm rounded-full border border-slate-200/50 backdrop-blur-sm font-medium`}>
                    {blog.category}
                  </span>
                  <span className="text-slate-400 text-sm">{blog.readTime}</span>
                </div>

                {/* Blog emoji/image */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  {blog.image}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-6 text-slate-800 group-hover:text-slate-900 transition-colors duration-300 leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed text-lg mb-8 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${blog.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                      {blog.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-slate-800 font-semibold text-sm">{blog.author}</div>
                      <div className="text-slate-400 text-xs">{blog.date}</div>
                    </div>
                  </div>
                  
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Ultra premium border effects */}
              <div className={`absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r ${blog.color} rounded-b-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-x-0 group-hover:scale-x-100 shadow-lg group-hover:${blog.shadowColor}`}></div>
              
              {/* Subtle glow ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-transparent group-hover:ring-slate-200/50 transition-all duration-700"></div>
              <div className={`absolute inset-0 rounded-[2rem] ring-1 ring-transparent group-hover:ring-offset-2 group-hover:ring-offset-white group-hover:${blog.shadowColor.replace('shadow-', 'ring-')} opacity-0 group-hover:opacity-30 transition-all duration-700`}></div>
            </div>
          ))}
        </div>

        {/* Premium CTA Button */}
        <div className="text-center">
          <a
            href="/blogs"
            className="group relative inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white px-12 py-6 rounded-[1.25rem] font-bold text-xl shadow-2xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-purple-700/40 transition-all duration-700 hover:-translate-y-3 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {t("view_all_blogs")}
              <svg className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            
            {/* Ultra premium shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
            
            {/* Multi-layer glow */}
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-50 transition-opacity duration-300 blur-2xl"></div>
          </a>
        </div>
      </div>
    </div>
  );
}