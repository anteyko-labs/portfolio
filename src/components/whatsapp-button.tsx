"use client";

import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { WHATSAPP_URL } from "@/lib/whatsapp";

// Floating WhatsApp button, stacked right above the CRM chat bubble
// (Chatwoot's launcher sits 20px from the corner and is 64px tall).
// Sits under the cookie banner (z-10000) so it never covers its buttons.
export function WhatsAppButton() {
  const { language } = useLanguage();
  const text = pick({ en: "Hi! I'd like to discuss a project.", ru: "Здравствуйте! Хочу обсудить проект.", zh: "您好！我想谈一个项目。", tr: "Merhaba! Bir proje hakkında konuşmak istiyorum.", ar: "مرحبًا! أود مناقشة مشروع." }, language);
  const href = `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
  const label = pick({ en: "Message us on WhatsApp", ru: "Написать в WhatsApp", zh: "在 WhatsApp 上联系我们", tr: "WhatsApp'tan bize yazın", ar: "راسلنا عبر WhatsApp" }, language);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="wa-button group fixed bottom-[100px] right-5 z-[9990] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
    >
      <span aria-hidden="true" className="wa-button__ring absolute inset-0 rounded-full" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M16.04 3C9.4 3 4 8.33 4 14.9c0 2.1.56 4.15 1.62 5.95L4 27l6.33-1.64a12.2 12.2 0 0 0 5.71 1.43h.01C22.67 26.79 28 21.46 28 14.9 28 8.33 22.68 3 16.04 3Zm0 21.75h-.01c-1.8 0-3.56-.48-5.1-1.38l-.37-.22-3.76.97 1-3.62-.24-.37a9.73 9.73 0 0 1-1.52-5.23c0-5.44 4.48-9.87 10-9.87 2.67 0 5.18 1.03 7.07 2.9a9.73 9.73 0 0 1 2.93 6.98c0 5.45-4.48 9.84-10 9.84Zm5.48-7.38c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.08-.3-.15-1.27-.46-2.42-1.48a9.02 9.02 0 0 1-1.67-2.06c-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.72.22 1.37.19 1.88.12.58-.09 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
      </svg>
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-[#0A0A0F] px-3.5 py-2 text-body-sm font-medium text-white opacity-0 shadow-lg transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        {label}
      </span>
    </a>
  );
}
