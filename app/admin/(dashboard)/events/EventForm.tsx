"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveEvent } from "@/app/actions/admin-actions";
import { ArrowLeft, Save, Eye, Loader2, Calendar, MapPin, DollarSign } from "lucide-react";
import Link from "next/link";

interface EventFormProps {
  event?: {
    id: string;
    title: string;
    slug: string;
    coverImage: string | null;
    date: Date;
    description: string;
    content: string;
    venue: string;
    fee: number;
    isRegistrationOpen: boolean;
    published: boolean;
  };
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isEdit = !!event;

  // Format date for input: YYYY-MM-DDThh:mm
  const formatForInput = (d: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    if (isEdit) formData.set("id", event.id);

    startTransition(async () => {
      const result = await saveEvent(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(isEdit ? "Event updated!" : "Event created!");
        setTimeout(() => router.push("/admin/events"), 1000);
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/events" className="p-2 rounded-md text-[#a3b8aa] hover:text-white hover:bg-[#1a3028] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{isEdit ? "Edit Event" : "New Event"}</h1>
          <p className="text-[#a3b8aa] text-sm mt-1">{isEdit ? `Editing: ${event.title}` : "Create a new event and open registrations."}</p>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}
      {success && <div className="bg-[#16a34a]/10 border border-[#22c55e]/30 text-[#22c55e] text-sm rounded-lg px-4 py-3">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6 bg-[#0a1410] space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Event Title *</label>
                <input name="title" type="text" required defaultValue={event?.title || ""} placeholder="e.g. Savar Science Fair 2024" className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Slug (URL) *</label>
                <input name="slug" type="text" required defaultValue={event?.slug || ""} placeholder="savar-science-fair-2024" className="input w-full font-mono text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date & Time *
                  </label>
                  <input name="date" type="datetime-local" required defaultValue={event ? formatForInput(new Date(event.date)) : ""} className="input w-full" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Venue *
                  </label>
                  <input name="venue" type="text" required defaultValue={event?.venue || ""} placeholder="Savar Cantonment" className="input w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Short Description *</label>
                <textarea name="description" required rows={2} defaultValue={event?.description || ""} placeholder="Briefly describe what this event is about..." className="input w-full resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Full Details (Markdown supported) *</label>
                <textarea name="content" required rows={12} defaultValue={event?.content || ""} placeholder="Write full details about rules, categories, prizes, etc..." className="input w-full resize-y font-mono text-sm leading-relaxed" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card p-6 bg-[#0a1410] space-y-5">
              <h3 className="font-bold text-white border-b border-[#1a3028] pb-3">Status & Fee</h3>
              
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Registration Fee (BDT)
                </label>
                <input name="fee" type="number" step="0.01" defaultValue={event?.fee || 0} className="input w-full" />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#a3b8aa]">Registration Open</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isRegistrationOpen" defaultChecked={event?.isRegistrationOpen ?? true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#1a3028] rounded-full peer peer-checked:bg-[#22c55e] transition-colors peer-focus:ring-2 peer-focus:ring-[#22c55e]/50"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#a3b8aa]">Published</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="published" defaultChecked={event?.published || false} className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#1a3028] rounded-full peer peer-checked:bg-[#22c55e] transition-colors peer-focus:ring-2 peer-focus:ring-[#22c55e]/50"></div>
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm disabled:opacity-60 mt-4"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isPending ? "Saving..." : isEdit ? "Update Event" : "Create Event"}
              </button>
            </div>

            <div className="card p-6 bg-[#0a1410] space-y-4">
              <h3 className="font-bold text-white border-b border-[#1a3028] pb-3">Media</h3>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Cover Image URL</label>
                <input name="coverImage" type="url" defaultValue={event?.coverImage || ""} placeholder="https://..." className="input w-full" />
              </div>
              {event?.coverImage && (
                <div className="mt-2 rounded-lg overflow-hidden border border-[#1a3028]">
                  <img src={event.coverImage} alt="Preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
