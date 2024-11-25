import { memo, useEffect, useRef } from 'react';

import styles from '../dropdown.module.css';

import DropdownLoader from './DropdownLoader';

interface DropdownSearchProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export const DropdownSearch = memo(({ value, disabled, onChange }: DropdownSearchProps) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current && !disabled) {
      ref.current.focus();
    }
  }, [disabled]);

  return (
    <div className={styles.searchWrapper}>
      <input
        ref={ref}
        type="text"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      {disabled && <DropdownLoader />}
      {value && !disabled && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange('')}
          aria-label="Clear search"
        />
      )}
    </div>
  );
});
