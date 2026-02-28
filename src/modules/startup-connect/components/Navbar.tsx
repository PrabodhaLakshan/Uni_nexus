"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Rocket, Bell, LogOut } from "lucide-react";
import { STARTUP_LANDING_LINKS, STUDENT_LINKS, STARTUP_LINKS } from '../constants/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Navbar එක පෙන්විය යුතු පේජ් එකකද ඉන්නේ කියලා බලන Logic එක
  const isStartupConnectPage = pathname.includes('/startup-connect') ||
                               pathname.includes('/dashboard/student') ||
                               pathname.includes('/dashboard/startup');

  // වැදගත්: Startup Connect අදාළ පේජ් එකක නෙවෙයි නම් මුකුත් පෙන්වන්න එපා
  if (!isStartupConnectPage) {
    return null;
  }

  // 2. දැනට ඉන්නේ Startup Route එකකද කියලා බලනවා (Links තෝරන්න)
  const studentRoutePrefixes = [
    '/startup-connect/student',
    '/startup-connect/profile',
    '/startup-connect/my-projects',
    '/startup-connect/reviews',
    '/startup-connect/create-student-profile',
    '/dashboard/student'
  ];

  const isStudentRoute = studentRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
  const isStartupRoute = !isStudentRoute;
  const startupLandingNavbarRoutes = ['/startup-connect', '/startup-connect/browse-gigs', '/startup-connect/about'];
  const isStartupLandingPage = startupLandingNavbarRoutes.includes(pathname);
  const activeLinks = isStartupLandingPage
    ? STARTUP_LANDING_LINKS
    : isStartupRoute
      ? STARTUP_LINKS
      : STUDENT_LINKS;

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-sky-100">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 leading-none tracking-tight">UniNexus</span>
              <span className="text-[10px] font-bold text-sky-600 tracking-tighter uppercase">
                {isStartupRoute ? "FounderPortal" : "StudentConnect"}
              </span>
            </div>
          </Link>
        </div>

        {/* Dynamic Navigation Links */}
        <div className="hidden md:flex items-center gap-2 bg-sky-50/30 p-1.5 rounded-2xl border border-sky-100/50 overflow-x-auto">
          {activeLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-tighter transition-all duration-300 whitespace-nowrap ${
                  isActive 
                  ? "bg-white text-sky-600 shadow-md shadow-sky-100" 
                  : "text-slate-500 hover:text-sky-600 hover:bg-sky-50" 
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-600" : "group-hover:text-sky-500"}`} />
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4 pl-4">
          <Button variant="ghost" size="icon" className="rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors">
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="h-8 w-[1px] bg-slate-200 mx-2" />
          
          <Button 
            variant="ghost" 
            onClick={() => router.push('/startup-connect')} // Exit කළාම StartupUI page එකට යනවා
            className="text-red-500 font-bold text-xs hover:bg-red-50 rounded-xl px-5 py-6 transition-all active:scale-95 group"
          >
            <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            EXIT
          </Button>
        </div>
      </div>

      {/* Gradient Bottom Line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-sky-400 via-blue-300 to-sky-500" />
    </nav>
  );
};