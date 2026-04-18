"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

const ProfileSchema = z.object({
  fullNameEn: z.string().min(2, "Name must be at least 2 characters"),
  fullNameBn: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  guardianNumber: z.string().min(1, "Guardian number is required"),
  schoolName: z.string().min(2, "School name is required"),
  class: z.string(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  profileImage: z.string().nullable().optional(),
})

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  console.log("--- Profile Update Started ---");
  console.log("User ID:", session.user.id);

  const rawData = {
    fullNameEn: formData.get("fullNameEn"),
    fullNameBn: formData.get("fullNameBn"),
    mobileNumber: formData.get("mobileNumber"),
    guardianNumber: formData.get("guardianNumber"),
    schoolName: formData.get("schoolName"),
    class: formData.get("class"),
    address: formData.get("address"),
    profileImage: formData.get("profileImage") || null,
  }

  const validatedFields = ProfileSchema.safeParse(rawData)

  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error.flatten().fieldErrors);
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return { error: firstError || "Validation failed" }
  }

  try {
    const updateData = { ...validatedFields.data };
    
    // If profileImage is explicitly null, we might want to keep the old one 
    // depending on intent. But here, if it's sent, we update it.
    
    console.log("Updating database with:", { 
        ...updateData, 
        profileImage: updateData.profileImage ? "Base64 string (truncated)..." : "null" 
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    })
    revalidatePath("/profile")
    console.log("Profile update successful");
    return { success: "Profile updated successfully!" }
  } catch (error) {
    console.error(error)
    return { error: "Failed to update profile." }
  }
}

export async function updatePassword(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters." }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || (user.passwordHash && !(await bcrypt.compare(currentPassword, user.passwordHash)))) {
      return { error: "Incorrect current password." }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: hashedPassword },
    })

    return { success: "Password updated successfully!" }
  } catch (error) {
    console.error(error)
    return { error: "Failed to update password." }
  }
}
