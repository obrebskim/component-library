type BaseProps = {
  label: string;
  error?: string | null;
  disabled?: boolean;
};

type TextInputType = 'text' | 'password' | 'email' | 'date';

// Props for uncontrolled input with ref
type RefInputProps = BaseProps & {
  ref: React.RefObject<HTMLInputElement>;
  type?: TextInputType | 'number';
  defaultValue?: string | number | undefined;
  value?: never;
  onChange?: never;
};

// Controlled text input props
type ControlledTextProps = BaseProps & {
  ref?: never;
  type?: TextInputType;
  value: string;
  defaultValue?: never;
  onChange: (value: string) => void;
};

// Controlled number input props
type ControlledNumberProps = BaseProps & {
  ref?: never;
  type: 'number';
  value: number | undefined;
  defaultValue?: never;
  onChange: (value?: number) => void;
};

type InputProps = RefInputProps | ControlledTextProps | ControlledNumberProps;

export type { InputProps, TextInputType };
