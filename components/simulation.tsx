"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calculator, ChevronDown, Download } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import jsPDF from "jspdf"

interface AmortizationRow {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
}

export default function Simulation() {
  const { t } = useLanguage()
  const [amount, setAmount] = useState(50000)
  const [duration, setDuration] = useState(60)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([])
  const [showSchedule, setShowSchedule] = useState(false)

  // Calculate monthly payment and amortization schedule with 2% annual interest
  useEffect(() => {
    const annualRate = 0.02 // 2% taux d'intérêt annuel
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
      doc.setTextColor(220, 38, 38)
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
      doc.setTextColor(33, 150, 243)
      doc.text(t('simulation.title'), pageWidth / 2, yPosition, { align: "center" })
      yPosition += 8

      // Generation date
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      const today = new Date()
      const formattedDate = today.toLocaleDateString("fr-BE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      doc.text(`Date: ${formattedDate}`, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 12

      // Separator line
      doc.setDrawColor(200, 200, 200)
      doc.line(20, yPosition, pageWidth - 20, yPosition)
      yPosition += 8

      // Loan details section
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "bold")
      doc.text(t('simulation.result'), 20, yPosition)
      yPosition += 7

      doc.setFont(undefined, "normal")
      doc.setFontSize(11)
      const details = [
        [t('simulation.amount') + ':', `${amount.toLocaleString("fr-BE")} €`],
        [t('simulation.duration') + ':', `${duration} ${t('contact.months')}`],
        [t('simulation.rate') + ':', `2%`],
        [t('simulation.monthlyPayment') + ':', `${monthlyPayment.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`],
        [
          t('simulation.totalAmount') + ':',
          `${(monthlyPayment * duration).toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
        ],
        [
          t('simulation.totalInterest') + ':',
          `${(monthlyPayment * duration - amount).toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
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

      // Amortization table
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.setFont(undefined, "bold")
      doc.text("Plan d'Amortissement Détaillé", 20, yPosition)
      yPosition += 8

      // Table header
      const colWidths = [15, 35, 35, 35, 35]
      const startX = 20
      doc.setFillColor(33, 150, 243)
      doc.setTextColor(255, 255, 255)
      doc.setFont(undefined, "bold")
      doc.setFontSize(10)

      const headers = ["Mois", "Paiement", "Capital", "Intérêts", "Solde"]
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
        if (yPosition > pageHeight - 20) {
          doc.addPage()
          yPosition = 15
        }

        if (rowCount % 2 === 0) {
          doc.setFillColor(245, 245, 245)
          xPos = startX
          headers.forEach((_, i) => {
            doc.rect(xPos, yPosition - 4, colWidths[i], 5, "F")
            xPos += colWidths[i]
          })
        }

        const rowData = [
          row.month.toString(),
          `${row.payment.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
          `${row.principal.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
          `${row.interest.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
          `${row.balance.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €`,
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
      doc.text("Document généré automatiquement par Solidis Finance.", pageWidth / 2, yPosition, {
        align: "center",
      })
      doc.text("Contact: Solidisfinance@gmail.com", pageWidth / 2, yPosition + 5, {
        align: "center",
      })

      // Save PDF
      const fileName = `Solidis-Finance-Simulation-${amount}EUR-${duration}mois-${today.getTime()}.pdf`
      doc.save(fileName)
      console.log("[v0] PDF generated successfully:", fileName)
    } catch (error) {
      console.error("[v0] Error generating PDF:", error)
      alert("Erreur dans la génération du PDF. Veuillez réessayer.")
    }
  }

  return (
    <section id="simulation" className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-3d">{t('simulation.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('simulation.subtitle')}
          </p>
        </div>

        {/* Simulation card */}
        <div className="max-w-2xl mx-auto fade-in-up">
          <div className="bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border p-8 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-sapphire/10 to-primary/10 rounded-lg glow-sapphire">
                <Calculator className="w-6 h-6 text-sapphire" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">{t('simulation.calculate')}</h3>
            </div>

            {/* Amount slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                {t('simulation.amount')}: <span className="text-sapphire">{amount.toLocaleString("fr-BE")} €</span>
              </label>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-sapphire transition-all duration-200"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5.000 €</span>
                <span>1.000.000 €</span>
              </div>
            </div>

            {/* Duration slider */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                {t('simulation.duration')}: <span className="text-emerald">{duration} {t('contact.months')}</span>
              </label>
              <input
                type="range"
                min="6"
                max="300"
                step="6"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-emerald transition-all duration-200"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>6 {t('contact.months')}</span>
                <span>300 {t('contact.months')}</span>
              </div>
            </div>

            {/* Interest rate display */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                {t('simulation.rate')}: <span className="text-primary">2%</span>
              </label>
              <div className="w-full px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-center">
                <span className="text-primary font-semibold">Taux fixe: 2% par an</span>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-3 gap-4 pt-8 border-t border-border">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-sapphire/5 to-sapphire/10 hover:from-sapphire/10 hover:to-sapphire/15 transition-all duration-200 glow-sapphire">
                <p className="text-sm text-muted-foreground mb-1">{t('simulation.monthlyPayment')}</p>
                <p className="text-2xl font-bold text-sapphire">
                  {monthlyPayment.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-emerald/5 to-emerald/10 hover:from-emerald/10 hover:to-emerald/15 transition-all duration-200 glow-emerald">
                <p className="text-sm text-muted-foreground mb-1">{t('simulation.totalAmount')}</p>
                <p className="text-2xl font-bold text-emerald">
                  {(monthlyPayment * duration).toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-coral/5 to-coral/10 hover:from-coral/10 hover:to-coral/15 transition-all duration-200 glow-coral">
                <p className="text-sm text-muted-foreground mb-1">{t('simulation.totalInterest')}</p>
                <p className="text-2xl font-bold text-coral">
                  {(monthlyPayment * duration - amount).toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-lg font-semibold hover:from-muted/80 hover:to-muted/60 transition-all duration-200 flex items-center justify-between hover:shadow-lg"
            >
              <span>Visualiser le Plan d'Amortissement</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${showSchedule ? "rotate-180" : ""}`}
              />
            </button>

            {/* Amortization table */}
            {showSchedule && (
              <div className="mt-8">
                <div className="overflow-x-auto mb-4 rounded-lg border border-border max-h-96 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-gradient-to-r from-sapphire/10 to-emerald/10 border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-2 font-semibold text-foreground">Mois</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Paiement</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Capital</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Intérêts</th>
                        <th className="text-right py-3 px-2 font-semibold text-foreground">Solde</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row) => (
                        <tr key={row.month} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-2 text-foreground">{row.month}</td>
                          <td className="text-right py-3 px-2 text-foreground">
                            {row.payment.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-emerald font-medium">
                            {row.principal.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-coral">
                            {row.interest.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
                          </td>
                          <td className="text-right py-3 px-2 text-foreground font-medium">
                            {row.balance.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} €
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
                  Télécharger le PDF
                </button>
              </div>
            )}

            {/* CTA : use Link directly as a styled button (no nested <button>) */}
            <Link
              href="/contact"
              className="block w-full mt-8 px-6 py-3 bg-gradient-to-r from-sapphire to-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-sapphire/50 transition-all duration-200 hover:scale-105 active:scale-95 glow-sapphire text-center"
              role="button"
            >
              {t('hero.cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
