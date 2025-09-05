import React, { createContext, useState,  } from "react";

// Create Context
export const ApiContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;



  return (
    <ApiContext.Provider value={{
      backendUrl,
      
    }}>
      {children}
    </ApiContext.Provider>
  );
};