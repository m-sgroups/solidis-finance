"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import LanguageSelector from "./LanguageSelector"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navItems = [
    { label: t('nav.home'), href: "/" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.services'), href: "/services" },
    { label: t('nav.simulation'), href: "/simulation" },
    { label: t('nav.contact'), href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-500 to-red-500 border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-red-500 font-bold text-lg">SF</span>
              </div>
              <span className="text-xl font-bold text-white hidden sm:inline">Solidis Finance</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-yellow-100 transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Selector - Desktop */}
            <LanguageSelector />
          </nav>

          {/* Mobile: Language Selector + Menu button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-in fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}