"use client"

import { Home, Briefcase, Zap, TrendingUp } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function LoanTypes() {
  const { t } = useLanguage()

  const loanTypes = [
    {
      id: 1,
      title: t('loanTypes.personal.title'),
      description: t('loanTypes.personal.description'),
      icon: Home,
      color: "from-green-500 to-green-600",
      features: ["Approvazione rapida", "Tassi competitivi", "Rimborso flessibile"],
    },
    {
      id: 2,
      title: t('loanTypes.professional.title'),
      description: t('loanTypes.professional.description'),
      icon: Briefcase,
      color: "from-red-500 to-red-600",
      features: ["Importi fino a 100.000€", "Consulenza dedicata", "Processi semplificati"],
    },
    {
      id: 3,
      title: t('loanTypes.fast.title'),
      description: t('loanTypes.fast.description'),
      icon: Zap,
      color: "from-green-400 to-green-500",
      features: ["Erogazione in 24h", "Nessuna documentazione complessa", "Online 100%"],
    },
    {
      id: 4,
      title: "Investimenti Strategici",
      description: "Finanziamenti per progetti di crescita e sviluppo a lungo termine",
      icon: TrendingUp,
      color: "from-red-400 to-red-500",
      features: ["Piani personalizzati", "Tassi agevolati", "Supporto finanziario"],
    },
  ]

  return (
    <section id="loan-types" className="py-20 md:py-32 bg-gradient-to-b from-background via-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('loanTypes.title')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-red-500">
              Prestiti
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('loanTypes.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loanTypes.map((loan, index) => {
            const Icon = loan.icon
            return (
              <div
                key={loan.id}
                className="group relative fade-in-up hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${loan.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${loan.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2">{loan.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{loan.description}</p>

                  <ul className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${loan.color}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`mt-6 w-full py-2 px-4 bg-gradient-to-r ${loan.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    {t('loanTypes.learnMore')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}