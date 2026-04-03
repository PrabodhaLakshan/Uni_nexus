"use client";
import React from 'react';
import { Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { sendInviteNotification } from '../services/notification.service';
import { getToken } from '@/lib/auth';

type TopTalent = {
  id: string;
  name: string;
  role: string;
  rating: string;
  match: number;
  skills: string[];
};

export const TalentPoolView = () => {
  const [invitingId, setInvitingId] = React.useState<string | null>(null);
  const [talents, setTalents] = React.useState<TopTalent[]>([]);
  const [matchedCount, setMatchedCount] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchTalents = async () => {
      try {
        const token = getToken();
        const res = await fetch("/api/startup/dashboard/top-matches?minMatch=98", {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) return;
        const json = await res.json();
        const payload = json.data ?? json;
        if (Array.isArray(payload)) setTalents(payload as TopTalent[]);
        if (json?.meta?.matchedCount != null && typeof json.meta.matchedCount === "number") {
          setMatchedCount(json.meta.matchedCount);
        }
      } catch (err) {
        console.error("Failed to load top talents", err);
      }
    };
    fetchTalents();
  }, []);

  const handleInvite = async (student: TopTalent) => {
    try {
      setInvitingId(student.id);
      await sendInviteNotification({
        receiverId: student.id,
        studentName: student.name,
        gigTitle: "Campus Collaboration Gig",
      });
    } catch {
      // Keep UX clean: avoid popup alerts; just log for debugging.
      console.error("Failed to send invitation");
    } finally {
      setInvitingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 max-w-7xl mx-auto mt-20">
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl font-black  text-slate-900 tracking-tighter uppercase">
          Top <span className="text-orange-500">Talent</span> Pool
        </h1>
        <p className="text-slate-500 font-bold ">Invite the best campus minds to your next big gig</p>
        <p className="mt-2 text-[12px] font-bold text-slate-400">
          98%+ matches: {matchedCount}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {talents.map((student) => {
          const circumference = 2 * Math.PI * 20;
          const strokeDashoffset = circumference - (student.match / 100) * circumference;
          const color =
            student.match >= 99 ? "bg-blue-500" : student.match >= 98 ? "bg-emerald-500" : "bg-purple-500";

          return (
          <Card
            key={student.id}
            className="relative p-6 border border-white/90 bg-white rounded-[40px] shadow-[0_22px_60px_rgba(15,23,42,0.22)] hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(15,23,42,0.28)] transition-all duration-300 group before:content-[''] before:absolute before:inset-0 before:-z-10 before:rounded-[44px] before:bg-white before:opacity-90 before:blur-2xl"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
              <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg`}>
                {student.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-black text-slate-900 uppercase leading-none">{student.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{student.role}</p>
              </div>
            </div>

              <div className="relative w-14 h-14 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke={student.match >= 95 ? "#10b981" : student.match >= 90 ? "#3b82f6" : "#f59e0b"}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700">
                  {student.match}%
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {student.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-slate-100 text-[9px] font-black rounded-full text-slate-600 uppercase">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                <Star size={16} fill="currentColor" /> {student.rating}
              </div>
              {/* Invite Button */}
              <Button 
                type="button"
                onClick={() => handleInvite(student)}
                disabled={invitingId === student.id}
                className="bg-orange-600 hover:bg-slate-900 text-white rounded-2xl px-6 py-5 font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-orange-100"
              >
                <Zap className="w-3 h-3 mr-2" /> {invitingId === student.id ? "SENDING..." : "INVITE TO GIG"}
              </Button>
            </div>
          </Card>
        )})}
      </div>
      {talents.length === 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white px-6 py-8 text-center">
          <p className="text-sm font-black text-slate-700 uppercase tracking-widest">No 98%+ matches yet</p>
          <p className="text-xs font-bold text-slate-400 mt-2">
            Post gigs with clear required skills to get stronger student matches.
          </p>
        </div>
      )}
    </div>
  );
};