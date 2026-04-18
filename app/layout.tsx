import type { Metadata } from "next"
import "./globals.css"

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body>
        {children}
      </body>
    </html>
  )
}
