import { useState, useCallback } from 'react';

import { DropdownOption, SingleDropdown, MultiDropdown } from '../types';

export const useDropdownState = (props: SingleDropdown | MultiDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = useCallback(
    (option: DropdownOption) => {
      if (props.multiple) {
        props.onChange([...props.value, option]);
      } else {
        props.onChange(option);
        setIsOpen(false);
      }
    },
    [props]
  );

  const handleOptionRemove = useCallback(
    (event: React.MouseEvent, optionToRemove: DropdownOption) => {
      event.stopPropagation();
      if (props.multiple) {
        props.onChange(props.value.filter((option) => option.value !== optionToRemove.value));
      }
    },
    [props]
  );

  const clearValue = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      if (props.multiple) {
        props.onChange([]);
      } else {
        props.onChange(null);
      }
    },
    [props]
  );

  return {
    isOpen,
    setIsOpen,
    handleOptionClick,
    handleOptionRemove,
    clearValue,
  };
};
