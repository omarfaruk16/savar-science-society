"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function ReviewSection() {
  const reviews = [
    {
      id: 1,
      name: "Rafiqul Islam",
      school: "Savar Cantonment Public School",
      image: "https://i.pravatar.cc/150?img=11",
      text: "SSS provided me with the opportunity to participate in the National Math Olympiad. The mentorship I received was incredible. Truly an eye-opening experience.",
    },
    {
      id: 2,
      name: "Sanjida Akter",
      school: "Jahangirnagar University School",
      image: "https://i.pravatar.cc/150?img=5",
      text: "The science fair organized by Savar Science Society was the best. I got to show my robotics project to JU professors. Highly recommended for any science enthusiast!",
    },
    {
      id: 3,
      name: "Hasibul Hasan",
      school: "Savar Laboratory School",
      image: "https://i.pravatar.cc/150?img=8",
      text: "A great platform to connect with like-minded students. The workshops are very practical and helpful. I've learned so much beyond my textbook syllabus.",
    }
  ];

  return (
    <section className="bg-[#0a1410] py-16 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#16a34a] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge mb-4">Testimonials</div>
          <h2 className="section-title mb-4">What Our <span className="text-[#22c55e]">Students</span> Say</h2>
          <p className="section-subtitle mx-auto">
            Real stories from the students who have participated in our events and changed their perspective towards science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card p-8 flex flex-col relative"
            >
              <Quote className="w-10 h-10 text-[#1a3028] absolute top-6 right-6" />
              
              <div className="flex gap-1 mb-6 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-[#f0fdf4] mb-8 flex-grow leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-[#1a3028]">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-[#22c55e] object-cover"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <p className="text-xs text-[#a3b8aa]">{review.school}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
