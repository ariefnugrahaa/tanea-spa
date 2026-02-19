export default function KonfirmasiPage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="font-display text-3xl font-bold text-deep-brown mb-4">
          Booking Berhasil!
        </h1>
        <p className="text-charcoal/80 mb-8 leading-relaxed">
          Terima kasih telah memilih Tanea Spa. Konfirmasi booking telah dikirim ke WhatsApp
          kamu. Sampai jumpa dan selamat beristirahat! 🌿
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-light transition-colors"
          >
            Kembali ke Beranda
          </a>
          <a
            href="/booking"
            className="inline-flex items-center justify-center px-6 py-3 bg-warm-beige text-charcoal rounded-full font-medium hover:bg-terracotta/10 transition-colors"
          >
            Booking Lagi
          </a>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 text-5xl opacity-20">🌿</div>
      </div>
    </div>
  );
}
