"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle2, Clock, MessageSquare, Star, ArrowUpRight } from "lucide-react";

export const StudentDashboardView = ({ studentName }: { studentName: string }) => {
  // ශිෂ්‍යයා Apply කරපු වැඩ වල විස්තර (Sample Data)
  const appliedGigs = [
    {
      id: 1,
      title: "React Frontend Developer",
      startup: "Nexus Tech Lab",
      status: "Reviewed", // Pending, Reviewed, Hired
      appliedDate: "Oct 24, 2023",
      budget: "15,000 LKR"
    },
    {
      id: 2,
      title: "Python Data Scripting",
      startup: "DataFlow SL",
      status: "Pending",
      appliedDate: "Oct 26, 2023",
      budget: "10,000 LKR"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24 px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-orange-100 rounded-[35px] flex items-center justify-center text-orange-600 font-black text-4xl italic border-4 border-orange-50 shadow-xl shadow-orange-100">
              {studentName.charAt(0)}
            </div>
            <div>
              <div className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-2 uppercase tracking-widest">Student Pro</div>
              <h1 className="text-4xl font-black italic uppercase tracking-tighter text-slate-950">
                Hi, <span className="text-blue-700">{studentName}</span>
              </h1>
              <p className="text-slate-400 font-bold italic">Computer Science Undergraduate</p>
            </div>
          </div>
          <Button className="bg-slate-950 hover:bg-blue-700 text-white px-8 py-6 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
            Edit Portfolio
          </Button>
        </div>

        {/* Status Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatusCard label="Active Applications" count="02" icon={<Clock className="text-orange-500" />} color="orange" />
          <StatusCard label="Interviews" count="01" icon={<MessageSquare className="text-blue-500" />} color="blue" />
          <StatusCard label="Total Earned" count="45k" icon={<Star className="text-yellow-500" fill="currentColor" />} color="yellow" />
        </div>

        {/* My Applications Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-slate-950 mb-6">
            My <span className="text-orange-600">Applications</span>
          </h2>
          
          <div className="space-y-4">
            {appliedGigs.map((gig) => (
              <Card key={gig.id} className="p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-black italic text-slate-900 uppercase tracking-tight">{gig.title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{gig.startup} • Applied on {gig.appliedDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-300 uppercase">Budget</p>
                    <p className="font-black text-slate-900 italic">{gig.budget}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    gig.status === 'Reviewed' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {gig.status}
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-blue-600">
                    <ArrowUpRight size={20} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper Component for Stats
const StatusCard = ({ label, count, icon, color }: any) => (
  <Card className="p-8 border-none bg-slate-50/50 rounded-[40px] flex items-center justify-between">
    <div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-black italic text-slate-950">{count}</p>
    </div>
    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
      {icon}
    </div>
  </Card>
);