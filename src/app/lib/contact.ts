import type { Lang } from "../data/translations";
import { t } from "../data/translations";

const PHONE = "306945209164";

export function getWhatsAppUrl(apartmentTitle: string, lang: Lang = "el"): string {
  const text = t.waMessage[lang](apartmentTitle);
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

export function getWhatsAppUrlGeneral(lang: Lang = "el"): string {
  const text = t.waMessageGeneral[lang];
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

export function getViberUrl(): string {
  return `viber://chat?number=%2B${PHONE}`;
}

export function getViberWebFallbackUrl(): string {
  return `https://chats.viber.com/+${PHONE}`;
}
