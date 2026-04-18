import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "সাভার সায়েন্স সোসাইটি — Savar Science Society",
  description: "একটি বিজ্ঞানমনষ্ক, সৃজনশীল ও যুক্তিনির্ভর সাভার গড়ে তোলার লক্ষ্যে কাজ করা একটি স্বেচ্ছাসেবী সংগঠন। A non-profit org empowering Savar students in science and math.",
  keywords: ["Savar Science Society", "সাভার সায়েন্স সোসাইটি", "science", "math", "olympiad", "students", "Savar"],
  openGraph: {
    title: "সাভার সায়েন্স সোসাইটি",
    description: "Empowering Savar students through science, math, and innovation.",
    type: "website",
  },
}

import { auth } from "@/lib/auth"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="bn">
      <body>
        <Header session={session} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
