import React, { createContext, useContext, useState } from 'react';


interface AppContextType {
    homeRefreshing: boolean;
    setHomeRefreshing: (refreshing: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    
    const [homeRefreshing, setHomeRefreshing] = useState(false);
    


  const value = { 
    homeRefreshing, setHomeRefreshing
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within a AppProvider');
  }
  return context;
};