import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Calendar, Users, LogOut, MessageSquare } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#050d0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1410] border-r border-[#1a3028] flex flex-col pt-6 z-10">
        <div className="px-6 pb-6 border-b border-[#1a3028]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#22c55e] flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="text-white font-bold tracking-tight">Admin CMS</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-[#1a3028] text-white font-medium">
            <LayoutDashboard className="w-5 h-5 text-[#22c55e]" /> Dashboard
          </Link>
          <Link href="/admin/blogs" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-white transition-colors">
            <FileText className="w-5 h-5" /> Blog Posts
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-white transition-colors">
            <Calendar className="w-5 h-5" /> Events
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-white transition-colors">
            <Users className="w-5 h-5" /> Students
          </Link>
          <Link href="/admin/registrations" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-white transition-colors">
            <FileText className="w-5 h-5" /> Registrations
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 rounded-md text-[#a3b8aa] hover:bg-[#0f1d17] hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" /> Messages
          </Link>
        </nav>

        <div className="p-4 border-t border-[#1a3028]">
          <form action={async () => {
            "use server"
            await signOut({ redirectTo: "/admin/login" })
          }}>
            <button type="submit" className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {/* Simple top bar */}
        <header className="h-16 bg-[#0a1410]/50 backdrop-blur-md border-b border-[#1a3028] flex items-center px-8 z-10 sticky top-0">
          <div className="text-[#a3b8aa] text-sm">
            Welcome back, <span className="font-bold text-white">{session.user.name || 'Admin'}</span>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
