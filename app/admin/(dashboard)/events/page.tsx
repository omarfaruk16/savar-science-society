import prisma from "@/lib/prisma";
import Link from "next/link";
import { Calendar, Plus, Edit, Eye, Trash2, MapPin, Users } from "lucide-react";
import { deleteEvent, toggleEventStatus } from "@/app/actions/admin-actions";
import DeleteButton from "@/app/admin/(dashboard)/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      _count: {
        select: { registrations: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events & Competitions</h1>
          <p className="text-[#a3b8aa]">Manage organizational events and student registrations.</p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="card p-16 bg-[#0a1410] text-center">
          <Calendar className="w-12 h-12 text-[#a3b8aa] mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No Events Yet</h3>
          <p className="text-[#a3b8aa] text-sm mb-6">Create your first event to start accepting registrations.</p>
          <Link href="/admin/events/new" className="px-5 py-2.5 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm inline-block">
            Create First Event
          </Link>
        </div>
      ) : (
        <div className="card bg-[#0a1410] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a3028]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Event Details</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Fee</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Stats</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Reg. Status</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3028]">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-[#0f1d17] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#1a3028] flex flex-col items-center justify-center border border-[#224035] flex-shrink-0">
                          <span className="text-[10px] font-bold text-[#22c55e] uppercase">{new Date(event.date).toLocaleDateString("en-US", { month: "short" })}</span>
                          <span className="text-sm font-bold text-white leading-none">{new Date(event.date).getDate()}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm line-clamp-1">{event.title}</div>
                          <div className="text-xs text-[#5a7a68] mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {event.venue}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[#22c55e]">
                      {event.fee === 0 ? "Free" : `${event.fee} BDT`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#a3b8aa]">
                        <Users className="w-4 h-4 text-[#5a7a68]" />
                        <span>{event._count.registrations} registered</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <form action={async () => {
                          "use server";
                          await toggleEventStatus(event.id, "isRegistrationOpen", event.isRegistrationOpen);
                        }}>
                          <button type="submit" className={`w-full text-center px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${event.isRegistrationOpen ? "bg-[#16a34a]/10 text-[#22c55e] border border-[#22c55e]/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                            {event.isRegistrationOpen ? "Reg. Open" : "Reg. Closed"}
                          </button>
                        </form>
                        <form action={async () => {
                          "use server";
                          await toggleEventStatus(event.id, "published", event.published);
                        }}>
                          <button type="submit" className={`w-full text-center px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${event.published ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-[#1a3028] text-[#5a7a68] border border-[#1a3028]"}`}>
                            {event.published ? "Visible" : "Hidden"}
                          </button>
                        </form>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="p-2 rounded-md text-[#a3b8aa] hover:text-white hover:bg-[#1a3028] transition-colors"
                          title="View Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 rounded-md text-[#a3b8aa] hover:text-[#22c55e] hover:bg-[#1a3028] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          label="event"
                          action={async () => {
                            "use server";
                            await deleteEvent(event.id);
                          }}
                        />
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
