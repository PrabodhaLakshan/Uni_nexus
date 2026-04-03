"use client";
import React from "react";
import { Star, Quote } from "lucide-react";
import { getToken } from "@/lib/auth";

type ApiReview = {
  id: string;
  studentName: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
};

const COMPANY_UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function formatReviewDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export const StartupReviews = () => {
  const [reviews, setReviews] = React.useState<ApiReview[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = getToken();
      if (!token) {
        setError("Sign in as a startup to see your reviews.");
        setLoading(false);
        return;
      }
      try {
        const storedCompanyId =
          typeof window !== "undefined" ? localStorage.getItem("companyId")?.trim() ?? "" : "";
        const companyQs =
          storedCompanyId && COMPANY_UUID_RE.test(storedCompanyId)
            ? `?companyId=${encodeURIComponent(storedCompanyId)}`
            : "";
        const res = await fetch(`/api/startup-connect/reviews${companyQs}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = (await res.json()) as { success?: boolean; data?: ApiReview[]; error?: string };
        if (cancelled) return;
        if (!res.ok || !json.success || !json.data) {
          setError(json.error ?? "Could not load reviews.");
          setReviews([]);
        } else {
          setReviews(json.data);
          setError(null);
        }
      } catch {
        if (!cancelled) setError("Could not load reviews.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="mt-16 rounded-[40px] border border-slate-100 bg-white p-10 shadow-xl shadow-slate-50">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900">
            Startup <span className="text-orange-500">Reviews</span>
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
            What students say about working here
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-6 py-3">
          <span className="text-2xl font-black text-orange-600">{averageRating}</span>
          <div className="flex flex-col">
            <div className="flex text-orange-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={12} fill={i <= Math.round(Number(averageRating)) ? "currentColor" : "none"} />
              ))}
            </div>
            <span className="text-[9px] font-black uppercase text-slate-400">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>
      </div>

      {loading && (
        <p className="text-center text-sm font-bold text-slate-400">Loading reviews…</p>
      )}
      {error && !loading && (
        <div className="rounded-3xl border border-amber-100 bg-amber-50/80 px-6 py-8 text-center text-sm font-bold text-amber-900">
          {error}
        </div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <div className="rounded-3xl border border-slate-100 bg-slate-50/80 px-6 py-10 text-center">
          <p className="text-sm font-black text-slate-700">No reviews yet</p>
          <p className="mx-auto mt-2 max-w-md text-xs font-medium text-slate-500">
            When students complete work with you, they can leave feedback on your public profile.
          </p>
        </div>
      )}
      {!loading && !error && reviews.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative rounded-[32px] border border-transparent bg-slate-50/50 p-8 transition-all hover:border-orange-200"
            >
              <Quote
                className="absolute right-6 top-6 text-slate-200 transition-colors group-hover:text-orange-100"
                size={40}
              />

              <div className="mb-4 flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-orange-500 text-orange-500" />
                ))}
              </div>

              <p className="mb-6 text-sm font-medium italic leading-relaxed text-slate-600">&ldquo;{review.comment}&rdquo;</p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-white text-xs font-black text-slate-400">
                    {review.studentName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-900">{review.studentName}</h4>
                    <p className="text-[9px] font-bold uppercase text-slate-400">{review.role}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase text-slate-300">
                  {formatReviewDate(review.date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
