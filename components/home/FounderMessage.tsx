"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderMessage() {
  return (
    <section className="bg-[#0a1410] py-16 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="glass max-w-5xl mx-auto rounded-3xl p-8 md:p-12 border-[#22c55e]/20 relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#16a34a]/10 to-transparent pointer-events-none"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center relative z-10">
            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#224035] shadow-2xl">
                <img 
                  src="/Abu Bakkr Siddique.jpeg" 
                  alt="Founder of Savar Science Society" 
                  className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d0a] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="font-bold text-white text-lg">Abu Baakr Siddique</div>
                  <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider">Founder</div>
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 relative text-center md:text-left"
            >
              <Quote className="w-16 h-16 text-[#22c55e]/20 absolute -top-8 -left-8 -rotate-12" />
              
              <h3 className="text-2xl font-bold text-white mb-6">Message from the Founder</h3>
              
              <div className="space-y-4 text-lg text-[#a3b8aa] italic font-bn leading-relaxed">
                <p>
                  "সাভারের প্রতিটি শিক্ষার্থীর মধ্যে লুকিয়ে আছে অপার সম্ভাবনা। আমাদের প্রয়োজন শুধু একটু দিকনির্দেশনা, একটি উপযুক্ত প্ল্যাটফর্ম এবং একে অপরের প্রতি সহযোগিতার মানসিকতা।"
                </p>
                <p>
                  "সাভার সায়েন্স সোসাইটির জন্ম সেই শূন্যস্থান পূরণের লক্ষ্যে। আমরা চাই সাভারের ছাত্রছাত্রীরা শুধুমাত্র বইয়ের পাতায় সীমাবদ্ধ না থেকে, আধুনিক বিজ্ঞান ও গবেষণার সাথে পরিচিত হোক। তারা অংশ নিক অলিম্পিয়াডে, বিতর্ক করুক যুক্তি দিয়ে, এবং স্বপ্ন দেখুক বিশ্বজয়ের।"
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#1a3028]/50 flex items-center justify-between">
                <div>
                  <div className="font-bn text-xl text-[#22c55e] opacity-80">আবু বকর সিদ্দিক</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
