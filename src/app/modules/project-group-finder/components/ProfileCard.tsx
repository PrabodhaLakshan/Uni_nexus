// components/groupFinder/ProfileCard.tsx
"use client";

import * as React from "react";

export type StudentProfile = {
  id: string;
  name: string;
  email?: string;
  imageUrl?: string;
  specialization: string;
  gpa?: number;
  year?: string;
  semester?: string;
  batch?: string;
  availability?: string;
  skills: string[];
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

export default function ProfileCard({
  profile,
  onViewFull,
}: {
  profile: StudentProfile;
  onViewFull?: () => void;
}) {
  return (
    <aside
      className="
        sticky top-6
        rounded-2xl border border-white/10
        bg-gradient-to-b from-white/10 to-white/5
        p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
      "
    >
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={profile.name}
            src={profile.imageUrl || "https://api.dicebear.com/7.x/thumbs/svg?seed=student"}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-white">{profile.name}</p>
          <p className="truncate text-sm text-white/60">{profile.specialization}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-xs text-white/60">GPA</p>
          <p className="text-sm font-semibold text-white">
            {profile.gpa?.toFixed(2) ?? "—"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-xs text-white/60">Availability</p>
          <p className="text-sm font-semibold text-white">
            {profile.availability ?? "—"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-white/70">Skills</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.skills.slice(0, 8).map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          {profile.skills.length > 8 && <Badge>+{profile.skills.length - 8}</Badge>}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex flex-wrap gap-2 text-xs text-white/70">
          {profile.year && <span>Year: {profile.year}</span>}
          {profile.semester && <span>Semester: {profile.semester}</span>}
          {profile.batch && <span>Batch: {profile.batch}</span>}
        </div>

        <button
          type="button"
          onClick={onViewFull}
          className="
            w-full rounded-xl
            bg-blue-600 px-4 py-2.5
            text-sm font-semibold text-white
            transition
            hover:bg-blue-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/40
          "
        >
          View Full Profile
        </button>
      </div>
    </aside>
  );
}