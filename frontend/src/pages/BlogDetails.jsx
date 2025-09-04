import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const base = import.meta.env.VITE_BACKEND_URL || window.location.origin;
        const res = await axios.get(`${base}/api/blogs/${id}`);
        if (res.data.success) {
          setBlog(res.data.blog);
        } else {
          setError("Failed to fetch blog");
        }
      } catch (e) {
        console.error('Error fetching blog:', e);
        setError(e.response?.data?.message || "Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const copyToClipboard = () => {
    document.execCommand('copy');
    // You could add a toast notification here
  };

  const shareOnSocialMedia = (platform) => {
    if (!blog) return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog.title);
    
    let shareUrl = "";
    switch(platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="animate-pulse space-y-8 max-w-4xl w-full">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-64"></div>
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg w-full"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2"></div>
          </div>
          <div className="h-[500px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-full"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-4/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center p-8 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const categories = Array.isArray(blog.category)
    ? blog.category
    : typeof blog.category === 'string' && blog.category
    ? [blog.category]
    : [];

  const mainTitle = blog.title;
  const mainContent = blog.content;
  const excerpt = blog.excerpt;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-200 font-sans antialiased">
      {/* Full-width Hero Image Section */}
      {blog.imageUrl && (
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img 
            src={blog.imageUrl} 
            alt={mainTitle}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          {/* Subtle overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      {/* Main Content Section */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium mb-6 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blogs
        </button>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">
          {mainTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="font-semibold">Administrator</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {new Date(blog.publishedAt || blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 3).map((c, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {excerpt && (
          <blockquote className="mb-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-xl border-l-4 border-indigo-500">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light italic">
              "{excerpt}"
            </p>
          </blockquote>
        )}

        <div className="prose prose-xl max-w-none text-gray-800 dark:text-gray-200 leading-relaxed space-y-8">
          <div dangerouslySetInnerHTML={{ __html: mainContent }} />
        </div>

        <div className="flex justify-center my-12">
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share this article
          </h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => shareOnSocialMedia("twitter")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              Twitter
            </button>
            <button 
              onClick={() => shareOnSocialMedia("facebook")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
            <button 
              onClick={() => shareOnSocialMedia("linkedin")}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-full transition-all duration-200 text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
