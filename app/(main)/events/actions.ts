"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function registerForEvent(formData: FormData) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return { error: "You must be logged in to register." };
    }

    const eventId = formData.get("eventId") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const paymentNumber = formData.get("paymentNumber") as string;
    const transactionIdRaw = formData.get("transactionId") as string;

    if (!eventId) {
      return { error: "Event ID is required." };
    }

    // Get user from DB
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return { error: "User profile not found." };
    }

    // Get event
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event || !event.isRegistrationOpen) {
      return { error: "Registration for this event is closed." };
    }

    let finalTransactionId = null;

    if (event.fee > 0) {
      if (!paymentMethod || !paymentNumber || !transactionIdRaw) {
        return { error: "Payment details are required for this event." };
      }
      
      finalTransactionId = `${paymentMethod.toUpperCase()} | ${paymentNumber} | ${transactionIdRaw.toUpperCase()}`;
    }

    // Check if already registered
    const existingRegistration = await prisma.registration.findFirst({
      where: {
        userId: user.id,
        eventId: event.id
      }
    });

    if (existingRegistration) {
      return { error: "You are already registered for this event." };
    }

    // Create registration
    await prisma.registration.create({
      data: {
        userId: user.id,
        eventId: event.id,
        transactionId: finalTransactionId,
        paymentStatus: event.fee > 0 ? "PENDING" : "PAID",
      }
    });

    return { success: true };

  } catch (error: any) {
    console.error("Event registration error:", error);
    if (error.code === "P2002") {
      return { error: "You are already registered for this event." };
    }
    return { error: "An unexpected error occurred during registration." };
  }
}
