import GroupDashboardPage from "@/app/modules/project-group-finder/groups/[id]/page";
import Header2 from "@/components/Header2/Header2";

export const metadata = {
    title: "Group Details | Project Group Finder",
};

type Params = {
    params: Promise<{ id: string }>;
};

export default async function Page({ params }: Params) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header2 />
            <main className="flex-1 w-full relative">
                <GroupDashboardPage text-wrap="" groupId={id} />
            </main>
        </div>
    );
}
