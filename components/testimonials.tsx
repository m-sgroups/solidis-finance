"use client"

import { Star } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      id: 1,
      name: "Marco Rossi",
      role: "Imprenditore",
      content:
        "Solidis Finance mi ha aiutato a realizzare il mio sogno di aprire un'attività. Processo veloce e trasparente!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marco",
    },
    {
      id: 2,
      name: "Giulia Bianchi",
      role: "Professionista",
      content: "Tassi competitivi e un servizio clienti eccezionale. Consiglio vivamente Solidis Finance a tutti!",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giulia",
    },
    {
      id: 3,
      name: "Antonio Ferrari",
      role: "Consulente",
      content: "La semplicità del processo di richiesta e l'approvazione rapida mi hanno sorpreso positivamente.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio",
    },
    {
      id: 4,
      name: "Francesca Moretti",
      role: "Freelancer",
      content: "Finalmente un prestito senza complicazioni! Solidis Finance è la scelta giusta per chi ha fretta.",
      rating: 5,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Francesca",
    },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-red-500">Clienti</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="fade-in-up hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 flex-grow italic">"{testimonial.content}"</p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center fade-in-up">
          <p className="text-lg text-muted-foreground mb-6">Unisciti a migliaia di clienti soddisfatti</p>
          <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105">
            Inizia il Tuo Percorso
          </button>
        </div>
      </div>
    </section>
  )
}