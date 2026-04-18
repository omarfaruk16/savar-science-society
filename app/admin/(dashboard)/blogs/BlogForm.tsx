"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveBlog } from "@/app/actions/admin-actions";
import { ArrowLeft, Save, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import RichTextEditor from "@/components/admin/RichTextEditor";

interface BlogFormProps {
  blog?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    author: string;
    tags: string[];
    published: boolean;
  };
}

export default function BlogForm({ blog }: BlogFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [tags, setTags] = useState(blog?.tags?.join(", ") || "");
  const [imagePreview, setImagePreview] = useState<string | null>(blog?.coverImage || null);
  const [content, setContent] = useState(blog?.content || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isEdit = !!blog;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const formData = new FormData(e.currentTarget);
    formData.set("tags", tags);
    formData.set("content", content); // Set HTML content from editor
    if (isEdit) formData.set("id", blog.id);
    if (imagePreview) formData.set("coverImage", imagePreview);

    startTransition(async () => {
      const result = await saveBlog(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(isEdit ? "Blog post updated!" : "Blog post created!");
        setTimeout(() => router.push("/admin/blogs"), 1000);
      }
    });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs" className="p-2 rounded-md text-[#a3b8aa] hover:text-white hover:bg-[#1a3028] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">{isEdit ? "Edit Post" : "New Blog Post"}</h1>
          <p className="text-[#a3b8aa] text-sm mt-1">{isEdit ? `Editing: ${blog.title}` : "Create a new article for your readers."}</p>
        </div>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}
      {success && <div className="bg-[#16a34a]/10 border border-[#22c55e]/30 text-[#22c55e] text-sm rounded-lg px-4 py-3">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card p-6 bg-[#0a1410] space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Post Title *</label>
                <input name="title" type="text" required defaultValue={blog?.title || ""} placeholder="Enter post title..." className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Slug (URL) *</label>
                <input name="slug" type="text" required defaultValue={blog?.slug || ""} placeholder="my-blog-post-slug" className="input w-full font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Excerpt *</label>
                <textarea name="excerpt" required rows={2} defaultValue={blog?.excerpt || ""} placeholder="Short summary that appears in listings..." className="input w-full resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Content *</label>
                <RichTextEditor content={content} onChange={setContent} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card p-6 bg-[#0a1410] space-y-5">
              <h3 className="font-bold text-white border-b border-[#1a3028] pb-3">Publish Settings</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[#a3b8aa]">Published</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="published" defaultChecked={blog?.published || false} className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#1a3028] rounded-full peer peer-checked:bg-[#22c55e] transition-colors peer-focus:ring-2 peer-focus:ring-[#22c55e]/50"></div>
                  <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></span>
                </label>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm disabled:opacity-60"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isPending ? "Saving..." : isEdit ? "Update Post" : "Save Post"}
              </button>
              {isEdit && (
                <Link href={`/blog/${blog.slug}`} target="_blank" className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#1a3028] text-[#a3b8aa] hover:text-white hover:border-[#224035] transition-colors text-sm">
                  <Eye className="w-4 h-4" /> View Live
                </Link>
              )}
            </div>

            <div className="card p-6 bg-[#0a1410] space-y-4">
              <h3 className="font-bold text-white border-b border-[#1a3028] pb-3">Meta Info</h3>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Author</label>
                <input name="author" type="text" defaultValue={blog?.author || "Savar Science Society"} className="input w-full" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2 uppercase tracking-wider">Cover Image</label>
                <div className="space-y-4">
                  <div 
                    className="relative group aspect-video rounded-xl border-2 border-dashed border-[#1a3028] hover:border-[#22c55e] transition-all flex flex-col items-center justify-center p-4 bg-[#050d0a] cursor-pointer overflow-hidden"
                    onClick={() => document.getElementById("blog-image-input")?.click()}
                  >
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 group-hover:text-[#22c55e] transition-colors">
                        <Save className="w-8 h-8 text-[#1a3028] group-hover:text-[#22c55e]" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#5a7a68] group-hover:text-[#22c55e]">Upload Image</span>
                      </div>
                    )}
                    <input 
                      id="blog-image-input"
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg, image/png" 
                      onChange={handleImageChange} 
                    />
                  </div>
                  <div className="relative">
                    <input 
                      name="coverImage" 
                      type="text" 
                      value={imagePreview || ""} 
                      onChange={(e) => setImagePreview(e.target.value)}
                      placeholder="Or paste an image URL..." 
                      className="input w-full pl-3 pr-3 text-xs font-mono opacity-50 focus:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#a3b8aa] mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Math, Science, Competition"
                  className="input w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
