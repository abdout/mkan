'use client';

import { FC } from 'react';
import { X } from 'lucide-react';

interface AppClearButtonProps {
  active: boolean;
  isFocus?: boolean;
  separator?: boolean;
  onClick: () => void;
}

const AppClearButton: FC<AppClearButtonProps> = ({
  onClick,
  active,
  isFocus = true,
  separator = false,
}) => {
  return (
    <div className={`${separator && 'border-r border-gray-200'} flex items-center h-8`}>
      <div
        role="button"
        tabIndex={0}
        className={`${
          active && isFocus ? 'opacity-100' : 'opacity-0'
        } flex items-center pr-3`}
        onClick={onClick}
      >
        <X className="h-6 p-1 bg-gray-200 rounded-full bg-opacity-60 hover:bg-opacity-100" />
      </div>
    </div>
  );
};

export default AppClearButton;
