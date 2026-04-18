import prisma from "@/lib/prisma";
import { Users, FileText, Calendar, Star } from "lucide-react";
import { getAllEvents } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [studentCount, blogCount, reviewCount, eventsList] = await Promise.all([
    prisma.user.count({ where: { role: "STUDENT" } }),
    prisma.blogPost.count(),
    prisma.review.count(),
    getAllEvents()
  ]);

  const eventCount = eventsList.length;

  const recentStudents = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-[#a3b8aa]">Welcome to the Savar Science Society administration panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6 bg-[#0a1410]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{studentCount}</div>
              <div className="text-sm text-[#a3b8aa]">Total Students</div>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-[#0a1410]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{blogCount}</div>
              <div className="text-sm text-[#a3b8aa]">Blog Posts</div>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-[#0a1410]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{eventCount}</div>
              <div className="text-sm text-[#a3b8aa]">Events</div>
            </div>
          </div>
        </div>

        <div className="card p-6 bg-[#0a1410]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{reviewCount}</div>
              <div className="text-sm text-[#a3b8aa]">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card p-6 bg-[#0f1d17]">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-[#1a3028] pb-4">Recent Registrations</h2>
          <div className="space-y-4">
            {recentStudents.length === 0 ? (
              <p className="text-[#a3b8aa] text-sm">No students registered yet.</p>
            ) : (
              recentStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1a3028] transition-colors border border-transparent hover:border-[#224035]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0a1410] border border-[#224035] flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#22c55e]" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{student.fullNameEn}</div>
                      <div className="text-xs text-[#a3b8aa]">{student.schoolName} - Class {student.class}</div>
                    </div>
                  </div>
                  <div className="text-xs text-[#5a7a68]">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card p-6 bg-[#0f1d17] border border-[#1a3028] flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 flex items-center justify-center mb-4 border border-[#16a34a]/30">
               <FileText className="w-8 h-8 text-[#22c55e]" />
             </div>
             <h3 className="font-bold text-white mb-2 text-lg">Content Management</h3>
             <p className="text-[#a3b8aa] text-sm mb-6 max-w-xs">Manage blogs, events and student details from the sidebar navigation.</p>
        </div>
      </div>
    </div>
  );
}
