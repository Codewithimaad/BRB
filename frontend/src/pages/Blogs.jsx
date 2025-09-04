import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(t("all"));
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([t("all")]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL;
        console.log(base)
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
      }
    };
    loadBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredBlogs = activeCategory === t("all") 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  const isArabic = i18n.language === 'ar';

  return (
    <div className="min-h-screen relative overflow-hidden">
    

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`transition-all duration-700 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-8 border border-emerald-100">
              {t("latest_insights")}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t("our")} <span className="text-emerald-700">{t("insights")}</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t("blogs_subtitle")}
            </p>
            
            <div className="flex justify-center mt-10">
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="relative py-8 z-10 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className={`flex flex-wrap justify-center gap-2 transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-green-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-green-700 bg-white hover:bg-green-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="relative py-12 pb-20 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            {filteredBlogs.map((blog, index) => (
              <Link to={`/blogs/${blog.id}`} 
                key={index}
                className="group overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 block"
              >
                {/* Image header */}
                <div className="w-full h-48 overflow-hidden relative">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white text-emerald-700 text-xs rounded-md font-medium shadow-sm">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-xs font-medium">Published: {blog.date}</span>
                    <span className="text-gray-400 text-xs">By Administrator</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    {isArabic && blog.titleAr ? blog.titleAr : blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">
                    {isArabic && blog.excerptAr ? blog.excerptAr : blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-medium">
                        {blog.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-gray-700 text-xs font-medium">{blog.author}</div>
                      </div>
                    </div>
                    
                    <div className="text-emerald-600 text-xs font-medium flex items-center group-hover:text-emerald-700 transition-colors">
                      {t("read_more")}
                      <svg className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {(blog.categories || [blog.category]).slice(0, 2).map((cat, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md font-medium">
                          #{cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-16 bg-gray-50 border-t border-gray-200 z-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="inline-flex items-center justify-center px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-6 border border-emerald-100">
              {t("newsletter")}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {t("stay_updated_with_our")} <span className="text-emerald-700">{t("insights")}</span>
            </h2>
            
            <p className="text-gray-600 text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              {t("newsletter_desc")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("enter_email_newsletter")}
                className="flex-1 px-4 py-3 bg-white text-gray-700 placeholder-gray-500 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-300 shadow-sm">
                {t("subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

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