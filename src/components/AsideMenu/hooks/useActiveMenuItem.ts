import { useLocation } from 'react-router-dom';

export const useActiveMenuItem = (itemLink: string) => {
  const { pathname } = useLocation();
  return pathname.includes(itemLink);
};
