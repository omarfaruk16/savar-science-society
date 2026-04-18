import prisma from "@/lib/prisma";
import Link from "next/link";
import { FileText, Plus, Edit, Eye, EyeOff } from "lucide-react";
import { deleteBlog, toggleBlogPublished } from "@/app/actions/admin-actions";
import DeleteButton from "@/app/admin/(dashboard)/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-[#a3b8aa]">Manage all blog articles and publications.</p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="card p-16 bg-[#0a1410] text-center">
          <FileText className="w-12 h-12 text-[#a3b8aa] mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">No Blog Posts Yet</h3>
          <p className="text-[#a3b8aa] text-sm mb-6">Create your first blog post to get started.</p>
          <Link href="/admin/blogs/new" className="px-5 py-2.5 rounded-lg bg-[#22c55e] text-white font-semibold hover:bg-[#16a34a] transition-colors text-sm inline-block">
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="card bg-[#0a1410] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a3028]">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Title</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Author</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-[#5a7a68] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3028]">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#0f1d17] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {blog.coverImage && (
                          <img src={blog.coverImage} alt={blog.title} className="w-12 h-10 object-cover rounded-md hidden sm:block flex-shrink-0 border border-[#1a3028]" />
                        )}
                        <div>
                          <div className="font-semibold text-white text-sm line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-[#5a7a68] mt-0.5 line-clamp-1">{blog.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#a3b8aa]">{blog.author}</td>
                    <td className="px-6 py-4">
                      <form action={async () => {
                        "use server";
                        await toggleBlogPublished(blog.id, blog.published);
                      }}>
                        <button type="submit" className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer border transition-colors ${blog.published ? "bg-[#16a34a]/20 text-[#22c55e] border-[#22c55e]/30 hover:bg-[#16a34a]/30" : "bg-[#1a3028] text-[#5a7a68] border-[#1a3028] hover:bg-[#224035]"}`}>
                          {blog.published ? "Published" : "Draft"}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#a3b8aa]">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 rounded-md text-[#a3b8aa] hover:text-white hover:bg-[#1a3028] transition-colors"
                          title="View Live"
                        >
                          {blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Link>
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="p-2 rounded-md text-[#a3b8aa] hover:text-[#22c55e] hover:bg-[#1a3028] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteButton
                          label="blog post"
                          action={async () => {
                            "use server";
                            await deleteBlog(blog.id);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
