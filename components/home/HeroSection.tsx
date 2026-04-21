"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[#050d0a] via-[#0a1f16] to-[#050d0a]">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#16a34a] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse-glow"></div>
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-[#22c55e] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 pt-24 pb-12 md:pt-40 md:pb-20">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#224035] bg-[#0f1d17]/50 backdrop-blur-sm w-max mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span className="text-sm font-medium text-[#a3b8aa]">Empowering Savar's Future</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f0fdf4] to-[#22c55e] leading-tight">
            Igniting the spark of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#22c55e]">Discovery</span>.
          </h1>

          <p className="text-lg text-[#a3b8aa] max-w-xl leading-relaxed font-bn">
            একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলা — যেখানে প্রতিটি শিক্ষার্থী
            তার মেধা ও সম্ভাবনার পূর্ণ বিকাশ ঘটাতে পারবে। Join the premier community of bright minds.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link href="/register" className="btn-primary group">
              Join Society
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/events" className="btn-secondary group">
              Explore Events
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#1a3028]/50">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050d0a] bg-[#1a3028] flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Student" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#050d0a] bg-[#22c55e] flex items-center justify-center text-xs font-bold text-[#050d0a]">
                500+
              </div>
            </div>
            <div className="text-sm text-[#a3b8aa]">
              <span className="font-bold text-white">500+ students</span> already joined us.
            </div>
          </div>
        </motion.div>

        {/* Right: Vector / Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] lg:h-[600px] flex items-center justify-center"
        >
          {/* Abstract Vector Replacement */}
          <div className="relative w-full h-full max-w-lg mx-auto animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a]/20 to-transparent rounded-full filter blur-[60px]"></div>

            {/* Main Image Panel [NEW] */}
            <div className="absolute inset-4 glass rounded-[2rem] border border-[#22c55e]/30 shadow-[0_0_50px_rgba(34,197,94,0.15)] overflow-hidden group">
              <img
                src="/joyful.jpg"
                alt="Savar Science Society Joyful Moment"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
              />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 glass px-6 py-4 rounded-2xl border border-[#22c55e]/50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-4 animate-float z-20 hover:border-[#22c55e] transition-colors cursor-pointer" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 rounded-full bg-[#22c55e]/20 flex items-center justify-center shadow-inner">
                <span className="text-[#22c55e] text-2xl">🌐</span>
              </div>
              <div>
                <div className="text-[10px] text-[#a3b8aa] uppercase tracking-tighter">Community Hub</div>
                <div className="font-bold text-white text-base">Regional Group</div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-6 glass px-6 py-4 rounded-2xl border border-[#22c55e]/50 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center gap-4 animate-float z-20 hover:border-[#22c55e] transition-colors cursor-pointer" style={{ animationDelay: '2s' }}>
              <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 flex items-center justify-center shadow-inner">
                <span className="text-[#22c55e] text-2xl">🥇</span>
              </div>
              <div>
                <div className="text-[10px] text-[#a3b8aa] uppercase tracking-tighter">Price giving ceremony</div>
                <div className="font-bold text-white text-base">Math & Science Olympiad 2.0</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
