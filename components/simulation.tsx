"use client"

import { useState, useEffect } from "react"
import { Calculator, ChevronDown, Download } from "lucide-react"
import jsPDF from "jspdf"

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function Simulation() {
  const [amount, setAmount] = useState(10000)
  const [duration, setDuration] = useState(12)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  // Calculate monthly payment and amortization schedule
  useEffect(() => {
    const annualRate = 0.08 // 8% annual interest rate
    const monthlyRate = annualRate / 12
    const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, duration)
    const denominator = Math.pow(1 + monthlyRate, duration) - 1
    const payment = numerator / denominator
    setMonthlyPayment(isFinite(payment) ? payment : 0)

    const schedule: AmortizationRow[] = []
    let balance = amount

    for (let month = 1; month <= duration; month++) {
      const interestPayment = balance * monthlyRate
      const principalPayment = payment - interestPayment
      balance -= principalPayment

      schedule.push({
        month,
        payment: payment,
        principal: Math.max(0, principalPayment),
        interest: interestPayment,
        balance: Math.max(0, balance),
      })
    }

    setAmortizationSchedule(schedule)
  }, [amount, duration])

  const totalAmount = monthlyPayment * duration
  const totalInterest = totalAmount - amount

  // PDF export function
  const exportToPDF = () => {
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      let yPosition = 15

      // Company header
      doc.setFontSize(24)
      doc.setTextColor(220, 38, 38) // Red color
      doc.text("SOLIDIS FINANCE", 20, yPosition)
      yPosition += 8

      // Company info
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      doc.text("Email: Solidisfinance@gmail.com", 20, yPosition)
      yPosition += 5
      doc.text("WhatsApp: +43 650 4675488", 20, yPosition)
      yPosition += 10

      // Document title
      doc.setFontSize(16)
      doc.setTextColor(33, 150, 243) // Blue color
      doc.text("Piano di Ammortamento del Prestito", pageWidth / 2, yPosition, { align: "center" })
      yPosition += 8

      // Generation date
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      const today = new Date()
      const formattedDate = today.toLocaleDateString("it-IT", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      doc.text(`Data di generazione: ${formattedDate}`, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 12

      // Separator line
      doc.setDrawColor(200, 200, 200)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8

      // Loan details section
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "bold")
      doc.text("Dettagli del Prestito", 20, yPosition)
      yPosition += 7

      doc.setFont(undefined, "normal")
      doc.setFontSize(11)
      const details = [
        [`Importo del Prestito:`, `${amount.toLocaleString("it-IT")} €`],
        [`Durata:`, `${duration} mesi`],
        [`Tasso di Interesse Annuale:`, `8%`],
        [`Rata Mensile:`, `${monthlyPayment.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`],
        [
          `Importo Totale da Pagare:`,
          `${(monthlyPayment * duration).toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
        ],
        [
          `Interessi Totali:`,
          `${(monthlyPayment * duration - amount).toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
        ],
      ]

      details.forEach(([label, value]) => {
        doc.setTextColor(0, 0, 0)
        doc.text(label, 20, yPosition)
        doc.setTextColor(33, 150, 243)
        doc.text(value, pageWidth - 20, yPosition, { align: "right" })
        yPosition += 6
      })

      yPosition += 8

      // Separator line
      doc.setDrawColor(200, 200, 200)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8

      // Amortization table - manually created without plugin
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "bold")
      doc.text("Piano di Ammortamento Dettagliato", 20, yPosition)
      yPosition += 8

      // Table header
      const colWidths = [15, 35, 35, 35, 35]
      const startX = 20
      doc.setFillColor(33, 150, 243)
      doc.setTextColor(255, 255, 255)
      doc.setFont(undefined, "bold")
      doc.setFontSize(10)

      const headers = ["Mese", "Rata", "Capitale", "Interessi", "Saldo"]
      let xPos = startX
      headers.forEach((header, i) => {
        doc.rect(xPos, yPosition - 5, colWidths[i], 6, "F")
        doc.text(header, xPos + colWidths[i] / 2, yPosition, { align: "center" })
        xPos += colWidths[i]
      })
      yPosition += 8

      // Table rows
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "normal")
      doc.setFontSize(9)
      let rowCount = 0

      amortizationSchedule.forEach((row) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 20) {
          doc.addPage()
          yPosition = 15
        }

        // Alternate row background
        if (rowCount % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          xPos = startX
          headers.forEach((_, i) => {
            doc.rect(xPos, yPosition - 4, colWidths[i], 5, "F")
            xPos += colWidths[i]
          })
        }

        // Row data
        const rowData = [
          row.month.toString(),
          `${row.payment.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
          `${row.principal.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
          `${row.interest.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
          `${row.balance.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €`,
        ]

        xPos = startX
        rowData.forEach((data, i) => {
          doc.text(data, xPos + colWidths[i] / 2, yPosition, { align: "center" })
          xPos += colWidths[i]
        })

        yPosition += 5
        rowCount++
      })

      // Footer
      yPosition += 10
      doc.setFontSize(9)
      doc.setTextColor(150, 150, 150)
      doc.text("Questo documento è stato generato automaticamente da Solidis Finance.", pageWidth / 2, yPosition, {
        align: "center",
      })
      doc.text("Per informazioni contattare: Solidisfinance@gmail.com", pageWidth / 2, yPosition + 5, {
        align: "center",
      })

      // Save PDF
      const fileName = `Solidis-Finance-Piano-Ammortamento-${amount}EUR-${duration}mesi-${today.getTime()}.pdf`
      doc.save(fileName)
      console.log("[v0] PDF generated successfully:", fileName)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert("Errore nella generazione del PDF. Riprova.")
    }
  }

  return (
    <section id="simulation" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-3d">Simulatore di Prestito</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcola la tua rata mensile stimata in pochi secondi.
          </p>
        </div>

        {/* Simulation card */}
        <div className="max-w-2xl mx-auto fade-in-up">
          <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-sapphire/10 to-primary/10 rounded-lg glow-sapphire">
                <Calculator className="w-6 h-6 text-sapphire" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Calcola il Tuo Prestito</h3>
            </div>

            {/* Amount slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Importo del prestito: <span className="text-sapphire">{amount.toLocaleString("it-IT")} €</span>
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-sapphire transition-all duration-200"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1.000 €</span>
                <span>100.000 €</span>
              </div>
            </div>

            {/* Duration slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Durata: <span className="text-emerald">{duration} mesi</span>
              </label>
              <input
                type="range"
                min="6"
                max="84"
                step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-emerald transition-all duration-200"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>6 mesi</span>
                <span>84 mesi</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-sapphire/5 to-sapphire/10 hover:from-sapphire/10 hover:to-sapphire/15 transition-all duration-200 glow-sapphire">
                <p className="text-sm text-muted-foreground mb-1">Rata Mensile</p>
                <p className="text-2xl font-bold text-sapphire">
                  {monthlyPayment.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald/5 to-emerald/10 hover:from-emerald/10 hover:to-emerald/15 transition-all duration-200 glow-emerald">
                <p className="text-sm text-muted-foreground mb-1">Importo Totale</p>
                <p className="text-2xl font-bold text-emerald">
                  {(monthlyPayment * duration).toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-coral/5 to-coral/10 hover:from-coral/10 hover:to-coral/15 transition-all duration-200 glow-coral">
                <p className="text-sm text-muted-foreground mb-1">Interessi</p>
                <p className="text-2xl font-bold text-coral">
                  {(monthlyPayment * duration - amount).toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-lg font-semibold hover:from-muted/80 hover:to-muted/60 transition-all duration-200 flex items-center justify-between hover:shadow-lg"
            >
              <span>Visualizza Piano di Ammortamento</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${showSchedule ? "rotate-180" : ""}`}
              />
            </button>

            {/* Amortization table */}
            {showSchedule && (
              <div className="mt-8">
                <div className="overflow-x-auto mb-4 rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-sapphire/10 to-emerald/10 border-b border-border">
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Mese</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Rata</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Capitale</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Interessi</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row) => (
                        <tr key={row.month} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-2 text-foreground">{row.month}</td>
                          <td className="text-right py-3 px-2 text-foreground">
                            {row.payment.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-emerald font-medium">
                            {row.principal.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-coral">
                            {row.interest.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-foreground font-medium">
                            {row.balance.toLocaleString("it-IT", { maximumFractionDigits: 2 })} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={exportToPDF}
                  className="w-full px-4 py-2 bg-gradient-to-r from-sapphire/10 to-primary/10 text-sapphire rounded-lg font-semibold hover:from-sapphire/20 hover:to-primary/20 transition-all duration-200 flex items-center justify-center gap-2 glow-sapphire"
                >
                  <Download className="w-4 h-4" />
                  Scarica PDF
                </button>
              </div>
            )}

            {/* CTA */}
            <a
  href="https://wa.me/436504675488?text=Ciao!%20Vorrei%20richiedere%20un%20prestito%20tramite%20Solidis%20Finance."
  target="_blank"
  rel="noopener noreferrer"
  className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-sapphire to-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-sapphire/50 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-5 h-5 text-primary-foreground group-hover:animate-pulse transition-all"
  >
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.74 5.53 2.16 7.92L.5 31.5l7.82-2.04A15.4 15.4 0 0016 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 27.88a12.29 12.29 0 01-6.3-1.72l-.45-.26-4.64 1.21 1.24-4.52-.29-.46A12.27 12.27 0 113 16c0 6.76 5.46 12.27 13 12.27zM22.62 19c-.36-.18-2.14-1.06-2.47-1.17-.33-.12-.57-.18-.8.18-.24.36-.92 1.17-1.13 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.8a10.77 10.77 0 01-1.99-2.45c-.21-.36 0-.56.15-.73.15-.15.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.8-1.93-1.1-2.64-.29-.7-.6-.6-.8-.6h-.68c-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.52 3.96 6.09 5.39.85.36 1.5.57 2.01.73.84.27 1.6.23 2.21.14.68-.1 2.14-.87 2.45-1.7.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
  </svg>
  Richiedi un Prestito
</a>

          </div>
        </div>
      </div>
    </section>
  )
}
