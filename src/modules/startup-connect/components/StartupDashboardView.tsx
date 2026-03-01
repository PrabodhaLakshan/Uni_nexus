"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Zap, Briefcase, Bell, ArrowUpRight, User, Star } from "lucide-react";
import { PostGigModal } from './PostGigModal';

export const StartupDashboardView = ({ data }: { data: any }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-24 px-8">
      
      <PostGigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Dashboard Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-50 px-10 py-5 flex justify-between items-center z-50">
        <div className="text-2xl font-black italic tracking-tighter text-gray-950">
            UNI<span className="text-blue-700">NEXUS</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-gray-400 bg-blue-50/40 p-1.5 rounded-2xl border border-blue-100/50">
          <Link href="/startup-connect" className="px-4 py-2 rounded-xl hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2">
            <User size={14} /> Account
          </Link>
          <Link href="/startup-connect/talent-pool" className="px-4 py-2 rounded-xl hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2">
            <Users size={14} /> Talent Pool
          </Link>
          <Link href="/startup-connect/applicants" className="px-4 py-2 rounded-xl hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2">
            <Briefcase size={14} /> Applications
          </Link>
          <Link href="/dashboard/startup" className="px-4 py-2 rounded-xl hover:bg-white hover:text-blue-700 transition-colors flex items-center gap-2">
            <Star size={14} /> Reviews
          </Link>
        </div>
        <div className="flex gap-4 items-center">
            <Bell className="text-gray-300 hover:text-orange-500 cursor-pointer transition-colors" size={20} />
            <div className="w-10 h-10 bg-blue-700 rounded-xl text-white flex items-center justify-center font-black uppercase tracking-tighter border-2 border-blue-100 shadow-sm">
                {data.name?.charAt(0) || "S"}
            </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-widest">Startup Dashboard</div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-gray-950">
              Welcome, <span className="text-blue-700">{data.name}</span>
            </h1>
            <p className="text-gray-400 font-bold italic mt-1">{data.industry} Innovation Sector</p>
          </div>

          {/* 2. මේ බටන් එක එබුවම setIsModalOpen(true) වෙලා Modal එක පේනවා */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-orange-100 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={20} strokeWidth={3} /> NEW GIG
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatSmall label="Live Gigs" value="0" color="blue" icon={<Briefcase size={18}/>} />
            <StatSmall label="Applications" value="12" color="orange" icon={<Users size={18}/>} />
            <StatSmall label="Total Reach" value="250+" color="blue" icon={<Zap size={18}/>} />
        </div>

        <div className="mt-16 mb-8 flex justify-between items-end">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">Recommended <span className="text-blue-600">Applicants</span></h2>
          <Link href="/startup-connect/talent-pool" className="text-xs font-bold text-slate-400 hover:text-blue-600">View All Talent →</Link>
        </div>

        {/* About Startup Card */}
        <Card className="p-10 border-none bg-slate-50/50 rounded-[40px] mb-20">
            <h3 className="text-[10px] font-black uppercase text-blue-700 tracking-[0.2em] mb-4 underline decoration-2">Company Vision</h3>
            <p className="text-xl font-bold text-gray-600 italic leading-relaxed">
              "{data.about || "Your startup mission will appear here once you post your first gig."}"
            </p>
        </Card>

        {/* Suggested Talent Section */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-950">
              Suggested <span className="text-orange-600">Talent</span>
            </h2>
            <p className="text-gray-400 font-bold italic text-sm">Best matches for {data.industry} projects</p>
          </div>
          <Button variant="ghost" className="font-black text-[10px] uppercase tracking-widest text-blue-700 hover:bg-blue-50">
            View All Talent
          </Button>
        </div>

        {/* Talent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {[
            { name: "Pasindu Perera", role: "Full-Stack Dev", match: "98%", skills: ["React", "Node.js"] },
            { name: "Ishani Silva", role: "UI/UX Designer", match: "95%", skills: ["Figma", "Tailwind"] },
            { name: "Kavindu Gunawardena", role: "App Developer", match: "92%", skills: ["Flutter", "Firebase"] }
          ].map((student, index) => (
            <Card key={index} className="group p-8 border border-gray-100 rounded-[35px] hover:shadow-2xl hover:shadow-blue-100/30 transition-all duration-500 bg-white">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 font-black text-xl italic">
                    {student.name.charAt(0)}
                </div>
                <div className="bg-green-50 text-green-600 text-[9px] font-black px-2 py-1 rounded-lg border border-green-100">{student.match} MATCH</div>
              </div>
              <h3 className="text-xl font-black italic uppercase text-gray-900">{student.name}</h3>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-4">{student.role}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {student.skills.map(s => <span key={s} className="bg-gray-50 px-2 py-1 rounded-md text-[9px] font-black text-gray-500 uppercase">#{s}</span>)}
              </div>
              <Button className="w-full bg-slate-950 hover:bg-blue-700 text-white rounded-xl py-5 font-black text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                Contact Talent <ArrowUpRight size={14} />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// StatSmall Helper Component
const StatSmall = ({ label, value, color, icon }: any) => (
  <Card className={`p-8 border-none rounded-[35px] shadow-sm flex items-center gap-5 ${color === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
    <div className={`p-4 rounded-2xl ${color === 'blue' ? 'bg-white/50 text-blue-700' : 'bg-white/50 text-orange-700'}`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60">{label}</p>
      <p className="text-3xl font-black italic text-gray-950">{value}</p>
    </div>
  </Card>
);