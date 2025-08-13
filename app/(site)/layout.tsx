import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

/* Easter egg: Site layout that holds everything together like digital scaffolding 🏗️ */