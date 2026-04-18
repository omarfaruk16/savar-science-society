import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogForm from "@/app/admin/(dashboard)/blogs/BlogForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blogPost.findUnique({ where: { id } });
  if (!blog) notFound();
  return <BlogForm blog={blog} />;
}
