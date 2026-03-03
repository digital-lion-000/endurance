"use client";

import { clsx } from "clsx";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <button
        type="button"
        className={clsx(
          "rounded-lg border border-slate-200 px-3 py-1.5 text-sm",
          canPrev ? "hover:bg-slate-50" : "cursor-not-allowed opacity-50"
        )}
        onClick={() => (canPrev ? onPageChange(page - 1) : null)}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        Prev
      </button>
      <div className="text-sm text-slate-700">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </div>
      <button
        type="button"
        className={clsx(
          "rounded-lg border border-slate-200 px-3 py-1.5 text-sm",
          canNext ? "hover:bg-slate-50" : "cursor-not-allowed opacity-50"
        )}
        onClick={() => (canNext ? onPageChange(page + 1) : null)}
        disabled={!canNext}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
