import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl border border-slate-200 bg-slate-50" aria-hidden="true" />
          <div className="leading-tight">
            <div className="text-sm font-semibold">Repo Explorer</div>
            <div className="text-xs text-slate-600">GitHub public API</div>
          </div>
        </div>
        <nav className="text-sm">
          <Link className="rounded-md px-2 py-1 hover:bg-slate-100" href="/">
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
