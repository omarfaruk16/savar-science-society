import { Calendar, MapPin, Users, School, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Olympiad2Page() {
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
                Math & Science <span className="text-[#22c55e]">Olympiad 2024</span>
              </h1>
              <p className="text-lg text-[#a3b8aa] leading-relaxed mb-8">
                Building on the success of the previous year, the 2024 Math & Science Olympiad reached new heights with expanded categories and international participation.
              </p>
            </div>

            {/* Banner Image */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-[#1a3028] shadow-2xl">
              <img 
                src="/images/olympiads/olympiad_2.png" 
                alt="Olympiad 2024" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-[#a3b8aa] leading-relaxed">
              <h2 className="text-2xl font-bold text-white mb-6">Advancing Science</h2>
              <p>
                The 2024 edition introduced several new features, including a dedicated robotics section and a panel discussion with renowned scientists. The theme "Science for a Sustainable Future" inspired many innovative projects from the participants.
              </p>
              <p>
                The event was hosted at Jahangirnagar University, providing students with a glimpse of university-level research facilities and academic life.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-10 mb-4">Record Breaking Participation</h3>
              <p>
                With over 1,800 students from 62 schools, the event saw a significant increase in engagement. The level of competition was exceptionally high, with several projects receiving praise from the visiting university faculty.
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
                    <p className="text-xl font-black text-white">1,800+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <School className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Schools Participated</p>
                    <p className="text-xl font-black text-white">62</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Held On</p>
                    <p className="text-lg font-bold text-white">Nov 20, 2024</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Venue</p>
                    <p className="text-lg font-bold text-white">Jahangirnagar Univ.</p>
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
