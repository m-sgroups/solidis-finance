"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-gradient-to-br from-background via-background to-muted overflow-hidden perspective"
    >
      {/* Cercles d'arrière-plan animés */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sapphire/10 to-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald/10 to-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-coral/5 to-violet/5 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in-up perspective">
        {/* Badge d'intro */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sapphire/10 to-primary/10 rounded-full mb-6 border border-sapphire/20 hover:border-sapphire/50 transition-all duration-300 hover:shadow-lg hover:shadow-sapphire/20">
          <span className="w-2 h-2 bg-sapphire rounded-full animate-pulse"></span>
          <span className="text-sm font-medium bg-gradient-to-r from-sapphire to-primary bg-clip-text text-transparent">
            Benvenuti a Solidis Finance
          </span>
        </div>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          I Tuoi Prestiti,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire via-primary to-emerald animate-pulse">
            La Nostra Priorità
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Scopri soluzioni di finanziamento moderne, trasparenti e adatte alle tue esigenze.
          Solidis Finance ti accompagna verso i tuoi obiettivi.
        </p>

        {/* Bouton CTA redirigeant vers /simulation */}
        <Link
          href="/simulation"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sapphire to-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-sapphire/50 hover:scale-105 group glow-sapphire"
        >
          Inizia Ora
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  )
}
