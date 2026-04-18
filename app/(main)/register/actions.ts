"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  fullNameEn: z.string().min(1, "English name is required"),
  fullNameBn: z.string().min(1, "Bangla name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().min(11, "Valid mobile number is required"),
  guardianNumber: z.string().min(11, "Valid guardian number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  schoolName: z.string().min(1, "School name is required"),
  class: z.string().min(1, "Class is required"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  profileImage: z.string().optional(),
  eventId: z.string().min(1, "Please select an event"),
  transactionId: z.string().optional(),
});

export async function registerStudent(formData: FormData) {
  try {
    const rawData = {
      fullNameEn: formData.get("fullNameEn") as string,
      fullNameBn: formData.get("fullNameBn") as string,
      email: formData.get("email") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      guardianNumber: formData.get("guardianNumber") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      schoolName: formData.get("schoolName") as string,
      class: formData.get("class") as string,
      address: formData.get("address") as string,
      password: formData.get("password") as string,
      profileImage: formData.get("profileImage") as string,
      eventId: formData.get("eventId") as string,
      transactionId: formData.get("transactionId") as string || null,
    };

    const validation = registerSchema.safeParse(rawData);

    if (!validation.success) {
      return { error: (validation.error as any).errors[0].message };
    }

    const validatedData = validation.data;

    // 1. Check if event exists and registration is open
    const event = await prisma.event.findUnique({
      where: { id: validatedData.eventId }
    });

    if (!event || !event.isRegistrationOpen) {
      return { error: "Registration for this event is currently closed." };
    }

    if (event.fee > 0 && !validatedData.transactionId) {
      return { error: "Transaction ID is required for this event." };
    }

    // 2. Check if student already exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { mobileNumber: validatedData.mobileNumber }
        ]
      }
    });

    // 3. Create user if doesn't exist, otherwise use existing
    if (!user) {
      const passwordHash = await bcrypt.hash(validatedData.password, 10);
      user = await prisma.user.create({
        data: {
          fullNameEn: validatedData.fullNameEn,
          fullNameBn: validatedData.fullNameBn,
          email: validatedData.email,
          mobileNumber: validatedData.mobileNumber,
          guardianNumber: validatedData.guardianNumber,
          dateOfBirth: new Date(validatedData.dateOfBirth),
          schoolName: validatedData.schoolName,
          class: validatedData.class,
          address: validatedData.address,
          passwordHash,
          profileImage: validatedData.profileImage || null,
        }
      });
    }

    // 4. Create registration
    try {
      await prisma.registration.create({
        data: {
          userId: user.id,
          eventId: event.id,
          transactionId: validatedData.transactionId,
          paymentStatus: event.fee > 0 ? "PENDING" : "PAID",
        }
      });
    } catch (e: any) {
      if (e.code === "P2002") {
        return { error: "You are already registered for this event." };
      }
      throw e;
    }

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "An unexpected error occurred during registration" };
  }
}
