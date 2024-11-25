type Props = {
  rotate?: number;
  className?: string;
};

const ArrowIcon = ({ rotate = 0, className }: Props) => {
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
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
};

export default ArrowIcon;
