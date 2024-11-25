import { memo } from 'react';

import styles from '../dropdown.module.css';
import { DropdownOption } from '../types';

interface DropdownControlsProps {
  isOpen: boolean;
  value: DropdownOption | DropdownOption[] | null;
  multiple?: boolean;
  onClear: (e: React.MouseEvent) => void;
}

export const DropdownControls = memo(
  ({ isOpen, value, multiple, onClear }: DropdownControlsProps) => {
    const hasValue = multiple ? Array.isArray(value) && value.length > 0 : value !== null;

    return (
      <div className={styles.controls}>
        {hasValue && (
          <button
            type="button"
            className={styles.clear}
            name="clear"
            onClick={onClear}
            aria-label="Clear selection"
            data-testid="clear-selection"
          />
        )}
        <button className={[styles.arrow, isOpen ? styles.open : ''].join(' ')} />
      </div>
    );
  }
);

DropdownControls.displayName = 'DropdownControls';
