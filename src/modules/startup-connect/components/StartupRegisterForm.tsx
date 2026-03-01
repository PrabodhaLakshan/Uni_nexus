"use client";
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, ArrowRight } from "lucide-react";

export const StartupRegisterForm = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [formData, setFormData] = useState({ name: '', industry: '', about: '' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <Card className="max-w-lg w-full border-none shadow-2xl shadow-blue-100/20 p-8 rounded-[40px]">
        <div className="text-center mb-10 space-y-3">
          <div className="w-16 h-16 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Rocket className="text-orange-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">Set up Startup</h2>
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Founders access only</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Startup Name</label>
            <Input 
              className="rounded-2xl border-gray-100 bg-gray-50/50 py-6 font-bold" 
              placeholder="e.g. Nexus Lab"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Industry</label>
            <Input 
              className="rounded-2xl border-gray-100 bg-gray-50/50 py-6 font-bold" 
              placeholder="e.g. Fintech, Edtech"
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-blue-700 ml-1">Short Pitch</label>
            <Textarea 
              className="rounded-2xl border-gray-100 bg-gray-50/50 font-bold min-h-25"
              placeholder="Tell us about your mission..."
              onChange={(e) => setFormData({...formData, about: e.target.value})}
            />
          </div>
          <Button 
            onClick={() => onComplete(formData)}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-8 rounded-2xl font-black text-lg group"
          >
            CREATE ACCOUNT <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </div>
  );
};