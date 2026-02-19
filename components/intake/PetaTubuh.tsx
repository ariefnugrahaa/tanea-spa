'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type BodyZone = null | 'hindari' | 'fokus';

interface BodyMapProps {
  gender: 'wanita' | 'pria';
  onChange: (frontData: Record<string, BodyZone>, backData: Record<string, BodyZone>) => void;
  initialData?: { front: Record<string, BodyZone>; back: Record<string, BodyZone> };
}

export function PetaTubuh({ gender, onChange, initialData }: BodyMapProps) {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [frontData, setFrontData] = useState<Record<string, BodyZone>>(
    initialData?.front || {}
  );
  const [backData, setBackData] = useState<Record<string, BodyZone>>(
    initialData?.back || {}
  );

  const currentData = view === 'front' ? frontData : backData;
  const setData = view === 'front' ? setFrontData : setBackData;

  const handleZoneClick = (zone: string) => {
    const currentState = currentData[zone];
    const nextState: BodyZone =
      currentState === null ? 'hindari' : currentState === 'hindari' ? 'fokus' : null;

    const newData = { ...currentData, [zone]: nextState };

    if (view === 'front') {
      setFrontData(newData);
    } else {
      setBackData(newData);
    }

    onChange(frontData, view === 'front' ? newData : backData);
  };

  const getZoneFill = (zone: string) => {
    const state = currentData[zone];
    if (state === 'hindari') return '#E05C5C';
    if (state === 'fokus') return '#E8B84B';
    return '#E8D5B7';
  };

  const focusAreas = Object.entries(frontData)
    .filter(([_, state]) => state === 'fokus')
    .map(([zone]) => zone);
  const avoidAreas = Object.entries(backData)
    .filter(([_, state]) => state === 'fokus')
    .map(([zone]) => zone);
  const avoidAll = Object.entries({ ...frontData, ...backData })
    .filter(([_, state]) => state === 'hindari')
    .map(([zone]) => zone);

  const zoneLabels: Record<string, string> = {
    kepala: 'Kepala',
    wajah: 'Wajah',
    leher: 'Leher',
    bahu_kiri: 'Bahu Kiri',
    bahu_kanan: 'Bahu Kanan',
    lengan_atas_kiri: 'Lengan Atas Kiri',
    lengan_atas_kanan: 'Lengan Atas Kanan',
    lengan_bawah_kiri: 'Lengan Bawah Kiri',
    lengan_bawah_kanan: 'Lengan Bawah Kanan',
    tangan_kiri: 'Tangan Kiri',
    tangan_kanan: 'Tangan Kanan',
    dada: 'Dada',
    perut: 'Perut',
    paha_depan_kiri: 'Paha Depan Kiri',
    paha_depan_kanan: 'Paha Depan Kanan',
    lutut_kiri: 'Lutut Kiri',
    lutut_kanan: 'Lutut Kanan',
    betis_kiri: 'Betis Kiri',
    betis_kanan: 'Betis Kanan',
    kaki_kiri: 'Kaki Kiri',
    kaki_kanan: 'Kaki Kanan',
    kepala_belakang: 'Kepala Belakang',
    leher_belakang: 'Leher Belakang',
    bahu_belakang_kiri: 'Bahu Belakang Kiri',
    bahu_belakang_kanan: 'Bahu Belakang Kanan',
    punggung_atas: 'Punggung Atas',
    punggung_tengah: 'Punggung Tengah',
    punggung_bawah: 'Punggung Bawah',
    pinggul_kiri: 'Pinggul Kiri',
    pinggul_kanan: 'Pinggul Kanan',
    paha_belakang_kiri: 'Paha Belakang Kiri',
    paha_belakang_kanan: 'Paha Belakang Kanan',
    betis_belakang_kiri: 'Betis Belakang Kiri',
    betis_belakang_kanan: 'Betis Belakang Kanan',
  };

  return (
    <div className="w-full">
      {/* View Toggle */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-6">
        <button
          onClick={() => setView('front')}
          className={cn(
            'px-3 sm:px-6 py-2 rounded-full font-medium transition-all text-xs sm:text-base',
            view === 'front' ? 'bg-terracotta text-white shadow-md' : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
          )}
        >
          Depan
        </button>
        <button
          onClick={() => setView('back')}
          className={cn(
            'px-3 sm:px-6 py-2 rounded-full font-medium transition-all text-xs sm:text-base',
            view === 'back' ? 'bg-terracotta text-white shadow-md' : 'bg-warm-beige text-charcoal hover:bg-terracotta/10'
          )}
        >
          Belakang
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-3 sm:mb-6 text-[10px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: '#E8D5B7' }} />
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: '#E05C5C' }} />
          <span>Hindari</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full" style={{ backgroundColor: '#E8B84B' }} />
          <span>Fokus</span>
        </div>
      </div>

      {/* Body SVG */}
      <div className="flex justify-center mb-3 sm:mb-6">
        <svg
          viewBox="0 0 300 600"
          className="w-full max-w-[200px] sm:max-w-xs h-auto drop-shadow-md sm:drop-shadow-lg"
          xmlns="http://www.w3.org/2000/svg"
        >
          {view === 'front' ? (
            // Front View
            <g>
              {/* Head */}
              <ellipse
                cx="150"
                cy="50"
                rx="40"
                ry="45"
                fill={getZoneFill('kepala')}
                onClick={() => handleZoneClick('kepala')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Face area (subtle indication) */}
              <ellipse
                cx="150"
                cy="55"
                rx="25"
                ry="30"
                fill="none"
                stroke="rgba(61, 35, 20, 0.1)"
                strokeWidth="2"
                onClick={() => handleZoneClick('wajah')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Neck */}
              <rect
                x="135"
                y="90"
                width="30"
                height="30"
                fill={getZoneFill('leher')}
                onClick={() => handleZoneClick('leher')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Shoulders */}
              <path
                d="M100 120 Q100 100 130 110 L130 130 L100 130 Z"
                fill={getZoneFill('bahu_kiri')}
                onClick={() => handleZoneClick('bahu_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M200 120 Q200 100 170 110 L170 130 L200 130 Z"
                fill={getZoneFill('bahu_kanan')}
                onClick={() => handleZoneClick('bahu_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Upper Arms */}
              <rect
                x="90"
                y="130"
                width="35"
                height="70"
                rx="10"
                fill={getZoneFill('lengan_atas_kiri')}
                onClick={() => handleZoneClick('lengan_atas_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="175"
                y="130"
                width="35"
                height="70"
                rx="10"
                fill={getZoneFill('lengan_atas_kanan')}
                onClick={() => handleZoneClick('lengan_atas_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Forearms */}
              <rect
                x="85"
                y="205"
                width="30"
                height="70"
                rx="8"
                fill={getZoneFill('lengan_bawah_kiri')}
                onClick={() => handleZoneClick('lengan_bawah_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="185"
                y="205"
                width="30"
                height="70"
                rx="8"
                fill={getZoneFill('lengan_bawah_kanan')}
                onClick={() => handleZoneClick('lengan_bawah_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Hands */}
              <ellipse
                cx="100"
                cy="285"
                rx="20"
                ry="25"
                fill={getZoneFill('tangan_kiri')}
                onClick={() => handleZoneClick('tangan_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <ellipse
                cx="200"
                cy="285"
                rx="20"
                ry="25"
                fill={getZoneFill('tangan_kanan')}
                onClick={() => handleZoneClick('tangan_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Torso */}
              <path
                d="M130 120 L170 120 L175 280 L125 280 Z"
                fill={getZoneFill('dada')}
                onClick={() => handleZoneClick('dada')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M125 280 L175 280 L180 350 L120 350 Z"
                fill={getZoneFill('perut')}
                onClick={() => handleZoneClick('perut')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Hips */}
              <path
                d="M120 350 L180 350 L190 380 L110 380 Z"
                fill={getZoneFill('pinggul_kiri')}
                onClick={() => handleZoneClick('pinggul_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M120 350 L180 350 L190 380 L110 380 Z"
                fill={getZoneFill('pinggul_kanan')}
                onClick={() => handleZoneClick('pinggul_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Front Thighs */}
              <rect
                x="115"
                y="380"
                width="30"
                height="90"
                rx="10"
                fill={getZoneFill('paha_depan_kiri')}
                onClick={() => handleZoneClick('paha_depan_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="155"
                y="380"
                width="30"
                height="90"
                rx="10"
                fill={getZoneFill('paha_depan_kanan')}
                onClick={() => handleZoneClick('paha_depan_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Knees */}
              <ellipse
                cx="130"
                cy="485"
                rx="15"
                ry="12"
                fill={getZoneFill('lutut_kiri')}
                onClick={() => handleZoneClick('lutut_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <ellipse
                cx="170"
                cy="485"
                rx="15"
                ry="12"
                fill={getZoneFill('lutut_kanan')}
                onClick={() => handleZoneClick('lutut_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Shins */}
              <rect
                x="118"
                y="500"
                width="24"
                height="70"
                rx="8"
                fill={getZoneFill('betis_kiri')}
                onClick={() => handleZoneClick('betis_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="158"
                y="500"
                width="24"
                height="70"
                rx="8"
                fill={getZoneFill('betis_kanan')}
                onClick={() => handleZoneClick('betis_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Feet */}
              <ellipse
                cx="125"
                cy="585"
                rx="18"
                ry="12"
                fill={getZoneFill('kaki_kiri')}
                onClick={() => handleZoneClick('kaki_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <ellipse
                cx="175"
                cy="585"
                rx="18"
                ry="12"
                fill={getZoneFill('kaki_kanan')}
                onClick={() => handleZoneClick('kaki_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </g>
          ) : (
            // Back View
            <g>
              {/* Head Back */}
              <ellipse
                cx="150"
                cy="50"
                rx="38"
                ry="42"
                fill={getZoneFill('kepala_belakang')}
                onClick={() => handleZoneClick('kepala_belakang')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Neck Back */}
              <rect
                x="135"
                y="88"
                width="30"
                height="28"
                fill={getZoneFill('leher_belakang')}
                onClick={() => handleZoneClick('leher_belakang')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Shoulders Back */}
              <path
                d="M100 115 Q100 95 130 105 L130 125 L100 125 Z"
                fill={getZoneFill('bahu_belakang_kiri')}
                onClick={() => handleZoneClick('bahu_belakang_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M200 115 Q200 95 170 105 L170 125 L200 125 Z"
                fill={getZoneFill('bahu_belakang_kanan')}
                onClick={() => handleZoneClick('bahu_belakang_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Upper Back */}
              <path
                d="M130 115 L170 115 L175 190 L125 190 Z"
                fill={getZoneFill('punggung_atas')}
                onClick={() => handleZoneClick('punggung_atas')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Middle Back */}
              <path
                d="M125 190 L175 190 L178 260 L122 260 Z"
                fill={getZoneFill('punggung_tengah')}
                onClick={() => handleZoneClick('punggung_tengah')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Lower Back */}
              <path
                d="M122 260 L178 260 L182 340 L118 340 Z"
                fill={getZoneFill('punggung_bawah')}
                onClick={() => handleZoneClick('punggung_bawah')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Hips */}
              <path
                d="M118 340 L182 340 L190 375 L110 375 Z"
                fill={getZoneFill('pinggul_kiri')}
                onClick={() => handleZoneClick('pinggul_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <path
                d="M118 340 L182 340 L190 375 L110 375 Z"
                fill={getZoneFill('pinggul_kanan')}
                onClick={() => handleZoneClick('pinggul_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Back Thighs */}
              <rect
                x="115"
                y="375"
                width="30"
                height="90"
                rx="10"
                fill={getZoneFill('paha_belakang_kiri')}
                onClick={() => handleZoneClick('paha_belakang_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="155"
                y="375"
                width="30"
                height="90"
                rx="10"
                fill={getZoneFill('paha_belakang_kanan')}
                onClick={() => handleZoneClick('paha_belakang_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Back Calves */}
              <rect
                x="118"
                y="495"
                width="24"
                height="75"
                rx="8"
                fill={getZoneFill('betis_belakang_kiri')}
                onClick={() => handleZoneClick('betis_belakang_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <rect
                x="158"
                y="495"
                width="24"
                height="75"
                rx="8"
                fill={getZoneFill('betis_belakang_kanan')}
                onClick={() => handleZoneClick('betis_belakang_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              {/* Feet Back */}
              <ellipse
                cx="125"
                cy="585"
                rx="18"
                ry="12"
                fill={getZoneFill('kaki_kiri')}
                onClick={() => handleZoneClick('kaki_kiri')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
              <ellipse
                cx="175"
                cy="585"
                rx="18"
                ry="12"
                fill={getZoneFill('kaki_kanan')}
                onClick={() => handleZoneClick('kaki_kanan')}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Summary */}
      {(focusAreas.length > 0 || avoidAll.length > 0) && (
        <div className="bg-cream rounded-lg p-2.5 sm:p-4 space-y-1.5 sm:space-y-2">
          {focusAreas.length > 0 && (
            <div className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">🟡</span>
              <div>
                <span className="font-medium text-deep-brown text-xs sm:text-sm block sm:inline">Fokus:</span>
                <span className="text-charcoal ml-0 sm:ml-2 text-[10px] sm:text-xs block sm:inline">
                  {focusAreas.map((z) => zoneLabels[z]).join(', ')}
                </span>
              </div>
            </div>
          )}
          {avoidAll.length > 0 && (
            <div className="flex items-start gap-1.5 sm:gap-2">
              <span className="text-sm sm:text-base">🔴</span>
              <div>
                <span className="font-medium text-deep-brown text-xs sm:text-sm block sm:inline">Hindari:</span>
                <span className="text-charcoal ml-0 sm:ml-2 text-[10px] sm:text-xs block sm:inline">
                  {avoidAll.map((z) => zoneLabels[z]).join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
