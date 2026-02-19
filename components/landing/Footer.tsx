export function Footer() {
  return (
    <footer className="bg-terracotta-dark text-cream py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 sm:mb-12">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 text-terracotta-light">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
                  <circle cx="24" cy="24" r="3" fill="currentColor" />
                  <path
                    d="M24 12C24 12 32 16 32 24C32 32 24 36 24 36"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 12C24 12 16 16 16 24C16 32 24 36 24 36"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-display font-bold">Tanea Spa</h3>
                <p className="text-[10px] sm:text-xs font-tagline italic text-terracotta-light">
                  Resort Level Relaxation
                </p>
              </div>
            </div>
            <p className="text-cream/80 text-xs sm:text-sm leading-relaxed">
              Pengalaman spa bintang lima di Jakarta Timur. Nikmati perawatan tradisional Bali
              dengan sentuhan modern yang menenangkan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <a href="#layanan" className="text-cream/80 hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#tim-kami" className="text-cream/80 hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  Tim Kami
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-cream/80 hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-cream/80 hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  Kontak
                </a>
              </li>
              <li>
                <a href="/booking" className="text-cream/80 hover:text-terracotta-light transition-colors text-sm sm:text-base">
                  Reservasi
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg mb-3 sm:mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 sm:space-y-3 text-cream/80 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs sm:text-sm">
                  Jl. Laut Arafuru Blok C2 No.1,<br />
                  Pondok Bambu, Duren Sawit,<br />
                  Jakarta Timur 13430
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm">09:00 - 21:00 (Setiap Hari)</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358 2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <a href="https://instagram.com/tanea.spa" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta-light transition-colors">
                  @tanea.spa
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/20 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-cream/60 text-xs sm:text-sm text-center sm:text-left">
              © 2025 Tanea Spa. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-cream/60 text-xs sm:text-sm">
              <a href="#" className="hover:text-terracotta-light transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-terracotta-light transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
