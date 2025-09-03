import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DeleteAccount = ({ backendUrl }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleDelete = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'This action is irreversible. Your account and all data will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        setLoading(true);
        setMessage('');
        try {
            const res = await axios.delete(`${backendUrl}/api/admin/delete-account`, { withCredentials: true });
            setMessage(res.data.message || 'Account deleted successfully');

            MySwal.fire(
                'Deleted!',
                res.data.message || 'Your account has been deleted.',
                'success'
            );

            // Optionally, log out or redirect the user here
            navigate("/");
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to delete account');
            console.error(err);

            MySwal.fire(
                'Error!',
                err.response?.data?.message || 'Failed to delete account',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group">
            <div className="bg-gradient-to-br from-white/95 to-red-50/95 backdrop-blur-xl rounded-3xl border border-red-200/60 shadow-2xl shadow-red-900/5 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-red-100/90 to-pink-100/90 backdrop-blur-sm p-6 border-b border-red-200/40">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/25">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">
                                Danger Zone
                            </h3>
                            <p className="text-sm text-red-600 font-medium">
                                Irreversible actions require careful consideration
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-8 space-y-6">
                    {message && (
                        <div
                            className={`p-4 rounded-xl text-center font-medium border-l-4 ${message.toLowerCase().includes('success')
                                ? 'bg-green-50 text-green-700 border-green-500'
                                : 'bg-red-50 text-red-700 border-red-500'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border border-red-300 rounded-2xl bg-gradient-to-r from-red-50/90 to-rose-50/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start space-x-4 mb-4 md:mb-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-700 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 mb-1">Delete Account</h4>
                                <p className="text-sm text-slate-700 font-medium">Permanently delete your account and all data</p>
                            </div>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap ring-1 ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
