"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // මෙන්න මේ පේළිය එකතු කරන්න
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { User, GraduationCap, MapPin, Github, Linkedin, Globe, FileText, Camera } from "lucide-react";

export const StudentProfileUI = () => {
  const router = useRouter(); // Router එක initialize කරන්න

  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault(); // Form එක refresh වෙන එක නවත්තන්න
    
    // මෙතනදී තමයි පසුව අපි Database එකට data යවන්නේ (API call)
    console.log("Profile creating...");

    // Profile එක සාර්ථකව හැදුනා කියලා හිතලා, අපිව Profile View එකට යවනවා
    router.push('/startup-connect/profile'); 
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-linear-to-r from-blue-700 to-blue-600 py-16 px-6 text-center text-white">
        <h1 className="text-4xl font-black mb-2 tracking-tight">Create Your Student Profile</h1>
        <p className="text-blue-100 font-light">Introduce your skills and profile to the startup world.</p>
      </div>

      <div className="max-w-4xl mx-auto -mt-12 px-6">
        <Card className="shadow-2xl border-none rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            {/* onSubmit එකට handleCreateProfile එක දුන්නා */}
            <form className="space-y-10" onSubmit={handleCreateProfile}>
              
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative group">
                  <div className="w-32 h-32 bg-slate-50 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden shadow-inner">
                    <User className="w-16 h-16 text-slate-300" />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 bg-orange-600 p-2.5 rounded-full text-white shadow-xl hover:bg-orange-700 hover:scale-110 transition-all">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <Label className="text-slate-500 font-semibold tracking-wide uppercase text-xs">Profile Photo</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <GraduationCap className="w-6 h-6 text-orange-500" /> Education Details
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="rounded-xl border-slate-200 focus:border-blue-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-slate-700 font-medium">Academic Year</Label>
                      <Input id="year" placeholder="Year 1" className="rounded-xl border-slate-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester" className="text-slate-700 font-medium">Semester</Label>
                      <Input id="semester" placeholder="Sem 2" className="rounded-xl border-slate-200" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-700 font-medium">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input id="city" className="pl-10 rounded-xl border-slate-200" placeholder="Colombo" />
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-blue-700 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Globe className="w-6 h-6 text-orange-500" /> Digital Presence
                  </h3>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700 font-medium"><Github className="w-4 h-4 text-slate-900" /> GitHub URL</Label>
                    <Input placeholder="github.com/username" className="rounded-xl border-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-slate-700 font-medium"><Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn URL</Label>
                    <Input placeholder="linkedin.com/in/username" className="rounded-xl border-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold text-blue-700">Portfolio Website</Label>
                    <Input placeholder="https://yourportfolio.me" className="rounded-xl border-blue-100 bg-blue-50/30" />
                  </div>
                </div>
              </div>

              {/* CV Upload Section */}
              <div className="bg-slate-50/50 p-10 rounded-[24px] border-2 border-dashed border-slate-200 hover:border-orange-400 hover:bg-orange-50/30 transition-all text-center group cursor-pointer relative">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <Label className="block text-lg font-bold text-slate-800 mb-1 cursor-pointer">Upload Your CV (PDF)</Label>
                <p className="text-sm text-slate-500 mb-6">Drag and drop your CV here or click to select a file</p>
                <input type="file" className="hidden" id="cv-upload" accept=".pdf" />
                <Button variant="outline" type="button" onClick={() => document.getElementById('cv-upload')?.click()} className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl px-8 font-semibold">
                  Select PDF File
                </Button>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white text-lg py-8 rounded-4xl shadow-xl shadow-blue-200 transition-all font-bold active:scale-[0.98]">
                  Create My Professional Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};