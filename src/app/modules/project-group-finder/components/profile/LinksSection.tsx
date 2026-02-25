"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import EmptyAddCard from "./EmptyAddCard";

export default function LinksSection({
  githubUrl,
  linkedinUrl,
  onSave,
}: {
  githubUrl?: string;
  linkedinUrl?: string;
  onSave: (data: { githubUrl?: string; linkedinUrl?: string }) => void;
}) {
  const hasAny = !!githubUrl || !!linkedinUrl;

  const [editing, setEditing] = useState(false);
  const [gh, setGh] = useState(githubUrl || "");
  const [li, setLi] = useState(linkedinUrl || "");

  return (
    <SectionCard title="Links" hint="Add your GitHub and LinkedIn profiles.">
      {!hasAny && !editing ? (
        <EmptyAddCard text="Add GitHub/LinkedIn links." onAdd={() => setEditing(true)} />
      ) : editing ? (
        <div className="space-y-3">
          <input
            value={gh}
            onChange={(e) => setGh(e.target.value)}
            placeholder="GitHub URL (https://github.com/username)"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <input
            value={li}
            onChange={(e) => setLi(e.target.value)}
            placeholder="LinkedIn URL (https://linkedin.com/in/username)"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onSave({ githubUrl: gh.trim(), linkedinUrl: li.trim() });
                setEditing(false);
              }}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setGh(githubUrl || "");
                setLi(linkedinUrl || "");
                setEditing(false);
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4 space-y-2">
          {githubUrl && (
            <a className="text-sm text-blue-300 hover:text-blue-200" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub → {githubUrl}
            </a>
          )}
          {linkedinUrl && (
            <a className="text-sm text-blue-300 hover:text-blue-200" href={linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn → {linkedinUrl}
            </a>
          )}
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="block text-xs text-blue-300 hover:text-blue-200"
          >
            Edit
          </button>
        </div>
      )}
    </SectionCard>
  );
}