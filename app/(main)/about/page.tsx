import { Users, Award, Target, BookOpen } from "lucide-react";
import LeadershipSection from "@/components/home/LeadershipSection";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="badge mb-4">Our Story</div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#22c55e] mb-6">
            About Savar Science Society
          </h1>
          <p className="text-[#a3b8aa] text-lg font-bn">
            সাভারের শিক্ষার্থীদের মধ্যে বিজ্ঞানচর্চার সংস্কৃতি গড়ে তোলা এবং কৌতূহল ও অনুসন্ধিৎসার মানসিকতা তৈরি করতে আমাদের যাত্রা।
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Our History</h2>
          <div className="space-y-4 text-[#a3b8aa] font-bn text-lg leading-relaxed">
            <p>
              সাভার সায়েন্স সোসাইটি (SSS) প্রতিষ্ঠিত হয় ২০২৩ সালে একদল উদ্যমী তরুণ শিক্ষার্থীর হাত ধরে। সাভারের বিভিন্ন স্কুল ও কলেজের শিক্ষার্থীদের বিজ্ঞান ও প্রযুক্তির প্রতি আগ্রহী করে তোলাই ছিল এর মূল উদ্দেশ্য।
            </p>
            <p>
              শুরুর দিকে ছোট পরিসরে বিজ্ঞান আড্ডা ও কর্মশালার মাধ্যমে এর কার্যক্রম শুরু হলেও, খুব দ্রুতই এটি সাভারের অন্যতম প্রধান বিজ্ঞানভিত্তিক প্ল্যাটফর্মে পরিণত হয়। বর্তমানে আমরা নিয়মিত গণিত অলিম্পিয়াড, বিতর্ক প্রতিযোগিতা আয়োজন করছি।
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="card p-8 md:p-10 flex flex-col items-center text-center">
            <BookOpen className="w-12 h-12 text-[#22c55e] mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-bn">আমাদের স্বপ্ন (Vision)</h3>
            <p className="text-[#a3b8aa] font-bn text-xl leading-relaxed">
              একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলা — যেখানে প্রতিটি শিক্ষার্থী তার মেধা ও সম্ভাবনার পূর্ণ বিকাশ ঘটাতে পারবে, দেশ ও বিশ্বের সেরা শিক্ষাপ্রতিষ্ঠানে নিজেকে প্রতিষ্ঠিত করতে পারবে, এবং জ্ঞান ও উদ্ভাবনের মাধ্যমে একটি আলোকিত জাতি গঠনে অবদান রাখতে পারবে।
            </p>
          </div>
          <div className="card p-8 md:p-10 flex flex-col items-center text-center">
            <Target className="w-12 h-12 text-[#22c55e] mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4 font-bn">মিশন (Mission)</h3>
            <p className="text-[#a3b8aa] font-bn text-xl leading-relaxed">
              সাভারের বিদ্যালয়-পর্যায়ের শিক্ষার্থীদের সাথে উচ্চশিক্ষারত তরুণ প্রজন্মের সেতুবন্ধন তৈরির মাধ্যমে বিজ্ঞান ও প্রযুক্তির প্রতি আগ্রহ সৃষ্টি করা; জাতীয় ও আন্তর্জাতিক প্রতিযোগিতায় অংশগ্রহণের সুযোগ তৈরি করা; এবং প্রতিটি মেধাবী শিক্ষার্থীর স্বপ্ন পূরণে একটি অন্তর্ভুক্তিমূলক, সহায়ক ও অনুপ্রেরণামূলক পরিবেশ নিশ্চিত করা।
            </p>
          </div>
        </div>

        {/* Goals */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-bn">আমাদের সুনির্দিষ্ট লক্ষ্যসমূহ (Goals)</h2>
            <div className="h-1 w-24 bg-[#22c55e] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "০১", title: "বিজ্ঞানমনষ্ক সমাজ গঠন", desc: "সাভারের শিক্ষার্থীদের মধ্যে বিজ্ঞানচর্চার সংস্কৃতি গড়ে তোলা এবং কৌতূহল ও অনুসন্ধিৎসার মানসিকতা তৈরি করা।" },
              { id: "০২", title: "সেতুবন্ধন কর্মসূচি", desc: "বিভিন্ন পাবলিক ও প্রাইভেট বিশ্ববিদ্যালয়ের শিক্ষার্থীদের সাথে স্কুলের শিক্ষার্থীদের সংযোগ স্থাপন করে উচ্চশিক্ষার পথনির্দেশনা প্রদান করা।" },
              { id: "০৩", title: "প্রতিযোগিতামূলক প্রস্তুতি", desc: "অলিম্পিয়াড, বিজ্ঞান মেলা, বিতর্ক প্রতিযোগিতা সহ জাতীয় ও আন্তর্জাতিক পরীক্ষায় অংশগ্রহণের জন্য শিক্ষার্থীদের প্রস্তুত করা।" },
              { id: "০৪", title: "মেধাবীদের একত্রীকরণ", desc: "সাভারের সকল মেধাবী শিক্ষার্থীকে একটি অভিন্ন প্ল্যাটফর্মে নিয়ে আসা এবং পারস্পরিক সহযোগিতার নেটওয়ার্ক গড়ে তোলা।" },
              { id: "০৫", title: "যুগোপযোগী দক্ষতা উন্নয়ন", desc: "প্রযুক্তি, গবেষণা ও উদ্ভাবনের চাহিদা অনুযায়ী শিক্ষার্থীদের দক্ষতা বিকাশের সুযোগ তৈরি করা।" },
              { id: "০৬", title: "সৃজনশীল জাতি গঠন", desc: "সুস্থ ও যুক্তিনির্ভর চিন্তার বিকাশের মাধ্যমে একটি সৃজনশীল, নৈতিক ও আলোকিত প্রজন্ম তৈরিতে ভূমিকা রাখা।" }
            ].map((goal, idx) => (
              <div key={idx} className="glass p-6 md:p-8 rounded-[2rem] border border-[#1a3028] hover:border-[#22c55e]/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-8xl font-black text-[#22c55e]/5 group-hover:text-[#22c55e]/10 transition-colors font-bn pointer-events-none">
                  {goal.id}
                </div>
                <div className="relative z-10">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#1a3028] text-[#22c55e] text-sm font-bold font-bn mb-4">লক্ষ্য {goal.id}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 font-bn">{goal.title}</h3>
                  <p className="text-[#a3b8aa] font-bn text-lg leading-relaxed">{goal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-bn">আমাদের পরিচালনার ভিত্তি (Core Values)</h2>
            <div className="h-1 w-24 bg-[#22c55e] mx-auto rounded-full mb-10"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-3xl mx-auto">
            {["বিজ্ঞানমনস্কতা", "অন্তর্ভুক্তি", "সহযোগিতা", "উদ্ভাবন", "নৈতিকতা", "দেশপ্রেম", "স্বচ্ছতা"].map((value, idx) => (
              <div key={idx} className="bg-[#0f1d17] border border-[#1a3028] px-8 py-4 rounded-full text-white font-bn text-xl md:text-2xl hover:border-[#22c55e] hover:bg-[#22c55e]/10 hover:-translate-y-1 transition-all duration-300 shadow-lg cursor-default">
                {value}
              </div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
        <LeadershipSection />

        <div className="text-center mt-12 mb-20">
          <p className="text-[#a3b8aa] mb-6">Want to see our full advisory board and executive team?</p>
          <Link href="/committee" className="btn-secondary">
            View Full Committee
          </Link>
        </div>
      </div>
    </div>
  );
}
