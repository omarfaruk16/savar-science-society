import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EventForm from "../../EventForm";

export const dynamic = "force-dynamic";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  
  if (!event) notFound();
  
  return <EventForm event={event} />;
}
