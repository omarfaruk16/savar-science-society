import { getPublishedEvents } from "@/lib/events";
import Link from "next/link";
import { Calendar, MapPin, Search, ArrowRight } from "lucide-react";
import OlympiadHistory from "@/components/home/OlympiadHistory";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getPublishedEvents().catch(() => []);

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-[#1a3028] pb-8">
          <div>
            <div className="badge mb-4">Discover</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">All <span className="text-[#22c55e]">Events</span></h1>
          </div>
          
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search events..." 
                className="input pl-10 w-full"
              />
              <Search className="w-4 h-4 text-[#a3b8aa] absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {events.length === 0 && (
            <div className="text-center text-[#a3b8aa] py-12">
              No upcoming events found. Stay tuned!
            </div>
          )}
          {events.map((event) => (
            <div key={event.id} className="card group overflow-hidden">
              <Link href={`/events/${event.slug}`} className="flex flex-col md:flex-row h-full">
                <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={event.coverImage || "/placeholder.jpg"} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow md:w-3/5">
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#22c55e] mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#22c55e] transition-colors leading-tight">
                    {event.title}
                  </h3>
                  
                  <p className="text-[#a3b8aa] text-sm md:text-base mb-8 flex-grow line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-[#1a3028] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#a3b8aa]">
                      <MapPin className="w-4 h-4 text-[#22c55e]" />
                      <span className="truncate max-w-[150px] md:max-w-none">{event.venue || 'TBA'}</span>
                    </div>
                    <div className="text-sm font-bold text-[#22c55e] group-hover:translate-x-2 transition-transform flex items-center gap-1">
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-16 border-t border-[#1a3028]">
          <OlympiadHistory />
        </div>
      </div>
    </div>
  );
}
