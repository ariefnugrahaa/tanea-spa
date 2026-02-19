'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowDown, Star, Shield, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const scrollToServices = () => {
    document.getElementById('layanan')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/image-1.png"
        alt="Tanea Spa Hero Background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        onError={(e) => {
          // Fallback to gradient if image fails
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Gradient overlay - darker on mobile for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-terracotta-dark/95 via-terracotta-dark/80 sm:via-terracotta-dark/70 to-terracotta/60" />

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center pt-20 sm:pt-0">
        {/* Decorative top element */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="w-2 h-2 bg-terracotta-light rounded-full animate-pulse" />
            <span className="text-cream/90 text-xs sm:text-sm font-medium">Buka Setiap Hari 09:00 - 21:00</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream mb-4 sm:mb-6 leading-tight">
          Resort Level
          <br />
          Relaxation.
        </h1>

        {/* Subheadline */}
        <p className="font-tagline italic text-cream/90 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 max-w-xl sm:max-w-2xl mx-auto px-2 sm:px-0">
          Pengalaman spa bintang lima, hadir di Jakarta Timur.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-16 px-4">
          <Link href="/booking" className="w-full sm:w-auto">
            <Button size="lg" className="bg-cream text-deep-brown hover:bg-warm-beige w-full sm:w-auto">
              Reservasi Sekarang
            </Button>
          </Link>
          <Button
            onClick={scrollToServices}
            variant="outline"
            size="lg"
            className="border-cream text-cream hover:bg-cream/10 w-full sm:w-auto"
          >
            Lihat Menu Layanan
          </Button>
        </div>

        {/* Trust indicators - Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-cream/80 text-sm">
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-gold-accent text-gold-accent" />
              ))}
            </div>
            <span className="font-medium">5.0 Rating</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-cream/80 text-sm">
            <Shield size={16} className="text-terracotta-light" />
            <span className="font-medium">Terapis Bersertifikat</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-cream/80 text-sm">
            <MapPin size={16} className="text-terracotta-light" />
            <span className="font-medium hidden sm:inline">Duren Sawit, Jakarta Timur</span>
            <span className="font-medium sm:hidden">Jakarta Timur</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on very small screens */}
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-scroll-down">
        <ArrowDown className="w-6 h-6 text-cream/60" />
      </div>

      {/* Bottom gradient fade for better visual transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-cream to-transparent pointer-events-none" />
    </section>
  );
}
