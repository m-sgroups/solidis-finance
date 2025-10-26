"use client"

import { Banknote, Building2, Zap, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Services() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Banknote,
      title: t('services.personalLoan'),
      description:
        "Ottieni il finanziamento di cui hai bisogno per i tuoi progetti personali con condizioni flessibili e trasparenti.",
      color: "sapphire",
      glowClass: "glow-sapphire",
    },
    {
      icon: Building2,
      title: t('services.businessLoan'),
      description:
        "Sviluppa la tua azienda con le nostre soluzioni di finanziamento adatte alle esigenze dei professionisti.",
      color: "emerald",
      glowClass: "glow-emerald",
    },
    {
      icon: Zap,
      title: t('services.quickLoan'),
      description: "Hai bisogno urgente di liquidità? Ottieni una risposta in 24h con il nostro processo semplificato.",
      color: "coral",
      glowClass: "glow-coral",
    },
    {
      icon: TrendingUp,
      title: t('services.consolidation'),
      description:
        "I nostri esperti ti consigliano per ottimizzare la tua situazione finanziaria e raggiungere i tuoi obiettivi.",
      color: "gold",
      glowClass: "glow-gold",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-3d">{t('services.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            const colorMap: Record<string, string> = {
              sapphire: "from-sapphire/10 to-sapphire/5",
              emerald: "from-emerald/10 to-emerald/5",
              coral: "from-coral/10 to-coral/5",
              gold: "from-gold/10 to-gold/5",
            }
            const borderColorMap: Record<string, string> = {
              sapphire: "hover:border-sapphire/50 hover:shadow-sapphire/20",
              emerald: "hover:border-emerald/50 hover:shadow-emerald/20",
              coral: "hover:border-coral/50 hover:shadow-coral/20",
              gold: "hover:border-gold/50 hover:shadow-gold/20",
            }
            const iconBgMap: Record<string, string> = {
              sapphire: "bg-sapphire/10 group-hover:bg-sapphire/20 text-sapphire",
              emerald: "bg-emerald/10 group-hover:bg-emerald/20 text-emerald",
              coral: "bg-coral/10 group-hover:bg-coral/20 text-coral",
              gold: "bg-gold/10 group-hover:bg-gold/20 text-gold",
            }

            return (
              <div
                key={index}
                className={`group p-6 bg-gradient-to-br ${colorMap[service.color]} rounded-xl border border-border ${borderColorMap[service.color]} hover:shadow-lg hover:scale-105 transition-all duration-300 fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`mb-4 p-3 ${iconBgMap[service.color]} rounded-lg w-fit group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground transition-colors duration-200">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}