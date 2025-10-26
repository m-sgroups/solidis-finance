"use client"

import type React from "react"
import { useState } from "react"
import { Mail, MessageCircle, MapPin, Upload, Facebook, Twitter, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    profession: "",
    loanAmount: "",
    repaymentDuration: "",
    loanPurpose: "",
    monthlyIncome: "",
    idDocument: null as File | null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        idDocument: e.target.files![0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Créer FormData pour envoyer le fichier
      const data = new FormData()
      data.append('firstName', formData.firstName)
      data.append('lastName', formData.lastName)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('birthDate', formData.birthDate)
      data.append('birthPlace', formData.birthPlace)
      data.append('profession', formData.profession)
      data.append('monthlyIncome', formData.monthlyIncome)
      data.append('loanAmount', formData.loanAmount)
      data.append('repaymentDuration', formData.repaymentDuration)
      data.append('loanPurpose', formData.loanPurpose)
      
      if (formData.idDocument) {
        data.append('idDocument', formData.idDocument)
      }

      // Envoyer à l'API
      const response = await fetch('/api/loan-request', {
        method: 'POST',
        body: data,
      })

      const result = await response.json()

      if (response.ok) {
        console.log('✅ Formulaire envoyé avec succès!')
        setSubmitted(true)
        
        // Réinitialiser le formulaire
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          birthDate: "",
          birthPlace: "",
          profession: "",
          loanAmount: "",
          repaymentDuration: "",
          loanPurpose: "",
          monthlyIncome: "",
          idDocument: null,
        })
        
        // Réinitialiser l'input file
        const fileInput = document.getElementById('idDocument') as HTMLInputElement
        if (fileInput) fileInput.value = ''
        
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        console.error('❌ Erreur:', result.error)
        alert('Erreur: ' + result.error)
      }
    } catch (error) {
      console.error('❌ Erreur réseau:', error)
      alert('Erreur lors de l\'envoi du formulaire. Vérifiez votre connexion.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact info - Plus petit maintenant */}
          <div className="fade-in-up">
            <h3 className="text-2xl font-semibold text-foreground mb-8">{t('contact.getInTouch')}</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                    <a
                      href="mailto:Solidisfinance@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      Solidisfinance@gmail.com
                    </a>

                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/436504675488"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      +43 650 4675488
                    </a>

                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{t('contact.address')}</p>
                  <p className="text-muted-foreground text-sm">{t('contact.addressFull')}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-4">{t('footer.followUs')}</p>
              <div className="flex gap-3">
                <a href="#" className="p-2 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200">
                  <Facebook className="w-5 h-5 text-foreground" />
                </a>
                <a href="#" className="p-2 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200">
                  <Twitter className="w-5 h-5 text-foreground" />
                </a>
                <a href="#" className="p-2 bg-card rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all duration-200">
                  <Linkedin className="w-5 h-5 text-foreground" />
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire de demande de prêt - Plus large */}
          <div className="md:col-span-2 fade-in-up" style={{ animationDelay: "100ms" }}>
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Prénom */}
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.firstName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.firstNamePlaceholder')}
                  />
                </div>

                {/* Nom */}
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.lastName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.lastNamePlaceholder')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>

                {/* Date de naissance */}
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.birthDate')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Lieu de naissance */}
                <div>
                  <label htmlFor="birthPlace" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.birthPlace')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="birthPlace"
                    name="birthPlace"
                    value={formData.birthPlace}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.birthPlacePlaceholder')}
                  />
                </div>

                {/* Profession */}
                <div>
                  <label htmlFor="profession" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.profession')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.professionPlaceholder')}
                  />
                </div>

                {/* Revenu mensuel */}
                <div>
                  <label htmlFor="monthlyIncome" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.monthlyIncome')} (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="monthlyIncome"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.monthlyIncomePlaceholder')}
                  />
                </div>

                {/* Montant du prêt */}
                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.loanAmount')} (€) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="loanAmount"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    required
                    min="5000"
                    max="1000000"
                    step="1000"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    placeholder={t('contact.loanAmountPlaceholder')}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Montant: 5.000€ - 1.000.000€</p>
                </div>

                {/* Durée de remboursement */}
                <div>
                  <label htmlFor="repaymentDuration" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.repaymentDuration')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="repaymentDuration"
                    name="repaymentDuration"
                    value={formData.repaymentDuration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">{t('contact.selectOption')}</option>
                    <option value="6">6 {t('contact.months')}</option>
                    <option value="12">12 {t('contact.months')}</option>
                    <option value="24">24 {t('contact.months')}</option>
                    <option value="36">36 {t('contact.months')}</option>
                    <option value="48">48 {t('contact.months')}</option>
                    <option value="60">60 {t('contact.months')}</option>
                    <option value="72">72 {t('contact.months')}</option>
                    <option value="84">84 {t('contact.months')}</option>
                    <option value="96">96 {t('contact.months')}</option>
                    <option value="120">120 {t('contact.months')}</option>
                    <option value="144">144 {t('contact.months')}</option>
                    <option value="180">180 {t('contact.months')}</option>
                    <option value="240">240 {t('contact.months')}</option>
                    <option value="300">300 {t('contact.months')}</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">Durée: 6 - 300 mois</p>
                </div>

                {/* Motif du prêt */}
                <div className="md:col-span-2">
                  <label htmlFor="loanPurpose" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.loanPurpose')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="loanPurpose"
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="">{t('contact.selectOption')}</option>
                    <option value="personal">{t('contact.loanPurposeOptions.personal')}</option>
                    <option value="business">{t('contact.loanPurposeOptions.business')}</option>
                    <option value="renovation">{t('contact.loanPurposeOptions.renovation')}</option>
                    <option value="vehicle">{t('contact.loanPurposeOptions.vehicle')}</option>
                    <option value="debt">{t('contact.loanPurposeOptions.debt')}</option>
                    <option value="other">{t('contact.loanPurposeOptions.other')}</option>
                  </select>
                </div>

                {/* Pièce d'identité */}
                <div className="md:col-span-2">
                  <label htmlFor="idDocument" className="block text-sm font-semibold text-foreground mb-2">
                    {t('contact.idDocument')} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="idDocument"
                      name="idDocument"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <label
                      htmlFor="idDocument"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-background border-2 border-dashed border-border rounded-lg text-foreground cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <Upload className="w-5 h-5" />
                      <span>
                        {formData.idDocument 
                          ? formData.idDocument.name 
                          : t('contact.uploadDocument')}
                      </span>
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Formats acceptés: PDF, JPG, PNG (max 5MB)
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 text-sm font-medium text-center animate-in fade-in">
                  {t('contact.successMessage')}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}