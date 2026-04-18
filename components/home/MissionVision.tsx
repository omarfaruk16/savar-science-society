"use client";

import { motion } from "framer-motion";
import { Target, Flag, Lightbulb } from "lucide-react";

export default function MissionVision() {
  const goals = [
    { title: "বিজ্ঞানমনষ্ক সমাজ গঠন", desc: "সাভারের শিক্ষার্থীদের মধ্যে বিজ্ঞানচর্চার সংস্কৃতি গড়ে তোলা এবং কৌতূহল ও অনুসন্ধিৎসার মানসিকতা তৈরি করা।" },
    { title: "সেতুবন্ধন কর্মসূচি", desc: "বিভিন্ন পাবলিক ও প্রাইভেট বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সাথে স্কুলের শিক্ষার্থীদের সংযোগ স্থাপন করে উচ্চশিক্ষার পথনির্দেশনা প্রদান করা।" },
    { title: "প্রতিযোগিতামূলক প্রস্তুতি", desc: "অলিম্পিয়াড, বিজ্ঞান মেলা, বিতর্ক প্রতিযোগিতা সহ জাতীয় ও আন্তর্জাতিক পরীক্ষায় অংশগ্রহণের জন্য শিক্ষার্থীদের প্রস্তুত করা।" },
    { title: "মেধাবীদের একত্রীকরণ", desc: "সাভারের সকল মেধাবী শিক্ষার্থীকে একটি অভিন্ন প্ল্যাটফর্মে নিয়ে আসা এবং পারস্পরিক সহযোগিতার নেটওয়ার্ক গড়ে তোলা।" },
    { title: "যুগোপযোগী দক্ষতা উন্নয়ন", desc: "প্রযুক্তি, গবেষণা ও উদ্ভাবনের চাহিদা অনুযায়ী শিক্ষার্থীদের দক্ষতা বিকাশের সুযোগ তৈরি করা।" },
    { title: "সৃজনশীল জাতি গঠন", desc: "সুস্থ ও যুক্তিনির্ভর চিন্তার বিকাশের মাধ্যমে একটি সৃজনশীল, নৈতিক ও আলোকিত প্রজন্ম তৈরিতে ভূমিকা রাখা।" }
  ];

  const values = ["বিজ্ঞানমনস্কতা", "অন্তর্ভুক্তি", "সহযোগিতা", "উদ্ভাবন", "নৈতিকতা", "দেশপ্রেম", "স্বচ্ছতা"];

  return (
    <section className="bg-[#050d0a] py-16 border-t border-[#1a3028]">
      <div className="container mx-auto">
        
        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Lightbulb className="w-32 h-32 text-[#22c55e]" />
            </div>
            <div className="w-14 h-14 rounded-full bg-[#1a3028] flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-[#22c55e]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">আমাদের স্বপ্ন (Vision)</h3>
            <p className="text-[#a3b8aa] text-lg font-bn leading-relaxed">
              একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলা — যেখানে প্রতিটি শিক্ষার্থী তার মেধা ও সম্ভাবনার পূর্ণ বিকাশ ঘটাতে পারবে, দেশ ও বিশ্বের সেরা শিক্ষাপ্রতিষ্ঠানে নিজেকে প্রতিষ্ঠিত করতে পারবে, এবং জ্ঞান ও উদ্ভাবনের মাধ্যমে একটি আলোকিত জাতি গঠনে অবদান রাখতে পারবে।
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Target className="w-32 h-32 text-[#22c55e]" />
            </div>
            <div className="w-14 h-14 rounded-full bg-[#1a3028] flex items-center justify-center mb-6">
              <Flag className="w-6 h-6 text-[#22c55e]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">মিশন (Mission)</h3>
            <p className="text-[#a3b8aa] text-lg font-bn leading-relaxed">
              সাভারের বিদ্যালয়-পর্যায়ের শিক্ষার্থীদের সাথে উচ্চশিক্ষারত তরুণ প্রজন্মের সেতুবন্ধন তৈরির মাধ্যমে বিজ্ঞান ও প্রযুক্তির প্রতি আগ্রহ সৃষ্টি করা; জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণের সুযোগ তৈরি করা; এবং প্রতিটি মেধাবী শিক্ষার্থীর স্বপ্ন পূরণে একটি অন্তর্ভুক্তিমূলক, সহায়ক ও অনুপ্রেরণামূলক পরিবেশ নিশ্চিত করা।
            </p>
          </motion.div>
        </div>

        {/* Goals List */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="section-title text-3xl font-bn mb-4">আমাদের সুনির্দিষ্ট লক্ষ্যসমূহ (Goals)</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#16a34a] to-[#22c55e] mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0f1d17] border border-[#1a3028] p-6 rounded-xl hover:border-[#22c55e]/50 transition-colors"
              >
                <div className="text-[#22c55e] font-bold text-lg mb-2 font-bn">লক্ষ্য ০{index + 1}</div>
                <h4 className="text-white font-bold text-xl mb-3 font-bn">{goal.title}</h4>
                <p className="text-[#a3b8aa] font-bn leading-relaxed">{goal.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-10">
            <h2 className="section-title text-3xl font-bn mb-4">আমাদের পরিচালনার ভিত্তি (Core Values)</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0f1d17] to-[#1a3028] border border-[#224035] text-white font-bn text-lg font-medium shadow-lg hover:shadow-[#22c55e]/20 transition-all cursor-default"
              >
                {value}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
