type DropdownOption = {
  label: string;
  value: string | number;
};

type BaseDropdown = {
  label: string;
  options: DropdownOption[];
  searchable?: boolean;
  asyncSearch?: (searchValue: string) => Promise<void>;
  error?: string | null;
};

type SingleDropdown = BaseDropdown & {
  value: DropdownOption | null;
  multiple?: false;
  onChange: (value: DropdownOption | null) => void;
};

type MultiDropdown = BaseDropdown & {
  value: DropdownOption[];
  multiple: true;
  onChange: (value: DropdownOption[]) => void;
};

type DropdownProps = SingleDropdown | MultiDropdown;

export type { DropdownOption, SingleDropdown, MultiDropdown, DropdownProps };
