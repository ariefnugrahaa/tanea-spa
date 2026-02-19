import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/bookings/[id]
 * Get a specific booking
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        layanan: true,
        klien: true,
        karyawan: true,
        intake: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/bookings/[id]
 * Update a booking
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, karyawanId, catatanTerapis } = body;

    // Validate status
    const validStatuses = ['PENDING_INTAKE', 'CONFIRMED', 'IN_PROGRESS', 'SELESAI', 'DIBATALKAN'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (karyawanId !== undefined) updateData.karyawanId = karyawanId;

    // Update booking
    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
      include: {
        layanan: true,
        klien: true,
        karyawan: true,
        intake: true,
      },
    });

    // Update therapist notes in intake if provided
    if (catatanTerapis && booking.intake) {
      await prisma.intake.update({
        where: { id: booking.intake.id },
        data: { catatanTerapis },
      });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Delete a booking (cancel)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await prisma.booking.update({
      where: { id },
      data: { status: 'DIBATALKAN' },
      include: {
        layanan: true,
        klien: true,
        karyawan: true,
      },
    });

    // TODO: Send cancellation notification via WhatsApp
    // TODO: Check waitlist and notify next person

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      booking,
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
