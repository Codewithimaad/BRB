import { useState, useEffect, useContext } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Services = () => {
    const { backendUrl } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const [formOpen, setFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        titleAr: '',
        description: '',
        descriptionAr: '',
        tags: '',
        tagsAr: '',
        isActive: true,
        featured: false,
        image: null,
    });
    // State to hold validation errors
    const [validationErrors, setValidationErrors] = useState({});
    // State to track which input fields are currently focused
    const [focusedFields, setFocusedFields] = useState({});

    // Handler to set a field's focus state to true
    const handleFocus = (fieldName) => {
        setFocusedFields({ ...focusedFields, [fieldName]: true });
    };

    // Handler to set a field's focus state to false
    const handleBlur = (fieldName) => {
        setFocusedFields({ ...focusedFields, [fieldName]: false });
    };

    const fetchServices = async () => {
        try {
            const res = await axios.get(`${backendUrl}/api/services`, { params: { search } });
            if (res.data.success) setServices(res.data.services);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch services');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openCreate = () => {
        setEditingId(null);
        setFormData({ title: '', titleAr: '', description: '', descriptionAr: '', tags: '', tagsAr: '', isActive: true, featured: false, image: null });
        setValidationErrors({}); // Clear errors on form open
        setFormOpen(true);
        setFocusedFields({}); // Clear focused fields on form open
    };

    const openEdit = (service) => {
        setEditingId(service._id);
        setFormData({
            title: service.title || '',
            titleAr: service.titleAr || '',
            description: service.description || '',
            descriptionAr: service.descriptionAr || '',
            tags: (service.tags || []).join(', '),
            tagsAr: (service.tagsAr || []).join(', '),
            isActive: service.isActive,
            featured: service.featured,
            image: null,
        });
        setValidationErrors({}); // Clear errors on form open
        setFormOpen(true);
        setFocusedFields({}); // Clear focused fields on form open
    };

    const handleDelete = async (id) => {
        const result = await MySwal.fire({
            title: 'Delete this service?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                popup: 'rounded-2xl',
                confirmButton: 'rounded-xl',
                cancelButton: 'rounded-xl'
            }
        });
        if (!result.isConfirmed) return;
        try {
            const res = await axios.delete(`${backendUrl}/api/services/${id}`, { withCredentials: true });
            if (res.data.success) {
                await MySwal.fire({
                    title: 'Deleted!',
                    text: res.data.message,
                    icon: 'success',
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl'
                    }
                });
                fetchServices();
            }
        } catch (err) {
            console.error(err);
            MySwal.fire({
                title: 'Error',
                text: 'Failed to delete service',
                icon: 'error',
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl'
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Create a new object to hold the current validation errors
        const errors = {};

        // 2. Perform validation checks for all required fields
        if (!formData.title.trim()) {
            errors.title = 'Title is required.';
        }
        if (!formData.titleAr.trim()) {
            errors.titleAr = 'Arabic Title is required.';
        }
        if (!formData.description.trim()) {
            errors.description = 'Description is required.';
        }
        if (!formData.descriptionAr.trim()) {
            errors.descriptionAr = 'Arabic Description is required.';
        }

        // Check image size if a new image is selected
        const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes
        if (formData.image && formData.image.size > maxImageSize) {
            errors.image = 'Image size must be less than 5MB.';
        }

        // 3. Check if there are any errors
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors); // Set the errors
            return; // STOP the function here if validation fails
        }

        // 4. If validation passes, clear any previous errors and proceed with submission
        setValidationErrors({}); // Clear errors from previous invalid attempts

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('titleAr', formData.titleAr);
            data.append('description', formData.description);
            data.append('descriptionAr', formData.descriptionAr);
            const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
            data.append('tags', JSON.stringify(tagsArray));
            const tagsArArray = formData.tagsAr.split(',').map(t => t.trim()).filter(Boolean);
            data.append('tagsAr', JSON.stringify(tagsArArray));
            data.append('isActive', String(formData.isActive));
            data.append('featured', String(formData.featured));
            if (formData.image) data.append('image', formData.image);

            let res;
            if (editingId) {
                res = await axios.put(`${backendUrl}/api/services/${editingId}`, data, { withCredentials: true });
            } else {
                res = await axios.post(`${backendUrl}/api/services`, data, { withCredentials: true });
            }

            if (res.data.success) {
                MySwal.fire({
                    title: editingId ? 'Updated' : 'Created',
                    text: res.data.message,
                    icon: 'success',
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl'
                    }
                });
                setFormOpen(false);
                fetchServices();
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400 && err.response.data.errors) {
                // Set server-side validation errors
                setValidationErrors(err.response.data.errors);
            } else {
                MySwal.fire({
                    title: 'Error',
                    text: 'Failed to save service',
                    icon: 'error',
                    customClass: {
                        popup: 'rounded-2xl',
                        confirmButton: 'rounded-xl'
                    }
                });
            }
        }
    };

    const filtered = services.filter(s =>
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.tags?.join(',').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header section */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 via-purple-600/10 to-purple-800/10 rounded-3xl blur-3xl"></div>
                    <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-3">Services</h1>
                                <p className="text-lg text-slate-600 font-medium">Create, update, and manage services</p>
                            </div>
                            <div className="mt-4 lg:mt-0">
                                <button
                                    onClick={openCreate}
                                    className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    New Service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table section */}
                <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 overflow-hidden p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title or tag"
                            className="block w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800 font-medium transition-all duration-200"
                        />
                        <button
                            onClick={fetchServices}
                            className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-2xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
                        >
                            Search
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-600 font-semibold text-center py-8">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gradient-to-r from-slate-50/90 to-slate-100/90 backdrop-blur-sm border-b border-slate-200/60">
                                    <tr>
                                        {['Title', 'Tags', 'Active', 'Featured', 'Created', 'Actions'].map((h) => (
                                            <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200/40">
                                    {filtered.map((s) => (
                                        <tr key={s._id} className="hover:bg-slate-50/50 transition-all duration-200">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-slate-900">{s.title}</div>
                                                <div className="text-slate-600 text-sm line-clamp-1">{s.description}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {(s.tags || []).map((tag, index) => (
                                                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-xl text-xs font-semibold ${s.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {s.isActive ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-xl text-xs font-semibold ${s.featured ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'}`}>
                                                    {s.featured ? 'Featured' : '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-700">{new Date(s.createdAt).toLocaleString()}</td>
                                            <td className="px-6 py-4 space-x-3">
                                                <button
                                                    onClick={() => openEdit(s)}
                                                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700 transition-colors duration-200"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(s._id)}
                                                    className="px-3 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                                                >
                                                    Delete
                                                </button>
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
                            <div className="bg-gradient-to-r from-green-400 to-green-700 p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">{editingId ? 'Edit Service' : 'Create New Service'}</h2>
                                    <button
                                        onClick={() => setFormOpen(false)}
                                        className="p-2 rounded-full hover:bg-green-600/30 transition-colors duration-200"
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
                                                onFocus={() => handleFocus('title')}
                                                onBlur={() => handleBlur('title')}
                                                placeholder="Service title"
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${validationErrors.title ? 'border-red-500 focus:ring-red-500/30' : (formData.title.trim() || focusedFields.title ? 'border-emerald-500' : 'border-slate-200')} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                            />
                                            {validationErrors.title && <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">العنوان (Arabic) *</label>
                                            <input
                                                type="text"
                                                value={formData.titleAr}
                                                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                                onFocus={() => handleFocus('titleAr')}
                                                onBlur={() => handleBlur('titleAr')}
                                                placeholder="عنوان الخدمة"
                                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${validationErrors.titleAr ? 'border-red-500 focus:ring-red-500/30' : (formData.titleAr.trim() || focusedFields.titleAr ? 'border-emerald-500' : 'border-slate-200')} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                            />
                                            {validationErrors.titleAr && <p className="text-red-500 text-xs mt-1">{validationErrors.titleAr}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Tags</label>
                                        <input
                                            type="text"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            onFocus={() => handleFocus('tags')}
                                            onBlur={() => handleBlur('tags')}
                                            placeholder="Comma separated tags"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${formData.tags.trim() || focusedFields.tags ? 'border-emerald-500' : 'border-slate-200'} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">الوسوم (Arabic)</label>
                                        <input
                                            type="text"
                                            value={formData.tagsAr}
                                            onChange={(e) => setFormData({ ...formData, tagsAr: e.target.value })}
                                            onFocus={() => handleFocus('tagsAr')}
                                            onBlur={() => handleBlur('tagsAr')}
                                            placeholder="وسوم مفصولة بفاصلة"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${formData.tagsAr.trim() || focusedFields.tagsAr ? 'border-emerald-500' : 'border-slate-200'} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Description *</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            onFocus={() => handleFocus('description')}
                                            onBlur={() => handleBlur('description')}
                                            placeholder="Service description"
                                            rows={6}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${validationErrors.description ? 'border-red-500 focus:ring-red-500/30' : (formData.description.trim() || focusedFields.description ? 'border-emerald-500' : 'border-slate-200')} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                        />
                                        {validationErrors.description && <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">الوصف (Arabic) *</label>
                                        <textarea
                                            value={formData.descriptionAr}
                                            onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                                            onFocus={() => handleFocus('descriptionAr')}
                                            onBlur={() => handleBlur('descriptionAr')}
                                            placeholder="وصف الخدمة"
                                            rows={6}
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 transition-all duration-200 ${validationErrors.descriptionAr ? 'border-red-500 focus:ring-red-500/30' : (formData.descriptionAr.trim() || focusedFields.descriptionAr ? 'border-emerald-500' : 'border-slate-200')} focus:ring-indigo-500/30 focus:border-indigo-500`}
                                        />
                                        {validationErrors.descriptionAr && <p className="text-red-500 text-xs mt-1">{validationErrors.descriptionAr}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <label className="flex items-center space-x-3">
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isActive}
                                                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Active</span>
                                            </label>

                                            <label className="flex items-center space-x-3">
                                                <div className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.featured}
                                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                                                </div>
                                                <span className="text-sm font-medium text-slate-700">Featured</span>
                                            </label>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Service Image</label>
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
                                            {validationErrors.image && <p className="text-red-500 text-xs mt-1">{validationErrors.image}</p>}
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
                                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
                                        >
                                            {editingId ? 'Update Service' : 'Create Service'}
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

export default Services;