'use client';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
}

const navLinks = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Paket', href: '#paket' },
  { label: 'Tim Kami', href: '#tim-kami' },
  { label: 'Galeri', href: '#galeri' },
  { label: 'Kontak', href: '#kontak' },
];

export function Navbar({ className }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking on a link
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      setIsMobileMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-warm-white/95 backdrop-blur-md shadow-md py-3 sm:py-3'
          : 'bg-transparent py-4 sm:py-5',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Tanea Spa Icon - SVG */}
          <div className="w-9 h-9 sm:w-10 md:w-12 sm:h-10 md:h-12 text-terracotta">
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
            <h1 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-deep-brown leading-tight">
              Tanea Spa
            </h1>
            <p className="text-[10px] sm:text-xs md:text-sm text-terracotta font-tagline italic hidden xs:block">
              Resort Level Relaxation
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-charcoal hover:text-terracotta transition-colors font-medium text-sm xl:text-base"
            >
              {link.label}
            </a>
          ))}
          <Link href="/booking">
            <Button size="md">
              Reservasi Sekarang
            </Button>
          </Link>
        </div>

        {/* Tablet Navigation */}
        <div className="hidden md:flex lg:hidden items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-charcoal hover:text-terracotta transition-colors font-medium text-sm"
            >
              {link.label}
            </a>
          ))}
          <Link href="/booking">
            <Button size="sm">
              Reservasi
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 sm:p-3 text-deep-brown rounded-lg hover:bg-terracotta/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 bg-warm-white transform transition-transform duration-300 ease-in-out pt-20 sm:pt-24 overflow-y-auto',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Close button overlay */}
        <button
          className="absolute top-4 right-4 sm:top-5 sm:right-6 p-2 text-deep-brown rounded-lg hover:bg-terracotta/10"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        <div className="container mx-auto px-6 py-8">
          {/* Mobile Navigation Links */}
          <div className="space-y-2 mb-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-charcoal hover:text-terracotta transition-colors font-semibold text-lg py-3 border-b border-terracotta/10 last:border-0"
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile CTA */}
          <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)} className="block mb-8">
            <Button size="lg" className="w-full">
              Reservasi Sekarang
            </Button>
          </Link>

          {/* Quick Info Cards */}
          <div className="space-y-4">
            <a
              href="tel:+6281234567890"
              className="flex items-center gap-4 p-4 bg-cream rounded-xl hover:bg-warm-beige transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-xs text-charcoal/60">Hubungi Kami</p>
                <p className="font-semibold text-deep-brown text-sm sm:text-base">+62 812-3456-7890</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-cream rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-xs text-charcoal/60">Jam Operasional</p>
                <p className="font-semibold text-deep-brown text-sm sm:text-base">09:00 - 21:00</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-cream rounded-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" />
              </div>
              <div>
                <p className="text-xs text-charcoal/60">Lokasi</p>
                <p className="font-semibold text-deep-brown text-sm sm:text-base">Duren Sawit, Jakarta Timur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}
