import React, { useState, useEffect, useContext } from 'react';
import { Eye, EyeOff, Lock, Mail, User, Loader, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = () => {
    const navigate = useNavigate();
    const { checkAuth, handleLogin } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    // Prefill email if remembered
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setFormData(prev => ({ ...prev, email: savedEmail, rememberMe: true }));
        }
    }, []);

    // Check if already logged in
    useEffect(() => {
        const verify = async () => {
            const isAuthenticated = await checkAuth();
            if (isAuthenticated) {
                await MySwal.fire({
                    icon: 'success',
                    title: 'Already Logged In',
                    text: 'You are already logged in!',
                    confirmButtonColor: '#6366F1',
                });
                navigate("/analytics");
            }
        };
        verify();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name] || errors.general) setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});
        try {
            await handleLogin(formData); // Context API function
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';

            // Clear only the password field
            setFormData(prev => ({ ...prev, password: '' }));

            MySwal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: message,
                confirmButtonColor: '#6366F1',
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md md:bg-white md:rounded-2xl md:shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-400 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Magical Calligraphy</h1>
                        <p className="text-gray-600">Sign in to continue to your account</p>
                    </div>

                    {errors.general && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                            <span className="text-sm">{errors.general}</span>
                        </div>
                    )}

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`h-5 w-5 ${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className={`block w-full pl-10 pr-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`h-5 w-5 ${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    className={`block w-full pl-10 pr-12 py-3 rounded-lg border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-emerald-500'} focus:outline-none focus:ring-2 focus:border-transparent`}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ?
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> :
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    }
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    disabled={isLoading}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin mr-2" />
                                    Signing in...
                                </>
                            ) : 'Sign in'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;