"use client";

import clsx from "clsx";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value, onChange, placeholder, className }: SearchInputProps) {
  return (
    <div className={clsx("relative", className)}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full px-11 py-3 rounded-xl bg-bg-secondary text-text-primary",
          "border border-border placeholder:text-text-muted",
          "focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/30"
        )}
      />
      <svg
        className="w-5 h-5 text-text-muted absolute left-4 top-1/2 -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
      </svg>
    </div>
  );
}
