import { getPublishedEvents } from "@/lib/events";
import Link from "next/link";
import { Calendar, MapPin, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getPublishedEvents();

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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {events.length === 0 && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3 text-center text-[#a3b8aa] py-12">
              No upcoming events found. Stay tuned!
            </div>
          )}
          {events.map((event) => (
            <div key={event.id} className="card group flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={event.coverImage} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#a3b8aa] mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#22c55e]" />
                    {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#22c55e] transition-colors leading-tight">
                  <Link href={`/events/${event.slug}`}>
                    <span className="absolute inset-0 z-0"></span>
                    {event.title}
                  </Link>
                </h3>
                
                <p className="text-[#a3b8aa] text-sm mb-6 flex-grow line-clamp-3">
                  {event.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-[#1a3028] flex items-center justify-between relative z-20">
                  <div className="flex items-center gap-2 text-xs text-[#a3b8aa] max-w-[60%]">
                    <MapPin className="w-4 h-4 text-[#22c55e] flex-shrink-0" />
                    <span className="truncate">{event.venue || 'TBA'}</span>
                  </div>
                  <Link href={`/events/${event.slug}`} className="text-sm font-bold text-white bg-[#22c55e] px-4 py-2 rounded-full hover:bg-[#16a34a] flex items-center gap-1 transition-colors">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
