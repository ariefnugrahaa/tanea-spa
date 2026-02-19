import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * PATCH /api/intake/[id]
 * Update intake (e.g., therapist notes, mark as completed)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { catatanTerapis, status } = body;

    const updateData: any = {};
    if (catatanTerapis !== undefined) updateData.catatanTerapis = catatanTerapis;
    // If we add a status field to Intake model
    // if (status) updateData.status = status;

    const intake = await prisma.intake.update({
      where: { id },
      data: updateData,
      include: {
        booking: {
          include: {
            layanan: true,
            klien: true,
            karyawan: true,
          },
        },
      },
    });

    return NextResponse.json({ intake });
  } catch (error) {
    console.error('Error updating intake:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
