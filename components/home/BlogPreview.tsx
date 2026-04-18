"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPreviewProps {
  blogs: any[];
}

export default function BlogPreview({ blogs }: BlogPreviewProps) {
  // Calculate read time roughly (200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(" ").length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#050d0a] py-16 border-t border-[#1a3028]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center md:flex-row md:items-end md:text-left justify-between mb-12 gap-6">
          <div>
            <div className="badge mb-4 mx-auto md:mx-0">Resources</div>
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
              className="card group cursor-pointer flex flex-col h-full bg-[#0a1410]"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#1a3028]/80 backdrop-blur-md text-xs font-bold text-[#f0fdf4] border border-[#224035] flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#22c55e]" /> {blog.tags?.[0] || 'Article'}
                </div>
                <img 
                   src={blog.coverImage || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"} 
                   alt={blog.title} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between text-xs font-medium text-[#a3b8aa] mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#22c55e]" />
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#22c55e]" />
                    {calculateReadTime(blog.content)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#22c55e] transition-colors leading-tight">
                  <Link href={`/blog/${blog.slug}`}>
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
