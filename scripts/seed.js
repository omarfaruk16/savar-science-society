const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Initialize with adapter to match lib/prisma.ts
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Starting Database Seeding (Minimalist) ---');

  // 1. Create Admins
  const defaultAdminPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: defaultAdminPassword,
    },
  });

  const specificAdminPassword = await bcrypt.hash('cre!@#cr4r4cr4rdfgret4534', 10);
  const specificAdmin = await prisma.admin.upsert({
    where: { username: 'savar_science_society_only_admin' },
    update: {
      passwordHash: specificAdminPassword,
    },
    create: {
      username: 'savar_science_society_only_admin',
      passwordHash: specificAdminPassword,
    },
  });
  console.log(`✅ Admin accounts ensured: admin, ${specificAdmin.username}`);

  // 2. Create Sample Blog Posts
  const blogPosts = [
    {
      title: "How to prepare for the National Math Olympiad",
      slug: "math-olympiad-prep",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
      excerpt: "A comprehensive guide for students of class 6 to 10 on how to tackle the hardest combinatorics and number theory problems.",
      content: "Preparing for the National Math Olympiad (NMO) can seem daunting. With problems ranging from number theory to complex combinatorics, it takes more than just reading your school textbooks...\n\n### 1. Master the Basics\nBefore attempting Olympiad-level problems, ensure you have a rock-solid foundation...",
      author: "Abu Baakr Siddique",
      tags: ["Guide", "Olympiad", "Math"],
      views: 1205,
      published: true
    },
    {
      title: "The importance of coding skills for future scientists",
      slug: "coding-skills-future",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Why learning Python or C++ is no longer optional if you want to pursue a career in physics, biology, or advanced mathematics.",
      content: "Coding is the language of modern science. From simulating particle collisions to analyzing massive genomic datasets, programming allows scientists to build tools that expand our understanding of the universe...",
      author: "Md. Omar Faruk",
      tags: ["Technology", "Coding", "Science"],
      views: 843,
      published: true
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }
  console.log(`✅ ${blogPosts.length} Blog posts ensured.`);

  // 3. Events are file-based in app/data/events, so no DB seeding needed for them.

  console.log('--- Seeding Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
