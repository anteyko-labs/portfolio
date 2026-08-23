"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { CONSENT_EVENT, CONSENT_KEY } from "@/components/cookie-consent";

declare global {
  interface Window {
    chatwootSDK?: {
      run: (options: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

/** Токен виджета Chatwoot: 24 символа base62, выдаётся при создании инбокса. */
const TOKEN_PATTERN = /^[A-Za-z0-9]{20,40}$/;

const DEFAULT_BASE_URL = "https://crm.anteyko.com";

function safeWidgetToken(): string | null {
  const token = process.env.NEXT_PUBLIC_CRM_WIDGET_TOKEN;
  return token && TOKEN_PATTERN.test(token) ? token : null;
}

/**
 * Адрес CRM переопределяем только на https: подгрузка SDK по http со
 * страницы на https всё равно будет заблокирована браузером как mixed content,
 * и виджет просто не появится — без единой ошибки на странице.
 */
function safeBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_CRM_BASE_URL;
  return url && url.startsWith("https://") ? url.replace(/\/+$/, "") : DEFAULT_BASE_URL;
}

/**
 * Чат поддержки на сайте — веб-виджет Chatwoot из нашей CRM.
 *
 * Токен виджета НЕ секрет: он по устройству уезжает в браузер каждого
 * посетителя. Ограничивает встраивание не он, а список доменов на стороне
 * CRM — он превращается в заголовок `Content-Security-Policy: frame-ancestors`,
 * и с чужого домена виджет не загрузится. Настроен на `anteyko.com` и
 * `www.anteyko.com`; при переезде сайта на новый домен виджет там молча не
 * появится, а в консоли будет прямым текстом про frame-ancestors.
 *
 * ГРУЗИТСЯ ТОЛЬКО ПОСЛЕ ОТВЕТА НА COOKIE-БАННЕР, и причины две.
 *
 * Первая — приличия: виджет пишет в localStorage идентификатор беседы, чтобы
 * переписка не терялась между страницами. Делать это до того, как посетитель
 * ответил на баннер, значит спрашивать разрешение и не ждать ответа.
 *
 * Вторая — вид: пузырь виджета живёт в правом нижнем углу с z-index около
 * 2^31, то есть выше нашего баннера (z-10000). На телефоне баннер занимает всю
 * ширину внизу экрана, и пузырь оказался бы поверх кнопок согласия.
 */
function subscribeToConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange);
  // storage срабатывает в ДРУГИХ вкладках: посетитель, ответивший на баннер в
  // соседней вкладке, получает чат и здесь, без перезагрузки.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

const consentAnsweredNow = () => localStorage.getItem(CONSENT_KEY) !== null;

/** На сервере localStorage нет, и до гидратации чата быть не должно. */
const consentAnsweredOnServer = () => false;

export function CrmWidget() {
  const token = safeWidgetToken();
  const baseUrl = safeBaseUrl();
  // useSyncExternalStore, а не useState+useEffect: состояние живёт в
  // localStorage, то есть снаружи React. Через эффект это дало бы лишний
  // каскадный рендер и не заметило бы ответа из соседней вкладки.
  const consentAnswered = useSyncExternalStore(
    subscribeToConsent,
    consentAnsweredNow,
    consentAnsweredOnServer,
  );

  if (!token || !consentAnswered) return null;

  return (
    <Script
      id="crm-widget"
      src={`${baseUrl}/packs/js/sdk.js`}
      strategy="lazyOnload"
      onLoad={() => {
        window.chatwootSDK?.run({ websiteToken: token, baseUrl });
      }}
    />
  );
}
