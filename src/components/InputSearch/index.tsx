/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * InputSearch component for search input with debounce.
 *
 * @param {string} [className] - The className to add your custom style.
 * @param {string} [label] - The label of the input.
 * @param {string} [value] - The value of the input field.
 * @param {Function} [onBlur] - Callback for blur event.
 * @param {Function} [onChange] - Callback for value change.
 * @param {Function} [onFocus] - Callback for focus event.
 * @param {string} [placeholder] - Placeholder text for the input.
 * @param {boolean} [required] - Whether the input is required.
 * @param {number} [debounce] - Debounce delay for input changes.
 * @param {boolean} [disabled] - Whether the input is disabled.
 */

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useDebounce } from 'use-debounce';
import { onlyAlphanumeric } from '../../utils';

export interface InputSearchProps {
  className: string;
  label: string;
  value: any;
  onBlur: () => void;
  onChange: (val: any) => any;
  onFocus: () => void;
  placeholder: string;
  required: boolean;
  debounce: number;
  disabled: boolean;
}
export default function InputSearch({
  className = '',
  label = '',
  value = '',
  onBlur = () => null,
  onChange = (val: any) => val,
  onFocus = () => null,
  placeholder = '',
  required = false,
  debounce = 0,
  disabled = false,
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState(value);
  const [debouncedValue] = useDebounce(inputValue, debounce);

  // Handle input changes and validate against only alphanumeric characters
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;
    if (onlyAlphanumeric(newValue) || newValue === '') {
      setInputValue(newValue);
    } else {
      event.preventDefault();
    }
  };

  // Trigger onChange with the debounced value
  useEffect(() => {
    if (onChange) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange]);

  // Reset the input value when the value prop changes
  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full flex-col space-y-2">
      {label && (
        <label
          className="block text-sm text-secondary"
          htmlFor={String(label).toLowerCase()}
        >
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div
        className={`${className} relative flex w-full flex-auto cursor-text items-center space-x-3 rounded-xl border border-ededed bg-white p-[14px] transition duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-[#EAECF0] disabled:bg-slate-100`}
      >
        <IconSearch className="text-secondary" size={20} />
        <input
          id={String(label).toLowerCase()}
          type="text"
          className="w-full text-sm text-181717 focus:outline-none"
          value={inputValue}
          placeholder={placeholder || `Isi ${label || 'data'}`}
          onChange={handleChangeInput}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          disabled={disabled}
        />
        {inputValue && (
          <div
            className="cursor-pointer"
            onClick={() => {
              setInputValue(''); // Clear the input value
              if (inputRef.current) {
                inputRef.current.focus(); // Refocus the input field
              }
            }}
          >
            <IconX className="text-212121" size={20} />
          </div>
        )}
      </div>
    </div>
  );
}
