"use client"

import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Hero() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  // Nouvelle fonction pour rediriger vers la page contact
  const handleRedirectToContact = () => {
    router.push("/contact")
  }

  return (
    <section
      id="home"
      className="relative py-20 md:py-32 bg-gradient-to-br from-background via-background to-muted overflow-hidden perspective"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sapphire/10 to-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald/10 to-secondary/5 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-coral/5 to-violet/5 rounded-full blur-3xl -z-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-in-up perspective">
          {/* Badge with enhanced 3D effect */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sapphire/10 to-primary/10 rounded-full mb-6 animate-in fade-in duration-700 border border-sapphire/20 hover:border-sapphire/50 transition-all duration-300 hover:shadow-lg hover:shadow-sapphire/20">
            <span className="w-2 h-2 bg-sapphire rounded-full animate-pulse"></span>
            <span className="text-sm font-medium bg-gradient-to-r from-sapphire to-primary bg-clip-text text-transparent">
              Solidis Finance
            </span>
          </div>

          {/* Main heading with 3D text effect */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-3d">
            {t('hero.title')}
          </h1>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-in fade-in duration-1000"
            style={{ animationDelay: "200ms" }}
          >
            {t('hero.description')}
          </p>

          {/* CTA Button with enhanced 3D effect - MODIFIÉ pour rediriger vers /contact */}
          <button
            onClick={handleRedirectToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sapphire to-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-sapphire/50 hover:scale-105 group animate-in fade-in duration-1000 glow-sapphire"
            style={{ animationDelay: "400ms" }}
          >
            {t('hero.cta')}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}