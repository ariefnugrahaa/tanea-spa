export type ServiceCategory = 'MASSAGE' | 'REFLEXOLOGY' | 'SPA_PACKAGES' | 'SPA_RITUALS';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  composition?: string;
  durations: number[];
  prices: Record<number, number>;
  badge?: string;
}

export const services: Record<ServiceCategory, Service[]> = {
  MASSAGE: [
    {
      id: 'tanea-signature',
      name: 'Tanea Signature Massage',
      category: 'MASSAGE',
      description:
        'Perawatan pijat full body khas Tanea berfokus pada punggung, bahu, dan area tulang belikat untuk relaksasi otot, melancarkan peredaran darah, meredakan pegal dan melepas stress.',
      durations: [90, 120],
      prices: { 90: 185000, 120: 235000 },
    },
    {
      id: 'sundara',
      name: 'Sundara Massage',
      category: 'MASSAGE',
      description:
        'Perawatan pijat full body merata dari kepala hingga kaki efektif mengurangi kelelahan, melancarkan peredaran darah, memberikan rasa nyaman dan rileks.',
      durations: [90, 120],
      prices: { 90: 180000, 120: 230000 },
    },
    {
      id: 'agni-watu',
      name: 'Agni Watu Massage',
      category: 'MASSAGE',
      description:
        'Perawatan pijat full body menggunakan batu panas yang memberikan sensasi hangat yang menenangkan dan membantu merilekskan otot yang tegang.',
      durations: [90],
      prices: { 90: 240000 },
    },
  ],
  REFLEXOLOGY: [
    {
      id: 'reflexology',
      name: 'Reflexology',
      category: 'REFLEXOLOGY',
      description:
        'Perawatan refleksi yang fokus pada penekanan titik-titik saraf pada kaki dan tangan untuk melancarkan sirkulasi, meredakan pegal, dan mengembalikan energi tubuh.',
      durations: [60],
      prices: { 60: 110000 },
    },
    {
      id: 'reflexology-plus',
      name: 'Reflexology Plus',
      category: 'REFLEXOLOGY',
      description:
        'Perawatan refleksi yang lebih menyeluruh dengan tambahan foot scrub serta pijatan area leher dan pundak, untuk menghadirkan pengalaman relaksasi yang lebih lengkap dan mendalam.',
      durations: [90],
      prices: { 90: 130000 },
    },
  ],
  SPA_PACKAGES: [
    {
      id: 'arum',
      name: 'Arum',
      category: 'SPA_PACKAGES',
      composition: 'Sundara Massage + Body Scrub (Jasmine / Coklat / Bengkoang)',
      description:
        'Paket relaksasi Sundara Massage disertai lulur yang membantu merelaksasi tubuh secara mendalam, menghaluskan kulit, serta membuat aroma tubuh terasa lebih harum dan menyegarkan.',
      durations: [90],
      prices: { 90: 215000 },
    },
    {
      id: 'amertha',
      name: 'Amertha',
      category: 'SPA_PACKAGES',
      composition: 'Sundara Massage + Body Mask (Boreh)',
      description:
        'Sundara Massage disertai penggunaan boreh, perawatan tradisional Bali dari rempah dan bahan alami yang memberikan kehangatan pada tubuh serta membantu meregangkan otot.',
      durations: [90],
      prices: { 90: 235000 },
    },
    {
      id: 'padma',
      name: 'Padma',
      category: 'SPA_PACKAGES',
      composition: 'Tanea Signature Massage + Body Scrub (Murut)',
      description:
        'Kombinasi pijat khas Tanea dan masker tubuh (Murut) untuk meredakan pegal, melancarkan sirkulasi, memberikan sensasi hangat, sekaligus mengangkat sel kulit mati dan kotoran.',
      durations: [120],
      prices: { 120: 250000 },
    },
    {
      id: 'samaya',
      name: 'Samaya',
      category: 'SPA_PACKAGES',
      composition: 'Tanea Signature Massage + Berendam (Rempah Bali / Susu)',
      description:
        'Paket relaksasi pijat khas Tanea disertai refleksi dan lulur untuk melepas penat dan melancarkan peredaran darah.',
      durations: [120],
      prices: { 120: 265000 },
    },
    {
      id: 'santika',
      name: 'Santika',
      category: 'SPA_PACKAGES',
      composition: 'Tanea Signature Massage + Refleksi',
      description:
        'Kombinasi pijat khas Tanea dan refleksi untuk relaksasi tubuh, meredakan kelelahan, dan membuat tubuh terasa lebih ringan.',
      durations: [150],
      prices: { 150: 275000 },
    },
    {
      id: 'kayana-rasa',
      name: 'Kayana Rasa',
      category: 'SPA_PACKAGES',
      composition: 'Tanea Signature Massage + Refleksi + Body Mask (Boreh)',
      description:
        'Paket relaksasi mendalam dengan kombinasi pijat, refleksi, dan perawatan boreh tradisional Bali.',
      durations: [180],
      prices: { 180: 345000 },
    },
  ],
  SPA_RITUALS: [
    {
      id: 'tanah-sejahtera',
      name: 'Tanah Sejahtera',
      category: 'SPA_RITUALS',
      composition:
        'Tanea Signature Massage + Body Scrub (Murut) + Body Mask (Boreh) + Berendam (Rempah Bali / Susu)',
      description:
        'Sundara Massage disertai penggunaan boreh, perawatan tradisional Bali dari rempah dan bahan alami yang memberikan kehangatan pada tubuh serta membantu meregangkan otot.',
      durations: [180],
      prices: { 180: 525000 },
    },
    {
      id: 'ayu-rahayu',
      name: 'Ayu Rahayu',
      category: 'SPA_RITUALS',
      composition:
        'Sundara Massage + Body Scrub (Jasmine/Coklat/Bengkoang) + Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu) + Ratus',
      badge: 'Khusus Wanita',
      description:
        'Rangkaian perawatan khusus wanita untuk membantu mempersiapkan tubuh agar terasa lebih rileks, segar, dan terawat menjelang hari istimewa.',
      durations: [180],
      prices: { 180: 510000 },
    },
    {
      id: 'sukha-rasa',
      name: 'Sukha Rasa',
      category: 'SPA_RITUALS',
      composition:
        'Tanea Signature Massage + Refleksi + Body Scrub (Jasmine/Coklat/Bengkoang) + Body Mask (Bengkoang/Strawberry) + Berendam (Rempah Bali/Susu)',
      badge: 'Most Popular',
      description:
        'Paket relaksasi lengkap yang dirancang untuk menikmati waktu perawatan lebih lama dan menyeluruh.',
      durations: [240],
      prices: { 240: 645000 },
    },
  ],
};

export const categoryLabels: Record<ServiceCategory, string> = {
  MASSAGE: 'Massage',
  REFLEXOLOGY: 'Reflexology',
  SPA_PACKAGES: 'Spa Packages',
  SPA_RITUALS: 'Spa Rituals',
};

export function getServiceById(id: string): Service | undefined {
  return Object.values(services).flat().find((s) => s.id === id);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services[category];
}

export function getAllServices(): Service[] {
  return Object.values(services).flat();
}
