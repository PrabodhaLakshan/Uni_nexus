"use client";

export default function SectionCard({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {hint && <p className="mt-1 text-xs text-white/60">{hint}</p>}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}