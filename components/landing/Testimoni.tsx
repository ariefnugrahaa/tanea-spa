'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Rina',
    service: 'Tanea Signature Massage',
    rating: 5,
    text: 'Pengalaman yang luar biasa! Terapisnya sangat profesional dan pijatannya pas banget. Benar-benar meresort level relaxation di Jakarta Timur.',
  },
  {
    name: 'Budi',
    service: 'Agni Watu Massage',
    rating: 5,
    text: 'Batu panasnya bikin otot langsung rileks. Tempatnya bersih dan nyaman. Bakal balik lagi buat coba paket lain.',
  },
  {
    name: 'Sarah',
    service: 'Sukha Rasa',
    rating: 5,
    text: 'Paket lengkap banget! 4 jam terasa cepet banget karena enak. Semua step-nya pas dan hasilnya kulit jadi lebih halus.',
  },
  {
    name: 'Dian',
    service: 'Reflexology',
    rating: 5,
    text: 'Refleksi terbaik yang pernah aku coba. Titik sarafnya pas dan setelahnya badan langsung enteng. Harganya juga terjangkau.',
  },
  {
    name: 'Arief',
    service: 'Santika',
    rating: 5,
    text: 'Kombinasi massage dan refleksi itu cocok banget buat yang pegal-pegal. Terapisnya ramah dan menjelaskan detail treatment.',
  },
];

export function Testimoni() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-cream grain-overlay overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-brown mb-3 sm:mb-4">
            Apa Kata Mereka
          </h2>
          <p className="font-tagline italic text-terracotta text-base sm:text-lg md:text-xl">
            Cerita dari tamu yang sudah mencoba
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-deep-brown hover:bg-warm-beige transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-deep-brown hover:bg-warm-beige transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>

            {/* Current Card */}
            <div className="px-8 py-2">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-6 bg-terracotta' : 'bg-terracotta/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Auto-scroll Carousel */}
        <div className="hidden sm:block relative">
          <div className="flex animate-scroll gap-6 pb-4">
            {/* Duplicate testimonials for seamless scroll */}
            {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Hide scrollbar for mobile carousel */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="min-w-[280px] xs:min-w-[320px] sm:min-w-[400px] p-5 sm:p-6 flex-shrink-0">
      {/* Stars */}
      <div className="flex gap-1 mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 sm:w-5 sm:h-5 ${i < testimonial.rating ? 'text-gold-accent' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-charcoal mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
        &quot;{testimonial.text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-terracotta/20 flex items-center justify-center flex-shrink-0">
          <span className="text-terracotta font-display font-bold text-sm sm:text-base">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-deep-brown text-sm sm:text-base truncate">
            {testimonial.name}
          </p>
          <p className="text-terracotta text-xs sm:text-sm font-tagline italic truncate">
            {testimonial.service}
          </p>
        </div>
      </div>
    </Card>
  );
}
