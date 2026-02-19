import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/intake
 * Submit intake form for a booking
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      bookingId,
      usia,
      gender,
      kondisiKesehatan = [],
      petaTubuh = { front: {}, back: {} },
      tekananPijatan,
      prefTerapis,
      aromaTerapi,
      suhuRuangan,
      musik,
      catatanKlien,
    } = body;

    // Validate required fields
    if (!bookingId || !usia || !gender) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, usia, gender' },
        { status: 400 }
      );
    }

    // Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { klien: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check if intake already exists for this booking
    const existingIntake = await prisma.intake.findUnique({
      where: { bookingId },
    });

    if (existingIntake) {
      return NextResponse.json(
        { error: 'Intake already submitted for this booking' },
        { status: 400 }
      );
    }

    // Check for medical flags
    const hasMedicalCondition =
      kondisiKesehatan.length > 0 ||
      body.alergi ||
      body.obat;

    // Create intake
    const intake = await prisma.intake.create({
      data: {
        bookingId,
        usia: parseInt(String(usia)),
        gender: gender as 'WANITA' | 'PRIA',
        kondisiKesehatan,
        petaTubuh,
        tekananPijatan: tekananPijatan || 'sedang',
        prefTerapis: prefTerapis || 'tidak-ada',
        aromaTerapi: aromaTerapi || 'lavender',
        suhuRuangan: suhuRuangan || 'hangat',
        musik: musik || 'musik-lembut',
        catatanKlien,
        flagMedis: hasMedicalCondition,
      },
      include: {
        booking: {
          include: {
            klien: true,
            layanan: true,
            karyawan: true,
          },
        },
      },
    });

    // Update booking status to CONFIRMED
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    });

    return NextResponse.json(
      {
        intake,
        message: 'Intake submitted successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting intake:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/intake
 * Get intake forms (for admin)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status'); // 'BARU', 'DIBACA', 'SELESAI' (if we add this field)
    const bookingId = searchParams.get('bookingId');

    const where: any = {};

    if (bookingId) {
      where.bookingId = bookingId;
    }

    const intakes = await prisma.intake.findMany({
      where,
      include: {
        booking: {
          include: {
            klien: true,
            layanan: true,
            karyawan: true,
          },
        },
      },
      orderBy: {
        submittedAt: 'desc',
      },
    });

    return NextResponse.json({ intakes });
  } catch (error) {
    console.error('Error fetching intakes:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
