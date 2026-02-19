import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/laporan
 * Get report data including revenue, sessions, top services, and top therapists
 */
export async function GET() {
  try {
    const now = new Date();

    // Get today's boundaries
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(now);
    endOfToday.setHours(23, 59, 59, 999);

    // Get week's boundaries
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Get month's boundaries
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);

    // Helper function to get stats for a date range
    const getStats = async (startDate: Date) => {
      const bookings = await prisma.booking.findMany({
        where: {
          jamMulai: { gte: startDate },
          status: {
            notIn: ['PENDING_INTAKE', 'DIBATALKAN'],
          },
        },
        include: {
          layanan: true,
          klien: true,
          karyawan: true,
        },
      });

      const sessions = bookings.length;
      const revenue = bookings.reduce((sum, b) => sum + b.layanan.harga, 0);
      const women = bookings.filter((b) => b.klien.gender === 'WANITA').length;
      const men = bookings.filter((b) => b.klien.gender === 'PRIA').length;

      return { sessions, revenue, women, men };
    };

    // Get stats for each period
    const [today, week, month] = await Promise.all([
      getStats(startOfToday),
      getStats(startOfWeek),
      getStats(startOfMonth),
    ]);

    // Get top services
    const serviceStats = await prisma.booking.groupBy({
      by: ['layananId'],
      where: {
        status: { notIn: ['PENDING_INTAKE', 'DIBATALKAN'] },
      },
      _count: true,
    });

    const serviceIds = serviceStats.map((s) => s.layananId);
    const services = await prisma.layanan.findMany({
      where: { id: { in: serviceIds } },
    });

    const topServices = serviceStats
      .map((stat) => {
        const service = services.find((s) => s.id === stat.layananId);
        return {
          nama: service?.nama || 'Unknown',
          count: stat._count,
          revenue: (service?.harga || 0) * stat._count,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);

    // Get top therapists
    const therapistStats = await prisma.booking.groupBy({
      by: ['karyawanId'],
      where: {
        karyawanId: { not: null },
        status: { notIn: ['PENDING_INTAKE', 'DIBATALKAN'] },
      },
      _count: true,
    });

    const therapistIds = therapistStats.map((t) => t.karyawanId!).filter(Boolean);
    const karyawan = await prisma.karyawan.findMany({
      where: { id: { in: therapistIds } },
    });

    const therapistBookings = await prisma.booking.findMany({
      where: {
        karyawanId: { in: therapistIds },
        status: { notIn: ['PENDING_INTAKE', 'DIBATALKAN'] },
      },
      include: { layanan: true },
    });

    const topTherapists = therapistStats
      .map((stat) => {
        const emp = karyawan.find((k) => k.id === stat.karyawanId);
        const empBookings = therapistBookings.filter((b) => b.karyawanId === stat.karyawanId);
        const revenue = empBookings.reduce((sum, b) => sum + b.layanan.harga, 0);
        return {
          nama: emp?.nama || 'Unknown',
          count: stat._count,
          revenue,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);

    return NextResponse.json({
      today,
      week,
      month,
      topServices,
      topTherapists,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
