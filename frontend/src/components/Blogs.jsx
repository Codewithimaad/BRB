import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Blogs() {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);

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
              author: "Administrator",
              imageUrl: b.imageUrl || "https://via.placeholder.com/600x400?text=Blog+Cover",
            }));
          setBlogs(fetched);
        }
      } catch (e) {
        console.error("Failed to load blogs", e);
      }
    };
    load();
  }, [i18n.language]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-green-800">
            {t("blogs_title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            {t("blogs_subtitle")}
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <a
              key={blog.id}
              href={`/blogs/${blog.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 flex flex-col hover:-translate-y-1"
            >
              {/* Cover Image */}
              <div className="w-full h-56 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>

                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2 mb-3">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-base line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                {/* Author */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                      {blog.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-sm text-slate-700 font-medium">
                      {blog.author}
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-green-600 transition-colors"
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
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/blogs"
            className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-colors"
          >
            {t("view_all_blogs")}
            <svg
              className="ml-3 w-5 h-5"
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
          </a>
        </div>
      </div>
    </section>
  );
}
