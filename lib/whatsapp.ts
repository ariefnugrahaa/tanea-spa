/**
 * WhatsApp Notification Service using Fonnte API
 *
 * Fonnte API Documentation: https://docs.fonnte.com/
 */

interface WhatsAppNotificationParams {
  type: 'BOOKING_CONFIRMED' | 'WALK_IN_INTAKE' | 'REMINDER' | 'FOLLOW_UP' | 'WAITLIST';
  to: string;
  data: {
    nama: string;
    tanggal?: string;
    jam?: string;
    layanan?: string;
    harga?: number;
    intakeLink?: string;
    [key: string]: any;
  };
}

const FONNTE_API_URL = 'https://api.fonnte.com/send';

export async function sendWhatsAppNotification({
  type,
  to,
  data,
}: WhatsAppNotificationParams): Promise<boolean> {
  const apiToken = process.env.FONNTE_API_TOKEN;

  if (!apiToken) {
    console.warn('FONNTE_API_TOKEN not set, skipping WhatsApp notification');
    return false;
  }

  let message = '';

  switch (type) {
    case 'BOOKING_CONFIRMED':
      message = `Halo ${data.nama}! 🌿

Booking kamu di *Tanea Spa* berhasil dikonfirmasi!

📅 *${data.tanggal}*
🕐 *${data.jam}*
💆 *${data.layanan}*
💰 Rp ${data.harga?.toLocaleString('id-ID')}

Sebelum datang, mohon isi formulir intake kamu:
👉 ${data.intakeLink}

Sampai jumpa dan selamat beristirahat! 🌿
_Resort Level Relaxation_`;
      break;

    case 'WALK_IN_INTAKE':
      message = `Halo ${data.nama}! 🌿 Selamat datang di Tanea Spa.

Silakan isi formulir intake kamu di sini:
👉 ${data.intakeLink}

Formulir ini membantu kami memberikan
perawatan terbaik sesuai kebutuhan kamu.`;
      break;

    case 'REMINDER':
      message = `Halo ${data.nama}! 🌿

Mengingatkan booking kamu *besok*:

📅 *${data.tanggal}*
🕐 *${data.jam}*
💆 *${data.layanan}*

Harap datang 10 menit lebih awal.
Sampai jumpa di Tanea Spa! 🌿`;
      break;

    case 'FOLLOW_UP':
      message = `Terima kasih sudah berkunjung ke Tanea Spa, ${data.nama}! 🌿

Semoga tubuhmu terasa lebih ringan dan segar. ✨

Ceritakan pengalamanmu:
⭐ Google Review: https://g.page/r/xxx/review
📸 Tag kami di Instagram: @tanea.spa

Sampai jumpa di kunjungan berikutnya!
_Resort Level Relaxation_`;
      break;

    case 'WAITLIST':
      message = `Kabar baik, ${data.nama}! 🌿

Ada slot tersedia hari ini:
🕐 Pukul ${data.jam}
💆 ${data.layanan}

Balas *"YA"* dalam 10 menit untuk konfirmasi.`;
      break;

    default:
      console.warn(`Unknown WhatsApp notification type: ${type}`);
      return false;
  }

  try {
    const response = await fetch(FONNTE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': apiToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target: to,
        message: message,
        countryCode: '62', // Indonesia
      }),
    });

    const result = await response.json();

    if (result.status) {
      console.log(`WhatsApp notification sent to ${to}:`, type);
      return true;
    } else {
      console.error('WhatsApp notification failed:', result);
      return false;
    }
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    return false;
  }
}

/**
 * Validate Indonesian phone number format
 */
export function isValidWhatsAppNumber(phone: string): boolean {
  // Remove spaces, dashes, and other non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Check if it starts with 0 or 62 and has 10-13 digits
  const isValid = /^0\d{9,12}$|^62\d{10,13}$/.test(cleaned);

  if (isValid) {
    // Convert to international format if starts with 0
    return cleaned.startsWith('0') ? `62${cleaned.slice(1)}` : cleaned;
  }

  return false;
}
