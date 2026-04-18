import prisma from "@/lib/prisma";
import Link from "next/link";
import { Users, Mail, Phone, School, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const students = await prisma.user.findMany({
    where: { role: "STUDENT" },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { registrations: true } } },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Students</h1>
          <p className="text-[#a3b8aa]">{students.length} registered student{students.length !== 1 ? "s" : ""}.</p>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="card p-16 bg-[#0a1410] text-center">
          <Users className="w-12 h-12 text-[#a3b8aa] mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No Students Yet</h3>
          <p className="text-[#a3b8aa] text-sm">Students will appear here once they register on the platform.</p>
        </div>
      ) : (
        <div className="card bg-[#0a1410] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a3028]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Student</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">School / Class</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Events</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Joined</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3028]">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-[#0f1d17] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {student.profileImage ? (
                          <img src={student.profileImage} alt={student.fullNameEn} className="w-10 h-10 rounded-full object-cover border border-[#1a3028] flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#1a3028] border border-[#224035] flex items-center justify-center flex-shrink-0">
                            <span className="text-[#22c55e] font-bold text-sm">{student.fullNameEn.charAt(0)}</span>
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-white text-sm">{student.fullNameEn}</div>
                          <div className="text-xs text-[#5a7a68]">{student.fullNameBn}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#a3b8aa]">
                          <Mail className="w-3 h-3 text-[#22c55e]" />
                          <span className="line-clamp-1 max-w-[160px]">{student.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#a3b8aa]">
                          <Phone className="w-3 h-3 text-[#22c55e]" />
                          <span>{student.mobileNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#a3b8aa]">
                          <School className="w-3 h-3 text-[#22c55e]" />
                          <span className="line-clamp-1 max-w-[150px]">{student.schoolName}</span>
                        </div>
                        <div className="text-xs text-[#5a7a68] pl-4">Class {student.class}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#1a3028] text-[#22c55e]">
                        {student._count.registrations}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-xs text-[#a3b8aa]">
                        <Calendar className="w-3 h-3 text-[#22c55e]" />
                        {new Date(student.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/users/${student.id}`}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#a3b8aa] border border-[#1a3028] hover:text-white hover:bg-[#1a3028] transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
