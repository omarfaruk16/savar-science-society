import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { auth } from "@/lib/auth"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <>
      <Header session={session} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
