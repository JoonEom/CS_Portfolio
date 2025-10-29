import React from 'react';

interface BasketballIconProps {
  className?: string;
  size?: number;
}

export function BasketballIcon({ className = "h-5 w-5", size }: BasketballIconProps) {
  return (
    <svg
      width={size || 20}
      height={size || 20}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Basketball base circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      
      {/* Basketball lines - curved lines that make the basketball pattern */}
      <path
        d="M12 2C12 2 6 6 6 12C6 18 12 22 12 22"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M12 2C12 2 18 6 18 12C18 18 12 22 12 22"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Horizontal line across the middle */}
      <line
        x1="2"
        y1="12"
        x2="22"
        y2="12"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Curved lines on the sides */}
      <path
        d="M2 12C2 12 6 6 12 6C18 6 22 12 22 12"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M2 12C2 12 6 18 12 18C18 18 22 12 22 12"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
