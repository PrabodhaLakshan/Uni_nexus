"use client";
import React, { useState } from 'react';
import { BadgeCheck, Github, Globe, Linkedin, MapPin, MessageSquare, Star, Award, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from './ChatWindow';

export const StudentProfilePreview = ({ student }: { student: any }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 bg-white">
      <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-10 shadow-xl shadow-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-blue-700 rounded-[30px] flex items-center justify-center text-white font-black text-5xl border-4 border-blue-100 shadow-lg shadow-blue-100">
            {student.name.charAt(0)}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-slate-900">
                {student.name}
              </h1>
              <BadgeCheck className="text-blue-600 w-6 h-6" />
              <span className="bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Available
              </span>
            </div>

            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-5">
              {student.role} · 2nd Year Computer Science
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <p className="text-[11px] font-bold text-slate-600">University of Moratuwa</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-orange-600" />
                <p className="text-[11px] font-bold text-slate-600">Software Engineering</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                <p className="text-[11px] font-bold text-slate-600">4.9 Founder Rating</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => setIsChatOpen(true)} className="bg-blue-700 hover:bg-orange-600 text-white rounded-2xl px-7 py-6 font-black text-[10px] uppercase tracking-widest">
              <MessageSquare className="w-4 h-4 mr-2" /> Message Now
            </Button>
            <div className="flex justify-end gap-2">
              <Button size="icon" variant="outline" className="rounded-xl border-slate-200 hover:text-blue-700"><Github size={18} /></Button>
              <Button size="icon" variant="outline" className="rounded-xl border-slate-200 hover:text-blue-700"><Linkedin size={18} /></Button>
              <Button size="icon" variant="outline" className="rounded-xl border-slate-200 hover:text-orange-600"><Globe size={18} /></Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-[30px] p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4" /> Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill: string) => (
                <span key={skill} className="px-3 py-1.5 bg-orange-50 border border-orange-100 text-[9px] font-black rounded-xl text-orange-600 uppercase">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[30px] p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-orange-600 mb-4">Quick Highlights</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> 12 Projects Completed
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Strong Team Collaboration
              </div>
              <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> Startup-ready Communication
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900">
            Completed <span className="text-blue-700">Gigs</span>
          </h3>

          <div className="bg-white border border-slate-100 rounded-[30px] p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-black uppercase tracking-tight text-slate-900">E-Commerce Landing Page</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client: Spark Startup · May 2024</p>
              </div>
              <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">Delivered</span>
            </div>
            <p className="text-slate-600 font-medium leading-relaxed mb-5">
              Built a high-converting landing page with Next.js and Tailwind CSS, including CTA-focused UX and responsive behavior across all major devices.
            </p>
            <div className="flex items-center gap-2 text-orange-600 text-[11px] font-black uppercase tracking-widest">
              <Briefcase className="w-4 h-4" /> Startup Impact: Increased early signups by 40%
            </div>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <ChatWindow
          studentName={student.name}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};