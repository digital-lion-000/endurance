import Link from "next/link";
import type { GitHubRepo } from "@/types/github";

function formatCompact(n: number) {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(n);
}

export function RepoCard({ repo }: { repo: GitHubRepo }) {
  const [owner, name] = repo.full_name.split("/");
  const updated = new Date(repo.updated_at);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">
            <Link
              className="rounded-md underline-offset-4 hover:underline focus-visible:outline-none"
              href={`/repo/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`}
            >
              {repo.full_name}
            </Link>
          </h3>
          {repo.description ? (
            <p className="mt-1 line-clamp-2 text-sm text-slate-700">{repo.description}</p>
          ) : (
            <p className="mt-1 text-sm text-slate-500 italic">No description provided.</p>
          )}
        </div>
        <a
          className="shrink-0 rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          Open
        </a>
      </div>

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
          <dt className="text-slate-500">Language</dt>
          <dd className="font-medium">{repo.language ?? "—"}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-slate-500">Updated</dt>
          <dd className="font-medium" title={updated.toISOString()}>
            {updated.toLocaleDateString()}
          </dd>
        </div>
      </dl>
    </article>
  );
}
