"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  User, MapPin, GraduationCap, ExternalLink, 
  Briefcase, Edit3, Github, Linkedin, Star, Quote, Camera, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillsCard } from "./SkillsCard";

export const StudentProfileView = () => {
  const [aboutText, setAboutText] = useState(
    "I'm a passionate Full Stack Developer with over 3 years of experience in building scalable web applications. I love working with React, Next.js, and Node.js to create seamless user experiences."
  );

  const userData = {
    name: "Kasun Perera",
    university: "University of Moratuwa",
    city: "Colombo, Sri Lanka",
    academicYear: "Year 3",
    semester: "Semester 1",
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop" 
  };

  const reviews = [
    { id: 1, user: "Dr. Rohana", role: "Lecturer", comment: "Excellent problem-solving skills in the Fintech project.", rating: 5 },
    { id: 2, user: "Saman Perera", role: "Project Manager", comment: "Very dedicated student with great UI/UX sense.", rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-slate-50/30 pb-20">
      
      {/* --- Cover Image Section --- */}
      <div className="h-64 md:h-80 w-full relative overflow-hidden group">
        <img 
          src={userData.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 right-6">
            <Button variant="secondary" size="sm" className="bg-white/80 backdrop-blur-md rounded-xl font-bold gap-2">
                <Camera className="w-4 h-4" /> Change Cover
            </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* --- Profile Header --- */}
        <div className="relative -mt-20 flex flex-col md:flex-row items-end justify-between gap-6 pb-10 border-b border-slate-100">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="w-44 h-44 rounded-[48px] border-[8px] border-white bg-white shadow-2xl overflow-hidden relative z-10">
                <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                    <User className="w-24 h-24 text-slate-200" />
                </div>
            </div>
            <div className="mb-2 space-y-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic">{userData.name}</h1>
              <div className="flex flex-wrap gap-4 text-slate-500 font-bold italic">
                <p className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-sky-500" /> {userData.university}</p>
                <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-sky-500" /> {userData.city}</p>
              </div>
            </div>
          </div>

          <div className="mb-2">
              <Link href="/startup-connect/create-student-profile">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl px-8 py-7 font-black shadow-lg shadow-sky-100 flex items-center gap-2">
                    <Edit3 className="w-5 h-5" /> EDIT PROFILE
                </Button>
              </Link>
          </div>
        </div>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12">
          
          {/* Left Side: Skills Only */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex gap-2">
                 <span className="bg-sky-50 text-sky-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-sky-100 tracking-widest">
                   {userData.academicYear}
                 </span>
                 <span className="bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-orange-100 tracking-widest">
                   {userData.semester}
                 </span>
            </div>
            
            <SkillsCard />
          </div>

          {/* Right Side: About, Connect Links & Project Showcase */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. About Me Section */}
            <div className="bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 relative group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 italic uppercase">About Me</h3>
              </div>
              <p className="text-slate-500 font-bold text-lg leading-relaxed italic">"{aboutText}"</p>
            </div>

            {/* 2. Digital Presence (Links) - දැන් මෙතනට ආවා */}
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-6">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Digital Presence & Professional Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://github.com" target="_blank" className="block group/btn">
                  <div className="flex items-center justify-between p-4 rounded-[24px] bg-slate-50 border-2 border-transparent hover:border-slate-900 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg"><Github className="w-6 h-6 text-white" /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">GitHub</p>
                        <p className="text-sm font-black text-slate-900 italic">/https://github.com/chathu-02</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-300 group-hover/btn:text-slate-900" />
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" className="block group/btn">
                  <div className="flex items-center justify-between p-4 rounded-[24px] bg-sky-50/50 border-2 border-transparent hover:border-sky-600 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0077b5] rounded-2xl flex items-center justify-center shadow-lg"><Linkedin className="w-6 h-6 text-white" /></div>
                      <div>
                        <p className="text-[10px] font-black text-sky-400 uppercase">LinkedIn</p>
                        <p className="text-sm font-black text-slate-900 italic">in/https://linkedin.com/in/chathu-02</p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sky-200 group-hover/btn:text-sky-600" />
                  </div>
                </a>
              </div>
            </div>

            {/* 3. Project Showcase Card */}
            <div className="bg-white border-2 border-slate-50 p-12 rounded-[48px] shadow-sm flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-orange-600" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 italic">Project Showcase</h3>
                    <p className="text-slate-500 max-w-md font-bold leading-relaxed">
                        Explore my collection of engineering and software projects where I turn complex problems into simple solutions.
                    </p>
                </div>
                <Link href="/startup-connect/my-projects" className="w-full max-w-sm pt-4">
                    <Button className="w-full bg-sky-700 hover:bg-sky-800 text-white rounded-[24px] py-8 text-xl font-black shadow-xl shadow-sky-100 transition-all hover:scale-[1.02]">
                        VIEW MY WORK <ExternalLink className="w-6 h-6 ml-3" />
                    </Button>
                </Link>
            </div>
          </div>
        </div>

        {/* --- Reviews Section (පල්ලෙහාටම ගත්තා) --- */}
        <div className="mt-24 space-y-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3 uppercase italic">
                  <Star className="w-6 h-6 text-orange-500 fill-orange-500" /> Professional Reviews
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm relative group">
                        <Quote className="absolute right-8 top-8 w-12 h-12 text-slate-50" />
                        <div className="flex gap-1 mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-orange-500 fill-orange-500" />
                            ))}
                        </div>
                        <p className="text-slate-600 font-bold italic mb-6 leading-relaxed">"{review.comment}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-700 font-black text-sm">
                                {review.user[0]}
                            </div>
                            <div>
                                <p className="font-black text-slate-900 text-sm">{review.user}</p>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{review.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfileView;