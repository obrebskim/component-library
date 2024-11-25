import React, { useState, useEffect } from 'react';

import { InputControls } from './components/InputControls';
import NumberInput from './components/NumberInput';
import TextInput from './components/TextInput';
import styles from './input.module.css';
import { InputProps } from './types';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, type, value, onChange, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [hasRefValue, setHasRefValue] = useState(false);

    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        const checkRefValue = () => {
          const refValue = ref.current?.value;
          setHasRefValue(!!refValue);
        };

        checkRefValue();

        ref.current.addEventListener('input', checkRefValue);
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          ref.current?.removeEventListener('input', checkRefValue);
        };
      }
    }, [ref]);

    const handleChange = (newValue: string | number | undefined) => {
      if (!ref && onChange) {
        onChange(newValue as never);
      }
    };

    const defaultValue = ref ? props.defaultValue : undefined;

    return (
      <label className={styles.wrapper}>
        <span
          className={[
            styles.label,
            isFocused || (!ref && value) || (ref && hasRefValue) ? styles.focused : '',
          ].join(' ')}
        >
          {label}
        </span>
        {type === 'number' ? (
          <>
            <NumberInput
              ref={ref}
              disabled={disabled}
              value={ref ? undefined : value === undefined ? '' : value}
              defaultValue={defaultValue}
              onChange={(e) =>
                handleChange(e.target.value === '' ? undefined : Number(e.target.value))
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={[styles.input, error ? styles.invalid : ''].join(' ')}
            />
            {!ref && <InputControls value={value} onClear={() => handleChange(undefined)} />}
          </>
        ) : (
          <>
            <TextInput
              ref={ref}
              disabled={disabled}
              type={type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type}
              value={ref ? undefined : (value as string)}
              defaultValue={defaultValue as string}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder=""
              className={[
                styles.input,
                error ? styles.invalid : '',
                type === 'date' && value ? styles.hasValue : '',
              ].join(' ')}
            />
            {!ref && (
              <InputControls
                value={value}
                onClear={() => handleChange('')}
                type={type}
                isPasswordVisible={isPasswordVisible}
                togglePassword={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            )}
          </>
        )}

        {error && <span className={styles.error}>{error}</span>}
      </label>
    );
  }
);

export default Input;
