"use client";

import { UserNavWrapper } from "./UserNavWrapper";

export function UserNavSection() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">User Navigation</h3>
      <div className="flex items-center justify-center">
        <UserNavWrapper />
      </div>
    </div>
  );
} 