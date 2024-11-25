import { memo, forwardRef } from 'react';

import styles from '../dropdown.module.css';
import { DropdownOption } from '../types';

import { DropdownControls } from './DropdownControls';
import { SelectedValue } from './SelectedValue';

interface DropdownTriggerProps {
  label: string;
  value: DropdownOption | DropdownOption[] | null;
  multiple?: boolean;
  isOpen: boolean;
  error?: string | null;
  onRemove: (event: React.MouseEvent, option: DropdownOption) => void;
  onClear: (event: React.MouseEvent) => void;
  onClick: () => void;
}

export const DropdownTrigger = memo(
  forwardRef<HTMLDivElement, DropdownTriggerProps>(
    ({ label, value, multiple, isOpen, error, onRemove, onClear, onClick }, ref) => (
      <div
        ref={ref}
        className={[
          styles.selected,
          isOpen ? styles.focused : '',
          error ? styles.invalid : '',
        ].join(' ')}
        onClick={onClick}
      >
        <span
          className={[
            styles.selectedLabel,
            (!Array.isArray(value) && value) ||
            (Array.isArray(value) && (value as DropdownOption[]).length > 0)
              ? styles.focused
              : '',
          ].join(' ')}
        >
          {label}
        </span>
        <SelectedValue value={value} multiple={multiple} onRemove={onRemove} />
        <DropdownControls isOpen={isOpen} value={value} multiple={multiple} onClear={onClear} />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  )
);
