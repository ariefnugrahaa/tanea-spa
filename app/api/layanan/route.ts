import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/layanan
 * Get all services
 */
export async function GET() {
  try {
    const layanan = await prisma.layanan.findMany({
      where: { aktif: true },
      orderBy: [
        { kategori: 'asc' },
        { nama: 'asc' },
      ],
    });

    return NextResponse.json({ layanan });
  } catch (error) {
    console.error('Error fetching layanan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/layanan
 * Create a new service (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const layanan = await prisma.layanan.create({
      data: {
        nama: body.nama,
        kategori: body.kategori,
        deskripsi: body.deskripsi,
        komposisi: body.komposisi,
        durasi: body.durasi,
        harga: body.harga,
        badge: body.badge,
        aktif: true,
      },
    });

    return NextResponse.json({ layanan }, { status: 201 });
  } catch (error) {
    console.error('Error creating layanan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
