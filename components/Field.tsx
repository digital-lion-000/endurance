"use client";

import { clsx } from "clsx";
import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Field({ label, hint, className, id, ...props }: Props) {
  const inputId = id ?? React.useId();

  return (
    <div className="space-y-1">
      <label htmlFor={inputId} className="text-sm font-medium">
        {label}
      </label>
      {hint ? <div className="text-xs text-slate-600">{hint}</div> : null}
      <input
        id={inputId}
        className={clsx(
          "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm",
          "focus:border-slate-900",
          className
        )}
        {...props}
      />
    </div>
  );
}
