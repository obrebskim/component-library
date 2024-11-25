import { useEffect, useState } from 'react';

export const useTitle = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    const pageTitle = document.title;
    setTitle(pageTitle);
  }, []);

  return title;
};
