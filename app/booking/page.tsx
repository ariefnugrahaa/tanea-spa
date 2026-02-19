'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatPrice, formatDuration } from '@/lib/utils';
import { services, categoryLabels, type ServiceCategory } from '@/lib/data/services';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type BookingStep = 'service' | 'schedule' | 'details' | 'summary' | 'submitting' | 'success';

export default function BookingPage() {
  const router = useRouter();
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('MASSAGE');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTherapist, setSelectedTherapist] = useState<string>('');
  const [formData, setFormData] = useState({
    nama: '',
    whatsapp: '',
    catatan: '',
  });
  const [bookingId, setBookingId] = useState<string>('');
  const [error, setError] = useState<string>('');

  const currentService = services[selectedCategory].find((s) => s.id === selectedService);

  const handleServiceSelect = (serviceId: string | null) => {
    setSelectedService(serviceId);
    if (!serviceId) {
      setSelectedDuration(null);
      return;
    }
    const service = services[selectedCategory].find((s) => s.id === serviceId);
    if (service && service.durations.length === 1) {
      setSelectedDuration(service.durations[0]);
    } else {
      setSelectedDuration(null);
    }
  };

  const handleNext = async () => {
    if (step === 'service') setStep('schedule');
    else if (step === 'schedule') setStep('details');
    else if (step === 'details') setStep('summary');
    else if (step === 'summary') {
      await submitBooking();
    }
  };

  const handleBack = () => {
    if (step === 'summary') setStep('details');
    else if (step === 'details') setStep('schedule');
    else if (step === 'schedule') setStep('service');
  };

  const submitBooking = async () => {
    if (!currentService || !selectedDuration || !selectedDate || !selectedTime) return;

    setError('');
    setStep('submitting');

    // DEMO MODE: Simulate booking without API call
    setTimeout(() => {
      // Generate a dummy booking ID for demo purposes
      const dummyBookingId = 'demo-' + Date.now();
      setBookingId(dummyBookingId);
      setStep('success');
    }, 1000);

    /* TODO: Uncomment for production mode
    try {
      // Calculate booking times
      const bookingDate = new Date(selectedDate);
      const [hour, minute] = selectedTime.split(':').map(Number);
      const jamMulai = new Date(bookingDate);
      jamMulai.setHours(hour, minute, 0, 0);

      const jamSelesai = new Date(jamMulai);
      jamSelesai.setMinutes(jamSelesai.getMinutes() + selectedDuration);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          layananId: currentService.id,
          tanggal: selectedDate,
          jamMulai: jamMulai.toISOString(),
          jamSelesai: jamSelesai.toISOString(),
          klienData: {
            nama: formData.nama,
            whatsapp: formData.whatsapp,
          },
          catatan: formData.catatan,
          karyawanId: selectedTherapist || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal membuat booking');
      }

      setBookingId(result.booking.id);
      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
      setStep('summary');
    }
    */
  };

  const goToIntake = () => {
    if (bookingId) {
      router.push(`/intake?booking=${bookingId}`);
    } else {
      // For demo mode, navigate to intake without booking
      router.push('/intake');
    }
  };

  const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-terracotta text-cream py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft size={18} />
            <span>Kembali ke Beranda</span>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Reservasi Online</h1>
          <p className="text-cream/80 mt-1 sm:mt-2 text-sm sm:text-base">Pilih layanan dan jadwal perawatanmu</p>
        </div>
      </div>

      {step !== 'success' && (
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2">
            {(['service', 'schedule', 'details', 'summary'] as BookingStep[]).map((s, index) => (
              <div key={s} className="flex items-center flex-shrink-0">
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-base md:text-lg transition-all ${
                    step === s
                      ? 'bg-terracotta text-white scale-110'
                      : step === 'submitting' || (step === 'summary' && ['service', 'schedule', 'details', 'summary'].includes(s)) ||
                        (step === 'details' && ['service', 'schedule', 'details'].includes(s)) ||
                        (step === 'schedule' && ['service', 'schedule'].includes(s))
                      ? 'bg-terracotta/20 text-terracotta'
                      : 'bg-warm-beige text-charcoal'
                  }`}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`w-4 sm:w-8 md:w-16 lg:w-24 h-0.5 ml-1 sm:ml-2 md:ml-4 lg:ml-8 ${
                      (step === 'submitting' && index < 3) ||
                      (step === 'summary' && index < 3) ||
                      (step === 'details' && index < 2) ||
                      (step === 'schedule' && index < 1)
                        ? 'bg-terracotta'
                        : 'bg-warm-beige'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs sm:text-sm">
              {error}
            </div>
          )}

          {/* Step Content */}
          {step === 'service' && (
            <StepService
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedService={selectedService}
              setSelectedService={handleServiceSelect}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          )}

          {step === 'schedule' && currentService && (
            <StepSchedule
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              selectedTherapist={selectedTherapist}
              setSelectedTherapist={setSelectedTherapist}
              timeSlots={timeSlots}
              duration={selectedDuration || 90}
            />
          )}

          {step === 'details' && (
            <StepDetails formData={formData} setFormData={setFormData} />
          )}

          {step === 'summary' && currentService && (
            <StepSummary
              service={currentService}
              duration={selectedDuration || 90}
              date={selectedDate}
              time={selectedTime}
              formData={formData}
            />
          )}

          {step === 'submitting' && (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-terracotta animate-spin" />
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-charcoal">Memproses booking...</p>
            </div>
          )}

          {/* Navigation Buttons */}
          {step !== 'submitting' && (
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
              <Button
                onClick={handleBack}
                variant="ghost"
                disabled={step === 'service'}
                className={step === 'service' ? 'invisible' : 'w-full sm:w-auto'}
              >
                Kembali
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (step === 'service' && (!selectedService || !selectedDuration)) ||
                  (step === 'schedule' && (!selectedDate || !selectedTime)) ||
                  (step === 'details' && (!formData.nama || !formData.whatsapp))
                }
                className="w-full sm:w-auto"
              >
                {step === 'summary' ? 'Konfirmasi Booking' : 'Lanjut'}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Success State */}
      {step === 'success' && (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown mb-3 sm:mb-4">
              Booking Berhasil!
            </h2>

            <p className="text-charcoal/80 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">
              Booking kamu untuk {currentService?.name} telah dibuat.
              Silakan isi formulir intake untuk melengkapi data perawatanmu.
              <span className="block mt-2 text-xs text-terracotta">(Demo mode - booking tidak tersimpan)</span>
            </p>

            <div className="flex flex-col gap-3 sm:gap-4">
              <Button onClick={goToIntake} size="lg" className="w-full">
                Isi Formulir Intake
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <Link href="/" className="block w-full">
                <Button variant="outline" size="md" className="w-full">
                  Skip & Kembali ke Beranda
                </Button>
              </Link>
            </div>

            <div className="mt-8 sm:mt-12 text-4xl sm:text-5xl opacity-20">🌿</div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepService({
  selectedCategory,
  setSelectedCategory,
  selectedService,
  setSelectedService,
  selectedDuration,
  setSelectedDuration,
}: {
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  selectedService: string | null;
  setSelectedService: (id: string | null) => void;
  selectedDuration: number | null;
  setSelectedDuration: (dur: number | null) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Tabs - Improved Mobile Design */}
      <div className="mb-6 sm:mb-8">
        {/* Mobile: Compact 3-column grid with better spacing */}
        <div className="grid grid-cols-3 gap-2 sm:hidden mb-4">
          {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => {
            const count = services[category].length;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedService(null);
                  setSelectedDuration(null);
                }}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  selectedCategory === category
                    ? 'border-terracotta bg-terracotta text-white shadow-lg'
                    : 'border-terracotta/20 bg-cream text-charcoal hover:border-terracotta/40'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <span className="text-xs font-bold leading-tight">
                    {category === 'MASSAGE' && 'Pijat'}
                    {category === 'REFLEXOLOGY' && 'Refleksi'}
                    {category === 'SPA_PACKAGES' && 'Paket'}
                    {category === 'SPA_RITUALS' && 'Ritual'}
                  </span>
                  <span className="text-[10px] font-medium leading-tight opacity-80">
                    {count} pilihan
                  </span>
                </div>
                {selectedCategory === category && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-terracotta rounded-full border-2 border-cream" />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop/Tablet: Horizontal scrollable tabs */}
        <div className="hidden sm:flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 gap-3 scrollbar-hide">
          {(Object.keys(categoryLabels) as ServiceCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedService(null);
                setSelectedDuration(null);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-warm-beige text-charcoal hover:bg-terracotta/20'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services[selectedCategory].map((service) => (
          <Card
            key={service.id}
            className={`p-4 sm:p-5 md:p-6 cursor-pointer transition-all ${
              selectedService === service.id
                ? 'ring-2 ring-terracotta shadow-lg border-terracotta'
                : 'hover:shadow-md hover:border-terracotta/40'
            }`}
            onClick={() => {
              setSelectedService(service.id);
              // Clear duration if this service has multiple options
              if (service.durations.length > 1) {
                setSelectedDuration(null);
              }
            }}
          >
            {service.badge && (
              <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-gold-accent text-deep-brown rounded-full mb-2 sm:mb-3">
                {service.badge}
              </span>
            )}
            <h3 className="font-tagline font-bold text-base sm:text-lg md:text-xl text-terracotta mb-1 sm:mb-2 leading-tight">
              {service.name}
            </h3>
            {service.composition && (
              <p className="text-[11px] sm:text-xs md:text-sm italic text-charcoal/70 mb-1.5 sm:mb-2">{service.composition}</p>
            )}
            <p className="text-xs sm:text-sm text-charcoal/80 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">{service.description}</p>

            {/* Duration Selection */}
            {service.durations.map((dur) => (
              <button
                key={dur}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  // Set service first, then duration to ensure proper selection
                  if (selectedService !== service.id) {
                    setSelectedService(service.id);
                  }
                  setSelectedDuration(dur);
                }}
                className={`w-full flex justify-between items-center p-2 sm:p-2.5 md:p-3 rounded-lg mb-1.5 sm:mb-2 transition-all ${
                  selectedService === service.id && selectedDuration === dur
                    ? 'bg-terracotta text-white'
                    : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium">{formatDuration(dur)}</span>
                <span className="font-bold text-xs sm:text-sm md:text-base">{formatPrice(service.prices[dur])}</span>
              </button>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

function StepSchedule({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  selectedTherapist,
  setSelectedTherapist,
  timeSlots,
  duration,
}: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  selectedTherapist: string;
  setSelectedTherapist: (therapist: string) => void;
  timeSlots: string[];
  duration: number;
}) {
  const today = new Date();
  const dates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  const therapists = [
    { id: '1', nama: 'Dewi', gender: 'WANITA', seksi: 'WANITA' },
    { id: '2', nama: 'Made', gender: 'PRIA', seksi: 'PRIA' },
    { id: '3', nama: 'Putu', gender: 'PRIA', seksi: 'KEDUANYA' },
    { id: '4', nama: 'Kadek', gender: 'PRIA', seksi: 'KEDUANYA' },
  ];

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
      {/* Date Selection */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-terracotta" />
          Pilih Tanggal
        </h3>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dates.map((date) => {
            const dateStr = date.toISOString().split('T')[0];
            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`p-1.5 sm:p-2 md:p-2.5 text-center rounded-lg transition-all ${
                  selectedDate === dateStr
                    ? 'bg-terracotta text-white shadow-md'
                    : 'bg-warm-beige hover:bg-terracotta/10'
                }`}
              >
                <div className="text-[9px] sm:text-[10px] md:text-xs opacity-70 uppercase tracking-wide">
                  {date.toLocaleDateString('id-ID', { weekday: 'short' })}
                </div>
                <div className="text-xs sm:text-sm md:text-lg font-bold mt-0.5">{date.getDate()}</div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Time Selection */}
      <Card className="p-4 sm:p-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4 flex items-center gap-2">
          <Clock size={20} className="text-terracotta" />
          <span className="text-sm sm:text-base">Pilih Waktu ({formatDuration(duration)})</span>
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 sm:gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              disabled={!selectedDate}
              className={`p-2 sm:p-2.5 md:p-3 rounded-lg text-center font-medium text-xs sm:text-base transition-all ${
                selectedTime === time
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-warm-beige hover:bg-terracotta/10'
              } ${!selectedDate ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {time}
            </button>
          ))}
        </div>
      </Card>

      {/* Therapist Selection */}
      <Card className="p-4 sm:p-6 md:col-span-2">
        <h3 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4 flex items-center gap-2">
          <User size={20} className="text-terracotta" />
          Preferensi Terapis
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setSelectedTherapist('')}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all ${
              selectedTherapist === ''
                ? 'bg-terracotta text-white shadow-md'
                : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
            }`}
          >
            Tidak Ada Preferensi
          </button>
          {therapists.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTherapist(t.id)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs sm:text-sm md:text-base transition-all ${
                selectedTherapist === t.id
                  ? 'bg-terracotta text-white shadow-md'
                  : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
              }`}
            >
              {t.nama}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StepDetails({
  formData,
  setFormData,
}: {
  formData: { nama: string; whatsapp: string; catatan: string };
  setFormData: (data: { nama: string; whatsapp: string; catatan: string }) => void;
}) {
  return (
    <div className="max-w-xl mx-auto">
      <Card className="p-4 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-deep-brown mb-4 sm:mb-6">Data Diri</h3>

        <div className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-sm sm:text-base font-medium text-charcoal mb-2">Nama Lengkap *</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-charcoal mb-2">
              Nomor WhatsApp *
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
              placeholder="08xxxxxxxxxx"
            />
            <p className="text-xs sm:text-sm text-charcoal/60 mt-1.5">
              Kami akan mengirimkan konfirmasi booking ke nomor ini
            </p>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-charcoal mb-2">
              Catatan Tambahan (Opsional)
            </label>
            <textarea
              value={formData.catatan}
              onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
              rows={3}
              className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white resize-none text-sm sm:text-base"
              placeholder="Ceritakan kebutuhan khusus atau preferensi lain..."
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

function StepSummary({
  service,
  duration,
  date,
  time,
  formData,
}: {
  service: typeof services[keyof typeof services][number];
  duration: number;
  date: string;
  time: string;
  formData: { nama: string; whatsapp: string; catatan: string };
}) {
  const price = service.prices[duration] || 0;

  return (
    <div className="max-w-xl mx-auto">
      <Card className="p-4 sm:p-6">
        <h3 className="font-display text-xl sm:text-2xl font-bold text-deep-brown mb-4 sm:mb-6">Ringkasan Booking</h3>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">Layanan</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base text-right">{service.name}</span>
          </div>

          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">Durasi</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base">{formatDuration(duration)}</span>
          </div>

          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">Tanggal</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base text-right">
              {date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
            </span>
          </div>

          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">Jam</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base">{time}</span>
          </div>

          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">Nama</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base text-right">{formData.nama}</span>
          </div>

          <div className="flex justify-between pb-3 sm:pb-4 border-b border-terracotta/20">
            <span className="text-charcoal/80 text-sm sm:text-base">WhatsApp</span>
            <span className="font-medium text-deep-brown text-sm sm:text-base text-right">{formData.whatsapp}</span>
          </div>

          {formData.catatan && (
            <div className="pb-3 sm:pb-4 border-b border-terracotta/20">
              <span className="text-charcoal/80 block mb-2 text-sm sm:text-base">Catatan</span>
              <p className="text-deep-brown text-sm sm:text-base">{formData.catatan}</p>
            </div>
          )}

          <div className="flex justify-between pt-3 sm:pt-4">
            <span className="text-base sm:text-lg font-bold text-deep-brown">Total</span>
            <span className="text-xl sm:text-2xl font-bold text-terracotta">{formatPrice(price)}</span>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-terracotta/10 rounded-lg">
          <p className="text-xs sm:text-sm text-charcoal/80 text-center">
            🌿 Klik "Konfirmasi Booking" untuk menyimpan. Setelah konfirmasi,
            kamu akan diarahkan ke Formulir Intake.
          </p>
        </div>
      </Card>
    </div>
  );
}
