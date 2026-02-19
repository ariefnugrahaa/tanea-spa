'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, User as UserIcon, Calendar as CalendarIcon, Phone } from 'lucide-react';
import Link from 'next/link';

interface Therapist {
  id: string;
  nama: string;
  gender: 'WANITA' | 'PRIA';
  seksi: 'WANITA' | 'PRIA' | 'KEDUANYA';
}

interface Booking {
  id: string;
  jamMulai: string;
  jamSelesai: string;
  status: string;
  layanan: { nama: string; durasi: number };
  klien: { nama: string; whatsapp?: string };
}

export default function JadwalPage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [bookings, setBookings] = useState<Record<string, Booking[]>>({});
  const [loading, setLoading] = useState(true);
  const [showWalkInModal, setShowWalkInModal] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00',
  ];

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch therapists
      const karyawanRes = await fetch('/api/karyawan');
      const { karyawan } = await karyawanRes.json();
      setTherapists(karyawan);

      // Fetch bookings for selected date
      const bookingsRes = await fetch(`/api/bookings?date=${selectedDate}`);
      const { bookings } = await bookingsRes.json();

      // Group bookings by therapist
      const bookingsByTherapist: Record<string, Booking[]> = {};
      bookings.forEach((b: Booking) => {
        if (b.karyawanId) {
          if (!bookingsByTherapist[b.karyawanId]) {
            bookingsByTherapist[b.karyawanId] = [];
          }
          bookingsByTherapist[b.karyawanId].push(b);
        }
      });
      setBookings(bookingsByTherapist);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBookingAtSlot = (therapistId: string, time: string) => {
    const therapistBookings = bookings[therapistId] || [];
    const [hour, minute] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hour, minute, 0, 0);

    return therapistBookings.find((booking) => {
      const startTime = new Date(booking.jamMulai);
      const endTime = new Date(booking.jamSelesai);
      return slotTime >= startTime && slotTime < endTime;
    });
  };

  const getSlotClass = (booking?: Booking) => {
    if (!booking) return 'bg-cream hover:bg-warm-beige';
    switch (booking.status) {
      case 'CONFIRMED':
        return 'bg-terracotta text-white';
      case 'IN_PROGRESS':
        return 'bg-blue-500 text-white';
      case 'SELESAI':
        return 'bg-green-500 text-white';
      default:
        return 'bg-yellow-400 text-charcoal';
    }
  };

  const therapistsByGender = {
    WANITA: therapists.filter((t) => t.seksi === 'WANITA' || t.seksi === 'KEDUANYA'),
    PRIA: therapists.filter((t) => t.seksi === 'PRIA' || t.seksi === 'KEDUANYA'),
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-deep-brown">
            Jadwal
          </h1>
          <p className="text-charcoal/60">Kelola jadwal terapis dan booking</p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg border border-terracotta/20 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-warm-white"
          />

          <div className="flex gap-2">
            <Button size="md" onClick={() => setShowWalkInModal(true)}>
              <Plus size={20} className="mr-2" />
              Walk-in
            </Button>
            <Link href="/booking">
              <Button size="md" variant="outline">
                Booking Baru
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Women Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-terracotta/20">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span className="text-lg">👩</span>
            </div>
            <h2 className="font-display text-xl font-bold text-deep-brown">Wanita</h2>
          </div>

          <div className="space-y-4">
            {therapistsByGender.WANITA.map((therapist) => (
              <div key={therapist.id} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
                  <UserIcon size={16} />
                  {therapist.nama}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
                  {timeSlots.map((time) => {
                    const booking = getBookingAtSlot(therapist.id, time);
                    return (
                      <div
                        key={time}
                        className={`text-xs p-2 rounded text-center font-medium transition-all cursor-pointer ${getSlotClass(
                          booking
                        )}`}
                        title={booking ? `${booking.klien.nama} - ${booking.layanan.nama}` : 'Tersedia'}
                      >
                        {booking ? (
                          <span className="truncate">{booking.klien.nama}</span>
                        ) : (
                          time
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Men Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-terracotta/20">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-lg">👨</span>
            </div>
            <h2 className="font-display text-xl font-bold text-deep-brown">Pria</h2>
          </div>

          <div className="space-y-4">
            {therapistsByGender.PRIA.map((therapist) => (
              <div key={therapist.id} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-charcoal">
                  <UserIcon size={16} />
                  {therapist.nama}
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
                  {timeSlots.map((time) => {
                    const booking = getBookingAtSlot(therapist.id, time);
                    return (
                      <div
                        key={time}
                        className={`text-xs p-2 rounded text-center font-medium transition-all cursor-pointer ${getSlotClass(
                          booking
                        )}`}
                        title={booking ? `${booking.klien.nama} - ${booking.layanan.nama}` : 'Tersedia'}
                      >
                        {booking ? (
                          <span className="truncate">{booking.klien.nama}</span>
                        ) : (
                          time
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <div className="flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-cream border border-terracotta/20" />
            <span>Tersedia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-terracotta" />
            <span>Terisi</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-400" />
            <span>Pending Intake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span>Sedang Berlangsung</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span>Selesai</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
