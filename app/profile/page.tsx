import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Admin routing
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  if (!session?.user?.id) {
    return (
      <div className="min-h-screen bg-[#050d0a] flex items-center justify-center p-4">
        <div className="card p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Session Refresh Required</h2>
          <p className="text-[#a3b8aa] mb-6">
            We've updated our security system. Please sign out and sign back in to continue to your profile.
          </p>
          <form action={async () => {
                   "use server"
                   await signOut({ redirectTo: "/login" })
                 }}>
            <button type="submit" className="btn-primary w-full justify-center gap-2">
              <LogOut className="w-5 h-5" /> Sign Out & Refresh
            </button>
          </form>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    redirect("/login");
  }

  const registrations = await prisma.registration.findMany({
    where: { userId: user.id },
    include: { event: true },
  });

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <ProfileClient user={user} registrations={registrations} />
      </div>
    </div>
  );
}
