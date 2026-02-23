// components/groupFinder/SearchResults.tsx
"use client";

import * as React from "react";
import type { StudentProfile } from "./ProfileCard";

export type SearchResult = StudentProfile & {
  matchScore: number; // 0-100
  matchedSkills: string[];
};

function SkillPill({ text, highlighted }: { text: string; highlighted?: boolean }) {
  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-xs border",
        highlighted
          ? "border-blue-500/30 bg-blue-500/10 text-white"
          : "border-white/10 bg-white/5 text-white/75",
      ].join(" ")}
    >
      {text}
    </span>
  );
}

export default function SearchResults({
  results,
  loading,
  onRequest,
}: {
  results: SearchResult[];
  loading?: boolean;
  onRequest?: (studentId: string) => void;
}) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">Search Results</h3>
        <p className="text-xs text-white/60">
          {loading ? "Searching..." : `${results.length} found`}
        </p>
      </div>

      <div className="mt-3 space-y-3">
        {loading && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            Loading results…
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
            No matches found. Try changing filters.
          </div>
        )}

        {!loading &&
          results.map((r) => (
            <div
              key={r.id}
              className="
                rounded-2xl border border-white/10
                bg-gradient-to-b from-white/10 to-white/5
                p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
                transition hover:border-blue-500/30
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={r.name}
                      src={r.imageUrl || "https://api.dicebear.com/7.x/thumbs/svg?seed=match"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{r.name}</p>
                    <p className="truncate text-xs text-white/60">{r.specialization}</p>
                    <p className="mt-1 text-xs text-white/60">
                      GPA: <span className="text-white/80">{r.gpa?.toFixed(2) ?? "—"}</span> •{" "}
                      <span className="text-white/80">{r.availability ?? "—"}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-white/60">Match</p>
                  <p className="text-sm font-bold text-white">{r.matchScore}%</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {r.skills.slice(0, 10).map((s) => (
                  <SkillPill key={s} text={s} highlighted={r.matchedSkills.includes(s)} />
                ))}
                {r.skills.length > 10 && <SkillPill text={`+${r.skills.length - 10}`} />}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-white/60">
                  Matched skills:{" "}
                  <span className="text-white/80">
                    {r.matchedSkills.length ? r.matchedSkills.join(", ") : "—"}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => onRequest?.(r.id)}
                  className="
                    rounded-xl border border-blue-500/30
                    bg-blue-500/10 px-3 py-2
                    text-xs font-semibold text-white
                    transition hover:bg-blue-500/15
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                  "
                >
                  Request to Join
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}