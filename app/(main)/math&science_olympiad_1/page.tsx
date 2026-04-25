import { Calendar, MapPin, Users, School, Trophy, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function Olympiad1Page() {
  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#a3b8aa] hover:text-[#22c55e] transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="badge mb-4">Past Event</div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Math & Science <span className="text-[#22c55e]">Olympiad 2023</span>
              </h1>
              <p className="text-lg text-[#a3b8aa] leading-relaxed mb-8">
                The inaugural Math & Science Olympiad organized by Savar Science Society was a landmark event that brought together the brightest young minds from across the region.
              </p>
            </div>

            {/* Banner Image */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-[#1a3028] shadow-2xl">
              <img 
                src="/images/olympiads/olympiad_1.png" 
                alt="Olympiad 2023" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-[#a3b8aa] leading-relaxed">
              <h2 className="text-2xl font-bold text-white mb-6">Event Highlights</h2>
              <p>
                The event featured various segments including a written examination, a science project exhibition, and a fast-paced math quiz. It was designed to challenge students beyond their school curriculum and foster a spirit of scientific inquiry.
              </p>
              <p>
                Participants from over 45 schools demonstrated exceptional skills in problem-solving and critical thinking. The competitive yet friendly atmosphere encouraged peer learning and collaboration.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-10 mb-4">Impact and Reach</h3>
              <p>
                With more than 1,200 students participating, this event marked the beginning of a new era for science education in Savar. The success of this olympiad paved the way for larger and more diverse competitions in the following years.
              </p>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-8">
            <div className="card p-8 border-[#22c55e]/20 bg-[#0a1410] sticky top-24">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#22c55e]" /> Event Statistics
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Total Students</p>
                    <p className="text-xl font-black text-white">1,200+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <School className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Schools Participated</p>
                    <p className="text-xl font-black text-white">45</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Held On</p>
                    <p className="text-lg font-bold text-white">Oct 15, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Venue</p>
                    <p className="text-lg font-bold text-white">Savar Govt College</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#1a3028]">
                <button className="btn-primary w-full justify-center" disabled>
                  Registration Closed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
