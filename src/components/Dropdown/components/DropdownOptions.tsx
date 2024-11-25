import { memo } from 'react';

import styles from '../dropdown.module.css';
import { DropdownOption } from '../types';

interface DropdownOptionsProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
}

export const DropdownOptions = memo(({ options, onSelect }: DropdownOptionsProps) => {
  return (
    <ul className={styles.options} role="listbox">
      {options.length > 0 ? (
        options.map((option) => (
          <li
            key={option.value}
            className={styles.option}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(option);
            }}
            role="option"
          >
            {option.label}
          </li>
        ))
      ) : (
        <li className={[styles.option, styles.noOptions].join(' ')}>No options found</li>
      )}
    </ul>
  );
});
