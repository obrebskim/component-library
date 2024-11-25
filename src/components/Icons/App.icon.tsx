type Props = {
  className?: string;
};

const AppIcon = ({ className }: Props) => {
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
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="M10 4v4"></path>
      <path d="M2 8h20"></path>
      <path d="M6 4v4"></path>
    </svg>
  );
};

export default AppIcon;
