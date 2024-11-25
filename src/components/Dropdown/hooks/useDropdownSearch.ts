import { useState, useEffect } from 'react';

import useDebounce from './useDebounce';

export const useDropdownSearch = (asyncSearch?: (searchValue: string) => Promise<void>) => {
  const [searchValue, setSearchValue] = useState('');
  const [fetchingOptions, setFetchingOptions] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (asyncSearch) {
      const fetchOptions = async () => {
        setFetchingOptions(true);
        try {
          await asyncSearch(debouncedSearchValue);
        } finally {
          setFetchingOptions(false);
        }
      };
      fetchOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  return {
    searchValue,
    setSearchValue,
    fetchingOptions,
    debouncedSearchValue,
  };
};
