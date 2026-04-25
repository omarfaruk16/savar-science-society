import prisma from '../lib/prisma';

async function main() {
  const events = await prisma.event.findMany({ select: { slug: true, published: true } });
  console.log(events);
}

main().catch(console.error).finally(() => prisma.$disconnect());
