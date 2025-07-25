import React from 'react';

interface NotificationCardProps {
  title: string;
  subtitle?: string;
  description: string;
}

const NotificationCard = ({
  title,
  subtitle,
  description,
}: NotificationCardProps) => {
  return (
    <div className="w-screen flex justify-center h-10 bg-[#de3151]">
      <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6"><g fill="none" stroke="white" strokeWidth="1"><rect width="16" height="12" x="4" y="6" rx="2"/><path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9"/></g></svg>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><rect width="16" height="12" x="4" y="6" rx="2"/><path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9"/></g></svg>
         */}
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm font-medium text-white">
          {subtitle && <span className="hidden sm:inline">{subtitle}</span>}
          <span className="font-medium">{title}</span>
          <span className="hidden sm:inline">—</span>
          <span className="">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
