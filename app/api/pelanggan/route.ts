import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/pelanggan
 * Get all clients with booking count
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');

    const where: any = {};

    if (search) {
      where.OR = [
        { nama: { contains: search, mode: 'insensitive' } },
        { whatsapp: { contains: search } },
      ];
    }

    const pelanggan = await prisma.klien.findMany({
      where,
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ pelanggan });
  } catch (error) {
    console.error('Error fetching pelanggan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
