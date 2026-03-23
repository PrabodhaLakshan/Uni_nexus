"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Briefcase, DollarSign, Calendar, Zap } from "lucide-react";

interface PostGigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostGigModal = ({ isOpen, onClose }: PostGigModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <Card className="max-w-2xl w-full bg-white rounded-[40px] shadow-2xl border-none p-10 relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50" />

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-orange-600 transition-colors z-10">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="mb-10 flex items-center gap-4 relative">
          <div className="w-14 h-14 bg-blue-700 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-gray-950">Post a New <span className="text-orange-600">Gig</span></h2>
            <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em]">Hire the best campus talent</p>
          </div>
        </div>

        <form className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Gig Title</label>
            <Input placeholder="e.g. React Developer for E-commerce Site" className="rounded-2xl border-gray-100 bg-gray-50/50 py-7 font-bold text-gray-700 focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-600 ml-1">Budget (LKR)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input placeholder="10,000 - 25,000" className="rounded-2xl border-gray-100 bg-gray-50/50 py-7 pl-12 font-bold text-gray-700" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-orange-600 ml-1">Expected Deadline</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input type="date" className="rounded-2xl border-gray-100 bg-gray-50/50 py-7 pl-12 font-bold text-gray-700" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Gig Description & Skills Required</label>
            <Textarea placeholder="Tell students what you need..." className="rounded-2xl border-gray-100 bg-gray-50/50 font-bold min-h-[140px] pt-5 text-gray-700" />
          </div>

          <div className="pt-4 flex gap-4">
             <Button type="button" onClick={onClose} variant="ghost" className="flex-1 py-8 rounded-2xl font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50">Cancel</Button>
             <Button type="submit" className="flex-[2] bg-blue-700 hover:bg-blue-800 text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 uppercase italic transition-all active:scale-95">
               Publish Opportunity
             </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};