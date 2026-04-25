import { Calendar, MapPin, Users, School, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Olympiad3Page() {
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
              <div className="badge mb-4 bg-[#22c55e]/20 text-[#22c55e]">Upcoming</div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Math & Science <span className="text-[#22c55e]">Olympiad 2025</span>
              </h1>
              <p className="text-lg text-[#a3b8aa] leading-relaxed mb-8">
                The most anticipated event of the year is coming! The 2025 Math & Science Olympiad promises to be our biggest and most impactful yet.
              </p>
            </div>

            {/* Banner Image */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-[#1a3028] shadow-2xl">
              <img 
                src="/images/olympiads/olympiad_3.png" 
                alt="Olympiad 2025" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert prose-lg max-w-none text-[#a3b8aa] leading-relaxed">
              <h2 className="text-2xl font-bold text-white mb-6">The Future of Innovation</h2>
              <p>
                We are preparing to host students from all over Bangladesh for a celebration of science and mathematics. This year, we are focusing on "AI and the Next Generation of Scientists," with special workshops on machine learning and data science.
              </p>
              <p>
                The event will take place at the brand new Savar Science Society Campus, featuring state-of-the-art laboratories and exhibition spaces.
              </p>
              
              <h3 className="text-xl font-bold text-white mt-10 mb-4">What to Expect</h3>
              <ul className="list-disc pl-6 space-y-3">
                <li>National level Math competition for Class 6-12</li>
                <li>Innovative Science Project Competition</li>
                <li>Coding Challenge and Robotics Workshop</li>
                <li>Seminars by leading academics and industry experts</li>
              </ul>
            </div>
          </div>

          {/* Sidebar / Stats */}
          <div className="space-y-8">
            <div className="card p-8 border-[#22c55e]/20 bg-[#0a1410] sticky top-24">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#22c55e]" /> Projected Stats
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Expected Students</p>
                    <p className="text-xl font-black text-white">2,500+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <School className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Target Schools</p>
                    <p className="text-xl font-black text-white">85</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Scheduled For</p>
                    <p className="text-lg font-bold text-white">Coming Soon</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0d1a15] border border-[#1a3028]">
                  <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#5a7a68] font-bold uppercase">Venue</p>
                    <p className="text-lg font-bold text-white">SSS Campus</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#1a3028]">
                <button className="btn-primary w-full justify-center">
                  Get Notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
