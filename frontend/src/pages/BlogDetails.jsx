import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const base = import.meta.env.VITE_BACKEND_URL || window.location.origin;
        const res = await axios.get(`${base}/api/blogs/${id}`, { withCredentials: true });
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
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);
    // You could add a toast notification here
  };

  const shareOnSocialMedia = (platform) => {
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
    setShowShareOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-4 bg-gray-300 rounded-full w-32"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-300 rounded-full w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-full w-1/2"></div>
            </div>
            <div className="h-96 bg-gray-300 rounded-2xl"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded-full w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  // Safely handle categories
  const categories = Array.isArray(blog.category)
    ? blog.category
    : typeof blog.category === 'string' && blog.category
    ? [blog.category]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {blog.imageUrl ? (
            <img 
              src={blog.imageUrl} 
              alt={blog.title}
              className="w-full h-full object-cover opacity-30"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-900 to-teal-800"></div>
          )}
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-green-300 hover:text-white font-medium mb-8 transition-colors duration-200 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </button>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium">Administrator</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            {/* Category Tags */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 3).map((c, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full border border-green-400/30 backdrop-blur-sm"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Scrolling indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Content */}
          <article className="p-8 md:p-12">
            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-12 p-8 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border-l-4 border-green-500">
                <p className="text-xl text-gray-700 leading-relaxed font-light italic">
                  "{blog.excerpt}"
                </p>
              </div>
            )}

            {/* Main Content */}
            <div className="mb-12">
              <div 
                className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap"
                style={{
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
              >
                {blog.content}
              </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center mb-12">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"></div>
            </div>

            {/* Share Section */}
            <div className="relative">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share this article
                </h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => shareOnSocialMedia("twitter")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2] text-white rounded-full hover:shadow-lg transition-all duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                    Twitter
                  </button>
                  
                  <button 
                    onClick={() => shareOnSocialMedia("facebook")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#1877F2] text-white rounded-full hover:shadow-lg transition-all duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>

                  <button 
                    onClick={() => shareOnSocialMedia("linkedin")}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#0A66C2] text-white rounded-full hover:shadow-lg transition-all duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </button>

                  <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-full hover:shadow-lg transition-all duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Navigation Footer */}
          <div className="px-8 md:px-12 pb-12">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Explore More Articles</h3>
              <p className="text-gray-600 mb-6">Discover more insightful articles and stay updated with the latest trends.</p>
              <Link 
                to="/blogs" 
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-medium rounded-full hover:shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View All Articles
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}