import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/karyawan
 * Get all active employees/therapists
 */
export async function GET() {
  try {
    const karyawan = await prisma.karyawan.findMany({
      where: { aktif: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
        _count: {
          select: {
            bookings: true,
          },
        },
      },
      orderBy: {
        nama: 'asc',
      },
    });

    // Parse spesialisasi from JSON string to array, or split by comma if plain string
    const karyawanParsed = karyawan.map((k) => ({
      ...k,
      spesialisasi: typeof k.spesialisasi === 'string'
        ? (() => {
            try {
              const parsed = JSON.parse(k.spesialisasi);
              return Array.isArray(parsed) ? parsed : k.spesialisasi.split(',').map(s => s.trim());
            } catch {
              return k.spesialisasi.split(',').map(s => s.trim());
            }
          })()
        : Array.isArray(k.spesialisasi)
        ? k.spesialisasi
        : [k.spesialisasi],
    }));

    return NextResponse.json({ karyawan: karyawanParsed });
  } catch (error) {
    console.error('Error fetching karyawan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
