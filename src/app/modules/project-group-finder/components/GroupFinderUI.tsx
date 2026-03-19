"use client";

import * as React from "react";
import GroupSearchForm, { GroupSearchFilters } from "./GroupSearchForm";
import ProfileCard, { StudentProfile } from "./ProfileCard";
import SearchResults, { SearchResult } from "./SearchResults";
import { useRouter } from "next/navigation";



type Props = {
  user: {
    name: string;
    email: string;
    student_id: string;
  };
};

const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: "s1",
    name: "Nimal Perera",
    specialization: "Software Engineering",
    gpa: 3.65,
    availability: "Weekend",
    skills: ["React", "Node.js", "MongoDB", "Express", "Git"],
  },
  {
    id: "s2",
    name: "Imasha Silva",
    specialization: "Data Science",
    gpa: 3.78,
    availability: "Evening",
    skills: ["Python", "SQL", "PowerBI", "React", "ML"],
  },
];

function calcMatch(me: StudentProfile, other: StudentProfile): SearchResult {
  const mySkills = new Set(me.skills.map((s) => s.toLowerCase()));
  const matched = other.skills.filter((s) => mySkills.has(s.toLowerCase()));
  const score = Math.min(
    100,
    Math.round((matched.length / Math.max(1, me.skills.length)) * 100)
  );
  return { ...other, matchedSkills: matched, matchScore: score };
}

export default function GroupFinderUI({ user }: Props) {
  const myProfile: StudentProfile = {
    id: user.student_id,
    name: user.name,
    specialization: "IT Undergraduate",
    gpa: 3.4,
    availability: "Evening",
    skills: ["Next.js", "React", "Tailwind", "Java", "SQL"],
    year: "3",
    semester: "2",
    batch: "23.2",
  };

  const [filters, setFilters] = React.useState<GroupSearchFilters>({
    year: "",
    semester: "",
    batch: "",
    group: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<SearchResult[]>([]);

  const handleSearch = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const computed = MOCK_STUDENTS
      .map((s) => calcMatch(myProfile, s))
      .sort((a, b) => b.matchScore - a.matchScore);

    setResults(computed);
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Project Group Finder</h1>
        <p className="mt-1 text-sm text-white/60">
          Search by Year, Semester, Batch, and Group.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <GroupSearchForm
            value={filters}
            onChange={setFilters}
            onSearch={handleSearch}
            onReset={() => setResults([])}
            loading={loading}
          />

          <SearchResults
            results={results}
            loading={loading}
            onRequest={(id) => alert(`Request sent to ${id}`)}
          />
        </div>

        
        <ProfileCard
          profile={myProfile}
         
        />
      </div>
    </div>
  );
}