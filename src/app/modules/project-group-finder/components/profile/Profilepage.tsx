"use client";

import { useMemo, useState } from "react";
import type { StudentProfile, Mark } from "@/app/modules/project-group-finder/types";

import ProfileHeaderCard from "./ProfileHeaderCard";
import BioSection from "./BioSection";
import MobileSection from "./MobileSection";
import LinksSection from "./LinksSection";
import ProjectsSection from "./ProjectsSection";
import ResultSheetSection from "./ResultSheetSection";

export default function ProfilePage() {
  // ✅ Replace this with real data from DB later
  const [profile, setProfile] = useState<StudentProfile>({
    id: "p1",
    fullName: "Praboda Lakshan",
    studentId: "IT23817630",
    email: "praboda@gmail.com",
    imageUrl: "",

    bio: "",
    mobile: "",
    githubUrl: "",
    linkedinUrl: "",

    projects: [],

    resultSheet: {
      status: "EMPTY",
      allMarks: [],
      publishedMarks: [],
    },
  });

  const [showMore, setShowMore] = useState(false);

  // For Result Sheet selection
  const publishedKeySet = useMemo(() => {
    return new Set(profile.resultSheet.publishedMarks.map((m) => markKey(m)));
  }, [profile.resultSheet.publishedMarks]);

  function markKey(m: Mark) {
    return `${m.moduleCode}-${m.marks}-${m.grade}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1020] to-black">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ProfileHeaderCard
          profile={profile}
          showMore={showMore}
          onToggle={() => setShowMore((s) => !s)}
        />

        {!showMore ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Portfolio mode</p>
                <p className="mt-1 text-sm text-white/60">
                  Click <span className="text-white">Show more</span> to add bio, links, projects and marks.
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
                Quick View
              </span>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* LEFT (main) */}
            <div className="lg:col-span-2 space-y-6">
              <BioSection
                bio={profile.bio}
                onSave={(bio) => setProfile((p) => ({ ...p, bio }))}
              />

              <ProjectsSection
                projects={profile.projects}
                onAdd={(proj) =>
                  setProfile((p) => ({ ...p, projects: [proj, ...p.projects] }))
                }
                onRemove={(id) =>
                  setProfile((p) => ({ ...p, projects: p.projects.filter((x) => x.id !== id) }))
                }
              />

              <ResultSheetSection
                state={profile.resultSheet}
                publishedKeySet={publishedKeySet}
                onUploadMock={(fileName) => {
                  // UI demo: simulate "scan + verify + extract marks"
                  const demoMarks: Mark[] = [
                    { moduleCode: "IT3020", moduleName: "Database Systems", marks: 85, grade: "A", semester: "Y2S2" },
                    { moduleCode: "IT3030", moduleName: "Software Engineering", marks: 72, grade: "A-", semester: "Y2S2" },
                    { moduleCode: "IT3040", moduleName: "Networking", marks: 66, grade: "B+", semester: "Y2S2" },
                    { moduleCode: "IT3050", moduleName: "Web Development", marks: 91, grade: "A+", semester: "Y2S2" },
                  ];

                  setProfile((p) => ({
                    ...p,
                    resultSheet: {
                      fileName,
                      status: "VERIFIED",      // later backend sets this
                      allMarks: demoMarks,
                      publishedMarks: [],      // student selects
                    },
                  }));
                }}
                onTogglePublish={(mark, enabled) => {
                  setProfile((p) => {
                    const key = markKey(mark);
                    const next = enabled
                      ? [...p.resultSheet.publishedMarks, mark]
                      : p.resultSheet.publishedMarks.filter((m) => markKey(m) !== key);

                    return {
                      ...p,
                      resultSheet: { ...p.resultSheet, publishedMarks: next },
                    };
                  });
                }}
                onPublishSave={() => {
                  // ✅ Here you will call API to save ONLY publishedMarks to DB.
                  alert("Saved published marks (only selected marks should be stored in DB).");
                }}
              />
            </div>

            {/* RIGHT (sidebar) */}
            <div className="space-y-6">
              <MobileSection
                mobile={profile.mobile}
                onSave={(mobile) => setProfile((p) => ({ ...p, mobile }))}
              />

              <LinksSection
                githubUrl={profile.githubUrl}
                linkedinUrl={profile.linkedinUrl}
                onSave={(data) => setProfile((p) => ({ ...p, ...data }))}
              />

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold text-white">Quick Stats</p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-white/60">Projects</p>
                    <p className="mt-1 text-lg font-semibold text-white">{profile.projects.length}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <p className="text-xs text-white/60">Published Marks</p>
                    <p className="mt-1 text-lg font-semibold text-white">{profile.resultSheet.publishedMarks.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-xs text-white/60">
                Tip: Keep your profile minimal and strong — only publish marks you are comfortable sharing.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}