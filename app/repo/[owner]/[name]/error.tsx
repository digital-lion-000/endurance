"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-xl font-semibold">Couldn’t load that repo</h1>
      <p className="text-sm text-slate-700">{error.message}</p>
      <div className="flex gap-3">
        <button
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          onClick={() => reset()}
        >
          Try again
        </button>
        <Link className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50" href="/">
          Back to search
        </Link>
      </div>
    </div>
  );
}
