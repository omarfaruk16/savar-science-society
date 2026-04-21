"use client";

import { motion } from "framer-motion";
import { User, Briefcase, GraduationCap } from "lucide-react";

const committeeMembers = [
  {
    name: "Md. Touhid Hossain",
    role: "Chief Advisor",
    university: "Jahangirnagar University",
    image: "/Md. Touhid Hossain.jpeg",
    level: "advisor",
    title: "Adviser, Foreign Affairs, Government of Bangladesh"
  },
  {
    name: "MD Mujahidul Islam",
    role: "President",
    university: "Jahangirnagar University",
    image: "/mujahid.jpeg",
    level: "executive",
  },
  {
    name: "MD. Omor Faruk",
    role: "Vice President",
    university: "University Of Rajshahi",
    image: "/MD Omar Faruk.jpeg",
    level: "executive",
  },
  {
    name: "Hujaifa Khan",
    role: "General Secretary",
    university: "Bangladesh University of Business and Technology",
    image: "/Hujaifa Khan.jpeg",
    level: "director",
  },
  {
    name: "TBA",
    role: "Joint Secretary",
    university: "Savar Science Society",
    image: null,
    level: "director",
  },
  {
    name: "Khandker Salil Alam Araf",
    role: "Organizing Secretary",
    university: "Jagannath University",
    image: "/Khandker Salil Alam Araf.jpeg",
    level: "director",
  },
  {
    name: "Waliur Rahman Tafsir",
    role: "Director Of Media & Content Creation",
    university: "Independent University Bangladesh",
    image: "/Waliur Rahman Tafsir.jpeg",
    level: "director",
  },
  {
    name: "Abdul Monin",
    role: "Director Of Research & Development",
    university: "Bangladesh University of Textiles",
    image: "/Abdul Monin.jpeg",
    level: "director",
  },
  {
    name: "MD. Rakibul Hassan Samit",
    role: "Director Of Event Management",
    university: "Jagannath University",
    image: "/MD. Rakibul Hassan Samitjpeg.jpeg",
    level: "director",
  },
  {
    name: "Israfil Hossain Manik",
    role: "Director Of IT & Communication",
    university: "University of Chittagong",
    image: "/Israfil Hossain Manik.jpeg",
    level: "director",
  },
  {
    name: "MD. Redwan Ahamed",
    role: "Director Of Education & Training",
    university: "Jagannath University",
    image: "/MD. Redwan Ahamed.jpeg",
    level: "director",
  },
  {
    name: "Abdullah Tahir",
    role: "Director of Public Relation",
    university: "Jahangirnagar University",
    image: null,
    level: "director",
  },
  {
    name: "Mahdi Hassan Nuhan",
    role: "Director Of Publication",
    university: "National University",
    image: "/Mahdi Hassan Nuhan.jpeg",
    level: "director",
  },
];

export default function CommitteePage() {
  const advisors = committeeMembers.filter((m) => m.level === "advisor");
  const executives = committeeMembers.filter((m) => m.level === "executive");
  const directors = committeeMembers.filter((m) => m.level === "director");

  return (
    <div className="pt-32 pb-24 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge inline-block mb-4"
          >
            Our Leadership
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-[#22c55e] mb-6"
          >
            Advisory Board & Executive Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#a3b8aa] text-lg max-w-2xl mx-auto"
          >
            Meet the pioneers and dedicated leaders who are driving the scientific revolution in Savar.
          </motion.p>
        </div>

        {/* Advisory Row */}
        {advisors.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-8 mb-20">
              {advisors.map((member, idx) => (
                <MemberCard key={member.name} member={member} isLarge={true} index={idx} isAdvisor={true} />
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-20">
              <div className="h-px bg-gradient-to-r from-transparent via-[#1a3028] to-transparent flex-1" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#22c55e]/50">Executive Committee</span>
              <div className="h-px bg-gradient-to-r from-transparent via-[#1a3028] to-transparent flex-1" />
            </div>
          </>
        )}

        {/* Executive Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {executives.map((member, idx) => (
            <MemberCard key={member.name} member={member} isLarge={true} index={idx} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-[#1a3028] to-transparent flex-1" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#22c55e]/50">Secretariat & Directors</span>
          <div className="h-px bg-gradient-to-r from-transparent via-[#1a3028] to-transparent flex-1" />
        </div>

        {/* Directors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {directors.map((member, idx) => (
            <MemberCard key={member.name} member={member} index={idx + 2} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member, isLarge = false, index = 0, isAdvisor = false }: { member: any; isLarge?: boolean; index: number; isAdvisor?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`group relative ${isLarge ? "w-full md:w-[500px]" : "w-full"}`}
    >
      <div className={`
        relative overflow-hidden rounded-[2.5rem] bg-[#0f1d17] border border-[#1a3028] 
        group-hover:border-[#22c55e]/50 transition-all duration-500 shadow-2xl
        ${isLarge ? "p-8 md:p-10" : "p-6 md:p-8"}
        ${isAdvisor ? "border-[#22c55e]/30 bg-gradient-to-b from-[#0f1d17] to-[#0a1410]" : ""}
      `}>
        {/* Glow effect */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] transition-all duration-700 ${isAdvisor ? "bg-[#22c55e]/20 group-hover:bg-[#22c55e]/30" : "bg-[#22c55e]/10 group-hover:bg-[#22c55e]/20"}`} />

        {/* Image / Avatar */}
        <div className={`
          relative mx-auto rounded-2xl overflow-hidden border-2 border-[#1a3028] 
          group-hover:border-[#22c55e] transition-colors duration-500 shadow-xl
          ${isLarge ? "w-60 md:w-72 aspect-[3/4] mb-10" : "w-48 md:w-56 aspect-[3/4] mb-8"}
          ${isAdvisor ? "border-[#22c55e]/40" : ""}
        `}>
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-[#1a3028] flex items-center justify-center">
              <User className="w-1/2 h-1/2 text-[#22c55e]/20" />
            </div>
          )}

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050d0a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1a3028] text-[#22c55e] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 group-hover:bg-[#22c55e] group-hover:text-white transition-colors">
            <Briefcase className="w-3 h-3" />
            {member.role}
          </div>

          <h3 className={`font-semibold text-white group-hover:text-[#22c55e] transition-colors ${isLarge ? "text-2xl md:text-3xl mb-2" : "text-xl mb-1"}`}>
            {member.name}
          </h3>

          {member.title && (
            <p className="text-[#22c55e] text-sm md:text-base font-medium mb-4 leading-relaxed max-w-[280px] mx-auto italic">
              {member.title}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-[#a3b8aa] group-hover:text-[#f0fdf4] transition-colors">
            <GraduationCap className="w-4 h-4 text-[#22c55e]" />
            <p className={`${isLarge ? "text-base" : "text-sm"}`}>
              {member.university}
            </p>
          </div>
        </div>

        {/* Bottom Bar Design Element */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#22c55e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}
