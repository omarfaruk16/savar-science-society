import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, MapPin, Clock, ArrowLeft, Users, Trophy, Image as ImageIcon, MessageSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { getEventBySlug } from "@/lib/events";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = (await getEventBySlug(slug)) as any;

  if (!event || !event.published) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Navigation */}
        <Link href="/events" className="inline-flex items-center gap-2 text-[#a3b8aa] hover:text-[#22c55e] transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all events
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="badge mb-4">Upcoming Event</div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-[#a3b8aa] text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#22c55e]" />
                  {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#22c55e]" />
                  {event.venue || 'To Be Announced'}
                </div>
              </div>
            </div>

            {/* Banner */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-[#1a3028] shadow-2xl">
              <img 
                src={event.coverImage || "/placeholder.jpg"} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* About Event */}
            <div className="prose prose-invert prose-lg max-w-none text-[#a3b8aa] leading-relaxed">
              <h2 className="text-2xl font-bold text-white mb-6">About the Event</h2>
              <div dangerouslySetInnerHTML={{ __html: event.content }} />
            </div>

            {/* President's Message if available */}
            {event.presidentMsg && (
              <div className="glass p-8 rounded-3xl border-[#1a3028] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare className="w-24 h-24 text-[#22c55e]" />
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                  {event.presidentImg && (
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#22c55e] flex-shrink-0">
                      <img src={event.presidentImg || "/placeholder.jpg"} alt="President" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4 italic">President's Message</h3>
                    <p className="text-[#f0fdf4] italic leading-relaxed">
                      "{event.presidentMsg}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Register */}
          <div className="space-y-8">
            <div className="card p-8 border-[#22c55e]/20 bg-[#0a1410] sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#22c55e]" /> Event Details
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-[#1a3028]">
                  <span className="text-sm text-[#a3b8aa] font-medium">Registration Fee</span>
                  <span className="text-sm text-[#22c55e] font-bold">
                    {event.fee === 0 ? "FREE" : `${event.fee} BDT`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#1a3028]">
                  <span className="text-sm text-[#a3b8aa] font-medium">Status</span>
                  <span className={`text-sm font-bold ${event.isRegistrationOpen ? "text-[#22c55e]" : "text-red-500"}`}>
                    {event.isRegistrationOpen ? "Open" : "Closed"}
                  </span>
                </div>
              </div>

              {event.isRegistrationOpen ? (
                <Link href={`/register?event=${event.id}`} className="btn-primary w-full justify-center text-lg py-4">
                  Register Now
                </Link>
              ) : (
                <button disabled className="btn-primary w-full justify-center text-lg py-4 opacity-50 cursor-not-allowed">
                  Registration Closed
                </button>
              )}
              
              <p className="text-center text-xs text-[#5a7a68] mt-4">
                {event.isRegistrationOpen ? "Join us for this exciting opportunity!" : "Stay tuned for future events."}
              </p>
            </div>

            {/* Winners Preview (if added) */}
            {event.winners && (
              <div className="card p-6 border-[#1a3028]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> Wall of Fame
                </h3>
                <div className="space-y-3">
                   {/* Map winners if they exist */}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
