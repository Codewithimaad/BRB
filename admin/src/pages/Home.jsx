import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 overflow-hidden">

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
                {/* Main CTA Container */}
                <div className="backdrop-blur-xl bg-white/80 border border-white/30 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl text-center">

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
                        <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                            English Handwriting
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                            Mastery Kit
                        </span>
                    </h2>

                    {/* Kit Contents */}
                    <div className="mb-8 sm:mb-10">
                        <div className="backdrop-blur-lg bg-white/50 border border-white/30 rounded-2xl p-6 sm:p-8 inline-block shadow-xl">
                            <div className="space-y-4 text-left">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="font-semibold text-gray-800">Handwriting Mastery Course</span>
                                    </div>
                                    <span className="font-bold text-gray-800">₨. 2000/</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="font-semibold text-gray-800">Printable Worksheets Pack</span>
                                    </div>
                                    <span className="font-bold text-gray-800">₨. 1000/</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="font-semibold text-gray-800">Private WhatsApp Coaching Group</span>
                                    </div>
                                    <span className="font-bold text-gray-800">₨. 1000/</span>
                                </div>
                                <div className="border-t border-gray-300 pt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-800">Total Value:</span>
                                        <span className="font-bold text-gray-800">Rs 4000</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Special Offer */}
                    <div className="mb-8 sm:mb-10">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-300/30 rounded-full px-4 py-2 mb-4">
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                            <span className="text-orange-700 font-semibold text-sm">Today's Special Launch Offer!</span>
                        </div>
                        <div className="text-center">
                            <div className="flex items-baseline justify-center space-x-2 mb-2">
                                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Rs.1499/</span>
                                <span className="text-lg sm:text-xl text-gray-600 line-through">Rs 4000</span>
                            </div>
                            <div className="text-sm text-gray-600 font-medium">Only</div>
                        </div>
                    </div>

                    {/* Value Props */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                        {[
                            { icon: 'check', color: 'green', text: 'Complete Course' },
                            { icon: 'calendar', color: 'blue', text: 'Lifetime Access' },
                            { icon: 'shield-check', color: 'purple', text: 'WhatsApp Support' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-center space-x-2 p-3 sm:p-4 backdrop-blur-lg bg-white/50 border border-white/30 rounded-lg sm:rounded-xl">
                                <svg className={`w-4 sm:w-5 h-4 sm:h-5 text-${item.color}-500`} fill="currentColor" viewBox="0 0 20 20">
                                    {item.icon === 'check' && (
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    )}
                                    {item.icon === 'calendar' && (
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    )}
                                    {item.icon === 'shield-check' && (
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                </svg>
                                <span className="text-sm sm:text-base font-semibold text-gray-700">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="space-y-4 sm:space-y-6">
                        <Link
                            to='/register'
                            className="group relative inline-flex items-center justify-center px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 overflow-hidden w-full sm:w-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center space-x-2 sm:space-x-3">
                                <span>Start Writing Today!</span>
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-indigo-600/30 blur-lg group-hover:blur-xl transition-all duration-300"></div>
                        </Link>

                        <div className="text-center">
                            <div className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Rs.1499/ Only</div>
                            <div className="text-sm text-gray-600 font-medium">Lifetime Access</div>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span>Secure Payment</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                <span>Instant Access</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                <span>1000+ Happy Students</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Home;
