"use client";

import type { StudentProfile } from "@/modules/project-group-finder/types";

export default function ProfileHeaderCard({
  profile,
  showMore,
  onToggle,
}: {
  profile: StudentProfile;
  showMore: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={profile.fullName}
              src={profile.imageUrl || "https://api.dicebear.com/7.x/thumbs/svg?seed=student"}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xl font-semibold text-white">{profile.fullName}</p>
            <p className="mt-1 text-sm text-white/60">
              <span className="text-white/80">{profile.studentId}</span> • {profile.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="
            rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
            transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40
          "
        >
          {showMore ? "Hide details" : "Show more details"}
        </button>
      </div>
    </div>
  );
}