// components/groupFinder/GroupSearchForm.tsx
"use client";

import * as React from "react";
import FilterDropdown from "./FilterDropdown";

export type GroupSearchFilters = {
  year: string;
  semester: string;
  batch: string;
  group: string;
};

const YEAR_OPTS = [
  { label: "Year 1", value: "1" },
  { label: "Year 2", value: "2" },
  { label: "Year 3", value: "3" },
  { label: "Year 4", value: "4" },
];

const SEM_OPTS = [
  { label: "Semester 1", value: "1" },
  { label: "Semester 2", value: "2" },
];

const BATCH_OPTS = [
  { label: "Batch 23.1", value: "23.1" },
  { label: "Batch 23.2", value: "23.2" },
  { label: "Batch 24.1", value: "24.1" },
  { label: "Batch 24.2", value: "24.2" },
];

const GROUP_OPTS = [
  { label: "Group A", value: "A" },
  { label: "Group B", value: "B" },
  { label: "Group C", value: "C" },
  { label: "Group D", value: "D" },
];

export default function GroupSearchForm({
  value,
  onChange,
  onSearch,
  onReset,
  loading,
}: {
  value: GroupSearchFilters;
  onChange: (next: GroupSearchFilters) => void;
  onSearch: (filters: GroupSearchFilters) => void;
  onReset?: () => void;
  loading?: boolean;
}) {
  const setField = (name: string, v: string) => {
    onChange({ ...value, [name]: v });
  };

  const canSearch =
    value.year && value.semester && value.batch && value.group && !loading;

  return (
    <section
      className="
        rounded-2xl border border-white/10
        bg-gradient-to-b from-[#0f1730]/80 to-black/60
        p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Group Finder</h2>
          <p className="mt-1 text-sm text-white/60">
            Select your details and search matching students.
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          Smart Match
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FilterDropdown
          label="Year"
          name="year"
          value={value.year}
          onChange={setField}
          options={YEAR_OPTS}
          placeholder="Select year"
          disabled={!!loading}
        />
        <FilterDropdown
          label="Semester"
          name="semester"
          value={value.semester}
          onChange={setField}
          options={SEM_OPTS}
          placeholder="Select semester"
          disabled={!!loading}
        />
        <FilterDropdown
          label="Batch"
          name="batch"
          value={value.batch}
          onChange={setField}
          options={BATCH_OPTS}
          placeholder="Select batch"
          disabled={!!loading}
        />
        <FilterDropdown
          label="Group"
          name="group"
          value={value.group}
          onChange={setField}
          options={GROUP_OPTS}
          placeholder="Select group"
          disabled={!!loading}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={() => {
            onChange({ year: "", semester: "", batch: "", group: "" });
            onReset?.();
          }}
          disabled={!!loading}
          className="
            rounded-xl border border-white/10
            bg-white/5 px-4 py-2.5
            text-sm font-semibold text-white/80
            transition hover:bg-white/10
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => onSearch(value)}
          disabled={!canSearch}
          className="
            rounded-xl bg-blue-600 px-5 py-2.5
            text-sm font-semibold text-white
            transition hover:bg-blue-500
            focus:outline-none focus:ring-2 focus:ring-blue-500/40
            disabled:cursor-not-allowed disabled:opacity-60
          "
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </section>
  );
}