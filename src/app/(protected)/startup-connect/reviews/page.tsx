import { ReviewStatsCard } from "@/modules/startup-connect/components/ReviewStatsCard";
import { ReviewCard } from "@/modules/startup-connect/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Filter } from "lucide-react";
import Link from 'next/link';


const statsData = {
  total: 24,
  average: 4.8,
  breakdown: [
    { stars: 5, count: 18 },
    { stars: 4, count: 4 },
    { stars: 3, count: 2 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ]
};

const reviewsData = [
  { 
    id: 1, 
    user: "Dr. Rohana", 
    role: "Senior Lecturer", 
    date: "2024 Oct 12", 
    comment: "Excellent problem-solving skills in the Fintech project. Kasun demonstrated great leadership within the team.", 
    rating: 5 
  },
  { 
    id: 2, 
    user: "Saman Perera", 
    role: "Project Manager @ TechX", 
    date: "2024 Sept 05", 
    comment: "Very dedicated student with great UI/UX sense. Delivered the front-end components well ahead of schedule.", 
    rating: 4 
  },
  { 
    id: 3, 
    user: "UniNexus Support", 
    role: "Platform Verified", 
    date: "2024 Aug 20", 
    comment: "Successfully completed the 'Startup Essentials' bootcamp with high engagement levels.", 
    rating: 5 
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-2">
            <Link href="/startup-connect/profile" className="flex items-center gap-2 text-sky-600 font-bold text-sm hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Profile
            </Link>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <MessageSquare className="w-10 h-10 text-sky-600" /> Reviews
            </h1>
          </div>
          <Button className="bg-sky-600 rounded-2xl px-6 py-6 font-bold shadow-lg shadow-sky-100">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <ReviewStatsCard stats={statsData} />
          </div>
          <div className="lg:col-span-8 space-y-6">
            {reviewsData.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}