import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      json: async () => ({ ok: true, data: { total_count: 0, incomplete_results: false, items: [] } }),
    })) as any
  );
});

describe("HomePage", () => {
  it("renders search input", () => {
    render(<HomePage />);
    expect(screen.getByLabelText(/search repositories/i)).toBeInTheDocument();
  });
});
