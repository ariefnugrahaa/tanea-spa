'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FileText, ChevronDown, ChevronUp, Printer, Check } from 'lucide-react';

interface IntakeItem {
  id: string;
  usia: number;
  gender: 'WANITA' | 'PRIA';
  kondisiKesehatan: string[];
  petaTubuh: { front: Record<string, any>; back: Record<string, any> };
  tekananPijatan: string;
  prefTerapis: string;
  aromaTerapi: string;
  suhuRuangan: string;
  musik: string;
  catatanKlien?: string;
  catatanTerapis?: string;
  flagMedis: boolean;
  submittedAt: string;
  booking: {
    id: string;
    tanggal: string;
    jamMulai: string;
    status: string;
    layanan: { nama: string; durasi: number };
    klien: { nama: string; whatsapp?: string };
    karyawan?: { nama: string };
  };
}

export default function IntakePage() {
  const [intakes, setIntakes] = useState<IntakeItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIntakes();
  }, []);

  const fetchIntakes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/intake');
      const { intakes: data } = await res.json();
      setIntakes(data);
    } catch (error) {
      console.error('Error fetching intakes:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const markAsCompleted = async (intakeId: string) => {
    try {
      // In real app, this would call an API to update intake status
      await fetch(`/api/intake/${intakeId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'SELESAI' }),
      });
      fetchIntakes();
    } catch (error) {
      console.error('Error marking as completed:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getZoneColor = (state: string) => {
    if (state === 'hindari') return 'bg-red-100 border-red-300 text-red-800';
    if (state === 'fokus') return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-cream border-terracotta/20';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-terracotta border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-deep-brown">
            Formulir Intake
          </h1>
          <p className="text-charcoal/60">Daftar formulir intake yang telah dikirim</p>
        </div>
      </div>

      {/* Intake List */}
      <div className="space-y-4">
        {intakes.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 mx-auto text-terracotta/40 mb-4" />
            <p className="text-charcoal/60">Belum ada formulir intake yang dikirim</p>
          </Card>
        ) : (
          intakes.map((intake) => {
            const isExpanded = expandedId === intake.id;
            const focusAreas = [
              ...Object.entries(intake.petaTubuh.front || {})
                .filter(([_, state]) => state === 'fokus')
                .map(([zone]) => zone),
              ...Object.entries(intake.petaTubuh.back || {})
                .filter(([_, state]) => state === 'fokus')
                .map(([zone]) => zone),
            ];
            const avoidAreas = [
              ...Object.entries(intake.petaTubuh.front || {})
                .filter(([_, state]) => state === 'hindari')
                .map(([zone]) => zone),
              ...Object.entries(intake.petaTubuh.back || {})
                .filter(([_, state]) => state === 'hindari')
                .map(([zone]) => zone),
            ];

            return (
              <Card key={intake.id} className="overflow-hidden">
                {/* Summary Header */}
                <div
                  className={`p-6 cursor-pointer transition-colors ${
                    isExpanded ? 'bg-warm-beige' : 'hover:bg-warm-beige/50'
                  }`}
                  onClick={() => toggleExpand(intake.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display font-bold text-lg text-deep-brown">
                          {intake.booking.klien.nama}
                        </h3>
                        {intake.flagMedis && (
                          <Badge variant="danger">⚠️ Kondisi Medis</Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-charcoal/80">
                        <span>
                          📅 {formatDate(intake.booking.tanggal)} • 🕐 {formatTime(intake.booking.jamMulai)}
                        </span>
                        <span>💆 {intake.booking.layanan.nama}</span>
                        {intake.booking.karyawan && (
                          <span>👤 {intake.booking.karyawan.nama}</span>
                        )}
                      </div>

                      {/* Quick Summary */}
                      {(focusAreas.length > 0 || avoidAreas.length > 0) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {focusAreas.length > 0 && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              🟡 Fokus: {focusAreas.length} area
                            </span>
                          )}
                          {avoidAreas.length > 0 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              🔴 Hindari: {avoidAreas.length} area
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.print();
                        }}
                      >
                        <Printer size={16} />
                      </Button>
                      {isExpanded ? (
                        <ChevronUp size={24} className="text-terracotta" />
                      ) : (
                        <ChevronDown size={24} className="text-terracotta" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 border-t border-terracotta/10">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Personal Info */}
                      <div>
                        <h4 className="font-bold text-deep-brown mb-3">Data Diri</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Usia:</dt>
                            <dd className="font-medium">{intake.usia} tahun</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Jenis Kelamin:</dt>
                            <dd className="font-medium">{intake.gender === 'WANITA' ? 'Wanita' : 'Pria'}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Tekanan Pijatan:</dt>
                            <dd className="font-medium">{intake.tekananPijatan}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Preferensi Terapis:</dt>
                            <dd className="font-medium">{intake.prefTerapis}</dd>
                          </div>
                        </dl>
                      </div>

                      {/* Preferences */}
                      <div>
                        <h4 className="font-bold text-deep-brown mb-3">Preferensi Perawatan</h4>
                        <dl className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Aroma Terapi:</dt>
                            <dd className="font-medium">{intake.aromaTerapi}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Suhu Ruangan:</dt>
                            <dd className="font-medium">{intake.suhuRuangan}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-charcoal/60">Musik:</dt>
                            <dd className="font-medium">{intake.musik}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    {/* Health Conditions */}
                    {intake.kondisiKesehatan.length > 0 && (
                      <div className="mt-6 p-4 bg-red-50 rounded-lg">
                        <h4 className="font-bold text-red-900 mb-2">
                          ⚠️ Kondisi Kesehatan
                        </h4>
                        <ul className="list-disc list-inside text-sm text-red-800">
                          {intake.kondisiKesehatan.map((k, i) => (
                            <li key={i}>{k}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Client Notes */}
                    {intake.catatanKlien && (
                      <div className="mt-6 p-4 bg-cream rounded-lg">
                        <h4 className="font-bold text-deep-brown mb-2">
                          Catatan Klien:
                        </h4>
                        <p className="text-sm text-charcoal">{intake.catatanKlien}</p>
                      </div>
                    )}

                    {/* Therapist Notes */}
                    <div className="mt-6 p-4 bg-warm-beige rounded-lg">
                      <h4 className="font-bold text-deep-brown mb-2">
                        Catatan Terapis:
                      </h4>
                      <textarea
                        defaultValue={intake.catatanTerapis || ''}
                        placeholder="Tambahkan catatan terapis..."
                        rows={3}
                        className="w-full px-3 py-2 rounded border border-terracotta/20 bg-white text-sm resize-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end">
                      <Button
                        size="md"
                        onClick={() => markAsCompleted(intake.id)}
                      >
                        <Check size={20} className="mr-2" />
                        Tandai Selesai
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
