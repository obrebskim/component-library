import { memo } from 'react';

import styles from '../input.module.css';
import { TextInputType } from '../types';

import HiddenIcon from './Hidden.icon';
import VisibleIcon from './Visible.icon';

interface InputControlsProps {
  value: string | number | undefined;
  onClear: (e: React.MouseEvent) => void;
  isPasswordVisible?: boolean;
  type?: TextInputType;
  togglePassword?: () => void;
}

export const InputControls = memo(
  ({ value, onClear, type, isPasswordVisible, togglePassword }: InputControlsProps) => {
    return (
      <div className={[styles.controls, type === 'date' && value ? styles.date : ''].join(' ')}>
        {value && (
          <button
            type="button"
            className={styles.clear}
            onClick={onClear}
            aria-label="Clear selection"
            data-testid="clear-input"
          />
        )}
        {type === 'password' && (
          <button
            type="button"
            aria-label="Show password"
            name="show-password"
            className={styles.showPassword}
            onClick={togglePassword}
          >
            {isPasswordVisible ? <HiddenIcon /> : <VisibleIcon />}
          </button>
        )}
      </div>
    );
  }
);

InputControls.displayName = 'InputControls';
