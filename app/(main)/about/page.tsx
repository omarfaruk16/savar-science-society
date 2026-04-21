import { Users, Award, Target, BookOpen } from "lucide-react";
import LeadershipSection from "@/components/home/LeadershipSection";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="pr-4 pl-4 max-w-4xl mx-auto">
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
              সাভার সায়েন্স সোসাইটি (SSS) প্রতিষ্ঠিত হয় ২০২০ সালে একদল উদ্যমী তরুণ শিক্ষার্থীর হাত ধরে। সাভারের বিভিন্ন স্কুল ও কলেজের শিক্ষার্থীদের বিজ্ঞান ও প্রযুক্তির প্রতি আগ্রহী করে তোলাই ছিল এর মূল উদ্দেশ্য।
            </p>
            <p>
              শুরুর দিকে ছোট পরিসরে বিজ্ঞান আড্ডা ও কর্মশালার মাধ্যমে এর কার্যক্রম শুরু হলেও, খুব দ্রুতই এটি সাভারের অন্যতম প্রধান বিজ্ঞানভিত্তিক প্ল্যাটফর্মে পরিণত হয়। বর্তমানে আমরা নিয়মিত গণিত অলিম্পিয়াড, বিজ্ঞান মেলা, এবং প্রোগ্রামিং প্রতিযোগিতা আয়োজন করছি।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8 text-center flex flex-col items-center">
            <Target className="w-12 h-12 text-[#22c55e] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
            <p className="text-[#a3b8aa] font-bn">সাভারের সকল মেধাবী শিক্ষার্থীকে একটি অভিন্ন প্ল্যাটফর্মে নিয়ে আসা এবং পারস্পরিক সহযোগিতার নেটওয়ার্ক গড়ে তোলা।</p>
          </div>
          <div className="card p-8 text-center flex flex-col items-center">
            <BookOpen className="w-12 h-12 text-[#22c55e] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
            <p className="text-[#a3b8aa] font-bn">একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলা।</p>
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
