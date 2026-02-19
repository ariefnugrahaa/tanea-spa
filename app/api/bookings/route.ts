import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

/**
 * POST /api/bookings
 * Create a new booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      layananId,
      tanggal,
      jamMulai,
      jamSelesai,
      klienData,
      catatan,
      karyawanId,
    } = body;

    // Validate required fields
    if (!layananId || !tanggal || !jamMulai || !jamSelesai) {
      return NextResponse.json(
        { error: 'Missing required fields: layananId, tanggal, jamMulai, jamSelesai' },
        { status: 400 }
      );
    }

    // Get service details
    const layanan = await prisma.layanan.findUnique({
      where: { id: layananId },
    });

    if (!layanan) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    // Parse dates
    const bookingDate = new Date(tanggal);
    const startTime = new Date(jamMulai);
    const endTime = new Date(jamSelesai);

    // Validate dates
    if (isNaN(bookingDate.getTime()) || isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      );
    }

    // Check if therapist is available (double-booking prevention)
    if (karyawanId) {
      const overlappingBookings = await prisma.booking.findMany({
        where: {
          karyawanId,
          tanggal: bookingDate,
          status: {
            notIn: ['DIBATALKAN'],
          },
          OR: [
            {
              jamMulai: { lt: endTime },
              jamSelesai: { gt: startTime },
            },
          ],
        },
      });

      if (overlappingBookings.length > 0) {
        return NextResponse.json(
          { error: 'Therapist is not available at this time slot' },
          { status: 409 }
        );
      }
    }

    // Find or create client
    let klien;
    if (klienData?.whatsapp) {
      klien = await prisma.klien.findFirst({
        where: { whatsapp: klienData.whatsapp },
      });
    }

    if (!klien) {
      klien = await prisma.klien.create({
        data: {
          nama: klienData?.nama || 'Guest',
          whatsapp: klienData?.whatsapp,
          gender: klienData?.gender,
        },
      });
    } else if (klienData?.nama && klien.nama !== klienData.nama) {
      // Update client name if different
      klien = await prisma.klien.update({
        where: { id: klien.id },
        data: { nama: klienData.nama },
      });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        klienId: klien.id,
        layananId,
        karyawanId,
        tanggal: bookingDate,
        jamMulai: startTime,
        jamSelesai: endTime,
        tipe: 'ONLINE',
        status: 'PENDING_INTAKE',
        catatan,
      },
      include: {
        layanan: true,
        klien: true,
        karyawan: true,
      },
    });

    // Send WhatsApp notification
    if (klien.whatsapp) {
      try {
        await sendWhatsAppNotification({
          type: 'BOOKING_CONFIRMED',
          to: klien.whatsapp,
          data: {
            nama: klien.nama,
            tanggal: bookingDate.toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
            jam: startTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            layanan: layanan.nama,
            harga: layanan.harga,
            intakeLink: `${process.env.APP_URL || 'http://localhost:3000'}/intake?booking=${booking.id}`,
          },
        });
      } catch (waError) {
        console.error('Failed to send WhatsApp notification:', waError);
        // Don't fail the booking if WhatsApp fails
      }
    }

    return NextResponse.json(
      {
        booking,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings
 * Get bookings (for admin or authenticated user)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dateParam = searchParams.get('date');
    const karyawanId = searchParams.get('karyawanId');
    const status = searchParams.get('status');

    const where: any = {};

    if (dateParam) {
      const date = new Date(dateParam);
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.tanggal = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    if (karyawanId) {
      where.karyawanId = karyawanId;
    }

    if (status) {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        layanan: true,
        klien: true,
        karyawan: true,
        intake: true,
      },
      orderBy: {
        jamMulai: 'asc',
      },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
