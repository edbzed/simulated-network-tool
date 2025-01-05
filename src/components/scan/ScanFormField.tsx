import React from 'react';
import { ValidationResult } from '../../utils/validation';

interface ScanFormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  validation?: ValidationResult;
}

export function ScanFormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  validation
}: ScanFormFieldProps) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:ring-2 focus:outline-none transition-colors duration-200
          ${validation?.isValid === false
            ? 'border-red-300 focus:ring-red-200 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
          }
          ${disabled ? 'bg-gray-50' : 'bg-white'}
        `}
        disabled={disabled}
      />
      {validation?.message && !validation.isValid && (
        <p className="mt-1 text-sm text-red-600">{validation.message}</p>
      )}
    </div>
  );
}