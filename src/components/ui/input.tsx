"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const baseInputClasses = `
  w-full px-4 py-3.5
  bg-bg-secondary text-text-primary
  border border-border rounded-xl
  placeholder:text-text-muted
  transition-all duration-200
  focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30
  disabled:opacity-50 disabled:cursor-not-allowed
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            baseInputClasses,
            error && "border-error focus:border-error focus:ring-error/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-caption text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-caption text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={clsx(
            baseInputClasses,
            "min-h-[120px] resize-y",
            error && "border-error focus:border-error focus:ring-error/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-caption text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-caption text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-body-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={clsx(
              baseInputClasses,
              "appearance-none cursor-pointer pr-10",
              error && "border-error focus:border-error focus:ring-error/30",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-caption text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-caption text-text-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

interface RadioGroupProps {
  label?: string;
  name: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: RadioGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <fieldset className="space-y-3">
      {label && (
        <legend className="block text-body-sm font-medium text-text-secondary">
          {label}
        </legend>
      )}
      <div className={clsx("grid gap-3", gridCols[columns])}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              "flex items-center px-4 py-3 rounded-xl cursor-pointer",
              "border transition-all duration-200",
              value === option.value
                ? "border-accent-primary bg-accent-glow text-text-primary"
                : "border-border bg-bg-secondary text-text-secondary hover:border-border-hover"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only"
            />
            <span className="text-body-sm">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-caption text-error">{error}</p>
      )}
    </fieldset>
  );
}
