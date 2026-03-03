"use client";

import { clsx } from "clsx";
import * as React from "react";

type Option = { value: string; label: string };

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
};

export function Select({ label, options, className, id, ...props }: Props) {
  const selectId = id ?? React.useId();

  return (
    <div className="space-y-1">
      <label htmlFor={selectId} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={selectId}
        className={clsx(
          "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm",
          "focus:border-slate-900",
          className
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
