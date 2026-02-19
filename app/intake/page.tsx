'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PetaTubuh } from '@/components/intake/PetaTubuh';
import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function IntakePage() {
  const searchParams = useSearchParams();
  const bookingIdFromUrl = searchParams.get('booking');

  const [gender, setGender] = useState<'wanita' | 'pria' | null>(null);
  const [bodyMap, setBodyMap] = useState({
    front: {} as Record<string, null | 'hindari' | 'fokus'>,
    back: {} as Record<string, null | 'hindari' | 'fokus'>,
  });
  const [formData, setFormData] = useState({
    nama: '',
    usia: '',
    whatsapp: '',
    kondisiKesehatan: [] as string[],
    alergi: '',
    obat: '',
    tekananPijatan: 'sedang',
    prefTerapis: 'tidak-ada',
    aromaTerapi: 'lavender',
    suhuRuangan: 'hangat',
    musik: 'musik-lembut',
    catatanKlien: '',
  });
  const [agreements, setAgreements] = useState({
    informasiBenar: false,
    syaratKetentuan: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [submitError, setSubmitError] = useState<string>('');

  const kondisiList = [
    { id: 'tekanan_darah_tinggi', label: 'Tekanan darah tinggi / Hipertensi' },
    { id: 'diabetes', label: 'Diabetes' },
    { id: 'kondisi_kulit', label: 'Kondisi kulit (eksim, psoriasis, luka terbuka)' },
    { id: 'hamil', label: 'Sedang hamil' },
    { id: 'pasca_operasi', label: 'Pasca operasi dalam 6 bulan terakhir' },
    { id: 'gangguan_jantung', label: 'Gangguan jantung' },
    { id: 'varises', label: 'Varises' },
    { id: 'osteoporosis', label: 'Osteoporosis / Masalah tulang' },
  ];

  const handleKondisiChange = (id: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        kondisiKesehatan: [...formData.kondisiKesehatan, id],
      });
    } else {
      setFormData({
        ...formData,
        kondisiKesehatan: formData.kondisiKesehatan.filter((k) => k !== id),
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!gender) newErrors.gender = 'Pilih jenis kelamin';
    if (!formData.nama) newErrors.nama = 'Nama wajib diisi';
    if (!formData.usia) newErrors.usia = 'Usia wajib diisi';
    if (!formData.whatsapp) newErrors.whatsapp = 'WhatsApp wajib diisi';
    if (!agreements.informasiBenar) newErrors.informasiBenar = 'Wajib dicentang';
    if (!agreements.syaratKetentuan) newErrors.syaratKetentuan = 'Wajib dicentang';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!bookingIdFromUrl) {
      setSubmitError('ID Booking tidak ditemukan. Silakan mulai booking dari awal.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setSubmitError('');

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: bookingIdFromUrl,
          usia: parseInt(formData.usia),
          gender: gender.toUpperCase() as 'WANITA' | 'PRIA',
          kondisiKesehatan: formData.kondisiKesehatan,
          petaTubuh: bodyMap,
          tekananPijatan: formData.tekananPijatan,
          prefTerapis: formData.prefTerapis,
          aromaTerapi: formData.aromaTerapi,
          suhuRuangan: formData.suhuRuangan,
          musik: formData.musik,
          catatanKlien: formData.catatanKlien,
          alergi: formData.alergi,
          obat: formData.obat,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal mengirim formulir');
      }

      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setSubmitError(err.message || 'Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const getZoneColor = (state: string) => {
    if (state === 'hindari') return 'bg-red-100 border-red-300 text-red-800';
    if (state === 'fokus') return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-cream border-terracotta/20';
  };

  const zoneLabels: Record<string, string> = {
    kepala: 'Kepala',
    wajah: 'Wajah',
    leher: 'Leher',
    bahu_kiri: 'Bahu Kiri',
    bahu_kanan: 'Bahu Kanan',
    lengan_atas_kiri: 'Lengan Atas Kiri',
    lengan_atas_kanan: 'Lengan Atas Kanan',
    lengan_bawah_kiri: 'Lengan Bawah Kiri',
    lengan_bawah_kanan: 'Lengan Bawah Kanan',
    tangan_kiri: 'Tangan Kiri',
    tangan_kanan: 'Tangan Kanan',
    dada: 'Dada',
    perut: 'Perut',
    paha_depan_kiri: 'Paha Depan Kiri',
    paha_depan_kanan: 'Paha Depan Kanan',
    lutut_kiri: 'Lutut Kiri',
    lutut_kanan: 'Lutut Kanan',
    betis_kiri: 'Betis Kiri',
    betis_kanan: 'Betis Kanan',
    kaki_kiri: 'Kaki Kiri',
    kaki_kanan: 'Kaki Kanan',
    kepala_belakang: 'Kepala Belakang',
    leher_belakang: 'Leher Belakang',
    bahu_belakang_kiri: 'Bahu Belakang Kiri',
    bahu_belakang_kanan: 'Bahu Belakang Kanan',
    punggung_atas: 'Punggung Atas',
    punggung_tengah: 'Punggung Tengah',
    punggung_bawah: 'Punggung Bawah',
    pinggul_kiri: 'Pinggul Kiri',
    pinggul_kanan: 'Pinggul Kanan',
    paha_belakang_kiri: 'Paha Belakang Kiri',
    paha_belakang_kanan: 'Paha Belakang Kanan',
    betis_belakang_kiri: 'Betis Belakang Kiri',
    betis_belakang_kanan: 'Betis Belakang Kanan',
  };

  const focusAreas = [
    ...Object.entries(bodyMap.front || {})
      .filter(([_, state]) => state === 'fokus')
      .map(([zone]) => zone),
    ...Object.entries(bodyMap.back || {})
      .filter(([_, state]) => state === 'fokus')
      .map(([zone]) => zone),
  ];

  const avoidAreas = [
    ...Object.entries(bodyMap.front || {})
      .filter(([_, state]) => state === 'hindari')
      .map(([zone]) => zone),
    ...Object.entries(bodyMap.back || {})
      .filter(([_, state]) => state === 'hindari')
      .map(([zone]) => zone),
  ];

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-6">
        <div className="text-center max-w-md w-full">
          <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 sm:w-12 sm:h-12 text-green-600" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold text-deep-brown mb-3 sm:mb-4">
            Formulir Berhasil Dikirim!
          </h1>

          <p className="text-charcoal/80 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">
            Terima kasih telah mengisi formulir intake. Kami akan menyiapkan perawatan terbaik
            sesuai dengan preferensi dan kebutuhanmu. Sampai jumpa di Tanea Spa!
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <Link href="/konfirmasi" className="inline-flex items-center justify-center px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-light transition-colors">
              Kembali ke Beranda
            </Link>
          </div>

          <div className="mt-8 sm:mt-12 text-4xl sm:text-5xl opacity-20">🌿</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-terracotta text-cream py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft size={18} />
            <span>Kembali</span>
          </Link>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">Formulir Intake</h1>
          <p className="text-cream/80 mt-1 sm:mt-2 text-sm sm:text-base">
            {bookingIdFromUrl ? (
              <>Lengkapi data kesehatan dan preferensi perawatanmu untuk booking ini.</>
            ) : (
              <>Mulai dari halaman booking untuk membuat reservasi baru.</>
            )}
          </p>
        </div>
      </div>

      {status === 'idle' && (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-3xl">
          {!bookingIdFromUrl && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              <p className="text-xs sm:text-sm">
                ⚠️ Tidak ada ID Booking yang tersedia. Silakan{' '}
                <Link href="/booking" className="underline font-medium hover:underline">
                  mulai booking baru
                </Link>
              </p>
            </div>
          )}

          {/* Personal Info */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4">Data Pribadi</h2>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Nama Lengkap *</label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
                  placeholder="Nama lengkap"
                />
                {errors.nama && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.nama}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Usia *</label>
                  <input
                    type="number"
                    value={formData.usia}
                    onChange={(e) => setFormData({ ...formData, usia: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
                    placeholder="Usia"
                    min="1"
                    max="100"
                  />
                  {errors.usia && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.usia}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Jenis Kelamin *</label>
                  <div className="flex gap-2 sm:gap-4">
                    <button
                      onClick={() => setGender('wanita')}
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                        gender === 'wanita'
                          ? 'border-terracotta bg-terracotta/10 text-terracotta'
                          : 'border-terracotta/20 text-charcoal hover:border-terracotta'
                      }`}
                    >
                      Wanita
                    </button>
                    <button
                      onClick={() => setGender('pria')}
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 transition-all text-sm sm:text-base ${
                        gender === 'pria'
                          ? 'border-terracotta bg-terracotta/10 text-terracotta'
                          : 'border-terracotta/20 text-charcoal hover:border-terracotta'
                      }`}
                    >
                      Pria
                    </button>
                  </div>
                  {errors.gender && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.gender}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
                  placeholder="08xxxxxxxxxx"
                />
                {errors.whatsapp && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.whatsapp}</p>}
              </div>
            </div>
          </Card>

          {/* Health History */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4">Riwayat Kesehatan</h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {kondisiList.map((kondisi) => (
                  <label key={kondisi.id} className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.kondisiKesehatan.includes(kondisi.id)}
                      onChange={(e) => handleKondisiChange(kondisi.id, e.target.checked)}
                      className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-terracotta/20 text-terracotta focus:ring-terracotta flex-shrink-0"
                    />
                    <span className="text-charcoal text-xs sm:text-sm">{kondisi.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Alergi (sebutkan jika ada)
                </label>
                <input
                  type="text"
                  value={formData.alergi}
                  onChange={(e) => setFormData({ ...formData, alergi: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
                  placeholder="Misal: alergi kacang, parfum, dll."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Sedang mengonsumsi obat-obatan (sebutkan jika ada)
                </label>
                <input
                  type="text"
                  value={formData.obat}
                  onChange={(e) => setFormData({ ...formData, obat: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white text-sm sm:text-base"
                  placeholder="Nama obat yang sedang dikonsumsi"
                />
              </div>

              {(formData.kondisiKesehatan.length > 0 || formData.alergi || formData.obat) && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mt-2 sm:mt-4">
                  <p className="text-xs sm:text-sm text-red-800 font-medium">
                    ⚠️ Informasi kesehatan ini akan diteruskan kepada terapis untuk memastikan
                    keamanan perawatanmu.
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Body Map */}
          {gender && (
            <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
              <h2 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-2">
                Peta Tubuh
              </h2>
              <p className="text-charcoal/70 text-xs sm:text-sm mb-4">
                Klik area tubuh untuk menandai area yang perlu fokus atau dihindari.
                Klik berulang untuk mengganti status.
              </p>
              <PetaTubuh
                gender={gender}
                onChange={(front, back) => setBodyMap({ front, back })}
              />

              {/* Summary */}
              {(focusAreas.length > 0 || avoidAreas.length > 0) && (
                <div className="bg-cream rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 space-y-2">
                  {focusAreas.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-base sm:text-lg">🟡</span>
                      <div>
                        <span className="font-medium text-deep-brown text-sm sm:text-base">Area Fokus:</span>
                        <span className="text-charcoal ml-2 text-xs sm:text-sm">
                          {focusAreas.map((z) => zoneLabels[z]).join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                  {avoidAreas.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-base sm:text-lg">🔴</span>
                      <div>
                        <span className="font-medium text-deep-brown text-sm sm:text-base">Area Hindari:</span>
                        <span className="text-charcoal ml-2 text-xs sm:text-sm">
                          {avoidAreas.map((z) => zoneLabels[z]).join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* Preferences */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-deep-brown mb-3 sm:mb-4">Preferensi Perawatan</h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2 sm:mb-3">
                  Tekanan pijatan
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'ringan', label: 'Ringan' },
                    { id: 'sedang', label: 'Sedang' },
                    { id: 'kuat', label: 'Kuat' },
                    { id: 'sangat-kuat', label: 'Sangat Kuat' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, tekananPijatan: opt.id })}
                      className={`px-3 sm:px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
                        formData.tekananPijatan === opt.id
                          ? 'bg-terracotta text-white'
                          : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2 sm:mb-3">
                  Preferensi terapis
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'wanita', label: 'Terapis Wanita' },
                    { id: 'pria', label: 'Terapis Pria' },
                    { id: 'tidak-ada', label: 'Tidak ada preferensi' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, prefTerapis: opt.id })}
                      className={`px-3 sm:px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
                        formData.prefTerapis === opt.id
                          ? 'bg-terracotta text-white'
                          : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2 sm:mb-3">
                  Aroma terapi
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'lavender', label: 'Lavender' },
                    { id: 'eucalyptus', label: 'Eucalyptus' },
                    { id: 'mawar', label: 'Mawar' },
                    { id: 'citrus', label: 'Citrus' },
                    { id: 'tidak-perlu', label: 'Tidak perlu' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, aromaTerapi: opt.id })}
                      className={`px-3 sm:px-4 py-2 rounded-full transition-all text-sm sm:text-base ${
                        formData.aromaTerapi === opt.id
                          ? 'bg-terracotta text-white'
                          : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2 sm:mb-3">Suhu ruangan</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'sejuk', label: 'Sejuk' },
                    { id: 'hangat', label: 'Hangat' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, suhuRuangan: opt.id })}
                      className={`px-4 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base ${
                        formData.suhuRuangan === opt.id
                          ? 'bg-terracotta text-white'
                          : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2 sm:mb-3">Musik latar</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'musik-lembut', label: 'Musik lembut' },
                    { id: 'suara-alam', label: 'Suara alam' },
                    { id: 'hening', label: 'Hening' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, musik: opt.id })}
                      className={`px-4 sm:px-6 py-2 rounded-full transition-all text-sm sm:text-base ${
                        formData.musik === opt.id
                          ? 'bg-terracotta text-white'
                          : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Keluhan / Fokus khusus hari ini
                </label>
                <textarea
                  value={formData.catatanKlien}
                  onChange={(e) => setFormData({ ...formData, catatanKlien: e.target.value })}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white resize-none text-sm sm:text-base"
                  placeholder="Ceritakan keluhan atau area yang perlu perhatian ekstra..."
                />
              </div>
            </div>
          </Card>

          {/* Agreements */}
          <Card className="p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="space-y-3 sm:space-y-4">
              <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.informasiBenar}
                  onChange={(e) => setAgreements({ ...agreements, informasiBenar: e.target.checked })}
                  className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-terracotta/20 text-terracotta focus:ring-terracotta flex-shrink-0"
                />
                <span className="text-charcoal text-sm sm:text-base">
                  Saya menyatakan semua informasi di atas benar dan akurat.
                </span>
              </label>
              {errors.informasiBenar && <p className="text-red-500 text-xs sm:text-sm ml-6 sm:ml-8">{errors.informasiBenar}</p>}

              <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreements.syaratKetentuan}
                  onChange={(e) => setAgreements({ ...agreements, syaratKetentuan: e.target.checked })}
                  className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-terracotta/20 text-terracotta focus:ring-terracotta flex-shrink-0"
                />
                <span className="text-charcoal text-sm sm:text-base">
                  Saya menyetujui syarat & ketentuan layanan Tanea Spa.
                </span>
              </label>
              {errors.syaratKetentuan && <p className="text-red-500 text-xs sm:text-sm ml-6 sm:ml-8">{errors.syaratKetentuan}</p>}
            </div>
          </Card>

          {/* Error Message */}
          {submitError && (
            <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 mb-4 sm:mb-6 text-xs sm:text-sm">
              {submitError}
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            size="lg"
            className="w-full sm:w-auto"
            disabled={
              !agreements.informasiBenar ||
              !agreements.syaratKetentuan ||
              status === 'submitting' ||
              !bookingIdFromUrl
            }
          >
            {status === 'submitting' ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Check size={18} className="mr-2" />
                Kirim Formulir Intake 🌿
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
