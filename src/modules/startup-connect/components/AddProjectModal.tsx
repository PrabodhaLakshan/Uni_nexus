"use client";

import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Github, Globe, Rocket, ImagePlus, X } from "lucide-react";

interface AddProjectModalProps {
  onAddProject: (project: any) => void;
}

export const AddProjectModal = ({ onAddProject }: AddProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => prev.concat(filesArray));
    }
  };

  const handlePublish = () => {
    if (!title || !desc) return alert("Please fill title and description!");

    const newProject = {
      id: Date.now(),
      title,
      description: desc,
      github,
      demo,
      date: "Feb 2026",
      images: selectedImages.length > 0 ? selectedImages : ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070"]
    };

    onAddProject(newProject);
    setOpen(false); // Modal එක වහන්න
    // Fields reset කරන්න
    setTitle(""); setDesc(""); setGithub(""); setDemo(""); setSelectedImages([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl px-6 py-6 font-black shadow-lg shadow-sky-100 flex items-center gap-2">
          <Plus className="w-5 h-5" /> NEW PROJECT
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-white rounded-[40px] border-none shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-slate-900 flex items-center gap-3 italic">
            <Rocket className="w-8 h-8 text-sky-600" /> ADD NEW PROJECT
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          <Input placeholder="Project Name" value={title} onChange={(e) => setTitle(e.target.value)} className="rounded-2xl border-slate-100 py-6 font-bold" />
          <Textarea placeholder="Project Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="rounded-2xl border-slate-100 font-bold" />
          
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="GitHub Link" value={github} onChange={(e) => setGithub(e.target.value)} className="rounded-2xl border-slate-100 py-6 font-bold" />
            <Input placeholder="Demo Link" value={demo} onChange={(e) => setDemo(e.target.value)} className="rounded-2xl border-slate-100 py-6 font-bold" />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase flex items-center gap-1">
              <ImagePlus className="w-4 h-4 text-sky-600" /> Screenshots
            </label>
            <div className="flex flex-wrap gap-3">
              {selectedImages.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-sky-50">
                  <img src={img} className="w-full h-full object-cover" />
                  <X className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full cursor-pointer" onClick={() => setSelectedImages(selectedImages.filter((_, idx) => idx !== i))} />
                </div>
              ))}
              <label className="w-20 h-20 rounded-xl border-2 border-dashed border-sky-200 bg-sky-50 flex items-center justify-center cursor-pointer hover:bg-sky-100 transition-all">
                <Plus className="w-6 h-6 text-sky-400" />
                <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handlePublish} className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl w-full py-7 font-black text-lg">
            PUBLISH PROJECT
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};