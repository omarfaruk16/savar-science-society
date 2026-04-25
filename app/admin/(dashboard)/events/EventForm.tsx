"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveEvent } from "@/app/actions/admin-actions";
import { ArrowLeft, Save, Loader2, Calendar, MapPin, DollarSign, Link2, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

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

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(event?.coverImage || null);
  const [content, setContent] = useState(event?.content || "");
  const [title, setTitle] = useState(event?.title || "");
  const [slug, setSlug] = useState(event?.slug || "");
  const [slugEdited, setSlugEdited] = useState(!!event);
  const [isUploading, setIsUploading] = useState(false);

  // Auto-generate slug from title only when creating new (not editing)
  useEffect(() => {
    if (!slugEdited && !event) {
      setSlug(generateSlug(title));
    }
  }, [title, slugEdited, event]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: uploadForm });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImagePreview(data.url);
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

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
    formData.set("content", content);
    formData.set("title", title);
    formData.set("slug", slug);
    if (isEdit) formData.set("id", event.id);
    if (imagePreview) formData.set("coverImage", imagePreview);

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
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Event Title *</label>
                <input
                  name="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Savar Science Fair 2024"
                  className="input w-full"
                />
              </div>

              {/* Slug — auto-generated, still editable */}
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 flex items-center gap-2">
                  <Link2 className="w-4 h-4" />
                  Slug (URL) *
                  {!isEdit && (
                    <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full ml-1">
                      Auto-generated
                    </span>
                  )}
                </label>
                <input
                  name="slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="savar-science-fair-2024"
                  className="input w-full font-mono text-sm"
                />
                {!isEdit && title && (
                  <p className="text-xs text-[#5a7a68] mt-1">
                    Preview: <span className="text-[#22c55e]">/events/{slug}</span>
                    {slugEdited && (
                      <button
                        type="button"
                        onClick={() => { setSlug(generateSlug(title)); setSlugEdited(false); }}
                        className="ml-3 text-[#a3b8aa] hover:text-[#22c55e] underline"
                      >
                        Reset to auto
                      </button>
                    )}
                  </p>
                )}
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
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Full Details (Rich Text) *</label>
                <RichTextEditor content={content} onChange={setContent} />
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
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 uppercase tracking-wider text-xs">Cover Image</label>
                <div className="space-y-3">
                  {/* Image preview */}
                  <div className="relative aspect-video rounded-xl border-2 border-dashed border-[#1a3028] bg-[#050d0a] overflow-hidden">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 w-7 h-7 bg-black/70 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => document.getElementById("event-image-input")?.click()}
                        disabled={isUploading}
                        className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-[#0a1410] transition-colors"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-8 h-8 text-[#22c55e] animate-spin" />
                            <span className="text-xs text-[#22c55e]">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-8 h-8 text-[#1a3028]" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5a7a68]">Click to upload</span>
                            <span className="text-[9px] text-[#3a5040]">JPEG, PNG, WebP — max 5MB</span>
                          </>
                        )}
                      </button>
                    )}
                    <input
                      id="event-image-input"
                      type="file"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                    />
                  </div>

                  {/* Hidden input for the uploaded image URL */}
                  <input type="hidden" name="coverImage" value={imagePreview || ""} />

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => document.getElementById("event-image-input")?.click()}
                      className="w-full text-xs text-[#a3b8aa] hover:text-[#22c55e] transition-colors text-center py-1"
                    >
                      Click to replace image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
