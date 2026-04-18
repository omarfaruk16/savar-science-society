"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AboutOrg() {
  const points = [
    "A non-political, non-profit volunteer organization.",
    "Driven by university students for school students.",
    "Connecting rural talent with world-class opportunities.",
    "Fostering a culture of logic and science in Savar."
  ];

  return (
    <section className="bg-[#050d0a] py-24 border-t border-[#1a3028]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Image Composition */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-[#22c55e]/20 mix-blend-overlay group-hover:bg-transparent transition-colors z-10 duration-500"></div>
              <img
                src="/Winners From Schools.jpg"
                alt="Winners from school"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-xl z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-3xl font-black text-[#22c55e] mb-1">Since 2023</div>
                <div className="text-sm text-[#f0fdf4] font-medium">Empowering the next generation of innovators.</div>
              </div>
            </div>

            {/* Tech Dots design element */}
            <div className="absolute -top-6 -left-6 w-32 h-32 grid grid-cols-4 gap-2 opacity-50 z-0">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#1a3028]"></div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="badge mb-4">About Us</div>
            <h2 className="section-title mb-6 leading-tight">
              Building a <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] to-[#22c55e]">Brighter Savar</span>
            </h2>

            <div className="space-y-4 mb-8 text-[#a3b8aa] text-lg font-bn leading-relaxed">
              <p>
                সাভার সায়েন্স সোসাইটি একটি অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী সংগঠন। পরিচালিত হয় সাভার থেকে উচ্চশিক্ষারত শিক্ষার্থীদের দ্বারা, সাভারের শিক্ষার্থীদের জন্য।
              </p>
              <p>
                আমাদের লক্ষ্য স্কুল-পর্যায়ের শিক্ষার্থীদের সাথে উচ্চশিক্ষারত তরুণ প্রজন্মের সেতুবন্ধন তৈরির মাধ্যমে বিজ্ঞান ও প্রযুক্তির প্রতি আগ্রহ সৃষ্টি করা এবং জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণের সুযোগ তৈরি করা।
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#22c55e] flex-shrink-0" />
                  <span className="text-[#f0fdf4] font-medium">{point}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary">
              Discover Our Story
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
