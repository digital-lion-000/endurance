export function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="mt-1 text-sm text-slate-700">{children}</div>
    </section>
  );
}
