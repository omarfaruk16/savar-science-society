"use client";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Users, School } from "lucide-react";
import { motion } from "framer-motion";

const olympiads = [
  {
    id: 1,
    title: "Math & Science Olympiad 2023",
    slug: "math&science_olympiad_1",
    image: "/images/olympiads/olympiad_1.png",
    students: "1,200+",
    schools: "45",
    date: "October 15, 2023",
    venue: "Savar Government College",
  },
  {
    id: 2,
    title: "Math & Science Olympiad 2024",
    slug: "math&science_olympiad_2",
    image: "/images/olympiads/olympiad_2.png",
    students: "1,800+",
    schools: "62",
    date: "November 20, 2024",
    venue: "Jahangirnagar University",
  },
  {
    id: 3,
    title: "Math & Science Olympiad 2025",
    slug: "math&science_olympiad_3",
    image: "/images/olympiads/olympiad_3.png",
    students: "2,500+",
    schools: "85",
    date: "Coming Soon",
    venue: "Savar Science Society Campus",
  },
];

export default function OlympiadHistory() {
  return (
    <section className="bg-[#050d0a] py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22c55e]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="badge mb-4">Our Legacy</div>
          <h2 className="section-title">Olympiad <span className="text-[#22c55e]">History</span></h2>
          <p className="section-subtitle mx-auto">
            Relive the moments of our past Olympiads and see the impact we've made in the scientific community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {olympiads.map((olympiad, index) => (
            <motion.div
              key={olympiad.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link 
                href={`/${olympiad.slug}`}
                className="flex flex-col md:flex-row bg-[#0a1410] border border-[#1a3028] rounded-3xl overflow-hidden hover:border-[#22c55e]/30 transition-all duration-500 shadow-xl group-hover:shadow-[#22c55e]/5"
              >
                {/* Left side: Image */}
                <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={olympiad.image} 
                    alt={olympiad.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1410] via-transparent to-transparent md:bg-gradient-to-r opacity-60"></div>
                </div>

                {/* Right side: Content */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-[#22c55e] transition-colors">
                    {olympiad.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#22c55e]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5a7a68] font-bold">Total Students</p>
                        <p className="text-white font-bold">{olympiad.students}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                        <School className="w-5 h-5 text-[#22c55e]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5a7a68] font-bold">Total Schools</p>
                        <p className="text-white font-bold">{olympiad.schools}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#22c55e]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5a7a68] font-bold">Date</p>
                        <p className="text-white font-bold">{olympiad.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#22c55e]" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-[#5a7a68] font-bold">Venue</p>
                        <p className="text-white font-bold truncate max-w-[120px]">{olympiad.venue}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#1a3028]">
                    <span className="text-sm font-bold text-[#22c55e] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
