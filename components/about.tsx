"use client"

import { CheckCircle } from "lucide-react"

export default function About() {
  const values = [
    "Trasparenza totale nelle nostre condizioni",
    "Processo rapido e semplificato",
    "Team di esperti al tuo ascolto",
    "Soluzioni adatte alle tue esigenze",
  ]

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-3d">
              Chi Siamo{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire to-emerald">
                Solidis Finance
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Solidis Finance è un'agenzia di finanziamento moderna e affidabile, dedicata a offrirti le migliori
              soluzioni di prestiti. Con anni di esperienza nel settore finanziario, comprendiamo le tue esigenze e ci
              impegniamo a fornirti un servizio trasparente e di qualità.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              La nostra missione è semplice: accompagnarti nei tuoi progetti offrendoti condizioni giuste, processi
              rapidi e un team sempre disponibile per consigliarti.
            </p>

            {/* Values list */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 stagger-item transition-colors-smooth hover:text-primary"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-sapphire flex-shrink-0 mt-0.5 transition-transform-smooth group-hover:scale-110" />
                  <span className="text-foreground font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Stats */}
          <div className="grid grid-cols-2 gap-6 fade-in-up" style={{ animationDelay: "100ms" }}>
            <div className="p-6 bg-gradient-to-br from-sapphire/5 to-sapphire/10 rounded-xl border border-border text-center hover-3d-lift group cursor-pointer glow-sapphire">
              <p className="text-4xl font-bold text-sapphire mb-2 group-hover:scale-110 transition-transform-smooth">
                10K+
              </p>
              <p className="text-muted-foreground">Clienti Soddisfatti</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-emerald/5 to-emerald/10 rounded-xl border border-border text-center hover-3d-lift group cursor-pointer glow-emerald">
              <p className="text-4xl font-bold text-emerald mb-2 group-hover:scale-110 transition-transform-smooth">
                500M€
              </p>
              <p className="text-muted-foreground">Prestiti Concessi</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-coral/5 to-coral/10 rounded-xl border border-border text-center hover-3d-lift group cursor-pointer glow-coral">
              <p className="text-4xl font-bold text-coral mb-2 group-hover:scale-110 transition-transform-smooth">
                24h
              </p>
              <p className="text-muted-foreground">Risposta Rapida</p>
            </div>
            <div className="p-6 bg-gradient-to-br from-gold/5 to-gold/10 rounded-xl border border-border text-center hover-3d-lift group cursor-pointer glow-gold">
              <p className="text-4xl font-bold text-gold mb-2 group-hover:scale-110 transition-transform-smooth">
                100%
              </p>
              <p className="text-muted-foreground">Trasparente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
