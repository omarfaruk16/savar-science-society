"use client";
import { EventData } from "@/lib/events";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface LatestEventsProps {
  events: EventData[];
}

export default function LatestEvents({ events }: LatestEventsProps) {

  return (
    <section className="bg-[#0a1410] py-16 relative overflow-hidden">
      {/* Sparkle effects */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#16a34a] rounded-full mix-blend-screen filter blur-[100px] opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="badge mb-4">Upcoming</div>
            <h2 className="section-title mb-4">Latest <span className="text-[#22c55e]">Events</span></h2>
            <p className="section-subtitle">
              Participate in our upcoming competitions, workshops, and fairs to test your knowledge and learn new skills.
            </p>
          </div>
          <Link href="/events" className="btn-secondary">
            View All Events <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="card group flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={event.coverImage} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-[#22c55e] mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#22c55e] transition-colors leading-tight">
                  {event.title}
                </h3>
                
                <p className="text-[#a3b8aa] text-sm mb-6 flex-grow line-clamp-2">
                  {event.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-[#1a3028] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-[#a3b8aa]">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-[150px]">{event.venue || 'TBA'}</span>
                  </div>
                  <Link 
                    href={`/events/${event.slug}`} 
                    className="text-sm font-bold text-[#22c55e] hover:text-white flex items-center gap-1 transition-colors group/btn"
                  >
                    Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:-rotate-45 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
