import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Layanan } from '@/components/landing/Layanan';
import { CaraKerja } from '@/components/landing/CaraKerja';
import { TimKami } from '@/components/landing/TimKami';
import { Galeri } from '@/components/landing/Galeri';
import { Testimoni } from '@/components/landing/Testimoni';
import { Kontak } from '@/components/landing/Kontak';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Layanan />
        <CaraKerja />
        <TimKami />
        <Galeri />
        <Testimoni />
        <Kontak />
      </main>
      <Footer />
    </>
  );
}
