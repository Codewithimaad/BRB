import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Analytics', href: '/analytics', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { name: 'Blogs', href: '/blogs', icon: 'M12 20l9-5-9-5-9 5 9 5zm0-10l9-5-9-5-9 5 9 5z' },
    { name: 'Services', href: '/services', icon: 'M3 7h18M3 12h18M3 17h18' },
    { name: 'Countries', href: '/countries', icon: 'M5 4h14a2 2 0 012 2v12l-6-3-6 3-6-3V6a2 2 0 012-2z' },
    { name: 'Settings', href: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-md bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72
          bg-gradient-to-b from-slate-50/95 to-white/95 backdrop-blur-xl
          border-r border-slate-200/80 shadow-2xl shadow-slate-900/5
          transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          flex flex-col h-screen
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:shadow-lg lg:static lg:inset-0
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200/60 bg-white/40 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 via-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/25 ring-1 ring-white/20">
              <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Magical Calligraphy
            </h1>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-white/60 backdrop-blur-sm transition-all duration-200 ring-1 ring-slate-200/50 hover:ring-slate-300/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-8">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group relative flex items-center px-4 py-3.5 text-sm font-semibold rounded-2xl 
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-white/70 backdrop-blur-sm ring-1 ring-slate-200/40 hover:ring-slate-300/60 hover:shadow-md hover:shadow-slate-200/50'
                    }
                    transform hover:scale-[1.02] active:scale-[0.98]
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-green-700 opacity-100">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-white/5"></div>
                    </div>
                  )}

                  <svg
                    className={`
                      relative z-10 mr-3 h-5 w-5 transition-all duration-300
                      ${isActive
                        ? 'text-white drop-shadow-sm'
                        : 'text-slate-400 group-hover:text-slate-600'
                      }
                    `}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>

                  <span className="relative z-10 font-medium">
                    {item.name}
                  </span>

                  {isActive && (
                    <span className="relative z-10 ml-auto flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white/90 shadow-sm"></span>
                    </span>
                  )}

                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 to-green-700/0 group-hover:from-green-500/5 group-hover:to-green-700/5 transition-all duration-300"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom decoration */}
        <div className="p-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-green-50/80 to-green-100/80 backdrop-blur-sm ring-1 ring-green-100/60">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-700 flex-shrink-0 ring-2 ring-white/50"></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">Welcome back!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;