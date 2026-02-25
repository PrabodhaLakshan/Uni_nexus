"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import EmptyAddCard from "./EmptyAddCard";

export default function MobileSection({
  mobile,
  onSave,
}: {
  mobile?: string;
  onSave: (mobile: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(mobile || "");

  return (
    <SectionCard title="Mobile Number" hint="Optional, for easier contact.">
      {!mobile && !editing ? (
        <EmptyAddCard text="Add your mobile number." onAdd={() => setEditing(true)} />
      ) : editing ? (
        <div className="space-y-3">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="07XXXXXXXX"
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
                setDraft(mobile || "");
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
          <p className="text-sm text-white/80">{mobile}</p>
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