"use client";

import { useEffect, useMemo, useState } from "react";
import type { GitHubSearchResponse } from "@/types/github";
import { Field } from "@/components/Field";
import { Select } from "@/components/Select";
import { RepoCard } from "@/components/RepoCard";
import { Pagination } from "@/components/Pagination";
import { Notice } from "@/components/Notice";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type ApiOk = { ok: true; data: GitHubSearchResponse };
type ApiErr = { ok: false; error: string };
type ApiResp = ApiOk | ApiErr;

const PER_PAGE = 10;

export default function HomePage() {
  const defaultQuery = process.env.NEXT_PUBLIC_DEFAULT_QUERY ?? "react";
  const [query, setQuery] = useState(defaultQuery);
  const debouncedQuery = useDebouncedValue(query, 350);

  const [sort, setSort] = useState<"stars" | "updated">("stars");
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);

  const [data, setData] = useState<GitHubSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, sort, order]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        q: debouncedQuery,
        sort,
        order,
        page: String(page),
        per_page: String(PER_PAGE),
      });

      try {
        const res = await fetch(`/api/search?${params.toString()}`);
        const json = (await res.json()) as ApiResp;

        if (cancelled) return;

        if (!json.ok) {
          setData(null);
          setError(json.error);
          return;
        }

        setData(json.data);
      } catch {
        if (cancelled) return;
        setData(null);
        setError("Network error. Check your connection and try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, sort, order, page]);

  const totalPages = useMemo(() => {
    const total = data?.total_count ?? 0;
    const capped = Math.min(total, 1000);
    return Math.max(1, Math.ceil(capped / PER_PAGE));
  }, [data]);

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Search GitHub repositories</h1>
        <p className="text-sm text-slate-700">
          Explore repos with strong UX fundamentals: typing, resilience, pagination, accessibility, and clean code.
        </p>
      </section>

      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3">
        <div className="md:col-span-1">
          <Field
            label="Search"
            hint="Example: nextjs stars:>5000 language:TypeScript"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repositories…"
            inputMode="search"
            aria-label="Search repositories"
          />
        </div>

        <Select
          label="Sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          options={[
            { value: "stars", label: "Stars" },
            { value: "updated", label: "Recently updated" },
          ]}
        />

        <Select
          label="Order"
          value={order}
          onChange={(e) => setOrder(e.target.value as typeof order)}
          options={[
            { value: "desc", label: "Descending" },
            { value: "asc", label: "Ascending" },
          ]}
        />
      </section>

      {error ? <Notice title="Something went wrong">{error}</Notice> : null}
      {loading ? <Notice title="Loading">Fetching results…</Notice> : null}

      {!loading && !error && data && data.items.length === 0 ? (
        <Notice title="No results">Try a broader search term, or remove filters like language/stars.</Notice>
      ) : null}

      {!error && data && data.items.length > 0 ? (
        <>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <div>
              Showing <span className="font-medium">{data.items.length}</span> results{" "}
              {data.total_count ? (
                <>
                  out of <span className="font-medium">{Math.min(data.total_count, 1000)}</span>
                  {data.total_count > 1000 ? " (capped by GitHub Search API)" : null}
                </>
              ) : null}
            </div>
            <div className="text-slate-500">Tip: add a token to avoid rate limits.</div>
          </div>

          <div className="grid gap-4">
            {data.items.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      ) : null}
    </div>
  );
}
