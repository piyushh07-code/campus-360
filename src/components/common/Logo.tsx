import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', iconOnly = false, size = 'md', showText = true }) => {
  const iconDimensions = {
    sm: { w: 32, h: 32, r: 15 },
    md: { w: 42, h: 42, r: 20 },
    lg: { w: 56, h: 56, r: 26 },
  }[size];

  if (iconOnly) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width={iconDimensions.w}
        height={iconDimensions.h}
        fill="none"
        className={className}
      >
        <defs>
          <linearGradient id="sc-grad-icon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F6FED" />
            <stop offset="100%" stopColor="#138A72" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" stroke="#E4E9F0" strokeWidth="2.5" fill="#FAF8F2" />
        <path d="M 32 4 A 28 28 0 0 1 58 40" stroke="#138A72" strokeWidth="3" strokeLinecap="round" />
        <path d="M 32 60 A 28 28 0 0 1 6 24" stroke="#2F6FED" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M 18 42 C 24 38, 29 39, 32 43 C 35 39, 40 38, 46 42 L 46 29 C 40 25, 35 26, 32 30 C 29 26, 24 25, 18 29 Z"
          fill="#17365D"
        />
        <path
          d="M 32 16 C 32 16, 24 26, 24 30.5 C 24 34.9, 27.6 38.5, 32 38.5 C 36.4 38.5, 40 34.9, 40 30.5 C 40 26, 32 16, 32 16 Z"
          fill="url(#sc-grad-icon)"
        />
        <circle cx="29.5" cy="27" r="1.5" fill="#FFFFFF" opacity="0.8" />
      </svg>
    );
  }

  const heightClass = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  }[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className={`${heightClass} w-auto shrink-0`}
        fill="none"
      >
        <defs>
          <linearGradient id="sc-grad-logo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2F6FED" />
            <stop offset="100%" stopColor="#138A72" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" stroke="#E4E9F0" strokeWidth="2.5" fill="#FAF8F2" />
        <path d="M 32 4 A 28 28 0 0 1 58 40" stroke="#138A72" strokeWidth="3" strokeLinecap="round" />
        <path d="M 32 60 A 28 28 0 0 1 6 24" stroke="#2F6FED" strokeWidth="3" strokeLinecap="round" />
        <path
          d="M 18 42 C 24 38, 29 39, 32 43 C 35 39, 40 38, 46 42 L 46 29 C 40 25, 35 26, 32 30 C 29 26, 24 25, 18 29 Z"
          fill="#17365D"
        />
        <path
          d="M 32 16 C 32 16, 24 26, 24 30.5 C 24 34.9, 27.6 38.5, 32 38.5 C 36.4 38.5, 40 34.9, 40 30.5 C 40 26, 32 16, 32 16 Z"
          fill="url(#sc-grad-logo)"
        />
        <circle cx="29.5" cy="27" r="1.5" fill="#FFFFFF" opacity="0.8" />
      </svg>
      <div className="flex flex-col min-w-0">
        <div className="flex items-baseline leading-none">
          <span className="font-extrabold text-[18px] tracking-tight text-[#17365D]">SmartCampus</span>
          <span className="font-extrabold text-[18px] tracking-tight text-[#2F6FED] ml-1">360</span>
        </div>
        <span className="text-[10px] font-semibold text-[#138A72] tracking-wider uppercase mt-0.5 truncate">
          SmartStudy AI + WaterWatch
        </span>
      </div>
    </div>
  );
};
