import { useMemo, useRef } from 'react';

import styles from '../dropdown.module.css';
import { useDropdownState, useDropdownSearch, useInViewport, useOutsideClick } from '../hooks';
import { DropdownProps, MultiDropdown, SingleDropdown } from '../types';

import { DropdownOptions } from './DropdownOptions';
import { DropdownSearch } from './DropdownSearch';
import { DropdownTrigger } from './DropdownTrigger';

const Dropdown = ({
  label,
  options,
  multiple,
  value,
  searchable,
  asyncSearch,
  error,
  onChange,
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isOpen, setIsOpen, handleOptionClick, handleOptionRemove, clearValue } = useDropdownState(
    {
      value,
      multiple,
      onChange,
    } as SingleDropdown | MultiDropdown
  );

  const { searchValue, setSearchValue, fetchingOptions, debouncedSearchValue } =
    useDropdownSearch(asyncSearch);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { position } = useInViewport({ selectRef, optionsRef, isOpen });

  const optionsExcludingSelected = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options
        .filter((option) => !value.some((v) => v.value === option.value))
        .filter((option) =>
          option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        );
    } else if (!Array.isArray(value)) {
      return options
        .filter((option) => option.value !== value?.value)
        .filter((option) =>
          option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
        );
    }
    return options;
  }, [value, options, debouncedSearchValue, multiple]);

  return (
    <div ref={dropdownRef} className={[styles.dropdown, isOpen ? styles.focused : ''].join(' ')}>
      <DropdownTrigger
        label={label}
        value={value}
        multiple={multiple}
        isOpen={isOpen}
        error={error}
        onRemove={handleOptionRemove}
        onClear={clearValue}
        onClick={() => setIsOpen(!isOpen)}
        ref={selectRef}
      />
      {isOpen && (
        <div
          className={[styles.optionsWrapper, position === 'top' ? styles.top : ''].join(' ')}
          ref={optionsRef}
        >
          {searchable && (
            <DropdownSearch
              value={searchValue}
              onChange={setSearchValue}
              disabled={fetchingOptions}
            />
          )}
          <DropdownOptions options={optionsExcludingSelected} onSelect={handleOptionClick} />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
