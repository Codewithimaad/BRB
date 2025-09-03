import { useState, useContext, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const DashboardLayout = ({ children }) => {
  const { checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        // Show popup message
        MySwal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You are not logged in!',
          confirmButtonColor: '#6366F1',
        });

        // Redirect to login
        navigate("/");
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Header */}
      <div className="fixed top-0 right-0 left-0 z-40 lg:left-72">
        <Header setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <main className="pt-16 lg:pl-72 min-h-screen">
        <div className="p-6 sm:p-6 lg:p-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
