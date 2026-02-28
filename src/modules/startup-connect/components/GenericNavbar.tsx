"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Rocket } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

interface GenericNavbarProps {
  links: NavLink[];
  portalName: string;
  showExit?: boolean;
}

export const GenericNavbar = ({ links, portalName, showExit = true }: GenericNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link href="/startup-connect" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-sky-100">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 leading-none tracking-tight">UniNexus</span>
              <span className="text-[10px] font-bold text-sky-600 tracking-tighter uppercase italic">
                {portalName}
              </span>
            </div>
          </Link>
        </div>

        {/* Links Section - Dynamic */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black uppercase transition-all duration-300 ${
                  isActive 
                  ? "bg-white text-sky-600 shadow-sm border border-slate-100" 
                  : "text-slate-500 hover:text-sky-600 hover:bg-white" 
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-sky-600">
            <Bell className="w-5 h-5" />
          </Button>
          
          {showExit && (
            <>
              <div className="h-6 w-[1px] bg-slate-200" />
              <Button 
                variant="ghost" 
                onClick={() => router.push('/startup-connect')}
                className="text-red-500 font-bold text-[10px] hover:bg-red-50 rounded-xl px-4 py-5"
              >
                <LogOut className="w-4 h-4 mr-2" /> EXIT
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};