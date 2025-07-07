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
    <div className="w-screen flex justify-center h-16 bg-[#ff5a5f]">
      <div className="flex items-center space-x-2 ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-width="1"><rect width="16" height="12" x="4" y="6" rx="2"/><path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9"/></g></svg>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><rect width="16" height="12" x="4" y="6" rx="2"/><path d="m4 9l7.106 3.553a2 2 0 0 0 1.788 0L20 9"/></g></svg>
         */}
        <div className="flex items-center space-x-2 text-base">
          {subtitle && <span className="text-white">{subtitle}</span>}
          <span className="font-medium text-white">{title}</span>
          <span className="text-white">—</span>
          <span className="text-white">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
