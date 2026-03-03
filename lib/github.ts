import { GitHubLanguagesResponse, GitHubRepo, GitHubSearchResponse } from "@/types/github";

type GitHubError = {
  message: string;
  documentation_url?: string;
};

const GITHUB_API = "https://api.github.com";

function authHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toErrorMessage(status: number, bodyText?: string) {
  if (status === 403) {
    return "Rate limit hit. Add a GITHUB_TOKEN in .env.local to increase your limit.";
  }
  if (status === 404) return "Not found.";
  if (status >= 500) return "GitHub is having trouble right now. Try again in a bit.";
  if (bodyText) return bodyText;
  return "Request failed.";
}

async function githubFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${GITHUB_API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...authHeaders(),
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    let text = "";
    try {
      const data = (await res.json()) as GitHubError;
      text = data?.message ?? "";
    } catch {
      try {
        text = await res.text();
      } catch {
        text = "";
      }
    }
    throw new Error(toErrorMessage(res.status, text));
  }

  return (await res.json()) as T;
}

export async function searchRepos(args: {
  q: string;
  sort?: "stars" | "updated";
  order?: "desc" | "asc";
  page?: number;
  per_page?: number;
}) {
  const q = args.q.trim();
  if (!q) {
    const empty: GitHubSearchResponse = { total_count: 0, incomplete_results: false, items: [] };
    return empty;
  }

  const params = new URLSearchParams({
    q,
    sort: args.sort ?? "stars",
    order: args.order ?? "desc",
    page: String(args.page ?? 1),
    per_page: String(args.per_page ?? 10),
  });

  return githubFetch<GitHubSearchResponse>(`/search/repositories?${params.toString()}`);
}

export async function getRepo(owner: string, name: string) {
  return githubFetch<GitHubRepo>(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`);
}

export async function getRepoLanguages(owner: string, name: string) {
  return githubFetch<GitHubLanguagesResponse>(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}/languages`
  );
}
