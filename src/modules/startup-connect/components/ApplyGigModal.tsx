"use client";
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Link as LinkIcon, User, Sparkles } from "lucide-react";

interface ApplyGigModalProps {
  isOpen: boolean;
  onClose: () => void;
  gigTitle: string;
}

export const ApplyGigModal = ({ isOpen, onClose, gigTitle }: ApplyGigModalProps) => {
  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application Sent Successfully! 🚀");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <Card className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl border-none p-10 relative overflow-hidden">
        
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-orange-500" />

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-orange-600 transition-colors z-10">
          <X size={24} strokeWidth={3} />
        </button>

        <div className="mb-10 space-y-2 relative">
          <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-2">
            <Sparkles size={24} fill="currentColor" />
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-950 leading-none">
            Apply <span className="text-blue-700">Now</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Applying for: {gigTitle}</p>
        </div>

        <form onSubmit={handleApply} className="space-y-6 relative">
          {/* Student Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <Input required placeholder="Pasindu Perera" className="rounded-2xl border-slate-100 bg-slate-50/50 py-7 pl-12 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-orange-600 ml-1">Portfolio / GitHub Link</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <Input required placeholder="https://github.com/yourprofile" className="rounded-2xl border-slate-100 bg-slate-50/50 py-7 pl-12 font-bold text-slate-700" />
            </div>
          </div>

          {/* Pitch */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Why are you the best fit? (Short Pitch)</label>
            <Textarea required placeholder="Tell the founder why they should hire you..." className="rounded-2xl border-slate-100 bg-slate-50/50 font-bold min-h-[120px] pt-5 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="pt-4">
             <Button type="submit" className="w-full bg-blue-700 hover:bg-orange-600 text-white py-8 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 uppercase italic transition-all active:scale-95 flex items-center justify-center gap-3">
               SEND APPLICATION <Send size={20} strokeWidth={3} />
             </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};