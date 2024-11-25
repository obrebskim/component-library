import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const NumberInput = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} type="number" />;
});

export default NumberInput;
