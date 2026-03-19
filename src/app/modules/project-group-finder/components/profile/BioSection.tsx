"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import EmptyAddCard from "./EmptyAddCard";

export default function BioSection({
  bio,
  onSave,
}: {
  bio?: string;
  onSave: (bio: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(bio || "");

  return (
    <SectionCard title="Bio" hint="Write a short intro like a portfolio.">
      {!bio && !editing ? (
        <EmptyAddCard text="Add a short bio about yourself." onAdd={() => setEditing(true)} />
      ) : editing ? (
        <div className="space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            placeholder="Example: I'm a 2nd-year IT student focusing on web development..."
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                onSave(draft.trim());
                setEditing(false);
              }}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(bio || "");
                setEditing(false);
              }}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-white/80 whitespace-pre-wrap">{bio}</p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-3 text-xs text-blue-300 hover:text-blue-200"
          >
            Edit
          </button>
        </div>
      )}
    </SectionCard>
  );
}