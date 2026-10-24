import type { L } from "@/lib/i18n-text";

// Footer links worded the way people search for these services. One link per
// service page, visible in small type: natural internal linking, not a list of
// repeated keywords.
export const FOOTER_SEARCH_LINKS: { href: string; label: L }[] = [
  { href: "/services/launch-site", label: { en: "Website development in Bishkek", ru: "Разработка сайтов в Бишкеке", zh: "比什凯克网站开发", tr: "Bişkek'te web sitesi geliştirme", ar: "تطوير المواقع في بيشكيك" } },
  { href: "/services/mvp-sprint", label: { en: "MVP development", ru: "Разработка MVP", zh: "MVP 开发", tr: "MVP geliştirme", ar: "تطوير MVP" } },
  { href: "/services/startup-under-key", label: { en: "Turnkey software development", ru: "Разработка ПО под ключ", zh: "软件交钥匙开发", tr: "Anahtar teslim yazılım geliştirme", ar: "تطوير البرمجيات المتكامل" } },
  { href: "/services/mobile-apps", label: { en: "Mobile app development", ru: "Создание мобильных приложений", zh: "移动应用开发", tr: "Mobil uygulama geliştirme", ar: "تطوير تطبيقات الجوال" } },
  { href: "/services/ai-chatbots", label: { en: "AI chatbots for business", ru: "Чат-боты с ИИ для бизнеса", zh: "企业 AI 聊天机器人", tr: "İşletmeler için yapay zekâ botları", ar: "روبوتات محادثة ذكية للأعمال" } },
  { href: "/services/telegram-bots", label: { en: "Order a Telegram bot", ru: "Заказать Telegram-бота", zh: "定制 Telegram 机器人", tr: "Telegram botu sipariş et", ar: "اطلب روبوت Telegram" } },
  { href: "/services/branding", label: { en: "Logo and brand identity", ru: "Разработка логотипа и фирменного стиля", zh: "标志与品牌形象设计", tr: "Logo ve kurumsal kimlik", ar: "تصميم الشعار والهوية" } },
  { href: "/services/time-tracking-access-control", label: { en: "Access control and time tracking", ru: "СКУД и учёт рабочего времени", zh: "门禁与考勤系统", tr: "Geçiş kontrolü ve mesai takibi", ar: "التحكم في الدخول وتتبع الدوام" } },
  { href: "/services/parking-system", label: { en: "Parking automation", ru: "Автоматизация парковки", zh: "停车场自动化", tr: "Otopark otomasyonu", ar: "أتمتة المواقف" } },
  { href: "/services/video-surveillance", label: { en: "Video surveillance for business", ru: "Видеонаблюдение для бизнеса", zh: "企业视频监控", tr: "İşletmeler için video gözetim", ar: "المراقبة بالفيديو للأعمال" } },
  { href: "/services/conference-room-audio", label: { en: "Conference room audio", ru: "Звук для конференц-зала", zh: "会议室音响系统", tr: "Toplantı salonu ses sistemi", ar: "صوتيات قاعة المؤتمرات" } },
  { href: "/services/fintech", label: { en: "Fintech development", ru: "Разработка финтех-продуктов", zh: "金融科技开发", tr: "Fintek geliştirme", ar: "تطوير التكنولوجيا المالية" } },
  { href: "/services/web3-addon", label: { en: "Blockchain development", ru: "Блокчейн-разработка", zh: "区块链开发", tr: "Blokzincir geliştirme", ar: "تطوير البلوكتشين" } },
  { href: "/services/carbon-credits", label: { en: "Carbon credit platforms", ru: "Платформы карбоновых кредитов", zh: "碳信用平台", tr: "Karbon kredisi platformları", ar: "منصات أرصدة الكربون" } },
  { href: "/services/it-support", label: { en: "Website and app support", ru: "Поддержка сайтов и приложений", zh: "网站与应用运维", tr: "Web sitesi ve uygulama desteği", ar: "دعم المواقع والتطبيقات" } },
];

/** The search phrase for a service page, with the city added where it reads naturally */
export function searchTitle(href: string, lang: "en" | "ru" | "zh" | "tr" | "ar"): string | undefined {
  const l = FOOTER_SEARCH_LINKS.find((x) => x.href === href)?.label[lang];
  if (!l) return undefined;
  if (/Бишкек|Bishkek|比什凯克|Bişkek|بيشكيك/.test(l)) return l;
  return { en: `${l} in Bishkek`, ru: `${l} в Бишкеке`, zh: `比什凯克${l}`, tr: `Bişkek'te ${l.charAt(0).toLowerCase()}${l.slice(1)}`, ar: `${l} في بيشكيك` }[lang];
}
