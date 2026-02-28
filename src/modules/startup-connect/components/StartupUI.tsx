"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { UserCircle, Building2, Briefcase, ArrowRight } from "lucide-react";

// Props එකක් විදිහට onPostGigClick එක ලබාගන්නවා
export const StartupUI = ({ onPostGigClick }: { onPostGigClick: () => void }) => {
  return (
    <div className="min-h-screen bg-white">
      
      <div className="p-8 max-w-6xl mx-auto mt-10">
        {/* Hero Section */}
        <div className="text-center mb-20 space-y-5">
          <h1 className="text-6xl font-extrabold tracking-tighter text-gray-950">
            Innovate. <span className="text-orange-600">Connect.</span> <span className="text-blue-700">Thrive.</span>
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            For the first time in Sri Lanka, startup opportunities that match the talents of campus students and the skilled individuals needed by founders—brought together on a single platform.
          </p>
          <div className="pt-4">
            <div className="w-24 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Student Card */}
          <Card className="group relative overflow-hidden border border-gray-100 shadow-xl shadow-gray-50/50 hover:border-blue-200 hover:shadow-blue-50 transition-all duration-300 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-700" />
            
            <CardHeader className="text-center pt-12">
              <div className="w-20 h-20 bg-blue-100/70 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <UserCircle className="w-10 h-10 text-blue-700" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-950">I am a Student</CardTitle>
              <CardDescription className="pt-3 text-gray-600 text-base">Enter the startup world by showcasing your skills.</CardDescription>
            </CardHeader>
            <CardContent className="pb-12 pt-6">
              <Link href="/startup-connect/create-student-profile">
                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-6 rounded-xl group flex items-center justify-center gap-2">
                  Create Profile <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Founder Card - මෙතන තමයි ඔයා ඉල්ලපු වෙනස තියෙන්නේ */}
          <Card className="group relative overflow-hidden border border-gray-100 shadow-xl shadow-gray-50/50 hover:border-orange-200 hover:shadow-orange-50 transition-all duration-300 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 to-orange-700" />
            <CardHeader className="text-center pt-12">
              <div className="w-20 h-20 bg-orange-100/70 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:bg-orange-100 transition-all duration-300">
                <Building2 className="w-10 h-10 text-orange-700" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-950">I am a Founder</CardTitle>
              <CardDescription className="pt-3 text-gray-600 text-base">Find skilled individuals to bring your new ideas to life.</CardDescription>
            </CardHeader>
            <CardContent className="pb-12 pt-6">
              {/* මෙතන Link එක වෙනුවට onClick එක පාවිච්චි කරනවා Register Form එකට යන්න */}
              <Button 
                onClick={onPostGigClick} 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 rounded-xl group flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                Post a Gig <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Browse Card */}
          <Card className="group relative overflow-hidden border border-gray-100 shadow-xl shadow-gray-50/50 hover:border-gray-200 hover:shadow-gray-100 transition-all duration-300 rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-orange-500" />
            <CardHeader className="text-center pt-12">
              <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-10 h-10 text-gray-700" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-950">Browse Gigs</CardTitle>
              <CardDescription className="pt-3 text-gray-600 text-base">Find gigs that match your skills.</CardDescription>
            </CardHeader>
            <CardContent className="pb-12 pt-6">
              <Link href="/startup-connect/browse-gigs">
                <Button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-6 rounded-xl group flex items-center justify-center gap-2">
                  Explore Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};