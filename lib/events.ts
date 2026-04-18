import prisma from "./prisma";

export interface EventData {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  date: Date;
  description: string;
  content: string;
  venue: string;
  fee: number;
  isRegistrationOpen: boolean;
  published: boolean;
}

export async function getAllEvents(): Promise<EventData[]> {
  const events = await prisma.event.findMany({
    orderBy: { date: "desc" },
  });
  return events;
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const event = await prisma.event.findUnique({
    where: { slug },
  });
  return event;
}

export async function getPublishedEvents(): Promise<EventData[]> {
  const events = await prisma.event.findMany({
    where: { published: true },
    orderBy: { date: "desc" },
  });
  return events;
}
