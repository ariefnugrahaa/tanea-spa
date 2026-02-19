'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Search, Users } from 'lucide-react';

interface Klien {
  id: string;
  nama: string;
  whatsapp?: string;
  gender?: 'WANITA' | 'PRIA';
  lahir?: string;
  catatanAdmin?: string;
  createdAt: string;
  _count: { bookings: number };
}

export default function PelangganPage() {
  const [pelanggan, setPelanggan] = useState<Klien[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPelanggan();
  }, []);

  const fetchPelanggan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/pelanggan');
      const { pelanggan: data } = await res.json();
      setPelanggan(data);
    } catch (error) {
      console.error('Error fetching pelanggan:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLoyaltyTier = (bookingCount: number) => {
    if (bookingCount >= 20) return { tier: 'Platinum', color: 'bg-purple-100 text-purple-800', icon: '💎' };
    if (bookingCount >= 10) return { tier: 'Gold', color: 'bg-yellow-100 text-yellow-800', icon: '🥇' };
    if (bookingCount >= 5) return { tier: 'Silver', color: 'bg-gray-200 text-gray-800', icon: '🥈' };
    return { tier: 'Bronze', color: 'bg-orange-100 text-orange-800', icon: '🥉' };
  };

  const filteredPelanggan = pelanggan.filter((p) =>
    p.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.whatsapp?.includes(searchQuery)
  );

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-deep-brown">
            Pelanggan
          </h1>
          <p className="text-charcoal/60">Kelola data pelanggan dan riwayat kunjungan</p>
        </div>

        {/* Stats */}
        <Card className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center">
            <Users size={24} className="text-terracotta" />
          </div>
          <div>
            <p className="text-sm text-charcoal/60">Total Pelanggan</p>
            <p className="text-2xl font-bold text-deep-brown">{pelanggan.length}</p>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40" size={20} />
        <input
          type="text"
          placeholder="Cari nama atau WhatsApp..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white"
        />
      </div>

      {/* Customer List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPelanggan.map((klien) => {
          const loyalty = getLoyaltyTier(klien._count.bookings);
          return (
            <Card key={klien.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-deep-brown mb-1">
                    {klien.nama}
                  </h3>
                  {klien.gender && (
                    <Badge variant="default" className="text-xs">
                      {klien.gender === 'WANITA' ? 'Wanita' : 'Pria'}
                    </Badge>
                  )}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${loyalty.color}`}>
                  {loyalty.icon} {loyalty.tier}
                </div>
              </div>

              {/* Info */}
              <div className="space-y-2 text-sm">
                {klien.whatsapp && (
                  <div className="flex items-center gap-2 text-charcoal/80">
                    <span className="text-lg">📱</span>
                    <span>{klien.whatsapp}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-charcoal/80">
                  <span className="text-lg">📅</span>
                  <span>
                    Member sejak{' '}
                    {new Date(klien.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-charcoal/80">
                  <span className="text-lg">💆</span>
                  <span>{klien._count.bookings} kali kunjungan</span>
                </div>
              </div>

              {/* Admin Notes */}
              {klien.catatanAdmin && (
                <div className="mt-4 p-3 bg-cream rounded-lg text-sm">
                  <p className="text-charcoal/60">{klien.catatanAdmin}</p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://wa.me/62${klien.whatsapp?.substring(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
                <button className="flex-1 px-4 py-2 bg-terracotta/10 text-terracotta rounded-lg text-sm font-medium hover:bg-terracotta/20 transition-colors">
                  Lihat Riwayat
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredPelanggan.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-terracotta/40 mb-4" />
          <p className="text-charcoal/60">
            {searchQuery ? 'Tidak ada pelanggan yang cocok dengan pencarian' : 'Belum ada pelanggan'}
          </p>
        </Card>
      )}
    </div>
  );
}
