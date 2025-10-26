"use client"
import Header from "@/components/header"
import Simulation from "@/components/simulation"
import Footer from "@/components/footer"

export default function SimulationPage() {
  return (
    <main className="min-h-screen bg-gradient-green-red">
      <Header />
      <Simulation />
      <Footer />
    </main>
  )
}
