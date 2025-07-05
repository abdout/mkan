"use client";

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSearchOptionButtonProps {
  title: string;
  placeholder: string;
  value?: string;
  active?: boolean;
  separator?: boolean;
  withSearch?: boolean;
  type?: 'input' | 'button';
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onClear?: () => void;
  onSearch?: () => void;
}

const AppSearchOptionButton = ({
  title,
  placeholder,
  value,
  active = false,
  separator = false,
  withSearch = false,
  type = 'button',
  onChange,
  onFocus,
  onClear,
  onSearch
}: AppSearchOptionButtonProps) => {
  return (
    <div className={cn(
      'relative',
      separator && 'border-r border-gray-200'
    )}>
      <div className={cn(
        'px-6 py-4',
        active && 'bg-white rounded-full shadow-lg'
      )}>
        {/* Label */}
        <label className="block text-xs font-semibold text-gray-800 mb-1">
          {title}
        </label>

        {/* Input or Button */}
        {type === 'input' ? (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none outline-none"
            onFocus={onFocus}
          />
        ) : (
          <button
            onClick={onFocus}
            className="w-full text-left text-sm text-gray-600 bg-transparent border-none outline-none"
          >
            {value || placeholder}
          </button>
        )}

        {/* Clear Button */}
        {value && onClear && (
          <button
            onClick={onClear}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Search Button */}
        {withSearch && (
          <button
            onClick={onSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AppSearchOptionButton;
