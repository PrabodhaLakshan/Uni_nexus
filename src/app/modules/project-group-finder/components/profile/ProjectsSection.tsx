"use client";

import { useState } from "react";
import SectionCard from "./SectionCard";
import EmptyAddCard from "./EmptyAddCard";
import type { ProfileProject } from "@/app/modules/project-group-finder/types";

function RepoCard({ p, onRemove }: { p: ProfileProject; onRemove: (id: string) => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-blue-500/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-white font-semibold">{p.name}</p>
          <p className="mt-1 text-sm text-white/60">{p.description}</p>
        </div>
        <button onClick={() => onRemove(p.id)} className="text-xs text-red-300 hover:text-red-200">
          Remove
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs">
        {p.repoUrl && (
          <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">
            Repo →
          </a>
        )}
        {p.liveUrl && (
          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-blue-300 hover:text-blue-200">
            Live →
          </a>
        )}
        {p.updatedAt && <span className="text-white/50">Updated {p.updatedAt}</span>}
      </div>
    </div>
  );
}

export default function ProjectsSection({
  projects,
  onAdd,
  onRemove,
}: {
  projects: ProfileProject[];
  onAdd: (proj: ProfileProject) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("Next.js, Prisma");
  const [repo, setRepo] = useState("");
  const [live, setLive] = useState("");

  const add = () => {
    if (!name.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: desc.trim() || "No description",
      tech: tech.split(",").map((x) => x.trim()).filter(Boolean),
      repoUrl: repo.trim() || undefined,
      liveUrl: live.trim() || undefined,
      updatedAt: "just now",
    });

    setName(""); setDesc(""); setTech("Next.js, Prisma"); setRepo(""); setLive("");
    setOpen(false);
  };

  return (
    <SectionCard title="Personal Projects" hint="Add projects like GitHub repo cards.">
      {projects.length === 0 && !open ? (
        <EmptyAddCard text="Add your first project." onAdd={() => setOpen(true)} />
      ) : null}

      {open ? (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            rows={3}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <input
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="Tech stack (comma separated)"
            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="Repo URL (optional)"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
            />
            <input
              value={live}
              onChange={(e) => setLive(e.target.value)}
              placeholder="Live URL (optional)"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-blue-500/40"
            />
          </div>

          <div className="flex gap-2">
            <button onClick={add} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500">
              Add Project
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mb-4 text-xs text-blue-300 hover:text-blue-200"
        >
          + Add new project
        </button>
      )}

      <div className="space-y-3">
        {projects.map((p) => (
          <RepoCard key={p.id} p={p} onRemove={onRemove} />
        ))}
      </div>
    </SectionCard>
  );
}