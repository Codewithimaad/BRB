import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import axios from 'axios';
import { AuthContext } from "../context/authContext";



const Analytics = () => {
  const { backendUrl } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalBlogs: 0, totalServices: 0, totalCountries: 0 });
  const [loadingStats, setLoadingStats] = useState(true);
  const [addAdminForm, setAddAdminForm] = useState({ username: '', password: '', name: '' });
  const [addingAdmin, setAddingAdmin] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/admin/stats`, { withCredentials: true });
        if (res.data.success) setStats(res.data.stats);
      } catch (e) {
        console.error('Failed to fetch stats', e);
      } finally {
        setLoadingStats(false);
      }
    };
    loadStats();
  }, [backendUrl]);


  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Page header with floating effect */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-green-200/20 rounded-full blur-3xl -mr-48 -mt-48"></div>
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-700 bg-clip-text text-transparent animate-gradient bg-300">
                Analytics Dashboard
              </h1>
              <p className="mt-3 text-gray-600 text-lg">
                Track your business performance and insights
              </p>
            </div>
            <button className="mt-6 md:mt-0 group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-700 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <svg className="relative w-5 h-5 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative text-white font-semibold text-lg">Export Report</span>
            </button>
          </div>
        </div>

        {/* Key metrics with glass morphism (live stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[{
              name: 'Total Blogs',
              value: loadingStats ? '…' : stats.totalBlogs,
              gradient: 'from-emerald-500 to-green-600',
              icon: 'M12 20l9-5-9-5-9 5 9 5zm0-10l9-5-9-5-9 5 9 5z'
            },
            {
              name: 'Total Services',
              value: loadingStats ? '…' : stats.totalServices,
              gradient: 'from-teal-500 to-cyan-600',
              icon: 'M3 7h18M3 12h18M3 17h18'
            },
            {
              name: 'Total Countries',
              value: loadingStats ? '…' : stats.totalCountries,
              gradient: 'from-green-400 to-emerald-600',
              icon: 'M5 4h14a2 2 0 012 2v12l-6-3-6 3-6-3V6a2 2 0 012-2z'
            }].map((stat) => (
            <div key={stat.name} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-7 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-2xl shadow-lg`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        

       

      
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-300 {
          background-size: 300%;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Analytics;