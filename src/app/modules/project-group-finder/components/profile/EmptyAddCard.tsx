"use client";

export default function EmptyAddCard({
  text,
  onAdd,
}: {
  text: string;
  onAdd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="
        w-full rounded-2xl border border-dashed border-white/15
        bg-black/20 p-5 text-left
        transition hover:border-blue-500/40 hover:bg-blue-500/5
      "
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80">
          +
        </span>
        <div>
          <p className="text-sm font-semibold text-white">Add details</p>
          <p className="mt-1 text-xs text-white/60">{text}</p>
        </div>
      </div>
    </button>
  );
}