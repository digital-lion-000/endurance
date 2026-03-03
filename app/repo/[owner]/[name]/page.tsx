import Link from "next/link";
import { getRepo, getRepoLanguages } from "@/lib/github";

function formatCompact(n: number) {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

function percent(n: number) {
  return `${Math.round(n * 100)}%`;
}

export default async function RepoDetailPage({
  params,
}: {
  params: { owner: string; name: string };
}) {
  const owner = decodeURIComponent(params.owner);
  const name = decodeURIComponent(params.name);

  const repo = await getRepo(owner, name);
  const langs = await getRepoLanguages(owner, name);

  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);
  const entries = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const updated = new Date(repo.updated_at);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link className="rounded-md text-sm text-slate-700 hover:underline" href="/">
          ← Back to search
        </Link>
        <a
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">{repo.full_name}</h1>
        {repo.description ? (
          <p className="mt-2 text-sm text-slate-700">{repo.description}</p>
        ) : (
          <p className="mt-2 text-sm text-slate-500 italic">No description provided.</p>
        )}

        <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <dt className="text-slate-500">Stars</dt>
            <dd className="font-medium">{formatCompact(repo.stargazers_count)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-slate-500">Forks</dt>
            <dd className="font-medium">{formatCompact(repo.forks_count)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-slate-500">Open issues</dt>
            <dd className="font-medium">{formatCompact(repo.open_issues_count)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-slate-500">Primary language</dt>
            <dd className="font-medium">{repo.language ?? "—"}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-slate-500">Updated</dt>
            <dd className="font-medium" title={updated.toISOString()}>
              {updated.toLocaleString()}
            </dd>
          </div>
        </dl>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold">Top languages</h2>
        <p className="mt-1 text-sm text-slate-700">
          Breakdown based on bytes reported by GitHub for this repository.
        </p>

        {entries.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No language data available.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {entries.map(([lang, bytes]) => {
              const ratio = totalBytes ? bytes / totalBytes : 0;
              return (
                <li key={lang} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="font-medium">{lang}</div>
                    <div className="text-slate-600">{percent(ratio)}</div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100" aria-hidden="true">
                    <div
                      className="h-2 rounded-full bg-slate-900"
                      style={{ width: `${Math.max(2, Math.round(ratio * 100))}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-base font-semibold">Notes</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Search is debounced to reduce API calls.</li>
          <li>Search results are capped to the first 1000 by GitHub Search API.</li>
          <li>Set a GITHUB_TOKEN to improve rate limits.</li>
        </ul>
      </section>
    </div>
  );
}
