import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import { AuthContext } from "../context/authContext";
import PasswordChange from '../components/PasswordChange';
import DeleteAccount from '../components/DeleteAccount';

const Settings = () => {
  const { admin, updateAdminProfile, fetchAdminProfile, loading, backendUrl } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: '',
    username: ''
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);


  // 🔹 Auto-dismiss message after 4 seconds
  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  // 🔹 Update local state when admin data changes (on refresh/load)
  useEffect(() => {
    if (admin) {
      setProfile({
        name: admin.name || '',
        username: admin.username || '' // This is the email
      });
    }
  }, [admin]);

  // 🔹 Set message and show it temporarily
  const setTemporaryMessage = (msg) => {
    setMessage(msg);
    setShowMessage(true);
  };

  // 🔹 Handle profile input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };



  // 🔹 Submit profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTemporaryMessage('');

    const result = await updateAdminProfile({ name: profile.name });

    if (result.success) {
      setTemporaryMessage('Profile updated successfully');
      await fetchAdminProfile();
    } else {
      setTemporaryMessage(`Failed to update profile: ${result.error}`);
    }
  };



  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-600 bg-clip-text text-transparent mb-3">
                  Account Settings
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                  Manage your account preferences and security settings
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 ring-4 ring-white/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Display message */}
        {showMessage && (
          <div className={`p-4 rounded-xl text-center font-medium border-l-4 animate-fadeIn ${message.toLowerCase().includes('success') ?
            'bg-green-50 text-green-700 border-green-500' :
            'bg-red-50 text-red-700 border-red-500'
            }`}>
            <div className="flex items-center justify-center space-x-2">
              {message.toLowerCase().includes('success') ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              <span>{message}</span>

              {/* Close button for manual dismissal */}
              <button
                onClick={() => setShowMessage(false)}
                className="ml-2 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
                aria-label="Close message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="group">
            <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 backdrop-blur-sm p-6 border-b border-slate-200/40">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Profile Information
                    </h3>
                    <p className="text-sm text-slate-600 font-medium">Update your personal details</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', value: profile.name, field: 'name' },
                      { id: 'username', label: 'Email Address', type: 'email', value: profile.username, field: 'username', disabled: true },
                    ].map((input) => (
                      <div key={input.id} className="group/input">
                        <label
                          htmlFor={input.id}
                          className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider"
                        >
                          {input.label}
                        </label>
                        <div className="relative">
                          <input
                            type={input.type}
                            id={input.id}
                            name={input.field}
                            value={input.value}
                            onChange={handleChange}
                            disabled={input.disabled}
                            className="block w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-indigo-500/10 text-slate-800 font-medium group-hover/input:shadow-xl disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within/input:from-indigo-500/5 group-focus-within/input:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider backdrop-blur-sm ring-1 ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {loading ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span>{loading ? 'Updating...' : 'Update Profile'}</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <PasswordChange backendUrl={backendUrl} />
        </div>

        {/* Danger Zone */}
        <DeleteAccount backendUrl={backendUrl} />
      </div>
    </DashboardLayout>
  );
};

export default Settings;