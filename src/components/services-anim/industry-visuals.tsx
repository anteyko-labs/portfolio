"use client";

import { motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import { Frame, T, r2 } from "./visual-frame";

// Scenes for the newer services: a phone app going live in the stores, a pass
// opening a turnstile, a payment stream with anti-fraud, carbon tonnes turning
// into retired credits, and an uptime monitor catching an incident. Same rules
// as package-visuals.tsx: they tick only on screen and freeze on the final
// frame with reduced motion.

const MUTED = "rgba(255,255,255,0.45)";
const FAINT = "rgba(255,255,255,0.12)";

/* ───────────── Mobile apps: screens swipe, rating and installs climb ───────────── */

const SCREENS = [
  { c: "#FB923C", rows: [60, 44, 52] },
  { c: "#F472B6", rows: [48, 62, 36] },
  { c: "#FBBF24", rows: [56, 40, 58] },
];

export function AppStore({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(1300);
  const s = reduced ? 5 : tick % 6;
  const screen = s % 3;
  const stars = Math.min(5, s + 1);
  const installs = ["0", "1.2k", "8.4k", "26k", "61k", "120k"][s];
  return (
    <Frame id="mobile-app" svgRef={ref} className={className} label={pick({ en: "An app whose screens swipe while ratings and installs grow", ru: "Экраны приложения листаются, растут рейтинг и загрузки", zh: "应用界面滑动切换，评分与下载量不断增长", tr: "Ekranları kayan, puanı ve indirmeleri artan bir uygulama", ar: "تطبيق تتبدّل شاشاته بينما يرتفع التقييم وعدد التنزيلات" }, language)}>
      {/* phone */}
      <rect x="22" y="8" width="74" height="136" rx="14" fill="#0B0B14" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
      <rect x="47" y="12" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.18)" />
      <svg x="27" y="20" width="64" height="118" overflow="hidden">
        <motion.g initial={false} animate={{ x: -screen * 64 }} transition={{ duration: 0.7, ease: EASE }}>
          {SCREENS.map((sc, i) => (
            <g key={i} transform={`translate(${i * 64} 0)`}>
              <rect x="0" y="0" width="64" height="118" rx="6" fill="rgba(255,255,255,0.04)" />
              <rect x="6" y="6" width="52" height="34" rx="5" fill={sc.c} opacity="0.85" />
              {sc.rows.map((w, j) => (
                <rect key={j} x="6" y={48 + j * 12} width={w * 0.8} height="5" rx="2.5" fill={j === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)"} />
              ))}
              <rect x="6" y="96" width="52" height="14" rx="7" fill={sc.c} />
            </g>
          ))}
        </motion.g>
      </svg>
      {/* page dots */}
      {[0, 1, 2].map((i) => (
        <motion.circle key={i} cy="140" initial={false} animate={{ cx: 52 + i * 8, r: i === screen ? 2.4 : 1.6, opacity: i === screen ? 1 : 0.4 }} transition={T} fill="#fff" />
      ))}

      {/* store listing */}
      <rect x="116" y="18" width="186" height="114" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <rect x="128" y="30" width="30" height="30" rx="8" fill="url(#sv-app-g)" />
      <defs>
        <linearGradient id="sv-app-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FB923C" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect x="166" y="34" width="70" height="6" rx="3" fill="rgba(255,255,255,0.75)" />
      <rect x="166" y="46" width="48" height="5" rx="2.5" fill={MUTED} />
      {[0, 1].map((i) => (
        <g key={i}>
          <rect x={128 + i * 86} y="74" width="78" height="20" rx="6" fill="rgba(255,255,255,0.06)" stroke={FAINT} />
          <text x={134 + i * 86} y="87" fontSize="7" fill="rgba(255,255,255,0.75)">{i ? "Google Play" : "App Store"}</text>
          <motion.circle initial={false} animate={{ opacity: s >= 1 ? 1 : 0 }} transition={T} cx={198 + i * 86} cy="84" r="3" fill="#4ADE80" />
        </g>
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d="M0 -4.5 L1.3 -1.4 L4.6 -1.3 L2 0.8 L2.9 4 L0 2.2 L-2.9 4 L-2 0.8 L-4.6 -1.3 L-1.3 -1.4 Z"
          transform={`translate(${134 + i * 12} 112)`}
          initial={false}
          animate={{ fill: i < stars ? "#FBBF24" : "rgba(255,255,255,0.15)" }}
          transition={T}
        />
      ))}
      <text x="200" y="115" fontSize="7" fill={MUTED}>{pick({ en: "installs", ru: "загрузок", zh: "下载", tr: "indirme", ar: "تنزيل" }, language)}</text>
      <motion.text key={installs} x="290" y="115" fontSize="11" textAnchor="end" fill="#fff" fontWeight="600" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={T}>
        {installs}
      </motion.text>
    </Frame>
  );
}

/* ───────────── Time & access: a pass taps the reader, the gate opens, a log row lands ───────────── */

const PEOPLE = [
  { n: "A. Bekov", t: "08:57" },
  { n: "M. Ito", t: "09:02" },
  { n: "S. Kaya", t: "09:04" },
  { n: "D. Omar", t: "09:11" },
];

export function AccessGate({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(900);
  // 4 phases per person: approach, tap (green), gate open, logged
  const step = reduced ? 3 : tick % 16;
  const person = Math.floor(step / 4);
  const phase = step % 4;
  const tapped = phase >= 1;
  const open = phase === 2;
  const logged = reduced ? PEOPLE.length : person + (phase >= 3 ? 1 : 0);
  const late = (t: string) => t > "09:05";
  return (
    <Frame id="time-access" svgRef={ref} className={className} label={pick({ en: "A pass taps the reader, the turnstile opens and the entry is logged", ru: "Пропуск касается считывателя, турникет открывается, проход записан в журнал", zh: "刷卡后闸机打开，通行记录写入日志", tr: "Kart okuyucuya dokunuyor, turnike açılıyor, geçiş kaydediliyor", ar: "تُمرَّر البطاقة على القارئ فتُفتح البوابة ويُسجَّل الدخول" }, language)}>
      {/* turnstile */}
      <rect x="20" y="40" width="22" height="90" rx="4" fill="rgba(255,255,255,0.08)" stroke={FAINT} />
      <rect x="104" y="40" width="22" height="90" rx="4" fill="rgba(255,255,255,0.08)" stroke={FAINT} />
      <motion.rect x="42" y="78" height="5" rx="2.5" initial={false} animate={{ width: open ? 8 : 62, opacity: open ? 0.4 : 1 }} transition={{ duration: 0.45, ease: EASE }} fill="rgba(255,255,255,0.55)" />
      {/* reader */}
      <rect x="24" y="50" width="14" height="20" rx="3" fill="#0B0B14" stroke="rgba(255,255,255,0.3)" />
      <motion.circle cx="31" cy="56" r="2.6" initial={false} animate={{ fill: tapped ? "#4ADE80" : "#F87171" }} transition={{ duration: 0.25 }} />
      <motion.circle cx="31" cy="60" r="10" fill="none" stroke="#4ADE80" initial={false} animate={{ opacity: phase === 1 ? [0.8, 0] : 0, scale: phase === 1 ? [0.6, 1.6] : 0.6 }} transition={{ duration: 0.8 }} style={{ transformOrigin: "31px 60px" }} />
      {/* pass card */}
      <motion.g initial={false} animate={{ x: phase === 0 ? 70 : 6, y: phase === 0 ? 8 : 0, rotate: phase === 0 ? 12 : 0, opacity: phase >= 2 ? 0 : 1 }} transition={{ duration: 0.6, ease: EASE }}>
        <rect x="20" y="50" width="26" height="17" rx="3" fill="url(#sv-ac-g)" />
        <circle cx="27" cy="57" r="3" fill="rgba(255,255,255,0.7)" />
        <rect x="32" y="55" width="11" height="2.5" rx="1.25" fill="rgba(255,255,255,0.7)" />
        <rect x="32" y="60" width="8" height="2" rx="1" fill="rgba(255,255,255,0.45)" />
      </motion.g>
      <defs>
        <linearGradient id="sv-ac-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <text x="22" y="30" fontSize="7" fill={MUTED}>{pick({ en: "Gate 2 · HQ", ru: "Проход 2 · Офис", zh: "2 号闸机 · 总部", tr: "Geçiş 2 · Merkez", ar: "البوابة 2 · المقر" }, language)}</text>

      {/* time log */}
      <rect x="146" y="14" width="160" height="122" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <text x="156" y="30" fontSize="7.5" fill="rgba(255,255,255,0.8)">{pick({ en: "Timesheet · today", ru: "Табель · сегодня", zh: "考勤表 · 今日", tr: "Puantaj · bugün", ar: "سجل الدوام · اليوم" }, language)}</text>
      {PEOPLE.map((p, i) => (
        <motion.g key={p.n} initial={false} animate={{ opacity: i < logged ? 1 : 0, x: i < logged ? 0 : 10 }} transition={T}>
          <rect x="154" y={40 + i * 23} width="144" height="18" rx="5" fill="rgba(255,255,255,0.05)" />
          <circle cx="164" cy={49 + i * 23} r="4.5" fill={["#2DD4BF", "#818CF8", "#F472B6", "#FBBF24"][i]} opacity="0.85" />
          <text x="174" y={52 + i * 23} fontSize="7" fill="rgba(255,255,255,0.8)">{p.n}</text>
          <text x="236" y={52 + i * 23} fontSize="7" fill={MUTED}>{p.t}</text>
          <text x="290" y={52 + i * 23} fontSize="7" textAnchor="end" fill={late(p.t) ? "#FBBF24" : "#4ADE80"}>
            {late(p.t) ? pick({ en: "late", ru: "опозд.", zh: "迟到", tr: "geç", ar: "تأخر" }, language) : "✓"}
          </text>
        </motion.g>
      ))}
    </Frame>
  );
}

/* ───────────── Fintech: payments stream in, anti-fraud flags one, balance grows ───────────── */

const TX = [
  { a: "+ $1,240", ok: true },
  { a: "− $86.50", ok: true },
  { a: "− $9,900", ok: false },
  { a: "+ $320", ok: true },
  { a: "+ $2,075", ok: true },
];

export function FinFlow({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(1000);
  const s = reduced ? TX.length : tick % (TX.length + 2);
  const shown = Math.min(s, TX.length);
  const bars = [22, 30, 26, 38, 44, 58];
  return (
    <Frame id="fintech" svgRef={ref} className={className} label={pick({ en: "Payments stream in, anti-fraud stops a suspicious one, the balance grows", ru: "Платежи идут потоком, антифрод останавливает подозрительный, баланс растёт", zh: "交易持续流入，反欺诈拦截可疑交易，余额不断增长", tr: "Ödemeler akıyor, dolandırıcılık önleme şüpheliyi durduruyor, bakiye büyüyor", ar: "تتدفق المدفوعات ويوقف نظام مكافحة الاحتيال عملية مشبوهة ويزداد الرصيد" }, language)}>
      <defs>
        <linearGradient id="sv-fin-card" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#EAB308" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* card + balance */}
      <rect x="16" y="14" width="112" height="66" rx="9" fill="url(#sv-fin-card)" />
      <rect x="26" y="26" width="16" height="12" rx="2.5" fill="rgba(255,255,255,0.55)" />
      <text x="26" y="58" fontSize="7" fill="rgba(11,11,20,0.7)">{pick({ en: "Balance", ru: "Баланс", zh: "余额", tr: "Bakiye", ar: "الرصيد" }, language)}</text>
      <motion.text key={shown} x="26" y="72" fontSize="12" fontWeight="700" fill="#0B0B14" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={T}>
        ${(18450 + [0, 1240, 1153, 1153, 1473, 3548][shown]).toLocaleString("en-US")}
      </motion.text>
      {/* bars */}
      {bars.map((h, i) => (
        <motion.rect key={i} x={20 + i * 18} width="10" rx="2" initial={false} animate={{ height: i <= shown ? h : 6, y: 136 - (i <= shown ? h : 6) }} transition={T} fill={i === shown ? "#FACC15" : "rgba(250,204,21,0.35)"} />
      ))}
      {/* KYC */}
      <g transform="translate(116 104)">
        <path d="M0 -12 L10 -8 L10 0 C10 7 5 11 0 13 C-5 11 -10 7 -10 0 L-10 -8 Z" fill="rgba(74,222,128,0.15)" stroke="#4ADE80" />
        <motion.path d="M-4.5 0 L-1 3.5 L5 -3" fill="none" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" initial={false} animate={{ pathLength: shown > 0 ? 1 : 0 }} transition={{ duration: 0.5 }} />
      </g>

      {/* transaction feed */}
      <rect x="146" y="10" width="162" height="130" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      {TX.map((t, i) => {
        const on = i < shown;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : -8 }} transition={T}>
            <rect x="154" y={18 + i * 24} width="146" height="19" rx="5" fill={t.ok ? "rgba(255,255,255,0.05)" : "rgba(248,113,113,0.12)"} stroke={t.ok ? "transparent" : "rgba(248,113,113,0.6)"} />
            <circle cx="164" cy={27.5 + i * 24} r="4" fill={t.ok ? "rgba(255,255,255,0.25)" : "#F87171"} />
            <text x="174" y={30.5 + i * 24} fontSize="7.5" fill="#fff" fontWeight="600">{t.a}</text>
            <text x="294" y={30.5 + i * 24} fontSize="6.5" textAnchor="end" fill={t.ok ? "#4ADE80" : "#FCA5A5"}>
              {t.ok
                ? pick({ en: "approved", ru: "проведён", zh: "已通过", tr: "onaylandı", ar: "مقبولة" }, language)
                : pick({ en: "fraud check", ru: "антифрод", zh: "反欺诈拦截", tr: "dolandırıcılık", ar: "فحص احتيال" }, language)}
            </text>
          </motion.g>
        );
      })}
    </Frame>
  );
}

/* ───────────── Carbon credits: tonnes become verified tokens, then get retired ───────────── */

export function CarbonLedger({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(700);
  const s = reduced ? 9 : tick % 10;
  // tokens travel source → verify → registry; three in flight at once
  const lanes = [0, 1, 2].map((k) => ((s + k * 3) % 9) / 8);
  const retired = 12480 + (reduced ? 9 : tick) * 25;
  return (
    <Frame id="carbon-credits" svgRef={ref} className={className} label={pick({ en: "Tonnes of CO₂ become verified credits and get retired in the registry", ru: "Тонны CO₂ становятся проверенными кредитами и погашаются в реестре", zh: "二氧化碳吨数转化为经核查的信用并在登记簿中注销", tr: "Ton CO₂ doğrulanmış kredilere dönüşüyor ve sicilde iptal ediliyor", ar: "تتحول أطنان CO₂ إلى أرصدة موثّقة وتُلغى في السجل" }, language)}>
      {/* source: forest */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 16} ${96 - (i % 2) * 8})`}>
          <path d="M0 -26 L12 0 L-12 0 Z" fill={["#22C55E", "#16A34A", "#4ADE80"][i]} opacity="0.85" />
          <rect x="-1.5" y="0" width="3" height="8" fill="#854D0E" />
        </g>
      ))}
      <text x="18" y="124" fontSize="7" fill={MUTED}>MRV · 3 {pick({ en: "sites", ru: "объекта", zh: "个站点", tr: "saha", ar: "مواقع" }, language)}</text>

      {/* verify gate */}
      <rect x="138" y="44" width="40" height="52" rx="8" fill="rgba(255,255,255,0.05)" stroke={FAINT} />
      <path d="M150 70 L156 76 L167 63" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" />
      <text x="158" y="108" fontSize="6.5" textAnchor="middle" fill={MUTED}>{pick({ en: "verified", ru: "проверено", zh: "已核查", tr: "doğrulandı", ar: "موثّق" }, language)}</text>

      {/* path */}
      <path d="M78 70 C 110 40, 130 70, 158 70 S 220 100, 250 70" fill="none" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 4" />
      {lanes.map((p, i) => {
        const x = 78 + p * 172;
        const y = 70 + Math.sin(p * Math.PI * 2) * -14;
        const tokenised = p > 0.47;
        return (
          <motion.g key={i} initial={false} animate={{ x, y, opacity: p > 0.96 ? 0 : 1 }} transition={{ duration: 0.65, ease: "linear" }}>
            <circle r="9" fill={tokenised ? "#22C55E" : "rgba(255,255,255,0.12)"} stroke={tokenised ? "#86EFAC" : "rgba(255,255,255,0.35)"} />
            <text y="2.5" fontSize="5.5" textAnchor="middle" fill="#fff">{tokenised ? "1t" : "CO₂"}</text>
          </motion.g>
        );
      })}

      {/* registry */}
      <rect x="226" y="20" width="84" height="112" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <text x="236" y="36" fontSize="7" fill="rgba(255,255,255,0.8)">{pick({ en: "Registry", ru: "Реестр", zh: "登记簿", tr: "Sicil", ar: "السجل" }, language)}</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="236" y={44 + i * 12} width="64" height="8" rx="2" fill={i <= s % 4 ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.06)"} />
      ))}
      <text x="236" y="106" fontSize="6.5" fill={MUTED}>{pick({ en: "retired, tCO₂e", ru: "погашено, тCO₂e", zh: "已注销，tCO₂e", tr: "iptal, tCO₂e", ar: "ملغاة، tCO₂e" }, language)}</text>
      <text x="236" y="122" fontSize="12" fontWeight="700" fill="#86EFAC">{retired.toLocaleString("en-US")}</text>
    </Frame>
  );
}

/* ───────────── IT support: heartbeat, an incident opens and gets resolved under SLA ───────────── */

const BEAT = "M0 40 L40 40 L48 28 L56 52 L64 40 L110 40 L118 30 L126 50 L134 40 L180 40 L188 26 L196 54 L204 40 L250 40 L258 32 L266 48 L274 40 L300 40";

export function UptimeWatch({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(900);
  const s = reduced ? 0 : tick % 8;
  const incident = s >= 2 && s <= 4;
  const resolved = s === 5 || s === 6;
  const services = [
    { n: "API", bad: incident },
    { n: "DB", bad: false },
    { n: "Web", bad: false },
    { n: "Queue", bad: false },
  ];
  return (
    <Frame id="it-support" svgRef={ref} className={className} label={pick({ en: "An uptime monitor catches an incident and it gets resolved within the SLA", ru: "Мониторинг ловит инцидент, его закрывают в рамках SLA", zh: "监控捕获故障，并在 SLA 时限内解决", tr: "İzleme bir olayı yakalıyor ve SLA süresinde çözülüyor", ar: "تلتقط المراقبة حادثًا ويُحلّ ضمن مدة SLA" }, language)}>
      <rect x="10" y="10" width="300" height="66" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <text x="20" y="25" fontSize="7" fill="rgba(255,255,255,0.8)">uptime · 30d</text>
      <text x="300" y="25" fontSize="9" textAnchor="end" fontWeight="700" fill="#93C5FD">99.98%</text>
      <g transform="translate(10 22)">
        <path d={BEAT} fill="none" stroke="rgba(147,197,253,0.18)" strokeWidth="1.5" />
        <motion.path
          key={reduced ? "static" : Math.floor(tick / 8)}
          d={BEAT}
          fill="none"
          stroke={incident ? "#F87171" : "#60A5FA"}
          strokeWidth="1.8"
          initial={{ pathLength: reduced ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 6.8, ease: "linear" }}
        />
      </g>

      {services.map((sv, i) => (
        <g key={sv.n}>
          <rect x={10 + i * 52} y="86" width="46" height="22" rx="6" fill="rgba(255,255,255,0.05)" stroke={sv.bad ? "rgba(248,113,113,0.7)" : FAINT} />
          <motion.circle cx={20 + i * 52} cy="97" r="3" initial={false} animate={{ fill: sv.bad ? "#F87171" : "#4ADE80", opacity: sv.bad ? [1, 0.3, 1] : 1 }} transition={{ duration: 0.8, repeat: sv.bad ? Infinity : 0 }} />
          <text x={28 + i * 52} y="100" fontSize="7" fill="rgba(255,255,255,0.8)">{sv.n}</text>
        </g>
      ))}

      {/* ticket */}
      <motion.g initial={false} animate={{ opacity: incident || resolved ? 1 : 0, x: incident || resolved ? 0 : 12 }} transition={T}>
        <rect x="218" y="84" width="92" height="56" rx="8" fill={resolved ? "rgba(34,197,94,0.12)" : "rgba(248,113,113,0.12)"} stroke={resolved ? "rgba(74,222,128,0.6)" : "rgba(248,113,113,0.6)"} />
        <text x="226" y="98" fontSize="7" fill="#fff" fontWeight="600">INC-214 · API</text>
        <text x="226" y="112" fontSize="6.5" fill={resolved ? "#86EFAC" : "#FCA5A5"}>
          {resolved
            ? pick({ en: "resolved · 14 min", ru: "решено · 14 мин", zh: "已解决 · 14 分钟", tr: "çözüldü · 14 dk", ar: "تم الحل · 14 دقيقة" }, language)
            : pick({ en: "on it · SLA 1 h", ru: "в работе · SLA 1 ч", zh: "处理中 · SLA 1 小时", tr: "üzerinde · SLA 1 sa", ar: "قيد المعالجة · SLA ساعة" }, language)}
        </text>
        <rect x="226" y="120" width="76" height="5" rx="2.5" fill="rgba(255,255,255,0.1)" />
        <motion.rect x="226" y="120" height="5" rx="2.5" initial={false} animate={{ width: resolved ? 76 : s === 2 ? 14 : s === 3 ? 38 : 58 }} transition={T} fill={resolved ? "#4ADE80" : "#F87171"} />
      </motion.g>
      <motion.g initial={false} animate={{ opacity: incident || resolved ? 0 : 1 }} transition={T}>
        <text x="226" y="100" fontSize="7" fill={MUTED}>{pick({ en: "No open incidents", ru: "Инцидентов нет", zh: "暂无故障", tr: "Açık olay yok", ar: "لا حوادث مفتوحة" }, language)}</text>
        <text x="226" y="114" fontSize="7" fill="#86EFAC">{pick({ en: "backup ✓ 03:00", ru: "бэкап ✓ 03:00", zh: "备份 ✓ 03:00", tr: "yedek ✓ 03:00", ar: "نسخ احتياطي ✓ 03:00" }, language)}</text>
      </motion.g>
    </Frame>
  );
}

/* ───────────── Branding: construction grid → logo mark → palette, type, brandbook ───────────── */

const PALETTE = ["#F43F5E", "#FB923C", "#FDE68A", "#0B0B14", "#F5F5F4"];

export function BrandBuild({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(800);
  const s = reduced ? 9 : tick % 10;
  const built = s >= 3; // mark assembled from the construction circles
  const swatches = Math.max(0, Math.min(5, s - 3));
  const typeOn = s >= 6;
  const page = s >= 8 ? 2 : s >= 7 ? 1 : 0;
  return (
    <Frame id="branding" svgRef={ref} className={className} label={pick({ en: "A logo built on a construction grid, then its palette, type and brandbook", ru: "Логотип строится по сетке, затем появляются палитра, шрифт и брендбук", zh: "标志在构图网格上成形，随后出现配色、字体与品牌手册", tr: "Yapı ızgarasında oluşan logo, ardından palet, yazı tipi ve marka kitabı", ar: "شعار يُبنى على شبكة إنشائية ثم تظهر الألوان والخط ودليل الهوية" }, language)}>
      <defs>
        <linearGradient id="sv-br-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#F43F5E" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
      </defs>
      {/* construction grid + circles */}
      <g opacity="0.5">
        {[0, 1, 2, 3].map((i) => (
          <line key={`v${i}`} x1={24 + i * 30} x2={24 + i * 30} y1="16" y2="134" stroke={FAINT} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="14" x2="124" y1={30 + i * 30} y2={30 + i * 30} stroke={FAINT} />
        ))}
      </g>
      {[
        { cx: 54, cy: 60, r: 30 },
        { cx: 84, cy: 60, r: 30 },
        { cx: 69, cy: 86, r: 30 },
      ].map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx}
          cy={c.cy}
          r={c.r}
          fill="none"
          stroke="rgba(251,113,133,0.55)"
          strokeDasharray="3 3"
          initial={false}
          animate={{ pathLength: s >= i ? 1 : 0, opacity: built ? 0.25 : 0.9 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      ))}
      {/* the mark: the overlap of the three circles fills in */}
      <motion.path
        d="M69 56 A30 30 0 0 1 84 82 A30 30 0 0 1 54 82 A30 30 0 0 1 69 56 Z"
        fill="url(#sv-br-g)"
        initial={false}
        animate={{ scale: built ? 1 : 0.2, opacity: built ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        style={{ transformOrigin: "69px 73px" }}
      />
      <motion.text x="69" y="128" fontSize="9" textAnchor="middle" fill="#fff" fontWeight="700" initial={false} animate={{ opacity: built ? 1 : 0, y: built ? 0 : 4 }} transition={T}>
        your brand
      </motion.text>

      {/* palette */}
      <text x="146" y="24" fontSize="7" fill={MUTED}>{pick({ en: "Palette", ru: "Палитра", zh: "配色", tr: "Palet", ar: "الألوان" }, language)}</text>
      {PALETTE.map((c, i) => (
        <motion.rect
          key={c}
          x={146 + i * 32}
          y="30"
          width="26"
          height="26"
          rx="6"
          fill={c}
          stroke="rgba(255,255,255,0.15)"
          initial={false}
          animate={{ opacity: i < swatches ? 1 : 0, y: i < swatches ? 0 : 8 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      ))}

      {/* type */}
      <motion.g initial={false} animate={{ opacity: typeOn ? 1 : 0, x: typeOn ? 0 : -8 }} transition={T}>
        <text x="146" y="92" fontSize="30" fontWeight="700" fill="#fff">Aa</text>
        <rect x="196" y="72" width="70" height="5" rx="2.5" fill="rgba(255,255,255,0.6)" />
        <rect x="196" y="82" width="54" height="4" rx="2" fill={MUTED} />
        <rect x="196" y="90" width="62" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
      </motion.g>

      {/* brandbook pages */}
      <g transform="translate(146 104)">
        {[0, 1, 2].map((i) => (
          <motion.g key={i} initial={false} animate={{ x: i <= page && s >= 7 ? i * 54 : 0, opacity: s >= 7 ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <rect width="48" height="30" rx="4" fill="rgba(255,255,255,0.06)" stroke={FAINT} />
            <rect x="6" y="6" width={[14, 30, 20][i]} height="4" rx="2" fill={["#F43F5E", "rgba(255,255,255,0.5)", "#FB923C"][i]} />
            <rect x="6" y="14" width="34" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
            <rect x="6" y="20" width="26" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
          </motion.g>
        ))}
      </g>
    </Frame>
  );
}

/* ───────────── Parking: the camera reads a plate, the barrier lifts, the car is logged ───────────── */

const CARS = [
  { plate: "01 777 ABK", c: "#38BDF8", t: "09:14", kind: "sub" },
  { plate: "08 215 KGZ", c: "#F472B6", t: "09:21", kind: "paid" },
  { plate: "01 504 AAM", c: "#FBBF24", t: "09:26", kind: "guest" },
] as const;

export function ParkingGate({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(950);
  // 4 phases per car: drive up, plate read, barrier up and drive through, logged
  const step = reduced ? CARS.length * 4 - 1 : tick % (CARS.length * 4);
  const car = Math.floor(step / 4);
  const phase = step % 4;
  const open = phase === 2;
  const logged = reduced ? CARS.length : car + (phase >= 3 ? 1 : 0);
  const x = phase === 0 ? 22 : phase === 1 ? 22 : phase === 2 ? 190 : -80;
  const kind = {
    sub: pick({ en: "subscription", ru: "абонемент", zh: "月卡", tr: "abonelik", ar: "اشتراك" }, language),
    paid: pick({ en: "paid", ru: "оплачено", zh: "已付", tr: "ödendi", ar: "مدفوع" }, language),
    guest: pick({ en: "guest pass", ru: "гостевой", zh: "访客", tr: "misafir", ar: "ضيف" }, language),
  };
  return (
    <Frame id="parking" svgRef={ref} className={className} label={pick({ en: "A camera reads the number plate, the barrier lifts and the car is logged", ru: "Камера считывает номер, шлагбаум поднимается, машина записана в журнал", zh: "摄像头识别车牌，道闸抬起，车辆记录入库", tr: "Kamera plakayı okuyor, bariyer kalkıyor, araç kaydediliyor", ar: "تقرأ الكاميرا اللوحة فيرتفع الحاجز ويُسجَّل دخول السيارة" }, language)}>
      <defs>
        <clipPath id="sv-pk-lane">
          <rect x="8" y="14" width="168" height="122" rx="10" />
        </clipPath>
      </defs>
      <rect x="8" y="14" width="168" height="122" rx="10" fill="rgba(255,255,255,0.03)" stroke={FAINT} />
      <text x="18" y="30" fontSize="7" fill={MUTED}>{pick({ en: "Entry A · level −1", ru: "Въезд A · уровень −1", zh: "A 入口 · 负一层", tr: "Giriş A · kat −1", ar: "المدخل A · الطابق −1" }, language)}</text>
      {/* road */}
      <rect x="8" y="118" width="168" height="2" fill="rgba(255,255,255,0.18)" />
      {[18, 48, 78, 108, 138].map((rx) => (
        <rect key={rx} x={rx} y="127" width="16" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
      ))}
      {/* barrier post and ANPR camera */}
      <rect x="132" y="70" width="9" height="48" rx="2" fill="rgba(255,255,255,0.12)" stroke={FAINT} />
      <rect x="128" y="50" width="17" height="10" rx="3" fill="#0B0B14" stroke="rgba(255,255,255,0.35)" />
      <circle cx="131" cy="55" r="2.2" fill="#38BDF8" />
      <motion.path d="M129 57 L84 101 L84 111 Z" fill="#38BDF8" initial={false} animate={{ opacity: phase === 1 ? 0.22 : 0 }} transition={{ duration: 0.3 }} />
      {/* car */}
      <g clipPath="url(#sv-pk-lane)">
        {/* drives off only once the arm is up; jumps back off-screen for the next car */}
        <motion.g initial={false} animate={{ x }} transition={phase === 3 ? { duration: 0 } : { duration: phase === 2 ? 0.7 : 0.85, delay: phase === 2 ? 0.3 : 0, ease: EASE }}>
          <path d="M2 112 L4 100 Q6 96 12 96 L20 96 L28 86 Q30 84 34 84 L46 84 Q50 84 52 87 L58 96 Q64 97 64 103 L64 112 Z" fill={CARS[car].c} opacity="0.9" />
          <path d="M23 96 L30 88 L40 88 L40 96 Z M43 96 L43 88 L49 88 L54 96 Z" fill="rgba(11,11,20,0.55)" />
          <circle cx="16" cy="113" r="5.5" fill="#0B0B14" stroke="rgba(255,255,255,0.4)" />
          <circle cx="50" cy="113" r="5.5" fill="#0B0B14" stroke="rgba(255,255,255,0.4)" />
          <motion.rect x="52" y="103" width="12" height="6" rx="1.2" fill="#fff" initial={false} animate={{ stroke: phase === 1 ? "#38BDF8" : "rgba(0,0,0,0)" }} strokeWidth="1.2" />
        </motion.g>
      </g>
      {/* barrier arm, pivoting on the post */}
      <g transform="translate(136 82)">
        <motion.g initial={false} animate={{ rotate: open ? 78 : 0 }} transition={{ duration: 0.5, ease: EASE }} style={{ originX: 1, originY: 0.5 }}>
          <rect x="-62" y="-3" width="62" height="6" rx="3" fill="rgba(255,255,255,0.85)" />
          {[-54, -38, -22].map((sx) => (
            <rect key={sx} x={sx} y="-3" width="7" height="6" fill="#F87171" />
          ))}
        </motion.g>
      </g>
      <circle cx="136.5" cy="82" r="3.5" fill="#0B0B14" stroke="rgba(255,255,255,0.5)" />
      {/* plate read-out */}
      <motion.g initial={false} animate={{ opacity: phase === 1 ? 1 : 0, y: phase === 1 ? 0 : 4 }} transition={T}>
        <rect x="18" y="38" width="80" height="16" rx="4" fill="rgba(56,189,248,0.15)" stroke="rgba(56,189,248,0.6)" />
        <text x="24" y="49" fontSize="7.5" fill="#E0F2FE" fontFamily="var(--font-mono)">{CARS[car].plate}</text>
      </motion.g>

      {/* occupancy and log */}
      <rect x="186" y="14" width="124" height="122" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <text x="196" y="30" fontSize="7" fill={MUTED}>{pick({ en: "Free spaces", ru: "Свободно мест", zh: "空余车位", tr: "Boş yer", ar: "أماكن شاغرة" }, language)}</text>
      <text x="196" y="50" fontSize="18" fontWeight="600" fill="#fff">{42 - logged}<tspan fontSize="9" fill={MUTED}> / 120</tspan></text>
      <rect x="196" y="56" width="104" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <motion.rect x="196" y="56" height="4" rx="2" fill="#38BDF8" initial={false} animate={{ width: r2(104 * (78 + logged) / 120) }} transition={T} />
      {CARS.map((c, i) => (
        <motion.g key={c.plate} initial={false} animate={{ opacity: i < logged ? 1 : 0, x: i < logged ? 0 : 10 }} transition={T}>
          <rect x="194" y={68 + i * 21} width="108" height="17" rx="5" fill="rgba(255,255,255,0.05)" />
          <circle cx="203" cy={76.5 + i * 21} r="3.5" fill={c.c} opacity="0.85" />
          <text x="211" y={79 + i * 21} fontSize="6.5" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-mono)">{c.plate}</text>
          <text x="298" y={79 + i * 21} fontSize="6" textAnchor="end" fill={c.kind === "guest" ? "#FBBF24" : "#4ADE80"}>{kind[c.kind]}</text>
        </motion.g>
      ))}
    </Frame>
  );
}

/* ───────────── Video surveillance: four cameras, motion is boxed and an alert lands ───────────── */

const CAMS = [
  { n: { en: "Warehouse", ru: "Склад", zh: "仓库", tr: "Depo", ar: "المستودع" }, e: { en: "Motion", ru: "Движение", zh: "移动", tr: "Hareket", ar: "حركة" }, t: "02:14" },
  { n: { en: "Entrance", ru: "Вход", zh: "入口", tr: "Giriş", ar: "المدخل" }, e: { en: "Face match", ru: "Лицо опознано", zh: "人脸匹配", tr: "Yüz eşleşti", ar: "تطابق وجه" }, t: "08:52" },
  { n: { en: "Parking", ru: "Парковка", zh: "停车场", tr: "Otopark", ar: "الموقف" }, e: { en: "Plate read", ru: "Номер считан", zh: "车牌识别", tr: "Plaka okundu", ar: "قراءة لوحة" }, t: "09:03" },
  { n: { en: "Checkout", ru: "Касса", zh: "收银台", tr: "Kasa", ar: "الصندوق" }, e: { en: "Line crossed", ru: "Пересечение линии", zh: "越线", tr: "Çizgi geçildi", ar: "عبور الخط" }, t: "21:40" },
];
const TILE = [[12, 18], [92, 18], [12, 78], [92, 78]];
const CAM_C = ["#F87171", "#818CF8", "#38BDF8", "#FBBF24"];

export function CctvGrid({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(900);
  // 2 phases per camera: someone moves into view, then the box and the alert
  const step = reduced ? CAMS.length * 2 - 1 : tick;
  const active = Math.floor(step / 2) % CAMS.length;
  const flagged = step % 2 === 1;
  // Events so far; the feed keeps rolling across loops instead of emptying
  const events = reduced ? CAMS.length : Math.floor((step + 1) / 2);
  const recent = Array.from({ length: Math.min(events, 3) }, (_, i) => events - 1 - i);
  return (
    <Frame id="cctv" svgRef={ref} className={className} label={pick({ en: "Four camera feeds; motion is detected, boxed and sent as an alert", ru: "Четыре камеры: движение обнаружено, выделено рамкой и пришло уведомлением", zh: "四路摄像头：检测到移动，框选目标并推送告警", tr: "Dört kamera: hareket algılanıyor, çerçeveleniyor ve uyarı gönderiliyor", ar: "أربع كاميرات: تُكتشف الحركة وتُحدَّد بإطار ويصل تنبيه" }, language)}>
      {TILE.map(([tx, ty], i) => {
        const on = i === active;
        return (
          <g key={i}>
            <motion.rect x={tx} y={ty} width="74" height="54" rx="6" fill="#0B0B14" initial={false} animate={{ stroke: on && flagged ? "#F87171" : "rgba(255,255,255,0.14)" }} strokeWidth="1.2" transition={{ duration: 0.25 }} />
            {/* a simple room: floor line and shelves */}
            <rect x={tx + 4} y={ty + 40} width="66" height="1" fill="rgba(255,255,255,0.12)" />
            <rect x={tx + 8} y={ty + 18} width="16" height="22" rx="1.5" fill="rgba(255,255,255,0.06)" />
            <rect x={tx + 50} y={ty + 22} width="16" height="18" rx="1.5" fill="rgba(255,255,255,0.06)" />
            <text x={tx + 5} y={ty + 10} fontSize="5.5" fill={MUTED} fontFamily="var(--font-mono)">CAM 0{i + 1} · {pick(CAMS[i].n, language)}</text>
            <circle cx={tx + 68} cy={ty + 8} r="2" fill="#EF4444" opacity={reduced || tick % 2 === 0 ? 1 : 0.25} />
            {/* someone walks in, then gets boxed */}
            <motion.g initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : -14 }} transition={{ duration: 0.6, ease: EASE }}>
              <circle cx={tx + 37} cy={ty + 24} r="3.5" fill="rgba(255,255,255,0.75)" />
              <rect x={tx + 33} y={ty + 28.5} width="8" height="11.5" rx="3" fill="rgba(255,255,255,0.6)" />
              <motion.rect x={tx + 29} y={ty + 18} width="16" height="24" rx="2" fill="none" stroke={CAM_C[i]} strokeWidth="1.2" strokeDasharray="3 2" initial={false} animate={{ opacity: on && flagged ? 1 : 0, scale: on && flagged ? 1 : 1.25 }} transition={{ duration: 0.35 }} style={{ originX: 0.5, originY: 0.5 }} />
            </motion.g>
          </g>
        );
      })}

      {/* alert feed */}
      <rect x="174" y="14" width="136" height="122" rx="10" fill="rgba(255,255,255,0.04)" stroke={FAINT} />
      <text x="184" y="30" fontSize="7.5" fill="rgba(255,255,255,0.8)">{pick({ en: "Alerts · live", ru: "События · онлайн", zh: "告警 · 实时", tr: "Uyarılar · canlı", ar: "التنبيهات · مباشر" }, language)}</text>
      <circle cx="300" cy="27.5" r="2.5" fill="#EF4444" opacity={reduced || tick % 2 === 0 ? 1 : 0.3} />
      {recent.map((ev, row) => {
        const ci = ev % CAMS.length;
        return (
        <motion.g key={ev} initial={reduced ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1 - row * 0.25, y: 0 }} transition={T}>
          <rect x="182" y={40 + row * 31} width="120" height="26" rx="6" fill="rgba(255,255,255,0.05)" />
          <rect x="182" y={40 + row * 31} width="3" height="26" rx="1.5" fill={CAM_C[ci]} />
          <text x="191" y={51 + row * 31} fontSize="7" fill="rgba(255,255,255,0.88)">{pick(CAMS[ci].e, language)}</text>
          <text x="191" y={61 + row * 31} fontSize="6" fill={MUTED}>{pick(CAMS[ci].n, language)} · CAM 0{ci + 1}</text>
          <text x="296" y={51 + row * 31} fontSize="6" textAnchor="end" fill={MUTED} fontFamily="var(--font-mono)">{CAMS[ci].t}</text>
        </motion.g>
        );
      })}
    </Frame>
  );
}
