"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogPreview() {
  const blogs = [
    {
      id: "1",
      title: "How to prepare for the National Math Olympiad",
      date: "Oct 12, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
      category: "Guide",
    },
    {
      id: "2",
      title: "The importance of coding skills for future scientists",
      date: "Oct 05, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      category: "Technology",
    },
    {
      id: "3",
      title: "Understanding Quantum Mechanics in simple terms",
      date: "Sep 28, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1633519894091-8f553a1fcfdc?auto=format&fit=crop&q=80&w=800",
      category: "Science",
    },
  ];

  return (
    <section className="bg-[#050d0a] py-16 border-t border-[#1a3028]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="badge mb-4">Resources</div>
            <h2 className="section-title">Latest <span className="text-[#22c55e]">Articles</span></h2>
          </div>
          <Link href="/blog" className="btn-secondary group">
            Read All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card group cursor-pointer flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#1a3028]/80 backdrop-blur-md text-xs font-bold text-[#f0fdf4] border border-[#224035]">
                  {blog.category}
                </div>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs font-medium text-[#a3b8aa] mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#22c55e]" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#22c55e]" />
                    {blog.readTime}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#22c55e] transition-colors leading-tight">
                  <Link href={`/blog/${blog.id}`}>
                    <span className="absolute inset-0 z-0"></span>
                    {blog.title}
                  </Link>
                </h3>
                
                <div className="mt-auto">
                  <span className="text-sm font-semibold text-[#22c55e] flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
