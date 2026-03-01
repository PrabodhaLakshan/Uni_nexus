"use client";
import React from 'react';

import { StudentDashboardView } from '@/modules/startup-connect/components/StudentDashboardView';

export default function StudentApplicationsPage() {
  return (
    <main className="min-h-screen bg-white">
      
      <StudentDashboardView studentName="Pasindu Perera" />
    </main>
  );
}