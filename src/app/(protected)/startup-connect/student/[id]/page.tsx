"use client";
import React from 'react';
import { StudentProfilePreview } from '@/modules/startup-connect/components/StudentProfilePreview';
import { GenericNavbar } from '@/modules/startup-connect/components/GenericNavbar';
import { STARTUP_LINKS } from '@/modules/startup-connect/constants/navigation';

export default function StudentProfilePage() {
  // දැනට අපි සාම්පල දත්තයක් (Mock Data) පාවිච්චි කරමු
  const sampleStudent = {
    id: 1,
    name: "Kasun Kalhara",
    role: "Fullstack Developer",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS"],
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Startup Navbar එක මෙතනත් ඕනේ */}
      <GenericNavbar links={STARTUP_LINKS} portalName="Founder Portal" />
      
      <div className="pt-10">
        <StudentProfilePreview student={sampleStudent} />
      </div>
    </main>
  );
}
