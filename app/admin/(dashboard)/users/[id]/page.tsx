import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, School, Calendar, Users } from "lucide-react";
import { getEventBySlug } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await prisma.user.findUnique({
    where: { id: id },
    include: {
      registrations: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!student) notFound();

  // Merge registration data with file-based event data
  const registrationsWithEventData = await Promise.all(
    student.registrations.map(async (reg) => {
      const event = await getEventBySlug(reg.eventSlug);
      return { ...reg, event };
    })
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users" className="p-2 rounded-md text-[#a3b8aa] hover:text-white hover:bg-[#1a3028] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Student Profile</h1>
          <p className="text-[#a3b8aa] text-sm mt-1">Viewing details for {student.fullNameEn}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="card p-6 bg-[#0a1410] space-y-6">
            <div className="flex flex-col items-center text-center gap-4">
              {student.profileImage ? (
                <img src={student.profileImage} alt={student.fullNameEn} className="w-24 h-24 rounded-full object-cover border-2 border-[#22c55e]/30" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#1a3028] border-2 border-[#22c55e]/30 flex items-center justify-center">
                  <span className="text-[#22c55e] font-bold text-3xl">{student.fullNameEn.charAt(0)}</span>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white">{student.fullNameEn}</h2>
                <p className="text-[#a3b8aa] text-sm">{student.fullNameBn}</p>
                <span className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#16a34a]/20 text-[#22c55e] border border-[#22c55e]/30">
                  {student.role}
                </span>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#1a3028] pt-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Email</p>
                  <p className="text-sm text-white break-all">{student.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Mobile</p>
                  <p className="text-sm text-white">{student.mobileNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#a3b8aa] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Guardian Number</p>
                  <p className="text-sm text-white">{student.guardianNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <School className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">School / Class</p>
                  <p className="text-sm text-white">{student.schoolName}</p>
                  <p className="text-xs text-[#a3b8aa]">Class {student.class}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Date of Birth</p>
                  <p className="text-sm text-white">{new Date(student.dateOfBirth).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#22c55e] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Address</p>
                  <p className="text-sm text-white">{student.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#a3b8aa] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-[#5a7a68] font-semibold">Joined</p>
                  <p className="text-sm text-white">{new Date(student.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Registrations */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6 bg-[#0a1410]">
            <h3 className="text-lg font-bold text-white mb-4 border-b border-[#1a3028] pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#22c55e]" />
              Event Registrations ({registrationsWithEventData.length})
            </h3>
            {registrationsWithEventData.length === 0 ? (
              <p className="text-[#a3b8aa] text-sm py-4 text-center">This student has not registered for any events yet.</p>
            ) : (
              <div className="space-y-3">
                {registrationsWithEventData.map((reg) => (
                  <div key={reg.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#0f1d17] border border-[#1a3028] hover:border-[#224035] transition-colors">
                    {reg.event ? (
                      <>
                        <img src={reg.event.coverImage} alt={reg.event.title} className="w-14 h-12 object-cover rounded-md flex-shrink-0 border border-[#1a3028]" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm line-clamp-1">{reg.event.title}</p>
                          <p className="text-xs text-[#a3b8aa]">{new Date(reg.event.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold flex-shrink-0 ${reg.event.published ? "bg-[#16a34a]/20 text-[#22c55e] border border-[#22c55e]/30" : "bg-[#1a3028] text-[#5a7a68] border border-[#1a3028]"}`}>
                          {reg.event.published ? "Active" : "Draft"}
                        </span>
                      </>
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-red-400">Unknown Event: {reg.eventSlug}</p>
                        <p className="text-xs text-[#5a7a68]">The event data for this slug could not be found in the project files.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
