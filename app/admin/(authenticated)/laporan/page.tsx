'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { TrendingUp, DollarSign, Users, Calendar, Download, FileText } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface ReportData {
  today: { revenue: number; sessions: number; women: number; men: number };
  week: { revenue: number; sessions: number; women: number; men: number };
  month: { revenue: number; sessions: number; women: number; men: number };
  topServices: Array<{ nama: string; count: number; revenue: number }>;
  topTherapists: Array<{ nama: string; count: number; revenue: number }>;
}

export default function LaporanPage() {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReportData | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/laporan');
      const reportData = await res.json();
      setData(reportData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentPeriod = () => {
    if (period === 'today') return data?.today;
    if (period === 'week') return data?.week;
    return data?.month;
  };

  const currentData = getCurrentPeriod();

  if (loading || !data) {
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
            Laporan
          </h1>
          <p className="text-charcoal/60">Analisis performa bisnis</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white"
          >
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
          </select>

          <Button variant="outline">
            <Download size={20} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-terracotta/20 flex items-center justify-center">
              <DollarSign size={24} className="text-terracotta" />
            </div>
            <div>
              <p className="text-sm text-charcoal/60">Pendapatan</p>
              <p className="text-2xl font-bold text-deep-brown">
                {formatPrice(currentData?.revenue || 0)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal/60">Total Sesi</p>
              <p className="text-2xl font-bold text-deep-brown">{currentData?.sessions || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
              <Users size={24} className="text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal/60">Sesi Wanita</p>
              <p className="text-2xl font-bold text-deep-brown">{currentData?.women || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-charcoal/60">Sesi Pria</p>
              <p className="text-2xl font-bold text-deep-brown">{currentData?.men || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Top Services & Therapists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-bold text-deep-brown mb-4 flex items-center gap-2">
            <TrendingUp size={24} className="text-terracotta" />
            Top 5 Layanan
          </h3>
          <div className="space-y-3">
            {data.topServices.slice(0, 5).map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-warm-beige/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-gold-accent text-deep-brown' :
                    index === 1 ? 'bg-gray-300 text-deep-brown' :
                    index === 2 ? 'bg-orange-300 text-deep-brown' :
                    'bg-cream text-charcoal'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-deep-brown">{service.nama}</p>
                    <p className="text-sm text-charcoal/60">{service.count} sesi</p>
                  </div>
                </div>
                <p className="font-bold text-terracotta">{formatPrice(service.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Therapists */}
        <Card className="p-6">
          <h3 className="font-display text-xl font-bold text-deep-brown mb-4 flex items-center gap-2">
            <Users size={24} className="text-terracotta" />
            Top 5 Terapis
          </h3>
          <div className="space-y-3">
            {data.topTherapists.slice(0, 5).map((therapist, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-warm-beige/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0 ? 'bg-gold-accent text-deep-brown' :
                    index === 1 ? 'bg-gray-300 text-deep-brown' :
                    index === 2 ? 'bg-orange-300 text-deep-brown' :
                    'bg-cream text-charcoal'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-deep-brown">{therapist.nama}</p>
                    <p className="text-sm text-charcoal/60">{therapist.count} sesi</p>
                  </div>
                </div>
                <p className="font-bold text-terracotta">{formatPrice(therapist.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card className="p-6">
        <h3 className="font-display text-lg font-bold text-deep-brown mb-4">Export Laporan</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline">
            <FileText size={20} className="mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download size={20} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </Card>
    </div>
  );
}
