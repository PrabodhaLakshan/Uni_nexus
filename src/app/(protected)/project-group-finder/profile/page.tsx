"use client";

import { useAuth } from "@/app/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Navbar from "@/components/Navbar";
import ProfilePage from "@/app/modules/project-group-finder/components/profile/Profilepage";

export default function ProfilePageRoute() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1020] to-black">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <ProfilePage />
      </main>
    </div>
  );
}