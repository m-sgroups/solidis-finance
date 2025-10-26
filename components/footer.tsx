"use client"

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-lg">SF</span>
              </div>
              <span className="font-bold">Solidis Finance</span>
            </div>
            <p className="text-sm opacity-80">Le tue soluzioni di finanziamento moderne e affidabili.</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Navigazione</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/" className="hover:opacity-100 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:opacity-100 transition-opacity">
                  Servizi
                </a>
              </li>
              <li>
                <a href="/about" className="hover:opacity-100 transition-opacity">
                  Chi Siamo
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:opacity-100 transition-opacity">
                  Contatti
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="/services" className="hover:opacity-100 transition-opacity">
                  Prestiti Personali
                </a>
              </li>
              <li>
                <a href="/services" className="hover:opacity-100 transition-opacity">
                  Prestiti Aziendali
                </a>
              </li>
              <li>
                <a href="/services" className="hover:opacity-100 transition-opacity">
                  Credito Veloce
                </a>
              </li>
              <li>
                <a href="/services" className="hover:opacity-100 transition-opacity">
                  Consulenza Finanziaria
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <a href="mailto:Solidisfinance@gmail.com" className="hover:opacity-100 transition-opacity">
                  Solidisfinance@gmail.com
                </a>
              </li>
              <li>
            <a
                href="https://wa.me/436504675488"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-100 transition-opacity flex items-center gap-2"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.258-1.688 1.694-2.637 3.957-2.637 6.383 0 1.564.32 3.085.94 4.516l-.999 3.648 3.742-.981c1.305.756 2.814 1.176 4.514 1.176 2.426 0 4.687-.949 6.38-2.646 1.694-1.694 2.637-3.957 2.637-6.383 0-2.426-.943-4.687-2.637-6.38-1.693-1.694-3.957-2.648-6.38-2.648z" />
                </svg>
                WhatsApp
            </a>
            </li>

            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-center text-sm opacity-80">© 2025 Solidis Finance – Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}