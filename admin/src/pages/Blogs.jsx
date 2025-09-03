import { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Blogs = () => {
  const { backendUrl } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    isPublished: true,
    image: null,
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/blogs`, { params: { search } });
      if (res.data.success) setBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({ title: '', excerpt: '', content: '', category: '', isPublished: true, image: null });
    setFormOpen(true);
  };

  const openEdit = (blog) => {
    setEditingId(blog._id);
    setFormData({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      category: (blog.category || []).join(', '),
      isPublished: blog.isPublished,
      image: null,
    });
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await MySwal.fire({
      title: 'Delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;
    try {
      const res = await axios.delete(`${backendUrl}/api/blogs/${id}`, { withCredentials: true });
      if (res.data.success) {
        await MySwal.fire('Deleted!', res.data.message, 'success');
        fetchBlogs();
      }
    } catch (err) {
      console.error(err);
      MySwal.fire('Error', 'Failed to delete blog', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('excerpt', formData.excerpt);
      data.append('content', formData.content);
      const categoriesArray = formData.category
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
      data.append('category', JSON.stringify(categoriesArray));
      data.append('isPublished', String(formData.isPublished));
      if (formData.image) data.append('image', formData.image);

      if (editingId) {
        const res = await axios.put(`${backendUrl}/api/blogs/${editingId}`, data, { withCredentials: true });
        if (res.data.success) {
          MySwal.fire('Updated', 'Blog updated successfully', 'success');
          setFormOpen(false);
          fetchBlogs();
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/blogs`, data, { withCredentials: true });
        if (res.data.success) {
          MySwal.fire('Created', 'Blog created successfully', 'success');
          setFormOpen(false);
          fetchBlogs();
        }
      }
    } catch (err) {
      console.error(err);
      MySwal.fire('Error', 'Failed to save blog', 'error');
    }
  };

  const filteredBlogs = blogs.filter(b =>
    b.title?.toLowerCase().includes(search.toLowerCase()) ||
    (b.category || []).join(',').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header section remains the same */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-600/10 to-green-800/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-3">Blogs</h1>
                <p className="text-lg text-slate-600 font-medium">Create, update, and manage blog posts</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <button onClick={openCreate} className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95">New Blog</button>
              </div>
            </div>
          </div>
        </div>

        {/* Table section remains the same */}
        <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title or tag"
              className="block w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 font-medium"
            />
            <button onClick={fetchBlogs} className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-2xl">Search</button>
          </div>

          {loading ? (
            <div className="text-slate-600">Loading...</div>
          ) : error ? (
            <div className="text-red-600 font-semibold">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-slate-50/90 to-slate-100/90 backdrop-blur-sm border-b border-slate-200/60">
                  <tr>
                    {['Title', 'Category', 'Published', 'Created', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40">
                  {filteredBlogs.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50/50 transition-all duration-200">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{b.title}</div>
                        <div className="text-slate-600 text-sm line-clamp-1">{b.excerpt}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{(b.category || []).join(', ')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-xl text-xs font-semibold ${b.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{b.isPublished ? 'Yes' : 'Draft'}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{new Date(b.createdAt).toLocaleString()}</td>
                      <td className="px-6 py-4 space-x-3">
                        <button onClick={() => openEdit(b)} className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700">Edit</button>
                        <button onClick={() => handleDelete(b._id)} className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Modal */}
        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with fade-in animation */}
            <div 
              className="absolute inset-0 bg-black/40 transition-opacity duration-300 opacity-0"
              style={{ animation: 'fadeIn 0.3s ease-out forwards' }}
              onClick={() => setFormOpen(false)}
            ></div>
            
            {/* Modal with slide-in animation */}
            <div 
              className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-95 opacity-0"
              style={{ animation: 'modalSlideIn 0.3s ease-out forwards' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with gradient */}
              <div className="bg-gradient-to-r from-green-400 to-green-800 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
                  <button 
                    onClick={() => setFormOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-600/30 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Modal body with form */}
              <div className="max-h-[70vh] overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Blog title"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Categories</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Comma separated categories"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Excerpt</label>
                    <input
                      type="text"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Short description"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Content *</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Blog content"
                      rows={8}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isPublished}
                            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Published</span>
                      </label>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Featured Image</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex-1">
                          <div className="px-4 py-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors duration-200 text-center">
                            <span className="text-sm text-slate-600">Choose file</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                              className="hidden"
                            />
                          </div>
                        </label>
                        {formData.image && (
                          <span className="text-sm text-slate-600 truncate">{formData.image.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-4 pt-4 border-t border-slate-100">
                    <button 
                      type="button" 
                      onClick={() => setFormOpen(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 font-medium text-slate-700 hover:bg-slate-200 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
                    >
                      {editingId ? 'Update Post' : 'Create Post'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Blogs;