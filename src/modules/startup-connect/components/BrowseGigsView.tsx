"use client";
import React, { useState } from 'react';
import { Search, Filter, Rocket, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplyGigModal } from './ApplyGigModal';

const MOCK_GIGS = [
  { id: 1, title: "Next.js Developer Needed", startup: "TechFlow", category: "Development", budget: "LKR 15,000", type: "Remote", level: "Intermediate" },
  { id: 2, title: "Social Media Graphics", startup: "CreativeX", category: "Design", budget: "LKR 5,000", type: "Hybrid", level: "Beginner" },
  { id: 3, title: "Python Data Scripting", startup: "DataMind", category: "Data Science", budget: "LKR 20,000", type: "Remote", level: "Advanced" },
];

export const BrowseGigsView = () => {
  const [selectedGig, setSelectedGig] = useState<string | null>(null);

  return (
    <div className="p-8 max-w-7xl mx-auto mt-20 bg-white">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black italic text-slate-900 tracking-tighter uppercase leading-none">
            Find Your Next <span className="text-blue-700">Gig</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] mt-2 tracking-widest italic">Browse projects from top campus startups</p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search by Skill or Startup..." 
              className="pl-12 py-6 rounded-2xl border-slate-100 bg-white shadow-sm font-bold text-xs"
            />
          </div>
          <Button variant="outline" className="rounded-2xl py-6 px-6 border-blue-100 bg-white hover:bg-blue-50">
            <Filter size={18} className="text-blue-700" />
          </Button>
        </div>
      </div>

      {/* Gigs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_GIGS.map((gig) => (
          <div key={gig.id} className="group bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl shadow-slate-100/40 hover:shadow-blue-100 transition-all hover:-translate-y-2 border-b-4 border-b-blue-100 hover:border-b-orange-500">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-50 text-blue-700 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">
                {gig.category}
              </div>
              <span className="text-orange-500 font-black text-[10px] uppercase italic">{gig.type}</span>
            </div>

            <h3 className="text-lg font-black text-slate-900 uppercase leading-tight mb-2 group-hover:text-blue-700 transition-colors">
              {gig.title}
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-6 flex items-center gap-1">
              by <span className="text-slate-600 underline cursor-pointer">{gig.startup}</span>
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <DollarSign size={14} className="text-blue-700" /> {gig.budget}
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                <Clock size={14} className="text-orange-500" /> 3 days left
              </div>
            </div>

            <Button 
              onClick={() => setSelectedGig(gig.title)}
              className="w-full bg-blue-50 hover:bg-orange-500 text-blue-700 hover:text-white rounded-2xl py-6 font-black text-[10px] uppercase tracking-widest transition-all"
            >
              Apply Now <ArrowRight size={14} className="ml-2" />
            </Button>
          </div>
        ))}
      </div>

      {selectedGig && (
        <ApplyGigModal
          gigTitle={selectedGig}
          onClose={() => setSelectedGig(null)}
        />
      )}
    </div>
  );
};