import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ============ CLEAN UP EXISTING DATA (Optional - comment out if you want to keep data) ============
  // await prisma.booking.deleteMany();
  // await prisma.intake.deleteMany();
  // await prisma.waitlist.deleteMany();
  // await prisma.klien.deleteMany();
  // await prisma.karyawan.deleteMany();
  // await prisma.layanan.deleteMany();
  // await prisma.user.deleteMany({ where: { username: { not: 'admin' } } });

  // ============ USERS ============
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'SUPER_ADMIN',
    },
  });

  // Create users for karyawan
  const dewiUser = await prisma.user.upsert({
    where: { username: 'dewi' },
    update: {},
    create: {
      username: 'dewi',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  const madeUser = await prisma.user.upsert({
    where: { username: 'made' },
    update: {},
    create: {
      username: 'made',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  const putuUser = await prisma.user.upsert({
    where: { username: 'putu' },
    update: {},
    create: {
      username: 'putu',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  const kadekUser = await prisma.user.upsert({
    where: { username: 'kadek' },
    update: {},
    create: {
      username: 'kadek',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  const komangUser = await prisma.user.upsert({
    where: { username: 'komang' },
    update: {},
    create: {
      username: 'komang',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  const luhUser = await prisma.user.upsert({
    where: { username: 'luh' },
    update: {},
    create: {
      username: 'luh',
      password: '$2a$10$8K1p/a0dL1K3V9wZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6xY3zOzXqY5zZ6x', // admin123
      role: 'TERAPIS',
    },
  });

  console.log('Users seeded successfully');

  // ============ LAYANAN (SERVICES) ============
  const layananData = [
    // MASSAGE
    { id: 'tanea-signature-90', nama: 'Tanea Signature Massage', kategori: 'MASSAGE' as const, deskripsi: 'Perawatan pijat full body khas Tanea berfokus pada punggung, bahu, dan area tulang belikat.', durasi: 90, harga: 185000 },
    { id: 'tanea-signature-120', nama: 'Tanea Signature Massage', kategori: 'MASSAGE' as const, deskripsi: 'Perawatan pijat full body khas Tanea berfokus pada punggung, bahu, dan area tulang belikat.', durasi: 120, harga: 235000 },
    { id: 'sundara-90', nama: 'Sundara Massage', kategori: 'MASSAGE' as const, deskripsi: 'Perawatan pijat full body merata dari kepala hingga kaki.', durasi: 90, harga: 180000 },
    { id: 'sundara-120', nama: 'Sundara Massage', kategori: 'MASSAGE' as const, deskripsi: 'Perawatan pijat full body merata dari kepala hingga kaki.', durasi: 120, harga: 230000 },
    { id: 'agni-watu-90', nama: 'Agni Watu Massage', kategori: 'MASSAGE' as const, deskripsi: 'Perawatan pijat full body menggunakan batu panas.', durasi: 90, harga: 240000 },
    // REFLEXOLOGY
    { id: 'reflexology-60', nama: 'Reflexology', kategori: 'REFLEXOLOGY' as const, deskripsi: 'Perawatan refleksi yang fokus pada penekanan titik-titik saraf pada kaki dan tangan.', durasi: 60, harga: 110000 },
    { id: 'reflexology-plus-90', nama: 'Reflexology Plus', kategori: 'REFLEXOLOGY' as const, deskripsi: 'Perawatan refleksi yang lebih menyeluruh dengan tambahan foot scrub serta pijatan area leher dan pundak.', durasi: 90, harga: 130000 },
    // SPA PACKAGES
    { id: 'arum', nama: 'Arum', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Paket relaksasi Sundara Massage disertai lulur.', komposisi: 'Sundara Massage + Body Scrub (Jasmine / Coklat / Bengkoang)', durasi: 90, harga: 215000 },
    { id: 'amertha', nama: 'Amertha', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Sundara Massage disertai penggunaan boreh, perawatan tradisional Bali.', komposisi: 'Sundara Massage + Body Mask (Boreh)', durasi: 90, harga: 235000 },
    { id: 'padma', nama: 'Padma', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Kombinasi pijat khas Tanea dan masker tubuh (Murut).', komposisi: 'Tanea Signature Massage + Body Scrub (Murut)', durasi: 120, harga: 250000 },
    { id: 'samaya', nama: 'Samaya', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Paket relaksasi pijat khas Tanea disertai refleksi dan lulur.', komposisi: 'Tanea Signature Massage + Berendam (Rempah Bali / Susu)', durasi: 120, harga: 265000 },
    { id: 'santika', nama: 'Santika', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Kombinasi pijat khas Tanea dan refleksi.', komposisi: 'Tanea Signature Massage + Refleksi', durasi: 150, harga: 275000 },
    { id: 'kayana-rasa', nama: 'Kayana Rasa', kategori: 'SPA_PACKAGES' as const, deskripsi: 'Paket relaksasi mendalam dengan kombinasi pijat, refleksi, dan perawatan boreh.', komposisi: 'Tanea Signature Massage + Refleksi + Body Mask (Boreh)', durasi: 180, harga: 345000 },
    // SPA RITUALS
    { id: 'tanah-sejahtera', nama: 'Tanah Sejahtera', kategori: 'SPA_RITUALS' as const, deskripsi: 'Paket ritual lengkap dengan pijat, scrub, masker, dan berendam.', komposisi: 'Tanea Signature Massage + Body Scrub (Murut) + Body Mask (Boreh) + Berendam (Rempah Bali / Susu)', durasi: 180, harga: 525000 },
    { id: 'ayu-rahayu', nama: 'Ayu Rahayu', kategori: 'SPA_RITUALS' as const, badge: 'Khusus Wanita', deskripsi: 'Rangkaian perawatan khusus wanita dengan ratus.', komposisi: 'Sundara Massage + Body Scrub (Jasmine/Coklat/Bengkoang) + Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu) + Ratus', durasi: 180, harga: 510000 },
    { id: 'sukha-rasa', nama: 'Sukha Rasa', kategori: 'SPA_RITUALS' as const, badge: 'Most Popular', deskripsi: 'Paket relaksasi lengkap yang dirancang untuk menikmati waktu perawatan lebih lama.', komposisi: 'Tanea Signature Massage + Refleksi + Body Scrub (Jasmine/Coklat/Bengkoang) + Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu)', durasi: 240, harga: 645000 },
  ];

  const layanan = [];
  for (const l of layananData) {
    const created = await prisma.layanan.upsert({
      where: { id: l.id },
      update: {},
      create: l,
    });
    layanan.push(created);
  }
  console.log('Layanan seeded successfully');

  // ============ KONDISI KESEHATAN ============
  const kondisiKesehatanData = [
    { nama: 'Diabetes', kategori: 'Kondisi Tubuh' },
    { nama: 'Hipertensi', kategori: 'Kondisi Tubuh' },
    { nama: 'Jantung', kategori: 'Kondisi Tubuh' },
    { nama: 'Alergi', kategori: 'Kondisi Tubuh' },
    { nama: 'Asma', kategori: 'Kondisi Tubuh' },
    { nama: 'Stroke', kategori: 'Kondisi Tubuh' },
    { nama: 'Patah Tulang', kategori: 'Kondisi Tubuh' },
    { nama: 'Luka Operasi', kategori: 'Kondisi Tubuh' },
    { nama: 'Ibu Hamil', kategori: 'Kehamilan' },
    { nama: 'Menyusui', kategori: 'Kehamilan' },
    { nama: 'Pasca Melahirkan', kategori: 'Kehamilan' },
    { nama: 'Jerawat', kategori: 'Kondisi Kulit' },
    { nama: 'Eksim', kategori: 'Kondisi Kulit' },
    { nama: 'Psoriasis', kategori: 'Kondisi Kulit' },
    { nama: 'Luka Bakar', kategori: 'Kondisi Kulit' },
    { nama: 'Varises', kategori: 'Kondisi Kulit' },
  ];

  for (const k of kondisiKesehatanData) {
    await prisma.kondisiKesehatan.upsert({
      where: { nama: k.nama },
      update: {},
      create: k,
    });
  }
  console.log('Kondisi Kesehatan seeded successfully');

  // ============ KARYAWAN (THERAPISTS) ============
  const createKaryawan = async (data: any, user: any) => {
    return await prisma.karyawan.upsert({
      where: { nama: data.nama },
      update: {},
      create: {
        ...data,
        spesialisasi: JSON.stringify(data.spesialisasi),
        jadwalKerja: data.jadwalKerja,
        userId: user.id,
      },
    });
  };

  const jadwalFull = {
    senin: { mulai: '09:00', selesai: '21:00' },
    selasa: { mulai: '09:00', selesai: '21:00' },
    rabu: { mulai: '09:00', selesai: '21:00' },
    kamis: { mulai: '09:00', selesai: '21:00' },
    jumat: { mulai: '09:00', selesai: '21:00' },
    sabtu: { mulai: '09:00', selesai: '21:00' },
    minggu: { mulai: '09:00', selesai: '21:00' },
  };

  const dewi = await createKaryawan({
    nama: 'Dewi Ayu',
    gender: 'WANITA',
    seksi: 'WANITA',
    spesialisasi: ['Spa Rituals', 'Body Scrub', 'Masker', 'Ratus'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, dewiUser);

  const made = await createKaryawan({
    nama: 'Made Widana',
    gender: 'PRIA',
    seksi: 'PRIA',
    spesialisasi: ['Deep Tissue', 'Hot Stone', 'Balinese Massage'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, madeUser);

  const putu = await createKaryawan({
    nama: 'Putu Sari',
    gender: 'PRIA',
    seksi: 'KEDUANYA',
    spesialisasi: ['Reflexology', 'Foot Massage'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, putuUser);

  const kadek = await createKaryawan({
    nama: 'Kadek Darmawan',
    gender: 'PRIA',
    seksi: 'KEDUANYA',
    spesialisasi: ['Balinese Massage', 'Swedish Massage'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, kadekUser);

  const komang = await createKaryawan({
    nama: 'Komang Lestari',
    gender: 'WANITA',
    seksi: 'WANITA',
    spesialisasi: ['Tanea Signature', 'Aromatherapy', 'Lulur'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, komangUser);

  const luh = await createKaryawan({
    nama: 'Luh Putri',
    gender: 'WANITA',
    seksi: 'WANITA',
    spesialisasi: ['Spa Rituals', 'Ratus', 'Body Scrub'],
    jadwalKerja: jadwalFull,
    aktif: true,
  }, luhUser);

  console.log('Karyawan seeded successfully');

  // ============ KLIEN (CLIENTS) ============
  const klienData = [
    { nama: 'Budi Santoso', whatsapp: '081234567890', gender: 'PRIA' as const, lahir: new Date('1990-05-15') },
    { nama: 'Siti Rahayu', whatsapp: '081234567891', gender: 'WANITA' as const, lahir: new Date('1995-08-22') },
    { nama: 'Agus Pratama', whatsapp: '081234567892', gender: 'PRIA' as const, lahir: new Date('1988-03-10') },
    { nama: 'Dewi Kartika', whatsapp: '081234567893', gender: 'WANITA' as const, lahir: new Date('1992-11-28') },
    { nama: 'Made Wijaya', whatsapp: '081234567894', gender: 'PRIA' as const, lahir: new Date('1985-07-03') },
    { nama: 'Putu Andika', whatsapp: '081234567895', gender: 'PRIA' as const, lahir: new Date('1997-01-17') },
    { nama: 'Kadek Saraswati', whatsapp: '081234567896', gender: 'WANITA' as const, lahir: new Date('1994-09-30') },
    { nama: 'Komang Adi', whatsapp: '081234567897', gender: 'PRIA' as const, lahir: new Date('1991-04-12') },
    { nama: 'Luh Ayu', whatsapp: '081234567898', gender: 'WANITA' as const, lahir: new Date('1996-12-05') },
    { nama: 'Nyoman Putra', whatsapp: '081234567899', gender: 'PRIA' as const, lahir: new Date('1989-06-20') },
  ];

  const klien = [];
  for (const k of klienData) {
    const created = await prisma.klien.upsert({
      where: { id: k.nama }, // Use nama as id for upsert
      update: {},
      create: {
        ...k,
        id: k.nama, // Use nama as id
      },
    });
    klien.push(created);
  }
  console.log('Klien seeded successfully');

  // ============ BOOKINGS ============
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const bookingData = [
    // Past bookings (SELESAI)
    {
      klienId: klien[0].id,
      layananId: layanan.find((l: any) => l.nama === 'Sundara Massage' && l.durasi === 90)!.id,
      karyawanId: dewi.id,
      tanggal: yesterday,
      jamMulai: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 10, 0),
      jamSelesai: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 11, 30),
      tipe: 'ONLINE' as const,
      status: 'SELESAI' as const,
    },
    {
      klienId: klien[1].id,
      layananId: layanan.find((l: any) => l.nama === 'Reflexology')!.id,
      karyawanId: putu.id,
      tanggal: yesterday,
      jamMulai: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 14, 0),
      jamSelesai: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 15, 0),
      tipe: 'WALK_IN' as const,
      status: 'SELESAI' as const,
    },
    {
      klienId: klien[2].id,
      layananId: layanan.find((l: any) => l.nama === 'Tanea Signature Massage' && l.durasi === 90)!.id,
      karyawanId: made.id,
      tanggal: new Date(yesterday.getTime() - 86400000),
      jamMulai: new Date(yesterday.getTime() - 86400000 + 3600000 * 9),
      jamSelesai: new Date(yesterday.getTime() - 86400000 + 3600000 * 10.5),
      tipe: 'ONLINE' as const,
      status: 'SELESAI' as const,
    },
    // Today's bookings (CONFIRMED)
    {
      klienId: klien[3].id,
      layananId: layanan.find((l: any) => l.nama === 'Sukha Rasa')!.id,
      karyawanId: dewi.id,
      tanggal: today,
      jamMulai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
      jamSelesai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      tipe: 'ONLINE' as const,
      status: 'CONFIRMED' as const,
    },
    {
      klienId: klien[4].id,
      layananId: layanan.find((l: any) => l.nama === 'Agni Watu Massage')!.id,
      karyawanId: made.id,
      tanggal: today,
      jamMulai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
      jamSelesai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 30),
      tipe: 'ONLINE' as const,
      status: 'CONFIRMED' as const,
    },
    {
      klienId: klien[5].id,
      layananId: layanan.find((l: any) => l.nama === 'Reflexology Plus')!.id,
      karyawanId: putu.id,
      tanggal: today,
      jamMulai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 0),
      jamSelesai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30),
      tipe: 'WALK_IN' as const,
      status: 'CONFIRMED' as const,
    },
    {
      klienId: klien[6].id,
      layananId: layanan.find((l: any) => l.nama === 'Ayu Rahayu')!.id,
      karyawanId: komang.id,
      tanggal: today,
      jamMulai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 16, 0),
      jamSelesai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19, 0),
      tipe: 'ONLINE' as const,
      status: 'CONFIRMED' as const,
    },
    {
      klienId: klien[7].id,
      layananId: layanan.find((l: any) => l.nama === 'Tanah Sejahtera')!.id,
      karyawanId: luh.id,
      tanggal: today,
      jamMulai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
      jamSelesai: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
      tipe: 'ONLINE' as const,
      status: 'CONFIRMED' as const,
    },
    // Future bookings (PENDING_INTAKE)
    {
      klienId: klien[8].id,
      layananId: layanan.find((l: any) => l.nama === 'Padma')!.id,
      karyawanId: kadek.id,
      tanggal: tomorrow,
      jamMulai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0),
      jamSelesai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12, 0),
      tipe: 'ONLINE' as const,
      status: 'PENDING_INTAKE' as const,
    },
    {
      klienId: klien[9].id,
      layananId: layanan.find((l: any) => l.nama === 'Santika')!.id,
      karyawanId: dewi.id,
      tanggal: tomorrow,
      jamMulai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 0),
      jamSelesai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 16, 30),
      tipe: 'ONLINE' as const,
      status: 'PENDING_INTAKE' as const,
    },
    {
      klienId: klien[0].id,
      layananId: layanan.find((l: any) => l.nama === 'Kayana Rasa')!.id,
      karyawanId: made.id,
      tanggal: tomorrow,
      jamMulai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
      jamSelesai: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12, 0),
      tipe: 'ONLINE' as const,
      status: 'PENDING_INTAKE' as const,
    },
    {
      klienId: klien[1].id,
      layananId: layanan.find((l: any) => l.nama === 'Samaya')!.id,
      karyawanId: putu.id,
      tanggal: new Date(tomorrow.getTime() + 86400000),
      jamMulai: new Date(tomorrow.getTime() + 86400000 + 3600000 * 11),
      jamSelesai: new Date(tomorrow.getTime() + 86400000 + 3600000 * 13),
      tipe: 'ONLINE' as const,
      status: 'PENDING_INTAKE' as const,
    },
    {
      klienId: klien[2].id,
      layananId: layanan.find((l: any) => l.nama === 'Amertha')!.id,
      karyawanId: komang.id,
      tanggal: new Date(tomorrow.getTime() + 86400000),
      jamMulai: new Date(tomorrow.getTime() + 86400000 + 3600000 * 15),
      jamSelesai: new Date(tomorrow.getTime() + 86400000 + 3600000 * 16.5),
      tipe: 'WALK_IN' as const,
      status: 'PENDING_INTAKE' as const,
    },
  ];

  for (const b of bookingData) {
    await prisma.booking.upsert({
      where: {
        id: `${b.klienId}-${b.layananId}-${b.tanggal.toISOString().split('T')[0]}-${b.jamMulai.getHours()}`,
      },
      update: {},
      create: {
        ...b,
        id: `${b.klienId}-${b.layananId}-${b.tanggal.toISOString().split('T')[0]}-${b.jamMulai.getHours()}`,
        qrToken: `QR-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      },
    });
  }
  console.log('Bookings seeded successfully');

  // ============ INTAKE FORMS (for completed bookings) ============
  const completedBookings = await prisma.booking.findMany({
    where: { status: 'SELESAI' },
    include: { klien: true },
  });

  for (const booking of completedBookings) {
    await prisma.intake.upsert({
      where: { bookingId: booking.id },
      update: {},
      create: {
        bookingId: booking.id,
        usia: booking.klien.lahir
          ? Math.floor((today.getTime() - new Date(booking.klien.lahir).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
          : 30,
        gender: (booking.klien.gender as 'PRIA' | 'WANITA') || 'PRIA',
        kondisiKesehatan: JSON.stringify(['Sehat']),
        petaTubuh: JSON.stringify({
          front: { kepala: false, leher: false, bahu_kiri: false, bahu_kanan: false, dada: false, perut: false },
          back: { punggung_atas: false, punggung_bawah: false, pinggang: false, paha_kiri: false, paha_kanan: false },
        }),
        tekananPijatan: 'Sedang',
        prefTerapis: 'Semua',
        aromaTerapi: 'Lavender',
        suhuRuangan: 'Dingin',
        musik: 'Instrumental',
        flagMedis: false,
      },
    });
  }
  console.log('Intake forms seeded successfully');

  // ============ WAITLIST ============
  const waitlistData = [
    {
      nama: 'Rina Melati',
      whatsapp: '081987654321',
      layananId: layanan.find((l: any) => l.nama === 'Sukha Rasa')!.id,
      tanggal: new Date(tomorrow.getTime() + 86400000 * 2),
      status: 'MENUNGGU',
    },
    {
      nama: 'Deni Setiawan',
      whatsapp: '081987654322',
      layananId: layanan.find((l: any) => l.nama === 'Agni Watu Massage')!.id,
      tanggal: new Date(tomorrow.getTime() + 86400000 * 2),
      status: 'NOTIFIED',
    },
    {
      nama: 'Maya Sari',
      whatsapp: '081987654323',
      layananId: layanan.find((l: any) => l.nama === 'Ayu Rahayu')!.id,
      tanggal: new Date(tomorrow.getTime() + 86400000 * 3),
      status: 'MENUNGGU',
    },
  ];

  for (const w of waitlistData) {
    await prisma.waitlist.upsert({
      where: {
        id: `${w.nama}-${w.layananId}-${w.tanggal.toISOString().split('T')[0]}`,
      },
      update: {},
      create: {
        ...w,
        id: `${w.nama}-${w.layananId}-${w.tanggal.toISOString().split('T')[0]}`,
      },
    });
  }
  console.log('Waitlist seeded successfully');

  console.log('\n=== SEEDING COMPLETE ===');
  console.log('Users:', await prisma.user.count());
  console.log('Layanan:', await prisma.layanan.count());
  console.log('Karyawan:', await prisma.karyawan.count());
  console.log('Klien:', await prisma.klien.count());
  console.log('Bookings:', await prisma.booking.count());
  console.log('Intake:', await prisma.intake.count());
  console.log('Waitlist:', await prisma.waitlist.count());
  console.log('Kondisi Kesehatan:', await prisma.kondisiKesehatan.count());
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
