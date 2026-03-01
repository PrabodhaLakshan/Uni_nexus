"use client";
import React from 'react';
import Link from 'next/link';
import { Check, X, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock Data
const APPLICANTS = [
  { id: 1, name: "Kasun Kalhara", gig: "Mobile App Development", date: "2024-05-20", status: "Pending", image: "K" },
  { id: 2, name: "Ishara Madushani", gig: "Logo Design", date: "2024-05-18", status: "Reviewed", image: "I" },
  { id: 3, name: "Tharindu Ruwan", gig: "Backend API Setup", date: "2024-05-15", status: "Pending", image: "T" },
];

export const ApplicantsListView = () => {
  return (
    <div className="mt-12 p-8 bg-slate-50/50 rounded-[40px] border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
            Recent <span className="text-blue-600">Applicants</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage students who applied for your gigs</p>
        </div>
        <Button variant="outline" className="rounded-xl font-black text-[10px] border-slate-200 uppercase">View All</Button>
      </div>

      <div className="space-y-4">
        {APPLICANTS.map((app) => (
          <div key={app.id} className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm border border-slate-50 hover:shadow-md transition-all group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center font-black text-sky-600">
                {app.image}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{app.name}</h4>
                <p className="text-[10px] font-medium text-slate-400 uppercase">{app.gig}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-300 uppercase italic">Applied on</span>
                <span className="text-[10px] font-bold text-slate-600">{app.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Link href={`/startup-connect/student/${app.id}`}>
                  <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-sky-50 text-sky-600">
                    <Eye size={18} />
                  </Button>
                </Link>
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-green-50 text-green-600">
                  <Check size={18} />
                </Button>
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-red-50 text-red-600">
                  <X size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};