"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageCircle, MapPin, Facebook, Twitter, Linkedin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Contattaci</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hai domande? Il nostro team è qui per aiutarti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="fade-in-up">
            <h3 className="text-2xl font-semibold text-foreground mb-8">Informazioni di Contatto</h3>

            {/* Contact methods */}
            <div className="space-y-6 mb-12">
              {/* Email */}
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-200">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  <a
                    href="mailto:Solidisfinance@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Solidisfinance@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-200">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                  <a
                    href="https://wa.me/436504675488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +43 650 4675488
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-1 transition-transform duration-200">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Indirizzo</p>
                  <p className="text-muted-foreground">
                    Solidis Finance
                    <br />
                    Vienna, Austria
                  </p>
                </div>
              </div>
            </div>

            {/* Social media */}
            <div>
              <p className="font-semibold text-foreground mb-4">Seguici</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200"
                >
                  <Facebook className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200"
                >
                  <Twitter className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200"
                >
                  <Linkedin className="w-5 h-5 text-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="fade-in-up" style={{ animationDelay: "100ms" }}>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Il tuo nome"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="tua@email.com"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Messaggio
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Il tuo messaggio..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Invia il Messaggio
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary text-sm font-medium text-center animate-in fade-in">
                  Grazie! Il tuo messaggio è stato inviato con successo.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
