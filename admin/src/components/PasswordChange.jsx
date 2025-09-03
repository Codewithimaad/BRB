import { useState } from 'react';
import axios from 'axios';

const PasswordChange = ({ backendUrl }) => {
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = (e) => {
        setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
        // Clear error for this specific field when user starts typing
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: '' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        // Frontend validation
        if (!passwordForm.currentPassword) errors.currentPassword = 'Current password is required';
        if (!passwordForm.newPassword) errors.newPassword = 'New password is required';
        if (!passwordForm.confirmPassword) errors.confirmPassword = 'Please confirm your new password';
        if (passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);
        setFormErrors({});
        setMessage('');
        setShowMessage(false);

        try {
            const res = await axios.put(
                `${backendUrl}/api/admin/change-password`,
                {
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                    confirmPassword: passwordForm.confirmPassword
                },
                { withCredentials: true }
            );
            setMessage(res.data.message || 'Password updated successfully');
            setShowMessage(true);
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            const errMsg = err.response?.data?.message || 'Failed to update password';

            // Map backend errors to specific fields
            if (errMsg.toLowerCase().includes('current password')) {
                setFormErrors({ currentPassword: errMsg });
            } else if (errMsg.toLowerCase().includes('new password') ||
                errMsg.toLowerCase().includes('password must')) {
                setFormErrors({ newPassword: errMsg });
            } else if (errMsg.toLowerCase().includes('match')) {
                setFormErrors({ confirmPassword: errMsg });
            } else {
                // For other errors, show as a general message
                setMessage(errMsg);
                setShowMessage(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="group">
            <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 hover:shadow-3xl transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-r from-red-50/90 to-pink-50/90 backdrop-blur-sm p-6 border-b border-slate-200/40">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                                Security Settings
                            </h3>
                            <p className="text-sm text-slate-600 font-medium">Manage your password and security</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {showMessage && message && (
                        <div className={`p-4 rounded-xl text-center font-medium border-l-4 mb-4 ${message.toLowerCase().includes('success') ? 'bg-green-50 text-green-700 border-green-500' : 'bg-red-50 text-red-700 border-red-500'
                            }`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        {[
                            { id: 'current-password', name: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
                            { id: 'new-password', name: 'newPassword', label: 'New Password', placeholder: 'Enter new password' },
                            { id: 'confirm-password', name: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Confirm new password' }
                        ].map((input) => (
                            <div key={input.id} className="group/input">
                                <label htmlFor={input.id} className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">
                                    {input.label}
                                </label>
                                <input
                                    type="password"
                                    id={input.id}
                                    name={input.name}
                                    value={passwordForm[input.name]}
                                    onChange={handlePasswordChange}
                                    placeholder={input.placeholder}
                                    className={`block w-full px-5 py-4 bg-white/70 backdrop-blur-sm border rounded-2xl transition-all duration-300 shadow-lg ${formErrors[input.name] ? 'border-red-500 focus:ring-red-500' : 'border-slate-200/60 focus:ring-red-500/20'
                                        } focus:outline-none focus:ring-4`}
                                />
                                {formErrors[input.name] && (
                                    <p className="text-red-600 text-sm mt-1">{formErrors[input.name]}</p>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PasswordChange;