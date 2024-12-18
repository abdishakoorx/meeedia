"use client"

import React, { createContext, useState, useContext, useMemo } from 'react';

// Define the type for the dashboard context
interface DashboardContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Create the context with a default value
const DashboardContext = createContext<DashboardContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
});

// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    isCollapsed,
    toggleSidebar
  }), [isCollapsed]);

  // Update CSS variable when sidebar state changes
  React.useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '5rem' : '16rem'
    );
  }, [isCollapsed]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the dashboard context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  
  return context;
};