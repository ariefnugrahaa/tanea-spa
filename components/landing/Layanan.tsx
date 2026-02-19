'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatPrice, formatDuration } from '@/lib/utils';
import { services, categoryLabels, type ServiceCategory } from '@/lib/data/services';
import { useState } from 'react';
import Link from 'next/link';

export function Layanan() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('MASSAGE');

  return (
    <section id="layanan" className="py-16 sm:py-20 md:py-32 bg-cream grain-overlay">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-brown mb-3 sm:mb-4">
            Layanan & Harga
          </h2>
          <p className="font-tagline italic text-terracotta text-base sm:text-lg md:text-xl px-4">
            Pilih perawatan yang sesuai dengan kebutuhanmu
          </p>
        </div>

        {/* Category Tabs - Horizontal scroll on mobile */}
        <div className="flex overflow-x-auto pb-4 sm:pb-0 mb-8 sm:mb-12 -mx-4 sm:mx-0 px-4 sm:px-0 gap-2 sm:gap-4 scrollbar-hide">
          {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeCategory === category
                  ? 'bg-terracotta text-white shadow-lg'
                  : 'bg-warm-beige text-charcoal hover:bg-terracotta/20'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div
          className={`grid gap-4 sm:gap-6 md:gap-8 ${
            activeCategory === 'SPA_RITUALS'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {services[activeCategory].map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isRitual={activeCategory === 'SPA_RITUALS'}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16 px-4">
          <Link href="/booking">
            <Button size="lg" className="w-full sm:w-auto">
              Reservasi Layanan Pilihanmu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services[keyof typeof services][number];
  isRitual: boolean;
}

function ServiceCard({ service, isRitual }: ServiceCardProps) {
  return (
    <Card
      className={`h-full p-5 sm:p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col ${
        isRitual ? 'bg-terracotta-dark text-cream' : ''
      }`}
    >
      {/* Badge */}
      {service.badge && (
        <div className="mb-3 sm:mb-4 flex justify-center">
          <Badge
            variant={isRitual ? 'default' : 'default'}
            className={isRitual ? 'bg-gold-accent text-deep-brown border-gold-accent text-xs sm:text-sm' : 'text-xs sm:text-sm'}
          >
            {service.badge}
          </Badge>
        </div>
      )}

      {/* Service Name */}
      <h3
        className={`font-tagline font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 ${
          isRitual ? 'text-cream' : 'text-terracotta'
        }`}
      >
        {service.name}
      </h3>

      {/* Composition */}
      {service.composition && (
        <p className="text-xs sm:text-sm italic mb-2 sm:mb-3 opacity-80">{service.composition}</p>
      )}

      {/* Description */}
      <p
        className={`text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed ${
          isRitual ? 'text-cream/80' : 'text-charcoal/80'
        }`}
      >
        {service.description}
      </p>

      {/* Prices */}
      <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
        {service.durations.map((duration) => (
          <div
            key={duration}
            className={`flex justify-between items-center ${
              isRitual ? 'text-cream' : 'text-charcoal'
            }`}
          >
            <span className="text-xs sm:text-sm font-medium">{formatDuration(duration)}</span>
            <span className="font-bold text-base sm:text-lg">{formatPrice(service.prices[duration])}</span>
          </div>
        ))}
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-grow" />

      {/* Book Button */}
      <Link href="/booking" className="block w-full">
        <Button
          variant={isRitual ? 'secondary' : 'primary'}
          size="sm"
          className="w-full text-sm sm:text-base"
        >
          Pilih Layanan
        </Button>
      </Link>
    </Card>
  );
}
