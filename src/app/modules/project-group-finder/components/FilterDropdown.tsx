// components/groupFinder/FilterDropdown.tsx
"use client";

import * as React from "react";

type Option = { label: string; value: string };

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export default function FilterDropdown({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled = false,
}: Props) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-white/80"
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(name, e.target.value)}
          className="
            w-full appearance-none
            rounded-xl border border-white/10
            bg-white/5 px-4 py-3 pr-10
            text-white outline-none
            transition
            focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          <option value="" className="bg-slate-900">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-slate-900">
              {opt.label}
            </option>
          ))}
        </select>

        {/* chevron */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}