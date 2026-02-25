"use client";

import SectionCard from "./SectionCard";
import EmptyAddCard from "./EmptyAddCard";
import type { Mark, ResultSheetState } from "@/app/modules/project-group-finder/types";

export default function ResultSheetSection({
  state,
  publishedKeySet,
  onUploadMock,
  onTogglePublish,
  onPublishSave,
}: {
  state: ResultSheetState;
  publishedKeySet: Set<string>;
  onUploadMock: (fileName: string) => void;
  onTogglePublish: (mark: Mark, enabled: boolean) => void;
  onPublishSave: () => void;
}) {
  const hasMarks = state.allMarks.length > 0;

  const keyOf = (m: Mark) => `${m.moduleCode}-${m.marks}-${m.grade}`;

  return (
    <SectionCard
      title="Official Mark Sheet"
      hint="Upload your official result sheet. System validates + extracts marks. Then you choose what to publish."
    >
      {state.status === "EMPTY" ? (
        <EmptyAddCard
          text="Upload your official mark sheet (PDF/image)."
          onAdd={() => onUploadMock("resultsheet.pdf")}
        />
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">
                {state.fileName || "Uploaded file"}
              </p>
              <p className="mt-1 text-xs text-white/60">
                Status:{" "}
                <span
                  className={[
                    "rounded-full border px-2 py-0.5",
                    state.status === "VERIFIED"
                      ? "border-green-500/30 bg-green-500/10 text-green-200"
                      : state.status === "PENDING"
                      ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200",
                  ].join(" ")}
                >
                  {state.status}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => onUploadMock("resultsheet.pdf")}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10"
            >
              Re-upload
            </button>
          </div>

          {!hasMarks ? (
            <p className="mt-4 text-sm text-white/60">
              No marks extracted yet.
            </p>
          ) : (
            <>
              <p className="mt-4 text-sm font-semibold text-white">
                Extracted Marks (select what to publish)
              </p>

              <div className="mt-3 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/5 text-white/70">
                    <tr>
                      <th className="px-4 py-3 w-16">Publish</th>
                      <th className="px-4 py-3">Module</th>
                      <th className="px-4 py-3">Marks</th>
                      <th className="px-4 py-3">Grade</th>
                      <th className="px-4 py-3">Semester</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {state.allMarks.map((m) => {
                      const checked = publishedKeySet.has(keyOf(m));
                      return (
                        <tr key={keyOf(m)} className="bg-black/10 text-white/80">
                          <td className="px-4 py-3">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => onTogglePublish(m, e.target.checked)}
                              className="h-4 w-4 accent-blue-500"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-white">{m.moduleCode}</div>
                            <div className="text-xs text-white/60">{m.moduleName}</div>
                          </td>
                          <td className="px-4 py-3">{m.marks}</td>
                          <td className="px-4 py-3">{m.grade}</td>
                          <td className="px-4 py-3">{m.semester || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/60">
                  Selected to publish:{" "}
                  <span className="text-white">{state.publishedMarks.length}</span>
                </p>

                <button
                  type="button"
                  onClick={onPublishSave}
                  disabled={state.publishedMarks.length === 0}
                  className="
                    rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
                    hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  Save Published Marks
                </button>
              </div>

              <p className="mt-3 text-xs text-white/50">
                Note: In backend, you must store **only published marks** in DB (not all marks).
              </p>
            </>
          )}
        </div>
      )}
    </SectionCard>
  );
}