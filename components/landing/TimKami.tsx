'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export function TimKami() {
  const therapists = [
    {
      name: 'Dewi',
      photo: '/images/terapis/dewi.jpg',
      specialization: 'Spa Rituals Specialist',
      years: '5+',
    },
    {
      name: 'Made',
      photo: '/images/terapis/made.jpg',
      specialization: 'Deep Tissue & Hot Stone',
      years: '8+',
    },
    {
      name: 'Putu',
      photo: '/images/terapis/putu.jpg',
      specialization: 'Reflexology Expert',
      years: '6+',
    },
    {
      name: 'Kadek',
      photo: '/images/terapis/kadek.jpg',
      specialization: 'Balinese Massage',
      years: '4+',
    },
  ];

  return (
    <section id="tim-kami" className="py-16 sm:py-20 md:py-32 bg-cream grain-overlay">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-brown mb-3 sm:mb-4">
            Tim Kami
          </h2>
          <p className="font-tagline italic text-terracotta text-base sm:text-lg md:text-xl">
            Terapis profesional berpengalaman
          </p>
          <p className="text-charcoal/70 mt-3 sm:mt-4 max-w-2xl mx-auto px-4 text-sm sm:text-base">
            Semua terapis kami bersertifikat dan terlatih secara profesional untuk memberikan
            pengalaman spa terbaik.
          </p>
        </div>

        {/* Therapist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {therapists.map((therapist, index) => (
            <TherapistCard key={index} therapist={therapist} />
          ))}
        </div>

        {/* Certification Badge */}
        <div className="flex justify-center mt-8 sm:mt-12 px-4">
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-warm-white rounded-full border border-terracotta/20">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8 2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07 3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-charcoal font-medium text-sm sm:text-base">Bersertifikat & Terlatih Profesional</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TherapistCard({ therapist }: { therapist: typeof therapists[number] }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Photo */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full overflow-hidden bg-gradient-to-br from-terracotta to-terracotta-dark">
        {imageError ? (
          // Fallback initial if image fails to load
          <span className="absolute inset-0 flex items-center justify-center text-cream text-2xl sm:text-3xl font-display font-bold">
            {therapist.name.charAt(0)}
          </span>
        ) : (
          <Image
            src={therapist.photo}
            alt={therapist.name}
            fill
            className="object-cover"
            sizes="80px"
            onError={() => setImageError(true)}
          />
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-1 sm:mb-2">
        {therapist.name}
      </h3>

      {/* Specialization */}
      <p className="text-terracotta font-medium text-xs sm:text-sm mb-1">
        {therapist.specialization}
      </p>

      {/* Experience */}
      <p className="text-charcoal/60 text-xs sm:text-sm">{therapist.years} Tahun Pengalaman</p>
    </Card>
  );
}
