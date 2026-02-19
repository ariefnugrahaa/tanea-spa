'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heart, Plus, Edit, Trash2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface Layanan {
  id: string;
  nama: string;
  kategori: 'MASSAGE' | 'REFLEXOLOGY' | 'SPA_PACKAGES' | 'SPA_RITUALS';
  deskripsi?: string;
  komposisi?: string;
  durasi: number;
  harga: number;
  aktif: boolean;
  badge?: string;
}

const kategoriLabels: Record<Layanan['kategori'], string> = {
  MASSAGE: 'Massage',
  REFLEXOLOGY: 'Reflexology',
  SPA_PACKAGES: 'Spa Packages',
  SPA_RITUALS: 'Spa Rituals',
};

const kategoriColors: Record<Layanan['kategori'], string> = {
  MASSAGE: 'bg-orange-100 text-orange-800 border-orange-300',
  REFLEXOLOGY: 'bg-blue-100 text-blue-800 border-blue-300',
  SPA_PACKAGES: 'bg-purple-100 text-purple-800 border-purple-300',
  SPA_RITUALS: 'bg-pink-100 text-pink-800 border-pink-300',
};

export default function LayananPage() {
  const [layanan, setLayanan] = useState<Layanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLayanan();
  }, []);

  const fetchLayanan = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/layanan');
      const { layanan: data } = await res.json();
      setLayanan(data);
    } catch (error) {
      console.error('Error fetching layanan:', error);
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
            Layanan & Harga
          </h1>
          <p className="text-charcoal/60">Kelola menu layanan dan harga</p>
        </div>

        <Button>
          <Plus size={20} className="mr-2" />
          Tambah Layanan
        </Button>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(kategoriLabels).map(([key, label]) => {
          const count = layanan.filter((l) => l.kategori === key).length;
          return (
            <Card key={key} className="p-4 text-center">
              <Heart className={`w-8 h-8 mx-auto mb-2 ${kategoriColors[key as Layanan['kategori']].split(' ')[1]}`} />
              <p className="text-2xl font-bold text-deep-brown">{count}</p>
              <p className="text-sm text-charcoal/60">{label}</p>
            </Card>
          );
        })}
      </div>

      {/* Service List */}
      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-warm-beige">
            <tr>
              <th className="text-left p-4 font-medium text-deep-brown">Nama Layanan</th>
              <th className="text-left p-4 font-medium text-deep-brown">Kategori</th>
              <th className="text-left p-4 font-medium text-deep-brown">Durasi</th>
              <th className="text-left p-4 font-medium text-deep-brown">Harga</th>
              <th className="text-center p-4 font-medium text-deep-brown">Status</th>
              <th className="text-center p-4 font-medium text-deep-brown">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {layanan.map((l) => (
              <tr key={l.id} className="border-t border-terracotta/10 hover:bg-warm-beige/30 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-deep-brown">{l.nama}</p>
                    {l.komposisi && (
                      <p className="text-sm text-charcoal/60">{l.komposisi}</p>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className={kategoriColors[l.kategori]}>
                    {kategoriLabels[l.kategori]}
                  </Badge>
                  {l.badge && (
                    <Badge variant="default" className="ml-2 bg-gold-accent text-deep-brown border-gold-accent">
                      {l.badge}
                    </Badge>
                  )}
                </td>
                <td className="p-4 text-charcoal">{l.durasi} menit</td>
                <td className="p-4 font-medium text-deep-brown">{formatPrice(l.harga)}</td>
                <td className="p-4 text-center">
                  {l.aktif ? (
                    <Badge variant="success">Aktif</Badge>
                  ) : (
                    <Badge variant="danger">Nonaktif</Badge>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 text-terracotta hover:bg-terracotta/10 rounded-lg transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
