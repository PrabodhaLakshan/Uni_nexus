import { ApplicantsListView } from "@/modules/startup-connect/components/ApplicantsListView";

export default function ApplicantsPage() {
  return (
    <main className="min-h-screen bg-white pt-20 px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <ApplicantsListView />
      </div>
    </main>
  );
}
