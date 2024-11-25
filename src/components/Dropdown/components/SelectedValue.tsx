import { memo } from 'react';

import styles from '../dropdown.module.css';
import { DropdownOption } from '../types';

interface SelectedValueProps {
  value: DropdownOption | DropdownOption[] | null;
  multiple?: boolean;
  onRemove: (e: React.MouseEvent, option: DropdownOption) => void;
}

export const SelectedValue = memo(({ value, multiple, onRemove }: SelectedValueProps) => {
  if (multiple && Array.isArray(value)) {
    return (
      <ul className={styles.selectedList}>
        {value.map((option) => (
          <li key={option.value} className={styles.selectedItem}>
            {option.label}
            <button
              data-testid="remove-button"
              name="remove item"
              onClick={(e) => onRemove(e, option)}
            />
          </li>
        ))}
      </ul>
    );
  }

  return <p>{(value as DropdownOption)?.label}</p>;
});
