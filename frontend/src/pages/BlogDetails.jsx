import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
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
        setTimeout(() => setIsLoaded(true), 100);
      }
    };
    loadBlog();
  }, [id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // Add a toast notification here
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
      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at-center,black_50%,transparent_100%)]"></div>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-4xl p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl shadow-xl">
          <div className="animate-pulse space-y-8 max-w-4xl w-full">
            <div className="h-6 bg-slate-800 rounded-full w-64 mx-auto"></div>
            <div className="space-y-4">
              <div className="h-16 bg-slate-800 rounded-lg w-full"></div>
              <div className="h-8 bg-slate-800 rounded-lg w-1/2 mx-auto"></div>
            </div>
            <div className="h-[50vh] bg-slate-800 rounded-xl"></div>
            <div className="space-y-3">
              <div className="h-5 bg-slate-800 rounded-full w-full"></div>
              <div className="h-5 bg-slate-800 rounded-full w-5/6"></div>
              <div className="h-5 bg-slate-800 rounded-full w-4/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans flex items-center justify-center p-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at-center,black_50%,transparent_100%)]"></div>
          </div>
        </div>
        <div className="relative z-10 text-center p-8 max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-red-500/50 rounded-3xl shadow-xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors duration-200"
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

  const categories = Array.isArray(blog?.category)
    ? blog.category
    : typeof blog?.category === 'string' && blog.category
    ? [blog.category]
    : [];

  const mainTitle = blog?.title;
  const mainContent = blog?.content;
  const excerpt = blog?.excerpt;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at-center,black_50%,transparent_100%)]"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-green-400/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Hero Section */}
      <div className={`relative z-10 w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20 transition-all duration-1000"></div>
        {blog?.imageUrl && (
          <img 
            src={blog.imageUrl} 
            alt={mainTitle}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}
        <div className="relative z-30 max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 leading-tight bg-gradient-to-br from-white to-green-200 bg-clip-text text-transparent">
            {mainTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-light mb-8 max-w-3xl mx-auto">
            {excerpt || "An insightful look into the latest trends and technologies in the digital world."}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-semibold">Administrator</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {new Date(blog?.publishedAt || blog?.createdAt || Date.now()).toLocaleDateString('en-US', {
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
                    className="px-3 py-1 bg-green-500/10 text-green-300 text-sm font-medium rounded-full"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className={`relative z-20 -mt-24 mb-16 px-4 md:px-8 max-w-5xl mx-auto transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-6 md:p-12 shadow-2xl">
          <div className="prose prose-lg sm:prose-xl max-w-none text-slate-300 leading-relaxed space-y-8">
            <div dangerouslySetInnerHTML={{ __html: mainContent }} />
          </div>

          <div className="flex justify-center my-12">
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 md:p-8 border border-slate-800/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share this article
            </h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => shareOnSocialMedia("twitter")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-white border border-green-500/20 rounded-full transition-all duration-200 text-sm font-medium hover:bg-green-500/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                Twitter
              </button>
              <button 
                onClick={() => shareOnSocialMedia("facebook")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-white border border-green-500/20 rounded-full transition-all duration-200 text-sm font-medium hover:bg-green-500/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button 
                onClick={() => shareOnSocialMedia("linkedin")}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-white border border-green-500/20 rounded-full transition-all duration-200 text-sm font-medium hover:bg-green-500/20"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.850 3.370-1.850 3.601 0 4.267 2.370 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-500/10 text-white border border-green-500/20 rounded-full transition-all duration-200 text-sm font-medium hover:bg-green-500/20"
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

      <div className={`relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-12 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-green-500 font-medium hover:text-green-300 transition-colors duration-200 group mt-8"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blogs
        </button>
      </div>
    </div>
  );
}