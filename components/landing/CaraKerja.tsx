import { CheckCircle2, ArrowDown } from 'lucide-react';

export function CaraKerja() {
  const steps = [
    {
      icon: '1',
      title: 'Pilih Layanan',
      description:
        'Jelajahi menu layanan kami dan pilih perawatan yang sesuai dengan kebutuhanmu.',
    },
    {
      icon: '2',
      title: 'Isi Formulir',
      description:
        'Lengkapi data diri dan preferensi perawatanmu. Formulir intake membantu kami memberikan pelayanan terbaik.',
    },
    {
      icon: '3',
      title: 'Nikmati Perawatan',
      description:
        'Datang ke Tanea Spa sesuai jadwal yang dipilih dan nikmati pengalaman resort level relaxation.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-32 bg-warm-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-deep-brown mb-3 sm:mb-4">
            Reservasi Semudah Ini
          </h2>
          <p className="font-tagline italic text-terracotta text-base sm:text-lg md:text-xl px-4">
            Tiga langkah mudah menuju relaksasi
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Step Number Circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-terracotta text-cream font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 mx-auto shadow-lg">
                {step.icon}

                {/* Connecting line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-1/2 left-full w-full h-0.5 bg-terracotta/30 -translate-y-1/2" />
                )}
              </div>

              {/* Step Content */}
              <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-deep-brown mb-2 sm:mb-3">
                {step.title}
              </h3>
              <p className="text-charcoal/80 leading-relaxed text-sm sm:text-base px-2 sm:px-0">
                {step.description}
              </p>

              {/* Checkmark decoration */}
              <div className="mt-3 sm:mt-4 flex justify-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-terracotta" />
              </div>

              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="sm:hidden flex justify-center mt-4">
                  <ArrowDown className="w-6 h-6 text-terracotta/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-16 px-4">
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-light transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
          >
            Mulai Reservasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
