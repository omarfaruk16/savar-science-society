import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Eye, ArrowLeft, Tag, Share2, MessageCircle, Hash, Briefcase } from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Update view count and fetch the post in one operation, if possible, or two
  // Let's do find and update
  try {
    await prisma.blogPost.update({
      where: { slug: slug },
      data: { views: { increment: 1 } },
    });
  } catch (error) {
    // If update fails, it likely doesn't exist
  }

  const blog = await prisma.blogPost.findUnique({
    where: { slug: slug }
  });

  if (!blog || !blog.published) {
    notFound();
  }

  const calculateReadTime = (content: string) => {
    const words = content.split(" ").length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  return (
    <div className="pt-24 pb-16 bg-[#050d0a] min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Navigation & Breadcrumbs */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#a3b8aa] hover:text-[#22c55e] transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>
        
        {/* Article Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            {blog.tags && blog.tags.length > 0 && (
              <span className="px-3 py-1 rounded-full bg-[#1a3028] text-[#22c55e] text-xs font-bold border border-[#224035] flex items-center gap-1">
                <Tag className="w-3 h-3" /> {blog.tags[0]}
              </span>
            )}
            <div className="flex items-center gap-4 text-xs font-medium text-[#a3b8aa]">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {calculateReadTime(blog.content)}</span>
              <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {blog.views} views</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-center md:justify-start gap-4 border-t border-[#1a3028] pt-6">
            <div className="text-left">
              <div className="font-bold text-[#f0fdf4]">{blog.author}</div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {blog.coverImage && (
          <div className="relative h-[300px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-12 border border-[#1a3028]">
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body */}
        {/* 
          Since the content field is text, we'll dangerously set inner HTML assuming the admin panel uses a rich text editor.
          If it's just raw text with newlines, we can format it. For this implementation, let's treat it as HTML or split by newline if it's plain text.
        */}
        <div className="prose prose-invert prose-lg prose-green max-w-none text-[#a3b8aa] leading-relaxed mb-16">
          <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }} />
        </div>

        {/* Share & Tags Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-y border-[#1a3028]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[#a3b8aa] mr-2">Tags:</span>
            {blog.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-[#0a1410] border border-[#1a3028] text-[#f0fdf4] text-xs hover:border-[#22c55e] transition-colors cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#a3b8aa] flex items-center gap-2"><Share2 className="w-4 h-4" /> Share:</span>
            <button className="w-8 h-8 rounded-full bg-[#1a3028] flex items-center justify-center text-[#f0fdf4] hover:bg-[#22c55e] transition-colors"><MessageCircle className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-full bg-[#1a3028] flex items-center justify-center text-[#f0fdf4] hover:bg-[#22c55e] transition-colors"><Hash className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded-full bg-[#1a3028] flex items-center justify-center text-[#f0fdf4] hover:bg-[#22c55e] transition-colors"><Briefcase className="w-4 h-4" /></button>
          </div>
        </div>

      </div>
    </div>
  );
}
