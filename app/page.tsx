"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import LoanTypes from "@/components/loan-types"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-green-red">
      <Header />
      <Hero />
      <LoanTypes />
      <Testimonials />
      <Footer />
    </main>
  )
}
