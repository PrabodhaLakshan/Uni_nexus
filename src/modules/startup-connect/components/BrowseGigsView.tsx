"use client";
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Clock, ArrowUpRight, Briefcase, Filter, Globe } from "lucide-react";
import { ApplyGigModal } from './ApplyGigModal'; // Modal එක import කරගන්න

export const BrowseGigsView = () => {
  // Modal එක පාලනය කිරීමට States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGigTitle, setSelectedGigTitle] = useState("");

  // පෝස්ට් එකක් click කරපු ගමන් Modal එක open කරන function එක
  const handleApplyClick = (title: string) => {
    setSelectedGigTitle(title);
    setIsModalOpen(true);
  };

  const availableGigs = [
    {
      id: 1,
      title: "React Frontend Developer",
      startup: "Nexus Tech Lab",
      budget: "15,000 LKR",
      deadline: "3 Days left",
      type: "Remote",
      tags: ["React", "Tailwind", "Next.js"],
    },
    {
      id: 2,
      title: "UI/UX Mobile App Design",
      startup: "Quantum AI",
      budget: "25,000 LKR",
      deadline: "1 Week left",
      type: "Hybrid",
      tags: ["Figma", "Mobile", "UI/UX"],
    },
    {
      id: 3,
      title: "Python Data Scripting",
      startup: "DataFlow SL",
      budget: "10,000 LKR",
      deadline: "2 Days left",
      type: "Remote",
      tags: ["Python", "Pandas"],
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* --- Apply Modal එක මෙතන තියෙනවා --- */}
      <ApplyGigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        gigTitle={selectedGigTitle} 
      />

      {/* Search Header Section */}
      <div className="bg-slate-950 pt-32 pb-20 px-8 rounded-b-[60px] mb-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-6xl font-black italic uppercase tracking-tighter text-white">
              Find Your Next <span className="text-orange-500 underline decoration-blue-600 underline-offset-8">GIG</span>
            </h1>
            <p className="text-slate-400 font-bold italic tracking-wide">Connecting Campus Talent with High-Growth Startups</p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by skills (e.g. React, Python, UI/UX)..." 
              className="w-full pl-16 pr-8 py-6 rounded-[30px] border-none bg-white/10 backdrop-blur-md text-white font-bold placeholder:text-slate-500 focus:ring-4 focus:ring-blue-600/20 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-full font-black text-[10px] uppercase tracking-widest border-2 border-slate-100 flex items-center gap-2">
                    <Filter size={14} /> Filter By
                </Button>
                <div className="h-4 w-[2px] bg-slate-100"></div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Showing {availableGigs.length} Results</span>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {availableGigs.map((gig) => (
            <Card key={gig.id} className="p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-1 transition-all duration-500 rounded-[40px] bg-white flex flex-col md:flex-row items-center justify-between gap-6 group">
              
              <div className="flex items-center gap-6 w-full">
                <div className="w-20 h-20 bg-blue-50 rounded-[28px] flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-all duration-500">
                  <Briefcase size={32} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-black uppercase text-orange-600 tracking-widest">{gig.startup}</span>
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                    <div className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase">
                      <Globe size={12} /> {gig.type}
                    </div>
                  </div>
                  <h3 className="text-3xl font-black italic text-slate-950 group-hover:text-blue-700 transition-colors leading-tight">
                    {gig.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {gig.tags.map(tag => (
                      <span key={tag} className="bg-slate-50 px-3 py-1.5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-tighter border border-slate-100">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-4 min-w-[180px] w-full md:w-auto border-l-0 md:border-l border-slate-100 pl-0 md:pl-8">
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Fixed Budget</p>
                  <p className="text-3xl font-black italic text-slate-950 uppercase decoration-blue-500 decoration-4 underline-offset-4">{gig.budget}</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-2">
                    <Clock size={12} className="text-orange-500" /> {gig.deadline}
                </div>
                
                {/* Apply Now Button - දැන් මේක Modal එක open කරනවා */}
                <Button 
                  onClick={() => handleApplyClick(gig.title)}
                  className="w-full bg-blue-700 hover:bg-orange-600 text-white rounded-2xl py-7 px-8 font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100 active:scale-95"
                >
                  APPLY NOW <ArrowUpRight size={18} strokeWidth={3} />
                </Button>
              </div>

            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};