"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'it' | 'fr' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('it')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && ['it', 'fr', 'es'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

const translations = {
  it: {
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      services: 'Servizi',
      simulation: 'Simulazione',
      contact: 'Contatti'
    },
    hero: {
      title: 'Prestiti Moderni e Affidabili',
      subtitle: 'Soluzioni di finanziamento su misura per te',
      cta: 'Richiedi un Preventivo',
      description: 'Solidis Finance offre soluzioni di prestiti personali, professionali e veloci con trasparenza e fiducia.'
    },
    loanTypes: {
      title: 'I Nostri Prestiti',
      subtitle: 'Scegli la soluzione più adatta alle tue esigenze',
      personal: {
        title: 'Prestito Personale',
        description: 'Finanziamento flessibile per realizzare i tuoi progetti personali'
      },
      professional: {
        title: 'Prestito Professionale',
        description: 'Supporto finanziario per far crescere la tua attività'
      },
      fast: {
        title: 'Prestito Veloce',
        description: 'Approvazione rapida per le tue esigenze urgenti'
      },
      learnMore: 'Scopri di più'
    },
    testimonials: {
      title: 'Cosa Dicono i Nostri Clienti',
      subtitle: 'Testimonianze di chi si è affidato a noi'
    },
    footer: {
      description: 'La tua soluzione di finanziamento affidabile e moderna',
      links: 'Link Utili',
      contact: 'Contatti',
      followUs: 'Seguici',
      rights: 'Tutti i diritti riservati',
      address: 'Via Roma 123, Milano',
      phone: 'Tel: +39 02 1234567',
      email: 'Email: info@solidisfinance.it'
    },
    about: {
  title: 'Chi Siamo',
  subtitle: 'La tua fiducia è la nostra priorità',
  description: 'Solidis Finance è un\'agenzia di finanziamento moderna e affidabile, dedicata a offrirti le migliori soluzioni di prestiti. Con anni di esperienza nel settore finanziario, comprendiamo le tue esigenze e ci impegniamo a fornirti un servizio trasparente e di qualità.',
  mission: 'La nostra missione è semplice: accompagnarti nei tuoi progetti offrendoti condizioni giuste, processi rapidi e un team sempre disponibile per consigliarti.',
  values: {
    title: 'I Nostri Valori',
    transparency: 'Trasparenza totale nelle nostre condizioni',
    trust: 'Processo rapido e semplificato',
    speed: 'Team di esperti al tuo ascolto',
    support: 'Soluzioni adatte alle tue esigenze'
  }
    },
    services: {
      title: 'I Nostri Servizi',
      subtitle: 'Soluzioni finanziarie complete per ogni esigenza',
      personalLoan: 'Prestito Personale',
      businessLoan: 'Prestito Aziendale',
      quickLoan: 'Prestito Veloce',
      consolidation: 'Consolidamento Debiti'
    },
    simulation: {
      title: 'Simula il Tuo Prestito',
      subtitle: 'Calcola la tua rata mensile',
      amount: 'Importo del Prestito',
      duration: 'Durata (mesi)',
      rate: 'Tasso di Interesse',
      calculate: 'Calcola',
      monthlyPayment: 'Rata Mensile',
      totalAmount: 'Importo Totale',
      totalInterest: 'Interessi Totali',
      result: 'Risultato della Simulazione'
    },
    contact: {
        title: 'Contattaci',
        subtitle: 'Compila il modulo per richiedere un prestito',
        // Champs du formulaire
        firstName: 'Nome',
        lastName: 'Cognome',
        email: 'Email',
        phone: 'Numero di Telefono',
        birthDate: 'Data di Nascita',
        birthPlace: 'Luogo di Nascita',
        profession: 'Professione',
        loanAmount: 'Importo del Prestito',
        repaymentDuration: 'Durata di Rimborso (mesi)',
        loanPurpose: 'Motivo del Prestito',
        monthlyIncome: 'Reddito Mensile Netto',
        idDocument: 'Documento di Identità',
        // Placeholders
        firstNamePlaceholder: 'Il tuo nome',
        lastNamePlaceholder: 'Il tuo cognome',
        emailPlaceholder: 'tua@email.com',
        phonePlaceholder: '+32 XXX XX XX XX',
        birthPlacePlaceholder: 'Città di nascita',
        professionPlaceholder: 'La tua professione',
        loanAmountPlaceholder: 'Es: 10000',
        loanPurposePlaceholder: 'Descrivi il motivo del prestito',
        monthlyIncomePlaceholder: 'Es: 2500',
        // Options
        selectOption: 'Seleziona un\'opzione',
        months: 'mesi',
        // Motifs de prêt
        loanPurposeOptions: {
            personal: 'Progetto Personale',
            business: 'Progetto Professionale',
            renovation: 'Lavori di Ristrutturazione',
            vehicle: 'Acquisto di Veicolo',
            debt: 'Consolidamento Debiti',
            other: 'Altro'
        },
        // Boutons
        uploadDocument: 'Carica Documento',
        send: 'Invia Richiesta',
        sending: 'Invio in corso...',
        // Messages
        successMessage: 'Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto.',
        errorMessage: 'Si è verificato un errore. Riprova.',
        requiredField: 'Questo campo è obbligatorio',
        // Infos contact
        getInTouch: 'Informazioni di Contatto',
        address: 'Indirizzo',
        addressFull: 'Bruxelles, Belgio'
        },
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      simulation: 'Simulation',
      contact: 'Contact'
    },
    hero: {
      title: 'Prêts Modernes et Fiables',
      subtitle: 'Solutions de financement adaptées à vos besoins',
      cta: 'Demander un Devis',
      description: 'Solidis Finance offre des solutions de prêts personnels, professionnels et rapides avec transparence et confiance.'
    },
    loanTypes: {
      title: 'Nos Prêts',
      subtitle: 'Choisissez la solution la plus adaptée à vos besoins',
      personal: {
        title: 'Prêt Personnel',
        description: 'Financement flexible pour réaliser vos projets personnels'
      },
      professional: {
        title: 'Prêt Professionnel',
        description: 'Soutien financier pour développer votre activité'
      },
      fast: {
        title: 'Prêt Rapide',
        description: 'Approbation rapide pour vos besoins urgents'
      },
      learnMore: 'En savoir plus'
    },
    testimonials: {
      title: 'Ce Que Disent Nos Clients',
      subtitle: 'Témoignages de ceux qui nous ont fait confiance'
    },
    footer: {
      description: 'Votre solution de financement fiable et moderne',
      links: 'Liens Utiles',
      contact: 'Contact',
      followUs: 'Suivez-nous',
      rights: 'Tous droits réservés',
      address: '123 Rue de Rome, Milan',
      phone: 'Tél: +39 02 1234567',
      email: 'Email: info@solidisfinance.it'
    },
            about: {
        title: 'À Propos de Nous',
        subtitle: 'Votre confiance est notre priorité',
        description: 'Solidis Finance est une agence de financement moderne et fiable, dédiée à vous offrir les meilleures solutions de prêts. Avec des années d\'expérience dans le secteur financier, nous comprenons vos besoins et nous nous engageons à vous fournir un service transparent et de qualité.',
        mission: 'Notre mission est simple : vous accompagner dans vos projets en vous offrant des conditions justes, des processus rapides et une équipe toujours disponible pour vous conseiller.',
        values: {
            title: 'Nos Valeurs',
            transparency: 'Transparence totale dans nos conditions',
            trust: 'Processus rapide et simplifié',
            speed: 'Équipe d\'experts à votre écoute',
            support: 'Solutions adaptées à vos besoins'
        }
        },
    services: {
      title: 'Nos Services',
      subtitle: 'Solutions financières complètes pour tous vos besoins',
      personalLoan: 'Prêt Personnel',
      businessLoan: 'Prêt Entreprise',
      quickLoan: 'Prêt Rapide',
      consolidation: 'Consolidation de Dettes'
    },
    simulation: {
      title: 'Simulez Votre Prêt',
      subtitle: 'Calculez votre mensualité',
      amount: 'Montant du Prêt',
      duration: 'Durée (mois)',
      rate: "Taux d'Intérêt",
      calculate: 'Calculer',
      monthlyPayment: 'Mensualité',
      totalAmount: 'Montant Total',
      totalInterest: 'Intérêts Totaux',
      result: 'Résultat de la Simulation'
    },
    contact: {
  title: 'Contactez-nous',
  subtitle: 'Remplissez le formulaire pour demander un prêt',
  // Champs du formulaire
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'Email',
  phone: 'Numéro de Téléphone',
  birthDate: 'Date de Naissance',
  birthPlace: 'Lieu de Naissance',
  profession: 'Profession',
  loanAmount: 'Montant du Prêt',
  repaymentDuration: 'Durée de Remboursement (mois)',
  loanPurpose: 'Motif du Prêt',
  monthlyIncome: 'Revenu Mensuel Net',
  idDocument: 'Pièce d\'Identité',
  // Placeholders
  firstNamePlaceholder: 'Votre prénom',
  lastNamePlaceholder: 'Votre nom',
  emailPlaceholder: 'votre@email.com',
  phonePlaceholder: '+32 XXX XX XX XX',
  birthPlacePlaceholder: 'Ville de naissance',
  professionPlaceholder: 'Votre profession',
  loanAmountPlaceholder: 'Ex: 10000',
  loanPurposePlaceholder: 'Décrivez le motif du prêt',
  monthlyIncomePlaceholder: 'Ex: 2500',
  // Options
  selectOption: 'Sélectionnez une option',
  months: 'mois',
  // Motifs de prêt
  loanPurposeOptions: {
    personal: 'Projet Personnel',
    business: 'Projet Professionnel',
    renovation: 'Travaux de Rénovation',
    vehicle: 'Achat de Véhicule',
    debt: 'Consolidation de Dettes',
    other: 'Autre'
  },
  // Boutons
  uploadDocument: 'Télécharger le Document',
  send: 'Envoyer la Demande',
  sending: 'Envoi en cours...',
  // Messages
  successMessage: 'Merci ! Votre demande a été envoyée avec succès. Nous vous contactons bientôt.',
  errorMessage: 'Une erreur s\'est produite. Veuillez réessayer.',
  requiredField: 'Ce champ est obligatoire',
  // Infos contact
  getInTouch: 'Informations de Contact',
  address: 'Adresse',
  addressFull: 'Bruxelles, Belgique'
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Nosotros',
      services: 'Servicios',
      simulation: 'Simulación',
      contact: 'Contacto'
    },
    hero: {
      title: 'Préstamos Modernos y Confiables',
      subtitle: 'Soluciones de financiamiento adaptadas a ti',
      cta: 'Solicitar Presupuesto',
      description: 'Solidis Finance ofrece soluciones de préstamos personales, profesionales y rápidos con transparencia y confianza.'
    },
    loanTypes: {
      title: 'Nuestros Préstamos',
      subtitle: 'Elige la solución más adecuada para tus necesidades',
      personal: {
        title: 'Préstamo Personal',
        description: 'Financiamiento flexible para realizar tus proyectos personales'
      },
      professional: {
        title: 'Préstamo Profesional',
        description: 'Apoyo financiero para hacer crecer tu negocio'
      },
      fast: {
        title: 'Préstamo Rápido',
        description: 'Aprobación rápida para tus necesidades urgentes'
      },
      learnMore: 'Saber más'
    },
    testimonials: {
      title: 'Lo Que Dicen Nuestros Clientes',
      subtitle: 'Testimonios de quienes confiaron en nosotros'
    },
    footer: {
      description: 'Tu solución de financiamiento confiable y moderna',
      links: 'Enlaces Útiles',
      contact: 'Contacto',
      followUs: 'Síguenos',
      rights: 'Todos los derechos reservados',
      address: 'Calle Roma 123, Milán',
      phone: 'Tel: +39 02 1234567',
      email: 'Email: info@solidisfinance.it'
    },
        about: {
    title: 'Sobre Nosotros',
    subtitle: 'Tu confianza es nuestra prioridad',
    description: 'Solidis Finance es una agencia de financiamiento moderna y confiable, dedicada a ofrecerte las mejores soluciones de préstamos. Con años de experiencia en el sector financiero, comprendemos tus necesidades y nos comprometemos a brindarte un servicio transparente y de calidad.',
    mission: 'Nuestra misión es simple: acompañarte en tus proyectos ofreciéndote condiciones justas, procesos rápidos y un equipo siempre disponible para asesorarte.',
    values: {
        title: 'Nuestros Valores',
        transparency: 'Transparencia total en nuestras condiciones',
        trust: 'Proceso rápido y simplificado',
        speed: 'Equipo de expertos a tu disposición',
        support: 'Soluciones adaptadas a tus necesidades'
    }
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones financieras completas para cada necesidad',
      personalLoan: 'Préstamo Personal',
      businessLoan: 'Préstamo Empresarial',
      quickLoan: 'Préstamo Rápido',
      consolidation: 'Consolidación de Deudas'
    },
    simulation: {
      title: 'Simula Tu Préstamo',
      subtitle: 'Calcula tu cuota mensual',
      amount: 'Monto del Préstamo',
      duration: 'Duración (meses)',
      rate: 'Tasa de Interés',
      calculate: 'Calcular',
      monthlyPayment: 'Cuota Mensual',
      totalAmount: 'Monto Total',
      totalInterest: 'Intereses Totales',
      result: 'Resultado de la Simulación'
    },
    contact: {
  title: 'Contáctanos',
  subtitle: 'Completa el formulario para solicitar un préstamo',
  // Champs du formulaire
  firstName: 'Nombre',
  lastName: 'Apellido',
  email: 'Email',
  phone: 'Número de Teléfono',
  birthDate: 'Fecha de Nacimiento',
  birthPlace: 'Lugar de Nacimiento',
  profession: 'Profesión',
  loanAmount: 'Monto del Préstamo',
  repaymentDuration: 'Duración de Reembolso (meses)',
  loanPurpose: 'Motivo del Préstamo',
  monthlyIncome: 'Ingreso Mensual Neto',
  idDocument: 'Documento de Identidad',
  // Placeholders
  firstNamePlaceholder: 'Tu nombre',
  lastNamePlaceholder: 'Tu apellido',
  emailPlaceholder: 'tu@email.com',
  phonePlaceholder: '+32 XXX XX XX XX',
  birthPlacePlaceholder: 'Ciudad de nacimiento',
  professionPlaceholder: 'Tu profesión',
  loanAmountPlaceholder: 'Ej: 10000',
  loanPurposePlaceholder: 'Describe el motivo del préstamo',
  monthlyIncomePlaceholder: 'Ej: 2500',
  // Options
  selectOption: 'Selecciona una opción',
  months: 'meses',
  // Motifs de prêt
  loanPurposeOptions: {
    personal: 'Proyecto Personal',
    business: 'Proyecto Profesional',
    renovation: 'Trabajos de Renovación',
    vehicle: 'Compra de Vehículo',
    debt: 'Consolidación de Deudas',
    other: 'Otro'
  },
  // Boutons
  uploadDocument: 'Subir Documento',
  send: 'Enviar Solicitud',
  sending: 'Enviando...',
  // Messages
  successMessage: '¡Gracias! Tu solicitud ha sido enviada con éxito. Te contactaremos pronto.',
  errorMessage: 'Se produjo un error. Inténtalo de nuevo.',
  requiredField: 'Este campo es obligatorio',
  // Infos contact
  getInTouch: 'Información de Contacto',
  address: 'Dirección',
  addressFull: 'Bruselas, Bélgica'
},
  }
}