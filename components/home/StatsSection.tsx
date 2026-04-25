"use client";

import { motion } from "framer-motion";
import { Users, GraduationCap, Award, School } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { id: 1, number: "7500+", title: "Registered Students", icon: Users },
    { id: 2, number: "800+", title: "Awards", icon: Award },
    { id: 3, number: "130+", title: "Participated Schools", icon: School },
    { id: 4, number: "50+", title: "Volunteers", icon: GraduationCap },
  ];

  return (
    <section className="bg-[#050d0a] border-t border-[#1a3028] py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#0f1d17] border border-[#1a3028] hover:border-[#22c55e]/50 transition-colors group"
            >
              <div className="w-14 h-14 rounded-full bg-[#1a3028] group-hover:bg-[#22c55e]/20 flex items-center justify-center mb-4 transition-colors">
                <stat.icon className="w-6 h-6 text-[#22c55e]" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-[#a3b8aa] font-medium uppercase tracking-wider">
                {stat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
