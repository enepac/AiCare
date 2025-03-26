// src/components/ProfileProgressBar.tsx
"use client";

import React from "react";

interface ProfileProgressBarProps {
  completionPercentage: number;
}

const ProfileProgressBar: React.FC<ProfileProgressBarProps> = ({ completionPercentage }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`bg-green-500 h-3 rounded-full transition-all duration-500 ease-in-out`}
        style={{ width: `${completionPercentage}%` }}
      />
    </div>
  );
};

export default ProfileProgressBar;
