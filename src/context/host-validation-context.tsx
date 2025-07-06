"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HostValidationContextType {
  isNextDisabled: boolean;
  setNextDisabled: (disabled: boolean) => void;
  enableNext: () => void;
  disableNext: () => void;
}

const HostValidationContext = createContext<HostValidationContextType | undefined>(undefined);

export const useHostValidation = () => {
  const context = useContext(HostValidationContext);
  if (context === undefined) {
    throw new Error('useHostValidation must be used within a HostValidationProvider');
  }
  return context;
};

interface HostValidationProviderProps {
  children: ReactNode;
}

export const HostValidationProvider: React.FC<HostValidationProviderProps> = ({ children }) => {
  const [isNextDisabled, setNextDisabled] = useState(false); // Default to enabled

  const enableNext = () => setNextDisabled(false);
  const disableNext = () => setNextDisabled(true);

  return (
    <HostValidationContext.Provider value={{ 
      isNextDisabled, 
      setNextDisabled, 
      enableNext, 
      disableNext 
    }}>
      {children}
    </HostValidationContext.Provider>
  );
}; 