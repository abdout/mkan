"use client";

import React, { FC, ReactNode } from 'react';

interface AppSearchOptionWrapperProps {
  children: ReactNode;
  className?: string;
}

const AppSearchOptionWrapper: FC<AppSearchOptionWrapperProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50 ${className}`}>
      {children}
    </div>
  );
};

export default AppSearchOptionWrapper;
