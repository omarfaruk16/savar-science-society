import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("--- API-based Seeding Started ---");

    // 1. Create Admin
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.admin.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        passwordHash: adminPassword,
      },
    });

    // 2. Create Sample Blogs
    const blogs = [
      {
        title: "How to prepare for the National Math Olympiad",
        slug: "math-olympiad-prep",
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
        excerpt: "A comprehensive guide for students of class 6 to 10.",
        content: "Full content about Math Olympiad preparation...",
        author: "Savar Science Society",
        tags: ["Math", "Competition"],
        published: true,
      },
      {
        title: "The importance of coding for scientists",
        slug: "coding-for-scientists",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
        excerpt: "Why coding is the new literacy for the scientific world.",
        content: "Coding allows for complex simulations and data analysis...",
        author: "Savar Science Society",
        tags: ["Technology", "Coding"],
        published: true,
      }
    ];

    for (const blog of blogs) {
      await prisma.blogPost.upsert({
        where: { slug: blog.slug },
        update: {},
        create: blog,
      });
    }

    // 3. Create Sample Events
    const events = [
      {
        title: "Savar Math Olympiad 2024",
        slug: "savar-math-olympiad-2024",
        coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200",
        date: new Date("2024-10-15T09:00:00Z"),
        description: "Join the largest math competition in Savar.",
        content: "Detailed information about the olympiad...",
        venue: "Savar Cantonment Public School",
        published: true,
      },
      {
        title: "Science Fair & Exhibition",
        slug: "science-fair-2024",
        coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
        date: new Date("2024-11-10T08:00:00Z"),
        description: "Exhibition of innovative science projects.",
        content: "A day of innovation and learning...",
        venue: "Jahangirnagar University",
        published: true,
      }
    ];

    for (const event of events) {
      await prisma.event.upsert({
        where: { slug: event.slug },
        update: {},
        create: event,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database seeded successfully",
      admin: admin.username 
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
