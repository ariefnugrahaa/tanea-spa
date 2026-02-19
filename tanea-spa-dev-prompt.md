# 🌿 TANEA SPA — Development Prompt (Final)
> Full-stack web application untuk Tanea Spa, Jakarta
> Framework: **Next.js 14 (App Router)**
> Bahasa UI: **Bahasa Indonesia**
> Versi: 2.0 — Updated dengan data menu & brand asli

---

## 🎯 IDENTITAS BRAND (DATA ASLI)

```
Nama          : Tanea Spa
Tagline Resmi : "Resort Level Relaxation"
Alamat        : Jl. Laut Arafuru Blok C2 No.1,
                Pondok Bambu, Kec. Duren Sawit,
                Jakarta Timur, 13430
Instagram     : @tanea.spa
Jam Buka      : (sesuaikan dengan info aktual)
Harga         : dalam satuan ribu Rupiah (Rp)
```

**Tone brand:** Hangat, premium, tradisional-modern. Bukan spa biasa — *resort level*
dalam jangkauan kota. Nama-nama layanan memakai bahasa Sansekerta/Bali yang
mencerminkan kekayaan budaya lokal Indonesia.

---

## 🎨 DESIGN SYSTEM

> Warna diambil langsung dari menu PDF asli Tanea Spa — terracotta hangat,
> krem lembut, coklat dalam. **Ini adalah palette resmi brand mereka.**

### Palet Warna
```css
--terracotta-dark:  #8B4A2B   /* background utama gelap (cover menu) */
--terracotta:       #C4714A   /* CTA, aksen utama */
--terracotta-light: #D4845A   /* hover state */
--cream:            #F5EDE0   /* background section terang */
--warm-beige:       #EDD9BC   /* card background */
--deep-brown:       #3D2314   /* heading text */
--gold-accent:      #C9A84C   /* detail premium */
--warm-white:       #FAF7F2   /* section alt */
--charcoal:         #2C2C2C   /* body text */
--soft-shadow:      rgba(61, 35, 20, 0.12)
```

### Tipografi (next/font — Google Fonts)
```
Display / Brand   : Playfair Display  → cocok dengan nuansa "Resort Level"
Body / UI         : DM Sans           → bersih, modern, mudah dibaca
Tagline / Quote   : Cormorant Garamond → elegan, italic, untuk nama layanan
Menu Nama Layanan : Cormorant Garamond → sesuai tampilan menu asli
```

### Elemen Visual
- Background section gelap: gradient terracotta-dark ke terracotta (seperti cover menu)
- Background section terang: cream dengan grain overlay (seperti halaman dalam menu)
- Grain texture overlay: `opacity: 0.04`
- Divider: garis tipis horizontal cream (persis seperti di menu asli)
- Ikon Tanea Spa: gunakan logo asli (figur manusia melingkar) dari PDF
- Foto: warm-tone, low-light, close-up batu panas, tangan terapis, bunga plumeria,
  mangkuk rempah, handuk — semua sudah ada di foto menu PDF mereka
- Card layanan: background cream/warm-beige dengan teks centered (ikuti style menu)

---

## 🏗️ TECH STACK

```
Framework        : Next.js 14 — App Router
Language         : TypeScript
Styling          : Tailwind CSS + CSS Variables
Database         : PostgreSQL
ORM              : Prisma
Auth (Admin)     : NextAuth.js (Credentials provider)
State Management : Zustand (client) + React Query (server state)
Forms            : React Hook Form + Zod
Calendar         : FullCalendar.io (locale: id)
Charts           : Recharts
Body Map SVG     : Custom React SVG component (3-state per zona)
PDF Export       : @react-pdf/renderer
WhatsApp Notif   : Fonnte API
Email            : Resend
QR Code          : qrcode.react
Hosting          : Vercel
Database Host    : Supabase (PostgreSQL)
Image            : next/image + Cloudinary
```

---

## 📁 STRUKTUR FOLDER

```
tanea-spa/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Landing page (SSG)
│   ├── booking/page.tsx
│   ├── intake/page.tsx
│   ├── konfirmasi/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── admin/
│       ├── layout.tsx
│       ├── login/page.tsx
│       ├── jadwal/page.tsx
│       ├── intake/page.tsx
│       ├── pelanggan/page.tsx
│       ├── karyawan/page.tsx
│       ├── layanan/page.tsx
│       └── laporan/page.tsx
│
├── components/
│   ├── landing/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Layanan.tsx             ← Tab: Massage / Refleksi / Paket / Ritual
│   │   ├── CaraKerja.tsx
│   │   ├── TimKami.tsx
│   │   ├── Galeri.tsx
│   │   ├── Testimoni.tsx
│   │   └── Kontak.tsx
│   ├── intake/
│   │   ├── FormIntake.tsx
│   │   ├── PetaTubuh.tsx           ← SVG interaktif (FITUR UTAMA)
│   │   └── RingkasanIntake.tsx
│   ├── admin/
│   │   ├── Sidebar.tsx
│   │   ├── KalenderJadwal.tsx
│   │   ├── SlotDetail.tsx
│   │   └── WalkInModal.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Modal.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── whatsapp.ts
│   └── validations/
│
└── prisma/schema.prisma
```

---

## 🔍 SEO — KONFIGURASI LENGKAP

### Metadata Global (`app/layout.tsx`)
```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://taneaspa.com'),
  title: {
    default: 'Tanea Spa — Resort Level Relaxation di Jakarta Timur',
    template: '%s | Tanea Spa',
  },
  description:
    'Tanea Spa — Resort Level Relaxation di Duren Sawit, Jakarta Timur. ' +
    'Nikmati Tanea Signature Massage, Sundara Massage, Agni Watu, Refleksi, ' +
    'dan Spa Ritual tradisional Bali. Booking online sekarang.',
  keywords: [
    'tanea spa', 'spa duren sawit', 'spa jakarta timur',
    'pijat duren sawit', 'resort level relaxation',
    'tanea signature massage', 'spa tradisional bali jakarta',
    'spa pondok bambu', 'pijat batu panas jakarta',
    'spa packages jakarta', 'reflexology jakarta timur',
    'lulur bali jakarta', 'hot stone massage jakarta',
  ],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://taneaspa.com',
    siteName: 'Tanea Spa Jakarta',
    title: 'Tanea Spa — Resort Level Relaxation',
    description:
      'Spa premium di Duren Sawit, Jakarta Timur. ' +
      'Massage, Refleksi, Spa Packages & Ritual tradisional Bali.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Tanea Spa Resort Level Relaxation' }],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://taneaspa.com' },
}
```

### JSON-LD Structured Data
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DaySpa',
  name: 'Tanea Spa',
  description: 'Resort Level Relaxation — Spa premium di Duren Sawit, Jakarta Timur.',
  slogan: 'Resort Level Relaxation',
  url: 'https://taneaspa.com',
  image: 'https://taneaspa.com/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Laut Arafuru Blok C2 No.1',
    addressLocality: 'Pondok Bambu, Kec. Duren Sawit',
    addressRegion: 'Jakarta Timur',
    postalCode: '13430',
    addressCountry: 'ID',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2215,    // update dengan koordinat asli
    longitude: 106.9015,  // update dengan koordinat asli
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '09:00',
    closes: '21:00',
  }],
  priceRange: '$$',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Menu Tanea Spa',
    itemListElement: [
      // MASSAGE
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tanea Signature Massage', description: 'Pijat full body khas Tanea, fokus punggung, bahu, dan tulang belikat' }},
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sundara Massage', description: 'Pijat full body merata dari kepala hingga kaki' }},
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agni Watu Massage', description: 'Pijat full body dengan batu panas' }},
      // REFLEXOLOGY
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Reflexology', description: 'Refleksi titik saraf kaki dan tangan' }},
      // SPA PACKAGES
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paket Santika', description: 'Tanea Signature Massage + Refleksi' }},
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paket Sukha Rasa', description: 'Paket ritual lengkap 240 menit' }},
    ],
  },
  sameAs: ['https://www.instagram.com/tanea.spa/'],
}
```

### Sitemap & Robots
```ts
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://taneaspa.com', changeFrequency: 'weekly', priority: 1 },
    { url: 'https://taneaspa.com/booking', changeFrequency: 'weekly', priority: 0.9 },
  ]
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/admin' }],
    sitemap: 'https://taneaspa.com/sitemap.xml',
  }
}
```

---

## 📄 BAGIAN 1 — LANDING PAGE (`/`)

> SSG murni. Server Components di semua section.
> Desain mengikuti estetika menu PDF asli: terracotta hangat, krem lembut, nama Sansekerta.

### Navbar
- Logo: ikon figur manusia Tanea Spa + teks **"Tanea Spa"** Playfair Display
- Tagline kecil di bawah logo: *"Resort Level Relaxation"*
- Menu: Layanan · Paket · Tim Kami · Galeri · Kontak
- CTA: `Reservasi Sekarang` → terracotta, pill shape
- Sticky + backdrop-blur

### Section 1 — Hero
- Full viewport `100dvh`
- Background: gradient terracotta-dark ke terracotta (identik cover menu PDF)
  dengan foto spa di overlay + grain texture
- Headline (Playfair Display, putih/cream):
  ```
  "Resort Level
   Relaxation."
  ```
- Subheadline (Cormorant Garamond italic, cream):
  ```
  "Pengalaman spa bintang lima, hadir di Jakarta Timur."
  ```
- Dua CTA:
  - `Reservasi Sekarang` → cream filled, teks deep-brown → `/booking`
  - `Lihat Menu Layanan` → outline cream → scroll ke section layanan
- Scroll indicator: garis vertikal animasi fade turun

### Section 2 — Layanan & Harga
- **4 TAB: Massage · Reflexology · Spa Packages · Spa Rituals**
- Style kartu mengikuti menu asli: background cream, teks centered,
  nama layanan dengan Cormorant Garamond bold (terracotta), harga bold

---

#### TAB 1 — MASSAGE
*(data real dari menu PDF)*

**Tanea Signature Massage**
> Perawatan pijat full body khas Tanea berfokus pada punggung,
> bahu, dan area tulang belikat untuk relaksasi otot, melancarkan
> peredaran darah, meredakan pegal dan melepas stress.
```
90 Min  → Rp 185.000
120 Min → Rp 235.000
```

**Sundara Massage**
> Perawatan pijat full body merata dari kepala hingga kaki efektif
> mengurangi kelelahan, melancarkan peredaran darah,
> memberikan rasa nyaman dan rileks.
```
90 Min  → Rp 180.000
120 Min → Rp 230.000
```

**Agni Watu Massage**
> Perawatan pijat full body menggunakan batu panas yang
> memberikan sensasi hangat yang menenangkan dan
> membantu merilekskan otot yang tegang.
```
90 Min  → Rp 240.000
```

---

#### TAB 2 — REFLEXOLOGY

**Reflexology**
> Perawatan refleksi yang fokus pada penekanan titik-titik
> saraf pada kaki dan tangan untuk melancarkan sirkulasi,
> meredakan pegal, dan mengembalikan energi tubuh.
```
60 Min  → Rp 110.000
```

**Reflexology Plus** *(nama display, nama asli di menu tidak tertulis)*
> Perawatan refleksi yang lebih menyeluruh dengan
> tambahan foot scrub serta pijatan area leher dan pundak,
> untuk menghadirkan pengalaman relaksasi yang lebih
> lengkap dan mendalam.
```
90 Min  → Rp 130.000
```

---

#### TAB 3 — SPA PACKAGES

**Arum**
*Sundara Massage + Body Scrub (Jasmine / Coklat / Bengkoang)*
> Paket relaksasi Sundara Massage disertai lulur yang membantu
> merelaksasi tubuh secara mendalam, menghaluskan kulit, serta
> membuat aroma tubuh terasa lebih harum dan menyegarkan.
```
90 Min  → Rp 215.000
```

**Amertha**
*Sundara Massage + Body Mask (Boreh)*
> Sundara Massage disertai penggunaan boreh, perawatan tradisional
> Bali dari rempah dan bahan alami yang memberikan kehangatan
> pada tubuh serta membantu meregangkan otot.
```
90 Min  → Rp 235.000
```

**Padma**
*Tanea Signature Massage + Body Scrub (Murut)*
> Kombinasi pijat khas Tanea dan masker tubuh (Murut) untuk
> meredakan pegal, melancarkan sirkulasi, memberikan sensasi hangat,
> sekaligus mengangkat sel kulit mati dan kotoran.
```
120 Min → Rp 250.000
```

**Samaya**
*Tanea Signature Massage + Berendam (Rempah Bali / Susu)*
> Paket relaksasi pijat khas Tanea disertai refleksi dan lulur
> untuk melepas penat dan melancarkan peredaran darah.
```
120 Min → Rp 265.000
```

**Santika**
*Tanea Signature Massage + Refleksi*
> Kombinasi pijat khas Tanea dan refleksi untuk relaksasi tubuh,
> meredakan kelelahan, dan membuat tubuh terasa lebih ringan.
```
150 Min → Rp 275.000
```

**Kayana Rasa**
*Tanea Signature Massage + Refleksi + Body Mask (Boreh)*
> Paket relaksasi mendalam dengan kombinasi pijat, refleksi,
> dan perawatan boreh tradisional Bali.
```
180 Min → Rp 345.000
```

---

#### TAB 4 — SPA RITUALS
*(Paket paling premium — highlight dengan visual berbeda)*

**Tanah Sejahtera**
*Tanea Signature Massage + Body Scrub (Murut) + Body Mask (Boreh)
+ Berendam (Rempah Bali / Susu)*
> Sundara Massage disertai penggunaan boreh, perawatan tradisional
> Bali dari rempah dan bahan alami yang memberikan kehangatan
> pada tubuh serta membantu meregangkan otot.
```
180 Min → Rp 525.000
```

**Ayu Rahayu**
*Sundara Massage + Body Scrub (Jasmine/Coklat/Bengkoang)
+ Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu) + Ratus*
> Rangkaian perawatan khusus wanita untuk membantu mempersiapkan
> tubuh agar terasa lebih rileks, segar, dan terawat menjelang hari istimewa.
```
180 Min → Rp 510.000
```

**Sukha Rasa**
*Tanea Signature Massage + Refleksi + Body Scrub (Jasmine/Coklat/Bengkoang)
+ Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu)*
> Paket relaksasi lengkap yang dirancang untuk menikmati
> waktu perawatan lebih lama dan menyeluruh.
```
240 Min → Rp 645.000
```

> ⭐ **Catatan tampilan Spa Rituals:**
> Tampilkan dengan background terracotta-dark (gelap) agar berbeda dari tab lain.
> Beri badge "Most Popular" pada Sukha Rasa. Beri badge "Khusus Wanita" pada Ayu Rahayu.

---

### Section 3 — Cara Reservasi
- Judul: *"Reservasi Semudah Ini"*
- 3 langkah: Pilih Layanan → Isi Formulir → Nikmati Perawatan

### Section 4 — Tim Kami
- Kartu terapis: foto, nama, spesialisasi
- Catatan: *"Semua terapis kami bersertifikat dan terlatih secara profesional."*

### Section 5 — Galeri
- Masonry grid, 6–9 foto warm-tone
- Gunakan foto dari PDF (batu panas, keranjang produk, tangan terapis, bunga plumeria, teh)
- Lightbox on click

### Section 6 — Testimoni
- Auto-scroll carousel
- Card: bintang, kutipan, nama klien + nama layanan (mis. *"Sundara Massage"*)

### Section 7 — Lokasi & Kontak
- Google Maps embed (Jl. Laut Arafuru Blok C2 No.1, Pondok Bambu, Duren Sawit)
- Alamat lengkap + ikon pin
- Tombol: `Chat WhatsApp` · `Instagram @tanea.spa`

### Footer
- Logo Tanea Spa + *"Resort Level Relaxation"*
- Quick links
- `© 2025 Tanea Spa. All rights reserved.`

---

## 📦 BAGIAN 2 — ALUR BOOKING

### KASUS A — Online Booking (`/booking`)

**Step 1 — Pilih Kategori & Layanan**
```
Kategori: [ Massage ] [ Reflexology ] [ Spa Packages ] [ Spa Rituals ]

Saat Massage dipilih, tampilkan:
  ○ Tanea Signature Massage
  ○ Sundara Massage
  ○ Agni Watu Massage

Lalu pilih durasi sesuai layanan yang tersedia.
Tampilkan harga otomatis setelah pilih.
```

**Step 2 — Pilih Jadwal**
- Kalender interaktif (slot real-time dari DB)
- Pilih jam tersedia
- Preferensi terapis (jika ada)

**Step 3 — Data Diri**
- Nama, nomor WhatsApp, catatan

**Step 4 — Ringkasan**
- Preview: layanan, durasi, harga, tanggal, jam
- Tombol: `Lanjut ke Formulir Intake`
- Status DB: `PENDING_INTAKE`

**Step 5 → Formulir Intake** *(lihat Bagian 3)*

**Step 6 → `/konfirmasi`**
- Notif WhatsApp otomatis terkirim

---

### KASUS B — Walk-in (Admin Dashboard)

1. Resepsionis buka Jadwal → `➕ Walk-in Sekarang`
2. Modal: nama, WA (opsional), layanan, terapis, waktu mulai
3. Booking tersimpan label `WALK-IN 🚶`
4. **Intake — 2 Opsi:**
   - **Opsi A (QR Digital):** Generate QR → customer scan → isi di HP sendiri
   - **Opsi B (Manual):** Resepsionis isi sambil tanya langsung ke customer

---

## 🗺️ BAGIAN 3 — FORMULIR INTAKE (`/intake`)

> Dioptimalkan untuk mobile. Diisi customer sambil menunggu di ruang tunggu.
> Ini adalah fitur pembeda utama Tanea Spa.

### Section 1 — Data Pribadi
```
Nama lengkap      → readonly jika dari booking
Usia              → number
Jenis kelamin     → radio: Wanita / Pria  ← menentukan SVG body map
Nomor WhatsApp    → tel
Tanggal kunjungan → readonly jika dari booking
Layanan dipilih   → readonly jika dari booking
```

### Section 2 — Riwayat Kesehatan
```
[ ] Tekanan darah tinggi / Hipertensi
[ ] Diabetes
[ ] Kondisi kulit (eksim, psoriasis, luka terbuka)
[ ] Sedang hamil
[ ] Pasca operasi dalam 6 bulan terakhir
[ ] Gangguan jantung
[ ] Varises
[ ] Osteoporosis / Masalah tulang
[ ] Alergi → sebutkan: ___________
[ ] Sedang mengonsumsi obat-obatan → sebutkan: ___________
[ ] Tidak ada kondisi di atas
```
> ⚠️ Jika ada kondisi dicentang → flag merah otomatis di admin.

### Section 3 — 🗺️ PETA TUBUH INTERAKTIF ← FITUR UTAMA

**Komponen:** `<PetaTubuh gender="wanita"|"pria" onChange={...} />`

**Toggle:** `[ Bagian Depan ] [ Bagian Belakang ]`

**Zona tubuh (setiap zona = `<path>` SVG clickable):**
```
DEPAN:
  Kepala, Wajah, Leher, Bahu Kiri, Bahu Kanan,
  Lengan Atas Kiri, Lengan Atas Kanan,
  Lengan Bawah Kiri, Lengan Bawah Kanan,
  Tangan Kiri, Tangan Kanan,
  Dada, Perut, Paha Depan Kiri, Paha Depan Kanan,
  Lutut Kiri, Lutut Kanan,
  Betis Kiri, Betis Kanan, Kaki Kiri, Kaki Kanan

BELAKANG:
  Kepala Belakang, Leher Belakang,
  Bahu Belakang Kiri, Bahu Belakang Kanan,
  Punggung Atas, Punggung Tengah, Punggung Bawah,
  Pinggul Kiri, Pinggul Kanan,
  Paha Belakang Kiri, Paha Belakang Kanan,
  Betis Belakang Kiri, Betis Belakang Kanan
```

**3-state toggle per zona (klik berulang):**
```
null      → ⚪ Normal   → fill: #E8D5B7
"hindari" → 🔴 Hindari  → fill: #E05C5C  (jangan dipijat)
"fokus"   → 🟡 Fokus    → fill: #E8B84B  (butuh perhatian ekstra)
```

**Ringkasan otomatis di bawah diagram:**
```
Area Fokus   : Punggung Bawah, Bahu Kiri
Area Hindari : Lutut Kanan
```

**Format JSON tersimpan di DB:**
```ts
bodyMap: {
  front: { kepala: null, leher: "fokus", bahu_kiri: "fokus", perut: "hindari", ... },
  back:  { punggung_atas: "fokus", punggung_bawah: "fokus", ... }
}
```

### Section 4 — Preferensi Perawatan
```
Tekanan pijatan:
  ○ Ringan  ○ Sedang  ○ Kuat  ○ Sangat Kuat

Preferensi terapis:
  ○ Terapis Wanita  ○ Terapis Pria  ○ Tidak ada preferensi

Aroma terapi:
  ○ Lavender  ○ Eucalyptus  ○ Mawar  ○ Citrus  ○ Tidak perlu

Suhu ruangan:
  ○ Sejuk  ○ Hangat

Musik latar:
  ○ Musik lembut  ○ Suara alam  ○ Hening

Keluhan / Fokus khusus hari ini:
  [ textarea ]
```

### Section 5 — Persetujuan
```
[✓] Saya menyatakan semua informasi di atas benar dan akurat.
[✓] Saya menyetujui syarat & ketentuan layanan Tanea Spa.

[ Kirim Formulir Intake 🌿 ]
```

---

## 🗓️ BAGIAN 4 — ADMIN DASHBOARD (`/admin`)

> Auth: NextAuth.js. Role: `SUPER_ADMIN` & `TERAPIS`.

### 📅 Jadwal (`/admin/jadwal`)

```
[ Harian | Mingguan | Bulanan ]

┌────────────────────────┬────────────────────────┐
│      👩  WANITA         │      👨  PRIA            │
├────────────────────────┼────────────────────────┤
│  Terapis A             │  Terapis C              │
│  09:00 [Budi — Sig.]  │  09:00 [Tersedia]       │
│  11:00 [Tersedia]     │  11:00 [Ani — Refleksi] │
├────────────────────────┼────────────────────────┤
│  Terapis B             │  Terapis D              │
│  09:00 [Tersedia]     │  09:00 [Tersedia]       │
└────────────────────────┴────────────────────────┘
```

**Warna slot:**
- 🟢 Tersedia
- 🔴 Terisi → tampilkan nama klien + layanan singkat
- 🟡 Istirahat / Break
- ⬛ Diblokir

**Klik slot terisi → Side Panel:**
```
Nama      : [Nama Klien]
Layanan   : Tanea Signature Massage 90 mnt
Harga     : Rp 185.000
Tipe      : 🌐 ONLINE  /  🚶 WALK-IN
Status    : CONFIRMED

⚠️ KONDISI MEDIS: Tekanan darah tinggi  ← flag merah jika ada

PETA TUBUH (mini, read-only):
  🟡 Punggung Bawah  🟡 Bahu Kiri  🔴 Lutut Kanan

PREFERENSI:
  Tekanan: Kuat | Aroma: Lavender | Suhu: Hangat | Musik: Suara alam

CATATAN KLIEN: "Punggung bawah terasa berat setelah kerja"

CATATAN TERAPIS: [ editable — disimpan ke DB ]

[ Edit ] [ Reschedule ] [ Batalkan ] [ Lihat Intake Lengkap ]
```

**Tombol utama:**
```
[ ➕ Walk-in Sekarang ]   [ ➕ Booking Baru ]   [ Blokir Waktu ]
```

---

### 📋 Formulir Intake (`/admin/intake`)

**Tabel list:**
```
Tanggal | Nama | Layanan | Tipe | Status
```
Status: `BARU` 🔴 · `DIBACA` 🟡 · `SELESAI` 🟢

**Detail intake:**
- Semua data klien
- Kondisi kesehatan yang dicentang (highlight merah)
- Peta tubuh read-only (zona merah & kuning jelas)
- Preferensi perawatan
- Catatan terapis (editable)
- `🖨️ Print A4` · `✅ Tandai Selesai`

---

### 👥 Pelanggan / CRM (`/admin/pelanggan`)

**Profil klien:**
- Data pribadi + tombol WA langsung
- **Loyalty Tier otomatis:**
  ```
  🥉 Bronze  : 1–4 kunjungan
  🥈 Silver  : 5–9 kunjungan
  🥇 Gold    : 10–19 kunjungan
  💎 Platinum: 20+ kunjungan
  ```
- Riwayat semua kunjungan + layanan yang pernah dicoba
- Semua intake lama (accordion per sesi)
- Catatan admin
- Alert ulang tahun

---

### 💆 Karyawan (`/admin/karyawan`)

- Profil: foto, nama, gender, spesialisasi, seksi (Wanita/Pria/Keduanya)
- Jadwal kerja mingguan (jam masuk–selesai per hari)
- Statistik: total sesi bulan ini, rating rata-rata, pendapatan

---

### 💰 Layanan & Harga (`/admin/layanan`)

**Tabel:**
```
Nama Layanan          | Kategori     | Durasi  | Harga     | Status
Tanea Signature       | Massage      | 90 mnt  | Rp185.000 | Aktif
Tanea Signature       | Massage      | 120 mnt | Rp235.000 | Aktif
Sundara Massage       | Massage      | 90 mnt  | Rp180.000 | Aktif
Sundara Massage       | Massage      | 120 mnt | Rp230.000 | Aktif
Agni Watu Massage     | Massage      | 90 mnt  | Rp240.000 | Aktif
Reflexology           | Reflexology  | 60 mnt  | Rp110.000 | Aktif
Reflexology Plus      | Reflexology  | 90 mnt  | Rp130.000 | Aktif
Arum                  | Spa Packages | 90 mnt  | Rp215.000 | Aktif
Amertha               | Spa Packages | 90 mnt  | Rp235.000 | Aktif
Padma                 | Spa Packages | 120 mnt | Rp250.000 | Aktif
Samaya                | Spa Packages | 120 mnt | Rp265.000 | Aktif
Santika               | Spa Packages | 150 mnt | Rp275.000 | Aktif
Kayana Rasa           | Spa Packages | 180 mnt | Rp345.000 | Aktif
Tanah Sejahtera       | Spa Rituals  | 180 mnt | Rp525.000 | Aktif
Ayu Rahayu            | Spa Rituals  | 180 mnt | Rp510.000 | Aktif
Sukha Rasa            | Spa Rituals  | 240 mnt | Rp645.000 | Aktif
```

- Edit via modal
- Nonaktifkan tanpa hapus (history tetap ada)
- Promo & kode diskon manager

---

### 📊 Laporan (`/admin/laporan`)

**Summary cards:**
```
Total Pendapatan | Total Sesi | Sesi Wanita | Sesi Pria
Hari ini / Minggu ini / Bulan ini
```

**Grafik:**
- Bar chart: pendapatan per hari (7 hari)
- Pie chart: pendapatan per kategori (Massage / Refleksi / Packages / Rituals)
- Line chart: tren kunjungan bulanan

**Ranking:**
- Top 5 layanan terlaris
- Top 5 terapis by sesi

**Heatmap jam tersibuk** (Senin–Minggu × 09.00–21.00)

**Export:** `📄 PDF` · `📊 CSV`

---

## 🗄️ DATABASE SCHEMA (Prisma)

```prisma
model User {
  id        String    @id @default(cuid())
  username  String    @unique
  password  String
  role      Role      @default(TERAPIS)
  karyawan  Karyawan?
  createdAt DateTime  @default(now())
}

enum Role { SUPER_ADMIN TERAPIS }

model Karyawan {
  id           String    @id @default(cuid())
  nama         String
  gender       Gender
  seksi        Seksi
  spesialisasi String[]
  foto         String?
  aktif        Boolean   @default(true)
  userId       String?   @unique
  user         User?     @relation(fields: [userId], references: [id])
  jadwalKerja  Json      // { senin: { mulai: "09:00", selesai: "21:00" }, ... }
  bookings     Booking[]
  createdAt    DateTime  @default(now())
}

model Layanan {
  id          String    @id @default(cuid())
  nama        String
  kategori    Kategori
  deskripsi   String?
  komposisi   String?   // "Sundara Massage + Body Scrub + ..."
  durasi      Int       // menit
  harga       Int       // rupiah
  aktif       Boolean   @default(true)
  badge       String?   // "Most Popular", "Khusus Wanita", etc.
  bookings    Booking[]
}

enum Kategori {
  MASSAGE
  REFLEXOLOGY
  SPA_PACKAGES
  SPA_RITUALS
}

model Klien {
  id           String    @id @default(cuid())
  nama         String
  whatsapp     String?
  gender       Gender?
  lahir        DateTime?
  catatanAdmin String?
  bookings     Booking[]
  createdAt    DateTime  @default(now())
}

model Booking {
  id         String        @id @default(cuid())
  klienId    String
  klien      Klien         @relation(fields: [klienId], references: [id])
  layananId  String
  layanan    Layanan       @relation(fields: [layananId], references: [id])
  karyawanId String?
  karyawan   Karyawan?     @relation(fields: [karyawanId], references: [id])
  tanggal    DateTime
  jamMulai   DateTime
  jamSelesai DateTime
  tipe       TipeBooking   @default(ONLINE)
  status     StatusBooking @default(PENDING_INTAKE)
  catatan    String?
  qrToken    String?       @unique
  intake     Intake?
  createdAt  DateTime      @default(now())
}

enum TipeBooking   { ONLINE WALK_IN }
enum StatusBooking { PENDING_INTAKE CONFIRMED IN_PROGRESS SELESAI DIBATALKAN }

model Intake {
  id               String   @id @default(cuid())
  bookingId        String   @unique
  booking          Booking  @relation(fields: [bookingId], references: [id])
  usia             Int
  gender           Gender
  kondisiKesehatan Json     // array string kondisi yang dicentang
  petaTubuh        Json     // { front: { zona: state }, back: { zona: state } }
  tekananPijatan   String
  prefTerapis      String
  aromaTerapi      String
  suhuRuangan      String
  musik            String
  catatanKlien     String?
  catatanTerapis   String?
  flagMedis        Boolean  @default(false)
  submittedAt      DateTime @default(now())
}

model Waitlist {
  id        String   @id @default(cuid())
  nama      String
  whatsapp  String
  layananId String
  tanggal   DateTime
  status    String   @default("MENUNGGU") // MENUNGGU | NOTIFIED | CONFIRMED | EXPIRED
  createdAt DateTime @default(now())
}

enum Gender { WANITA PRIA }
enum Seksi  { WANITA PRIA KEDUANYA }
```

---

## 🔔 NOTIFIKASI WHATSAPP (Template Lengkap)

```
1. BOOKING ONLINE DIKONFIRMASI:
   ────────────────────────────
   Halo [Nama]! 🌿

   Booking kamu di *Tanea Spa* berhasil dikonfirmasi!

   📅 *[Tanggal], pukul [Jam]*
   💆 *[Nama Layanan]* — [Durasi] menit
   💰 Rp [Harga]

   Sebelum datang, mohon isi formulir intake kamu:
   👉 [link /intake?token=xxx]

   Sampai jumpa dan selamat beristirahat! 🌿
   _Resort Level Relaxation_

2. WALK-IN QR INTAKE:
   ──────────────────
   Halo [Nama]! 🌿 Selamat datang di Tanea Spa.

   Silakan isi formulir intake kamu di sini:
   👉 [link /intake?token=xxx]

   Formulir ini membantu kami memberikan
   perawatan terbaik sesuai kebutuhan kamu.

3. REMINDER H-1:
   ─────────────
   Halo [Nama]! 🌿

   Mengingatkan booking kamu *besok*:
   📅 *[Tanggal], pukul [Jam]*
   💆 *[Nama Layanan]*

   Harap datang 10 menit lebih awal.
   Sampai jumpa di Tanea Spa! 🌿

4. FOLLOW-UP PASCA SESI (30 menit setelah selesai):
   ──────────────────────────────────────────────────
   Terima kasih sudah berkunjung ke Tanea Spa, [Nama]! 🌿

   Semoga tubuhmu terasa lebih ringan dan segar. ✨

   Ceritakan pengalamanmu:
   ⭐ Google Review: [link]
   📸 Tag kami di Instagram: @tanea.spa

   Sampai jumpa di kunjungan berikutnya!
   _Resort Level Relaxation_

5. WAITLIST — SLOT TERSEDIA:
   ──────────────────────────
   Kabar baik, [Nama]! 🌿

   Ada slot tersedia hari ini:
   🕐 Pukul [Jam]
   💆 [Nama Layanan]

   Balas *"YA"* dalam 10 menit untuk konfirmasi.
```

---

## 🚶 ALUR WAITLIST

1. Customer/resepsionis tambah ke waitlist saat slot penuh
2. Admin lihat daftar waitlist di Jadwal → tab "Daftar Tunggu"
3. Saat ada pembatalan → WA otomatis ke waitlist pertama
4. Customer balas "YA" → slot terkunci 10 menit untuk konfirmasi
5. Tidak ada balasan 10 menit → notif ke waitlist berikutnya
6. Waitlist expired otomatis di akhir hari

---

## ✅ FASE IMPLEMENTASI

### Phase 1 — Landing Page (Prioritas: Promosi Instagram)
- [ ] Setup Next.js 14 + TypeScript + Tailwind CSS
- [ ] Design system: warna terracotta asli Tanea + tipografi
- [ ] Semua section landing page dengan data menu asli (SSG)
- [ ] Tab 4 kategori: Massage · Reflexology · Spa Packages · Spa Rituals
- [ ] Metadata SEO + JSON-LD DaySpa schema + sitemap + robots
- [ ] Responsif mobile-first (375px, 768px, 1280px)
- [ ] Deploy ke Vercel + domain taneaspa.com
- [ ] Target Lighthouse: SEO 100, Performance 90+

### Phase 2 — Booking & Intake
- [ ] Setup PostgreSQL + Prisma schema (dengan semua 16 layanan)
- [ ] API routes: booking, availability, intake submit
- [ ] Multi-step booking flow
- [ ] Komponen PetaTubuh SVG interaktif (front/back, 3-state)
- [ ] Formulir intake lengkap (mobile-optimized)
- [ ] Notifikasi WhatsApp via Fonnte API

### Phase 3 — Admin Dashboard
- [ ] NextAuth.js (SUPER_ADMIN + TERAPIS)
- [ ] Kalender FullCalendar — kolom Wanita/Pria terpisah
- [ ] Walk-in modal + QR generator
- [ ] Intake viewer + peta tubuh read-only + flag medis
- [ ] CRM Pelanggan + loyalty tier
- [ ] Manajemen karyawan
- [ ] Manajemen layanan (16 layanan + harga)
- [ ] Laporan + Recharts + export PDF/CSV

### Phase 4 — Otomasi
- [ ] Reminder H-1 (Vercel Cron)
- [ ] Follow-up pasca sesi (Vercel Cron)
- [ ] Waitlist otomatis
- [ ] Alert ulang tahun klien

---

## 📌 CATATAN PENTING DEVELOPER

1. **Tagline resmi** Tanea Spa adalah **"Resort Level Relaxation"** — bukan
   terjemahan bebas. Gunakan persis di semua halaman, JSON-LD, dan SEO.

2. **Nama layanan** menggunakan bahasa Sansekerta/Bali asli:
   Amertha, Arum, Santika, Samaya, Kayana Rasa, Padma, Ayu Rahayu,
   Tanah Sejahtera, Sukha Rasa. **Jangan diganti atau diterjemahkan.**

3. **Harga dalam ribuan Rupiah** — tampilkan sebagai `Rp 185.000`, bukan `185`.

4. **Ayu Rahayu** memiliki komponen **Ratus** — catatan khusus yang membedakannya
   sebagai paket "khusus wanita". Beri badge dan deskripsi yang menonjolkan ini.

5. **Agni Watu Massage** hanya tersedia 90 menit (tidak ada 60 atau 120 mnt).
   Validasi di booking flow.

6. **Sukha Rasa** durasi 240 menit (4 jam) — terpanjang di menu. Beri highlight
   "Paket Terlengkap" di UI.

7. **PetaTubuh SVG** — buat atau gunakan SVG anatomi tubuh yang sudah ada.
   Setiap zona adalah `<path>` dengan `data-zona` attribute. State disimpan
   sebagai `Map<string, "hindari" | "fokus" | null>`.

8. **Gender separation** mempengaruhi: SVG silhouette body map,
   filter terapis saat booking, kolom kalender admin, filter laporan.

9. **Double-booking prevention** wajib di server level — validasi overlap
   `jamMulai` sampai `jamSelesai` per terapis.

10. **QR Code walk-in** expire 2 jam atau setelah intake disubmit.

11. **Language separation — strict rule:**

    ✅ **English ONLY for all code:**
    - Variables       : `bookingStatus`, `therapistName`, `servicePrice`
    - Functions       : `getAvailableSlots()`, `submitIntakeForm()`, `createWalkIn()`
    - File names      : `booking-flow.tsx`, `body-map.tsx`, `intake-form.tsx`
    - Folder names    : `components/`, `lib/`, `utils/`, `hooks/`, `services/`
    - DB field names  : `createdAt`, `startTime`, `endTime`, `gender`, `phoneNumber`
    - API routes      : `/api/bookings`, `/api/intake`, `/api/therapists`, `/api/slots`
    - Enum values     : `WALK_IN`, `ONLINE`, `CONFIRMED`, `COMPLETED`, `CANCELLED`
    - Types/Interface : `BookingStatus`, `TherapistProfile`, `IntakeFormData`, `BodyMapState`
    - Prisma models   : `Booking`, `Intake`, `Therapist`, `Client`, `Service`
    - Comments        : English
    - Git commits     : English

    ✅ **Bahasa Indonesia ONLY for UI content (what users see):**
    - Button labels   : "Pesan Sekarang", "Kirim Formulir", "Lihat Layanan"
    - Headings        : "Layanan Kami", "Tim Kami", "Cara Reservasi"
    - Descriptions    : semua deskripsi layanan dari menu asli
    - Error messages  : "Nomor WhatsApp tidak valid", "Pilih layanan terlebih dahulu"
    - Placeholders    : "Ceritakan keluhanmu hari ini..."
    - WA templates    : semua pesan notifikasi WhatsApp
    - Service names   : nama Sansekerta dibiarkan apa adanya (Amertha, Sundara, dll)

12. **next/image** wajib untuk semua foto — WebP otomatis, lazy load,
    blur placeholder.

---

*Tanea Spa — Jl. Laut Arafuru Blok C2 No.1, Pondok Bambu, Duren Sawit, Jakarta Timur 13430*
*"Resort Level Relaxation" 🌿*
