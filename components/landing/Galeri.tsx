'use client';

import Image from 'next/image';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/images/image-1.png', alt: 'Hot stone therapy' },
  { src: '/images/image-2.png', alt: 'Spa products basket' },
  { src: '/images/image-3.png', alt: 'Therapist hands' },
  { src: '/images/image-4.png', alt: 'Plumeria flowers' },
  { src: '/images/image-5.png', alt: 'Herbal tea preparation' },
  { src: '/images/image-6.png', alt: 'Relaxing ambiance' },
];

const gradients = [
  'from-terracotta/20 to-terracotta-dark/30',
  'from-terracotta/30 to-cream/50',
  'from-cream to-terracotta/20',
  'from-terracotta-light/30 to-cream',
  'from-cream to-warm-beige',
  'from-terracotta/20 to-warm-beige',
  'from-terracotta-dark/20 to-terracotta/30',
  'from-cream to-terracotta-light/20',
  'from-terracotta/30 to-terracotta-dark/20',
];

export function Galeri() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handlePrevious = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === null ? null : (prev > 0 ? prev - 1 : galleryImages.length - 1)));
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === null ? null : (prev < galleryImages.length - 1 ? prev + 1 : 0)));
  };

  return (
    <section id="galeri" className="py-16 sm:py-20 md:py-32 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-brown mb-3 sm:mb-4">
            Galeri
          </h2>
          <p className="font-tagline italic text-terracotta text-base sm:text-lg md:text-xl">
            Intip suasana Tanea Spa
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="relative group aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-cream"
            >
              {imageErrors[index] ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} transition-transform duration-300 group-hover:scale-110`} />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onError={() => setImageErrors({ ...imageErrors, [index]: true })}
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                <span className="text-cream font-medium text-xs sm:text-sm px-2 text-center">{image.alt}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-white hover:text-terracotta transition-colors rounded-full hover:bg-white/10"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Navigation - Desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Image */}
            <div className="relative max-w-4xl w-full max-h-[85vh]">
              {imageErrors[selectedImage] ? (
                <div className={`w-full aspect-[4/3] max-h-[85vh] rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradients[selectedImage]}`} />
              ) : (
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={1920}
                  height={1440}
                  className="w-full h-auto object-contain rounded-xl sm:rounded-2xl"
                  priority
                  onError={() => setImageErrors({ ...imageErrors, [selectedImage]: true })}
                />
              )}

              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-center">
                <p className="text-white text-sm sm:text-base md:text-lg font-medium bg-black/50 px-3 sm:px-4 py-2 rounded-lg">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>
            </div>

            {/* Navigation - Mobile (dots at bottom) */}
            <div className="sm:hidden absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedImage ? 'w-6 bg-terracotta' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
