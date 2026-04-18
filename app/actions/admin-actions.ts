"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ─────────────────────────────────────────────
// BLOG ACTIONS
// ─────────────────────────────────────────────

export async function saveBlog(formData: FormData) {
  console.log("--- saveBlog action called ---");
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const excerpt = (formData.get("excerpt") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const author = (formData.get("author") as string)?.trim() || "Savar Science Society";
  const coverImage = formData.get("coverImage") as string | null;
  const tagsRaw = (formData.get("tags") as string)?.trim() || "";
  const published = formData.get("published") === "on";

  if (!title || !slug || !excerpt || !content) {
    return { error: "Title, slug, excerpt, and content are required." };
  }

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  try {
    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: { title, slug, excerpt, content, author, coverImage, tags, published },
      });
    } else {
      await prisma.blogPost.create({
        data: { title, slug, excerpt, content, author, coverImage, tags, published },
      });
    }
  } catch (e: any) {
    if (e.code === "P2002") {
      return { error: "A blog post with that slug already exists. Please choose a different slug." };
    }
    return { error: "Failed to save blog post. Please try again." };
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  return { success: true };
}

export async function deleteBlog(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  redirect("/admin/blogs");
}

export async function toggleBlogPublished(id: string, currentStatus: boolean) {
  await prisma.blogPost.update({
    where: { id },
    data: { published: !currentStatus },
  });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

// ─────────────────────────────────────────────
// EVENT ACTIONS
// ─────────────────────────────────────────────

export async function saveEvent(formData: FormData) {
  console.log("--- saveEvent action called ---");
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string)?.trim();
  const slug = (formData.get("slug") as string)?.trim();
  const venue = (formData.get("venue") as string)?.trim();
  const dateStr = formData.get("date") as string;
  const feeStr = formData.get("fee") as string;
  const description = (formData.get("description") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();
  const coverImage = formData.get("coverImage") as string | null;
  const isRegistrationOpen = formData.get("isRegistrationOpen") === "on";
  const published = formData.get("published") === "on";

  if (!title || !slug || !venue || !dateStr || !description || !content) {
    return { error: "All required fields must be filled." };
  }

  const fee = parseFloat(feeStr) || 0;
  const date = new Date(dateStr);

  try {
    if (id) {
      await prisma.event.update({
        where: { id },
        data: { title, slug, venue, date, fee, description, content, coverImage, isRegistrationOpen, published },
      });
    } else {
      await prisma.event.create({
        data: { title, slug, venue, date, fee, description, content, coverImage, isRegistrationOpen, published },
      });
    }
  } catch (e: any) {
    if (e.code === "P2002") {
      return { error: "An event with that slug already exists. Please choose a different slug." };
    }
    return { error: "Failed to save event. Please try again." };
  }

  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
  return { success: true };
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } });
    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { error: "Cannot delete event. It might have existing registrations." };
  }
}

export async function toggleEventStatus(id: string, field: "published" | "isRegistrationOpen", currentStatus: boolean) {
  await prisma.event.update({
    where: { id },
    data: { [field]: !currentStatus },
  });
  revalidatePath("/admin/events");
  revalidatePath("/events");
}
