import React from 'react';

type Props = {
  className?: string;
};

const FoldersIcon = ({ className }: Props) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="2rem"
      width="2rem"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M8 17h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.93a2 2 0 0 1-1.66-.9l-.82-1.2a2 2 0 0 0-1.66-.9H8a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2Z"></path>
      <path d="M2 8v11c0 1.1.9 2 2 2h14"></path>
    </svg>
  );
};

export default FoldersIcon;
