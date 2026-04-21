"use client";

import { motion } from "framer-motion";
import { User, GraduationCap, Briefcase } from "lucide-react";

const mainLeaders = [
  {
    name: "Md. Touhid Hossain",
    role: "Chief Advisor",
    university: "Principle of Savar Model College",
    image: "/Md. Touhid Hossain.jpeg",
    row: 1
  },
  {
    name: "Abu Baakr Siddique",
    role: "Founder & Chairman",
    university: "Savar Science Society",
    image: "/Abu Bakkr Siddique.jpeg",
    row: 1
  },
  {
    name: "MD Mujahidul Islam",
    role: "President",
    university: "Jahangirnagar University",
    image: "/mujahid.jpeg",
    row: 2
  },
  {
    name: "MD. Omor Faruk",
    role: "Vice President",
    university: "University Of Rajshahi",
    image: "/MD Omar Faruk.jpeg",
    row: 2
  },
  {
    name: "Hujaifa Khan",
    role: "General Secretary",
    university: "BUBT",
    image: "/Hujaifa Khan.jpeg",
    row: 2
  },
];

export default function LeadershipSection() {
  const row1 = mainLeaders.filter(l => l.row === 1);
  const row2 = mainLeaders.filter(l => l.row === 2);

  return (
    <section className="py-20 bg-[#050d0a] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="badge mb-4">Our Leadership</div>
          <h2 className="section-title">The Minds Behind <span className="text-[#22c55e]">SSS</span></h2>
        </div>

        {/* Row 1: Advisor & Founder */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {row1.map((member, idx) => (
            <LeaderCard key={member.name} member={member} index={idx} isLarge={true} />
          ))}
        </div>

        {/* Row 2: President, VP, GS */}
        <div className="flex flex-wrap justify-center gap-6">
          {row2.map((member, idx) => (
            <LeaderCard key={member.name} member={member} index={idx + 2} />
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-[#22c55e] rounded-full mix-blend-screen filter blur-[180px] opacity-5 z-0 pointer-events-none"></div>
    </section>
  );
}

function LeaderCard({ member, index, isLarge = false }: { member: any; index: number; isLarge?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group ${isLarge ? "w-full md:w-[450px]" : "w-full sm:w-[320px]"}`}
    >
      <div className="glass p-6 md:p-8 rounded-[2.5rem] border border-[#1a3028] group-hover:border-[#22c55e]/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]">
        <div className={`relative mx-auto rounded-2xl overflow-hidden border-2 border-[#1a3028] group-hover:border-[#22c55e] transition-colors duration-500 mb-6 ${isLarge ? "w-48 md:w-56 aspect-[3/4]" : "w-36 md:w-44 aspect-[3/4]"}`}>
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full bg-[#1a3028] flex items-center justify-center">
              <User className="w-12 h-12 text-[#22c55e]/20" />
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3028] text-[#22c55e] text-[10px] uppercase font-bold tracking-wider mb-3">
             <Briefcase className="w-3 h-3" />
             {member.role}
          </div>
          <h3 className={`font-bold text-white group-hover:text-[#22c55e] transition-colors ${isLarge ? "text-2xl" : "text-lg"}`}>{member.name}</h3>
          <div className="flex items-center justify-center gap-2 text-[#a3b8aa] mt-2">
            <GraduationCap className="w-4 h-4 text-[#22c55e]" />
            <p className="text-sm">{member.university}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
