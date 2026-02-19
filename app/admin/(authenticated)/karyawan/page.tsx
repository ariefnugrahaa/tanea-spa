'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { User, UserPlus, Calendar, Star, DollarSign } from 'lucide-react';

interface Karyawan {
  id: string;
  nama: string;
  gender: 'WANITA' | 'PRIA';
  seksi: 'WANITA' | 'PRIA' | 'KEDUANYA';
  spesialisasi: string[];
  foto?: string;
  aktif: boolean;
  _count: { bookings: number };
}

export default function KaryawanPage() {
  const [karyawan, setKaryawan] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const fetchKaryawan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/karyawan');
      const { karyawan: data } = await res.json();
      setKaryawan(data);
    } catch (error) {
      console.error('Error fetching karyawan:', error);
    } finally {
      setLoading(false);
    }
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
            Karyawan
          </h1>
          <p className="text-charcoal/60">Kelola data terapis dan jadwal kerja</p>
        </div>

        <Button>
          <UserPlus size={20} className="mr-2" />
          Tambah Karyawan
        </Button>
      </div>

      {/* Employee Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {karyawan.map((k) => (
          <Card key={k.id} className="p-6">
            {/* Profile Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-terracotta-dark flex items-center justify-center text-cream text-2xl font-display font-bold">
                {k.nama.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg text-deep-brown">{k.nama}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default">{k.gender === 'WANITA' ? 'Wanita' : 'Pria'}</Badge>
                  <Badge variant="success" className="bg-green-100 text-green-800 border-green-300">
                    Aktif
                  </Badge>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-warm-beige/50 rounded-lg">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-terracotta mb-1">
                  <Calendar size={16} />
                  <span className="font-bold">{k._count.bookings}</span>
                </div>
                <p className="text-xs text-charcoal/60">Sesi</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gold-accent mb-1">
                  <Star size={16} />
                  <span className="font-bold">4.9</span>
                </div>
                <p className="text-xs text-charcoal/60">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                  <DollarSign size={16} />
                  <span className="font-bold">2.5M</span>
                </div>
                <p className="text-xs text-charcoal/60">Pendapatan</p>
              </div>
            </div>

            {/* Specialization */}
            <div className="mb-4">
              <p className="text-sm font-medium text-charcoal/60 mb-2">Spesialisasi:</p>
              <div className="flex flex-wrap gap-2">
                {k.spesialisasi.map((s, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Schedule Summary */}
            <div className="p-3 bg-cream rounded-lg mb-4">
              <p className="text-sm font-medium text-charcoal mb-1">Jadwal Kerja:</p>
              <p className="text-sm text-charcoal/80">
                Senin - Minggu: 09:00 - 21:00
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Edit Profil
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Jadwal
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Empty State */}
      {karyawan.length === 0 && (
        <Card className="p-12 text-center">
          <User className="w-16 h-16 mx-auto text-terracotta/40 mb-4" />
          <p className="text-charcoal/60">Belum ada karyawan terdaftar</p>
        </Card>
      )}
    </div>
  );
}
