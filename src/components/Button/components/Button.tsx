import React from 'react';

import styles from '../button.module.css';

import ButtonLoader from './ButtonLoader';

type BaseProps = {
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  width?: number | string;
};

type LabelProps = BaseProps & {
  label: string;
  pending?: boolean;
};

type ChildrenProps = BaseProps & {
  children: React.ReactNode;
};

type Props = LabelProps | ChildrenProps;

const Button = (props: Props) => {
  const { onClick, disabled, type, width = '100%' } = props;

  if ('label' in props) {
    return (
      <button
        style={{ width }}
        onClick={onClick}
        type={type}
        disabled={disabled || props.pending}
        className={styles.button}
      >
        {props.label}
        {props.pending && <ButtonLoader />}
      </button>
    );
  }

  return (
    <button
      style={{ width }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={styles.button}
    >
      {props.children}
    </button>
  );
};

export default Button;
