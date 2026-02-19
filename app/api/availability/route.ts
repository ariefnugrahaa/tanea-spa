import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/availability
 * Query params:
 * - date: YYYY-MM-DD (required)
 * - layananId: string (optional, to check compatible therapists)
 * - gender: 'WANITA' | 'PRIA' | null (optional, to filter therapists by client preference)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json(
        { error: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Parse the date
    const date = new Date(dateParam);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Set time boundaries for the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Get all active therapists
    const karyawan = await prisma.karyawan.findMany({
      where: { aktif: true },
      select: {
        id: true,
        nama: true,
        gender: true,
        seksi: true,
        spesialisasi: true,
        jadwalKerja: true,
      },
    });

    // Get all bookings for this date (excluding cancelled)
    const bookings = await prisma.booking.findMany({
      where: {
        tanggal: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          notIn: ['DIBATALKAN'],
        },
      },
      include: {
        layanan: {
          select: {
            nama: true,
            durasi: true,
          },
        },
        klien: {
          select: {
            nama: true,
          },
        },
      },
    });

    // Define available time slots (every 30 minutes from 09:00 to 21:00)
    const timeSlots: string[] = [];
    for (let hour = 9; hour < 21; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
      timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    timeSlots.push('21:00'); // Last slot

    // Calculate availability for each therapist
    const availability = karyawan.map((k) => {
      // Get therapist's schedule for the day of week
      const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
      const dayName = dayNames[date.getDay()];
      const schedule = (k.jadwalKerja as Record<string, { mulai: string; selesai: string }> | undefined)?.[dayName];

      if (!schedule) {
        return {
          therapistId: k.id,
          nama: k.nama,
          gender: k.gender,
          seksi: k.seksi,
          availableSlots: [],
        };
      }

      const therapistStart = parseInt(schedule.mulai.split(':')[0]);
      const therapistEnd = parseInt(schedule.selesai.split(':')[0]);

      // Filter time slots based on therapist schedule and existing bookings
      const availableSlots = timeSlots.filter((time) => {
        const hour = parseInt(time.split(':')[0]);
        const minute = parseInt(time.split(':')[1]);

        // Check if within therapist working hours
        if (hour < therapistStart || hour >= therapistEnd) {
          return false;
        }

        // Check if slot overlaps with any booking
        const slotStart = new Date(date);
        slotStart.setHours(hour, minute, 0, 0);

        const hasOverlap = bookings.some((booking) => {
          const bookingStart = new Date(booking.jamMulai);
          const bookingEnd = new Date(booking.jamSelesai);
          // Also check if this booking is for this therapist
          return booking.karyawanId === k.id && slotStart < bookingEnd && slotStart >= bookingStart;
        });

        return !hasOverlap;
      });

      return {
        therapistId: k.id,
        nama: k.nama,
        gender: k.gender,
        seksi: k.seksi,
        spesialisasi: k.spesialisasi,
        availableSlots,
      };
    });

    return NextResponse.json({
      date: dateParam,
      availability,
    });
  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
