import React from 'react';

import styles from './checkbox.module.css';

type InputProps = {
  value?: boolean;
  onChange?: () => void;
  label?: string;
  padding?: string | number;
  color?: boolean;
  mode?: 'switch';
};

const Checkbox = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, label, padding, color, mode }, ref) => {
    return (
      <label
        className={[styles.label, label ? styles.labelWithText : ''].join(' ')}
        style={{ paddingInline: padding }}
      >
        <input
          ref={ref}
          checked={value}
          onChange={() => (onChange ? onChange() : null)}
          type="checkbox"
        />
        {label && <p>{label}</p>}
        <div
          className={[styles.checkbox, color ? styles.color : '', mode ? styles.switch : ''].join(
            ' '
          )}
          data-testid="box"
        />
      </label>
    );
  }
);

export default Checkbox;
