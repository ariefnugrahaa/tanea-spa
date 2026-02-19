# 🌿 Tanea Spa - Full-Stack Web Application

> Resort Level Relaxation di Jakarta Timur
> Framework: Next.js 14 (App Router) | Language: TypeScript
> UI Language: Bahasa Indonesia

## 🎨 Tech Stack

```
Frontend:      Next.js 14, React 19, Tailwind CSS
Backend:       Next.js API Routes
Database:      PostgreSQL with Prisma ORM
Authentication: NextAuth.js (Credentials provider)
Forms:         React Hook Form + Zod
Calendar:      Custom implementation
Charts:        Recharts
Notifications: Fonnte API (WhatsApp)
Hosting:       Vercel
```

## 📁 Project Structure

```
tanea-spa/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata
│   ├── page.tsx                # Landing page
│   ├── booking/page.tsx        # Multi-step booking flow
│   ├── intake/page.tsx         # Intake form with body map
│   ├── konfirmasi/page.tsx     # Confirmation page
│   ├── admin/                  # Admin dashboard
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── jadwal/page.tsx     # Schedule view
│   │   ├── intake/page.tsx     # Intake viewer
│   │   ├── pelanggan/page.tsx   # CRM
│   │   ├── karyawan/page.tsx    # Employee management
│   │   ├── layanan/page.tsx     # Service management
│   │   └── laporan/page.tsx     # Reports & analytics
│   ├── api/                    # API routes
│   │   ├── auth/[...nextauth]
│   │   ├── bookings/
│   │   ├── intake/
│   │   ├── karyawan/
│   │   ├── layanan/
│   │   ├── pelanggan/
│   │   └── laporan/
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── landing/                # Landing page components
│   ├── intake/                 # Intake form components
│   ├── admin/                  # Admin dashboard components
│   └── ui/                    # Reusable UI components
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── auth.ts                # NextAuth configuration
│   ├── whatsapp.ts            # WhatsApp notification service
│   ├── utils.ts              # Utility functions
│   └── data/
│       └── services.ts       # Service data
└── prisma/
    ├── schema.prisma          # Database schema
    └── seed.ts               # Seed data
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (use Supabase for easy setup)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tanea-spa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"
FONNTE_API_TOKEN="your-fonnte-token"
APP_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main models:

- **User**: Admin/Therapist accounts
- **Karyawan**: Therapist profiles with schedules
- **Layanan**: Services with pricing
- **Klien**: Customer profiles
- **Booking**: Appointments
- **Intake**: Health forms with body map data
- **Waitlist**: Booking waitlist

See `prisma/schema.prisma` for full schema.

## 🎨 Design System

### Colors
- **Primary**: Terracotta (#C4714A)
- **Secondary**: Cream (#F5EDE0)
- **Text**: Deep Brown (#3D2314)
- **Accent**: Gold (#C9A84C)

### Typography
- **Display**: Playfair Display
- **Body**: DM Sans
- **Tagline**: Cormorant Garamond

## 📱 Features

### Customer Facing
- ✅ Landing page with service catalog
- ✅ Multi-step online booking
- ✅ Interactive body map for intake
- ✅ WhatsApp notifications
- ✅ Mobile-optimized forms

### Admin Dashboard
- ✅ Schedule view with therapist columns
- ✅ Intake form viewer with medical flags
- ✅ Customer CRM with loyalty tiers
- ✅ Employee management
- ✅ Service management
- ✅ Reports & analytics

### Planned Features (Phase 4)
- ⏳ Automated reminders (H-1, follow-up)
- ⏳ Waitlist management
- ⏳ Birthday alerts
- ⏳ PDF export for intake forms

## 🔐 Default Credentials

- **Username**: admin
- **Password**: admin123

⚠️ **IMPORTANT**: Change the default password in production!

## 📝 Language Policy

- **Code**: English (variables, functions, file names, comments)
- **UI**: Bahasa Indonesia (buttons, labels, descriptions)
- **Service Names**: Sanskrit/Bali names (preserved as-is)

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 📞 Support

For issues or questions:
- Instagram: @tanea.spa
- GitHub: [repository-issues]

---

*Tanea Spa — Jl. Laut Arafuru Blok C2 No.1, Pondok Bambu, Duren Sawit, Jakarta Timur 13430*
*"Resort Level Relaxation" 🌿*
