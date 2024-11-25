import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useMenuNavigation = () => {
  const navigate = useNavigate();

  return useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );
};
