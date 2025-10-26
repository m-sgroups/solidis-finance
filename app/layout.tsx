import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Preloader from "@/components/Preloader"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Solidis Finance - Prestiti Moderni e Affidabili",
  description:
    "Solidis Finance offre soluzioni di prestiti personali, professionali e veloci con trasparenza e fiducia. Realizza i tuoi sogni con noi.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Preloader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
