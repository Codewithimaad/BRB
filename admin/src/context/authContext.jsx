import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Create Context
export const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  // 🔹 Fetch admin profile function (now defined outside useEffect)
  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/admin/profile`, {
        withCredentials: true
      });
      setAdmin(data); // Set the complete admin profile
      return data;
    } catch (err) {
      setAdmin(null); // Clear admin on error
      return null;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch profile on component mount (initial load)
  useEffect(() => {
    fetchAdminProfile();
  }, [backendUrl]);

const handleLogout = async () => {
  try {
    await axios.post(`${backendUrl}/api/admin/logout`, {}, { withCredentials: true });
    setAdmin(null); // Clear admin data on logout

    // Show success alert
    await MySwal.fire({
      title: 'Logged Out',
      text: 'You have been logged out successfully.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    navigate("/"); // redirect to login page after alert
  } catch (err) {
    console.error("❌ Logout failed", err);

    // Show error alert
    MySwal.fire({
      title: 'Error',
      text: 'Logout failed. Please try again.',
      icon: 'error',
    });
  }
};

  // 🔹 checkAuth function
  const checkAuth = async () => {
    try {
      // First check if the session is valid
      await axios.get(`${backendUrl}/api/admin/check-auth`, {
        withCredentials: true
      });

      // If valid, fetch the full profile
      const adminData = await fetchAdminProfile();
      return !!adminData; // Return true if we got admin data
    } catch (err) {
      setAdmin(null); // Ensure admin is cleared on auth failure
      return false; // not authenticated
    }
  };

  // 🔹 handleLogin function
  const handleLogin = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${backendUrl}/api/admin/login`,
        {
          username: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        // Fetch the complete profile after login
        const adminProfile = await fetchAdminProfile();

        if (adminProfile) {
          if (formData.rememberMe) localStorage.setItem("rememberedEmail", formData.email);
          else localStorage.removeItem("rememberedEmail");

          navigate("/analytics");
        }
      } else {
        // Throw error when login fails
        throw new Error(res.data.message || "Invalid username or password");
      }
    } catch (err) {
      console.error(err);
      setAdmin(null); // Clear admin on login error
      // Re-throw so frontend can catch and show the error
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // 🔹 Function to update admin profile
  const updateAdminProfile = async (updateData) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${backendUrl}/api/admin/update`,
        updateData,
        { withCredentials: true }
      );

      // Update the context with new data
      setAdmin(prev => ({ ...prev, ...data }));
      return { success: true, data };
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      return { success: false, error: err.response?.data?.message || "Update failed" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      backendUrl,
      loading,
      setLoading,
      handleLogout,
      checkAuth,
      handleLogin,
      admin,
      fetchAdminProfile,
      updateAdminProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};