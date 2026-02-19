'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  ClipboardList,
  Users,
  UserCog,
  Heart,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  { label: 'Jadwal', href: '/admin/jadwal', icon: Calendar },
  { label: 'Intake', href: '/admin/intake', icon: ClipboardList },
  { label: 'Pelanggan', href: '/admin/pelanggan', icon: Users },
  { label: 'Karyawan', href: '/admin/karyawan', icon: UserCog },
  { label: 'Layanan', href: '/admin/layanan', icon: Heart },
  { label: 'Laporan', href: '/admin/laporan', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-terracotta-dark text-cream z-40 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-cream/20">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 text-terracotta-light">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
              <circle cx="24" cy="24" r="3" fill="currentColor" />
              <path
                d="M24 12C24 12 32 16 32 24C32 32 24 36 24 36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M24 12C24 12 16 16 16 24C16 32 24 36 24 36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">Tanea Spa</h1>
            <p className="text-xs font-tagline italic text-terracotta-light">
              Admin Dashboard
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-terracotta text-white'
                      : 'text-cream/70 hover:bg-terracotta/20 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-cream/20">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-cream/70 hover:bg-red-600/20 hover:text-red-200 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
