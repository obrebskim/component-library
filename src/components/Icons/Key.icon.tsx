import React from 'react';

type Props = {
  className?: string;
};

const KeyIcon = ({ className }: Props) => {
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
      <path d="M12.4 2.7c.9-.9 2.5-.9 3.4 0l5.5 5.5c.9.9.9 2.5 0 3.4l-3.7 3.7c-.9.9-2.5.9-3.4 0L8.7 9.8c-.9-.9-.9-2.5 0-3.4Z"></path>
      <path d="m14 7 3 3"></path>
      <path d="M9.4 10.6 2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4"></path>
    </svg>
  );
};

export default KeyIcon;
