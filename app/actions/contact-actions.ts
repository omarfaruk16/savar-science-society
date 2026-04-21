"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Contact Form Submission Error:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}

export async function getContactMessages() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteContactMessage(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.contactMessage.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Delete Message Error:", error);
    return { error: "Failed to delete message." };
  }
}
