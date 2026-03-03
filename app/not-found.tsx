import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-slate-700">That page doesn’t exist.</p>
      <Link className="text-sm underline" href="/">
        Go back to search
      </Link>
    </div>
  );
}
