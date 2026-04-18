import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Eye, Tag } from "lucide-react";
import prisma from "@/lib/prisma";

export const revalidate = 60; // Revalidate every minute
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogs = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  // Calculate read time roughly (200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(" ").length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge mb-4">Our Blog</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Explore <span className="text-[#22c55e]">Knowledge</span></h1>
          <p className="text-[#a3b8aa] text-lg">
            Articles, guides, and insights to help you grow your scientific knowledge and excel in competitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-[#a3b8aa] py-12">
              No articles published yet. Check back later!
            </div>
          )}
          {blogs.map((blog) => (
            <div key={blog.id} className="card group flex flex-col h-full bg-[#0a1410]">
              <div className="relative h-56 overflow-hidden border-b border-[#1a3028]">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#1a3028]/90 backdrop-blur-md text-xs font-bold text-[#f0fdf4] border border-[#224035] flex items-center gap-1">
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
                    <BookOpen className="w-3 h-3 text-[#22c55e]" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-[#22c55e]"/> {blog.views}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#22c55e]"/> {calculateReadTime(blog.content)}</span>
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#22c55e] transition-colors leading-tight">
                  <Link href={`/blog/${blog.slug}`}>
                    <span className="absolute inset-0 z-0"></span>
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-[#a3b8aa] text-sm mb-6 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <div className="mt-auto pt-4 border-t border-[#1a3028]">
                  <span className="text-sm font-semibold text-[#22c55e] flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
