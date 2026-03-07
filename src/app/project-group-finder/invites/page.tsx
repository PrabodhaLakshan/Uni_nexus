import InvitesPage from "@/app/modules/project-group-finder/invites/page";
import Header2 from "@/components/Header2/Header2";

export const metadata = {
    title: "Pending Invites | Project Group Finder",
};

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header2 />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                <InvitesPage />
            </main>
        </div>
    );
}
