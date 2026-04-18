"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function PresidentMessage() {
  return (
    <section className="bg-[#050d0a] py-16 relative overflow-hidden border-t border-[#1a3028]/30">
      <div className="container mx-auto">
        <div className="glass max-w-5xl mx-auto rounded-3xl p-8 md:p-12 border-[#22c55e]/20 relative overflow-hidden">
          
          {/* Background Glow - Different side for President */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-[#22c55e]/10 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center relative z-10">
            {/* Message (Left on wide screens) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 relative order-2 md:order-1 text-center md:text-left"
            >
              <Quote className="w-16 h-16 text-[#22c55e]/20 absolute -top-8 -left-8 -rotate-12" />
              
              <h3 className="text-2xl font-bold text-white mb-6">Message from the President</h3>
              
              <div className="space-y-4 text-lg text-[#a3b8aa] italic font-bn leading-relaxed">
                <p>
                  "সাভার সায়েন্স সোসাইটি হবে সেই প্ল্যাটফর্ম যা নতুন প্রজন্মের জন্য বিজ্ঞানকে আনন্দময় করে তুলবে। আমরা সাভারের প্রতিটি স্কুলে আমাদের কার্যক্রম ছড়িয়ে দিতে বদ্ধপরিকর।"
                </p>
                <p>
                  "যোগ্য নেতৃত্বের মাধ্যমেই একটি সুন্দর সমাজ গঠন সম্ভব। আমি বিশ্বাস করি, আমাদের এই ক্ষুদ্র প্রচেষ্টা সাভারের শিক্ষার্থীদের আগামী দিনের চ্যালেঞ্জ মোকাবেলায় প্রস্তুত করবে।"
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#1a3028]/50 flex items-center justify-between">
                <div>
                  <div className="font-bn text-xl text-[#22c55e] opacity-80">মো. মুজাহিদুল ইসলাম</div>
                </div>
              </div>
            </motion.div>

            {/* Image (Right on wide screens) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-1 order-1 md:order-2"
            >
              <div className="relative pb-[120%] rounded-2xl overflow-hidden border border-[#224035] shadow-2xl">
                <img 
                  src="/mujahid.jpeg" 
                  alt="President of Savar Science Society" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d0a] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="font-bold text-white text-lg">MD Mujahidul Islam</div>
                  <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">President</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
