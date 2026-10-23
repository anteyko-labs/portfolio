"use client";

import { motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useLanguage } from "@/lib/language-context";
import { pick } from "@/lib/i18n-text";
import "./services-anim.css";
import { Frame, PKG_COLOR, T, r2 } from "./visual-frame";
import { AppStore, AccessGate, AudioRoom, BrandBuild, CarbonLedger, CctvGrid, FinFlow, ParkingGate, UptimeWatch } from "./industry-visuals";

// One small looping scene per package, drawn in code: a site assembling itself,
// a sprint board, a launch curve and a wallet signing a transaction. Each one
// ticks only while on screen; with reduced motion it shows its finished frame.

export type PackageKey = "launch-site" | "mvp-sprint" | "startup-key" | "web3-addon" | "mobile-app" | "time-access" | "parking" | "cctv" | "conference-av" | "fintech" | "carbon-credits" | "it-support" | "branding";

export { PKG_COLOR };

/* ───────────── Quick start: a website assembling itself block by block ───────────── */

const CURSOR = [[40, 36], [96, 56], [80, 80], [42, 98], [240, 76], [160, 124], [300, 146]];

function SiteBuild({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(650);
  const s = reduced ? 9 : tick % 10;
  const on = (i: number) => s > i;
  const live = s >= 7;
  const c = CURSOR[Math.min(s, 6)];
  const blk = (i: number) => ({ initial: false as const, animate: { opacity: on(i) ? 1 : 0, y: on(i) ? 0 : 7 }, transition: T });
  return (
    <Frame id="launch-site" svgRef={ref} className={className} label={pick({ en: "A website assembling itself block by block", ru: "Сайт собирается по блокам", zh: "网站一块一块自行搭建", tr: "Blok blok kendini kuran bir web sitesi", ar: "موقع يبني نفسه كتلةً بعد كتلة" }, language)}>
      <defs>
        <linearGradient id="sv-sb-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="sv-sb-img" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#0E7490" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="304" height="140" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      <line x1="8" x2="312" y1="24" y2="24" stroke="rgba(255,255,255,0.1)" />
      {["#FF5F57", "#FEBC2E", "#28C840"].map((f, i) => (
        <circle key={f} cx={18 + i * 8} cy="15" r="2.5" fill={f} />
      ))}
      <rect x="50" y="10" width="150" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
      <text x="58" y="17.5" fontSize="6.5" fill="rgba(255,255,255,0.55)">🔒 your-brand.com</text>
      {/* status pill */}
      <motion.g initial={false} animate={{ opacity: live ? 1 : 0 }} transition={T}>
        <rect x="252" y="10" width="52" height="10" rx="5" fill="rgba(34,197,94,0.18)" stroke="rgba(74,222,128,0.5)" />
        <circle cx="260" cy="15" r="2" fill="#4ADE80" />
        <text x="266" y="17.5" fontSize="6.5" fill="#86EFAC">{pick({ en: "live", ru: "в сети", zh: "实时", tr: "canlı", ar: "مباشر" }, language)}</text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: live ? 0 : 1 }} transition={T}>
        <circle cx="260" cy="15" r="3" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeDasharray="10 9" className="sv-spin" />
        <text x="267" y="17.5" fontSize="6.5" fill="rgba(255,255,255,0.5)">build</text>
      </motion.g>

      <motion.g {...blk(0)}>
        <rect x="18" y="31" width="24" height="7" rx="2" fill="url(#sv-sb-g)" />
        {[228, 248, 268, 288].map((x) => (
          <rect key={x} x={x} y="33" width="14" height="3.5" rx="1.75" fill="rgba(255,255,255,0.3)" />
        ))}
      </motion.g>
      <motion.g {...blk(1)}>
        <rect x="18" y="47" width="132" height="9" rx="2" fill="#fff" opacity="0.9" />
        <rect x="18" y="59" width="96" height="9" rx="2" fill="url(#sv-sb-g)" />
      </motion.g>
      <motion.g {...blk(2)}>
        <rect x="18" y="74" width="124" height="4" rx="2" fill="rgba(255,255,255,0.28)" />
        <rect x="18" y="81" width="92" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
      </motion.g>
      <motion.g {...blk(3)}>
        <rect x="18" y="92" width="48" height="12" rx="6" fill="url(#sv-sb-g)" />
        <rect x="72" y="92" width="40" height="12" rx="6" fill="none" stroke="rgba(255,255,255,0.3)" />
      </motion.g>
      <motion.g {...blk(4)}>
        <rect x="170" y="44" width="132" height="60" rx="6" fill="url(#sv-sb-img)" />
        <circle cx="270" cy="62" r="7" fill="#FDE68A" opacity="0.85" />
        <path d="M170 104 L205 74 L228 92 L250 78 L302 104 Z" fill="rgba(255,255,255,0.18)" />
      </motion.g>
      <motion.g {...blk(5)}>
        {[18, 114, 210].map((x, i) => (
          <g key={x}>
            <rect x={x} y="112" width="92" height="26" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <rect x={x + 7} y="119" width="10" height="10" rx="3" fill={["#22D3EE", "#818CF8", "#F0ABFC"][i]} opacity="0.8" />
            <rect x={x + 22} y="120" width="46" height="3.5" rx="1.75" fill="rgba(255,255,255,0.45)" />
            <rect x={x + 22} y="127" width="32" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
          </g>
        ))}
      </motion.g>

      {/* performance toast once live */}
      <motion.g initial={false} animate={{ opacity: live ? 1 : 0, y: live ? 0 : 8 }} transition={T}>
        <rect x="196" y="84" width="100" height="16" rx="8" fill="rgba(11,11,20,0.85)" stroke="rgba(74,222,128,0.5)" />
        <text x="205" y="94.5" fontSize="7" fill="#fff">⚡ 100 · SEO ✓ · 0.8s</text>
      </motion.g>

      <motion.g initial={false} animate={{ x: c[0], y: c[1], opacity: live ? 0 : 1 }} transition={{ duration: 0.55, ease: EASE }}>
        <path d="M0 0 L0 11 L3 8.2 L5.6 13 L7.6 12 L5.1 7.4 L9 7.2 Z" fill="#fff" stroke="#0B0B14" strokeWidth="0.8" />
      </motion.g>
    </Frame>
  );
}

/* ───────────── MVP sprint: cards travel To do → Done, ring fills ───────────── */

const COLS = [10, 92, 174];
// [task, column] moves applied at steps 1..8
const MOVES: [number, number][] = [[0, 1], [1, 1], [0, 2], [2, 1], [1, 2], [3, 1], [2, 2], [3, 2]];
const TASK_C = ["#22D3EE", "#A78BFA", "#F472B6", "#FBBF24"];
const RING_C = r2(2 * Math.PI * 24);

function SprintBoard({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(700);
  const s = reduced ? 10 : tick % 11;
  const col = [0, 0, 0, 0];
  MOVES.slice(0, Math.min(s, 8)).forEach(([t, c]) => (col[t] = c));
  const pos = col.map((c, i) => ({ x: COLS[c] + 4, y: 32 + col.slice(0, i).filter((k) => k === c).length * 27 }));
  const done = col.filter((c) => c === 2).length;
  const heads = pick({ en: ["To do", "In progress", "Done"], ru: ["Сделать", "В работе", "Готово"], zh: ["待办", "进行中", "已完成"], tr: ["Yapılacak", "Devam ediyor", "Tamamlandı"], ar: ["قيد الانتظار", "قيد التنفيذ", "مكتمل"] }, language);
  const tasks = pick({ en: ["Auth", "Payments", "Dashboard", "Analytics"], ru: ["Вход", "Оплата", "Дашборд", "Аналитика"], zh: ["认证", "支付", "看板", "数据分析"], tr: ["Kimlik doğrulama", "Ödemeler", "Panel", "Analitik"], ar: ["المصادقة", "المدفوعات", "لوحة المعلومات", "التحليلات"] }, language);
  const shipped = s >= 9;
  return (
    <Frame id="mvp-sprint" svgRef={ref} className={className} label={pick({ en: "Sprint board with tasks moving to done", ru: "Доска спринта: задачи переходят в «Готово»", zh: "任务不断移至“已完成”的冲刺看板", tr: "Görevlerin tamamlandıya geçtiği sprint panosu", ar: "لوحة Sprint تنتقل فيها المهام إلى «مكتمل»" }, language)}>
      {COLS.map((x, i) => (
        <g key={x}>
          <rect x={x} y="10" width="76" height="16" rx="4" fill="rgba(255,255,255,0.06)" />
          <circle cx={x + 8} cy="18" r="2.5" fill={["#94A3B8", "#FBBF24", "#4ADE80"][i]} />
          <text x={x + 14} y="20.5" fontSize="6.5" fill="rgba(255,255,255,0.75)">{heads[i]}</text>
          <text x={x + 70} y="20.5" fontSize="6.5" textAnchor="end" fill="rgba(255,255,255,0.4)">{col.filter((c) => c === i).length}</text>
          <rect x={x} y="29" width="76" height="114" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeDasharray="3 3" />
        </g>
      ))}
      {tasks.map((name, i) => {
        const d = col[i] === 2;
        return (
          <motion.g key={i} initial={false} animate={{ x: pos[i].x, y: pos[i].y }} transition={{ type: "spring", stiffness: 140, damping: 18 }}>
            <rect width="68" height="23" rx="4" fill="#171726" stroke={col[i] === 1 ? "rgba(251,191,36,0.6)" : "rgba(255,255,255,0.12)"} />
            <rect width="2.5" height="23" rx="1.25" fill={d ? "#4ADE80" : TASK_C[i]} />
            <text x="8" y="10" fontSize="6.5" fill="rgba(255,255,255,0.88)">{name}</text>
            <rect x="8" y="14.5" width={22 + i * 5} height="3" rx="1.5" fill="rgba(255,255,255,0.18)" />
            {d ? (
              <path d="M55 11.5 l2.5 2.5 l5 -5.5" fill="none" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <circle cx="59" cy="11.5" r="4" fill={TASK_C[i]} opacity="0.75" />
            )}
          </motion.g>
        );
      })}
      {/* progress ring */}
      <g transform="translate(284 66)">
        <circle r="24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <motion.circle
          r="24"
          fill="none"
          stroke="url(#sv-sp-g)"
          strokeWidth="5"
          strokeLinecap="round"
          transform="rotate(-90)"
          strokeDasharray={RING_C}
          initial={false}
          animate={{ strokeDashoffset: r2(RING_C * (1 - done / 4)) }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <text y="3" fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff">{shipped ? "✓" : `${done * 25}%`}</text>
      </g>
      <defs>
        <linearGradient id="sv-sp-g" x1="0" x2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="1" stopColor="#4ADE80" />
        </linearGradient>
      </defs>
      <text x="284" y="106" fontSize="6.5" textAnchor="middle" fill="rgba(255,255,255,0.55)">{pick({ en: "SPRINT 1", ru: "СПРИНТ 1", zh: "冲刺 1", tr: "SPRINT 1", ar: "SPRINT 1" }, language)}</text>
      <text x="284" y="117" fontSize="6.5" textAnchor="middle" fill="rgba(255,255,255,0.35)">{pick({ en: `day ${Math.min(s + 1, 10)}/10`, ru: `день ${Math.min(s + 1, 10)}/10`, zh: `第 ${Math.min(s + 1, 10)}/10 天`, tr: `gün ${Math.min(s + 1, 10)}/10`, ar: `اليوم ${Math.min(s + 1, 10)}/10` }, language)}</text>
      <motion.g initial={false} animate={{ opacity: shipped ? 1 : 0, y: shipped ? 0 : 6 }} transition={T}>
        <rect x="258" y="124" width="52" height="13" rx="6.5" fill="rgba(34,197,94,0.18)" stroke="rgba(74,222,128,0.55)" />
        <text x="284" y="133" fontSize="6.5" textAnchor="middle" fill="#86EFAC">{pick({ en: "demo ✓", ru: "демо ✓", zh: "演示 ✓", tr: "demo ✓", ar: "عرض ✓" }, language)}</text>
      </motion.g>
    </Frame>
  );
}

/* ───────────── Startup turnkey: a rocket riding the growth curve past milestones ───────────── */

const PTS = [[18, 132], [72, 120], [124, 104], [176, 84], [228, 56], [282, 30]];
const SEG = PTS.slice(1).map((p, i) => Math.hypot(p[0] - PTS[i][0], p[1] - PTS[i][1]));
const CUM = SEG.reduce<number[]>((a, l) => [...a, a[a.length - 1] + l], [0]);
const TOTAL = CUM[CUM.length - 1];
const LINE = PTS.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
const AREA = `${LINE} L282 146 L18 146 Z`;
const USERS = ["0", "120", "1.4k", "8.2k", "31k", "120k"];
const STARS = [[40, 20], [96, 36], [150, 18], [200, 30], [250, 14], [300, 60], [20, 70], [130, 60]];

function LaunchCurve({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(750);
  const s = reduced ? 8 : tick % 9;
  const k = Math.min(s, 5);
  const labels = pick({ en: ["MVP", "Beta", "Launch", "Growth", "Scale"], ru: ["MVP", "Бета", "Запуск", "Рост", "Масштаб"], zh: ["MVP", "Beta", "上线", "增长", "规模化"], tr: ["MVP", "Beta", "Lansman", "Büyüme", "Ölçek"], ar: ["MVP", "Beta", "الإطلاق", "النمو", "التوسّع"] }, language);
  return (
    <Frame id="startup-key" svgRef={ref} className={className} label={pick({ en: "A rocket climbing a growth curve past milestones", ru: "Ракета поднимается по кривой роста через этапы", zh: "火箭沿增长曲线攀升，越过各个里程碑", tr: "Büyüme eğrisinde kilometre taşlarını geçerek yükselen bir roket", ar: "صاروخ يصعد على منحنى النمو متجاوزًا المحطات" }, language)}>
      <defs>
        <linearGradient id="sv-lc-l" x1="0" x2="1">
          <stop offset="0" stopColor="#818CF8" />
          <stop offset="0.6" stopColor="#F472B6" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="sv-lc-a" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#F472B6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F472B6" stopOpacity="0" />
        </linearGradient>
        <clipPath id="sv-lc-clip">
          <motion.rect x="0" y="0" height="150" initial={false} animate={{ width: PTS[k][0] }} transition={{ duration: 0.7, ease: EASE }} />
        </clipPath>
      </defs>
      {STARS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 0.9 : 1.3} fill="#fff" className="sv-twinkle" style={{ animationDelay: `${-i * 0.4}s` }} />
      ))}
      {[46, 76, 106, 136].map((y) => (
        <line key={y} x1="12" x2="308" y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" />
      ))}
      <text x="14" y="22" fontSize="14" fontWeight="700" fill="#fff">{USERS[k]}</text>
      <text x="14" y="32" fontSize="6.5" fill="rgba(255,255,255,0.45)">{pick({ en: "active users", ru: "активных пользователей", zh: "活跃用户", tr: "aktif kullanıcı", ar: "مستخدمون نشطون" }, language)}</text>

      <path d={AREA} fill="url(#sv-lc-a)" clipPath="url(#sv-lc-clip)" />
      <path d={LINE} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="3 4" />
      <motion.path d={LINE} fill="none" stroke="url(#sv-lc-l)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ pathLength: r2(CUM[k] / TOTAL) }} transition={{ duration: 0.7, ease: EASE }} />

      {PTS.slice(1).map(([x, y], i) => {
        const hit = k >= i + 1;
        return (
          <g key={x}>
            {k === i + 1 && !reduced && <circle cx={x} cy={y} r="5" fill="none" stroke="#F472B6" strokeWidth="1.2" className="sv-ping" />}
            <circle cx={x} cy={y} r="3.4" fill={hit ? "#F472B6" : "#0B0B14"} stroke={hit ? "#FDE68A" : "rgba(255,255,255,0.3)"} strokeWidth="1.2" style={{ transition: "fill .4s, stroke .4s" }} />
            <text x={x} y={y + 13} fontSize="6.5" textAnchor="middle" fill={hit ? "#fff" : "rgba(255,255,255,0.3)"} style={{ transition: "fill .4s" }}>
              {labels[i]}
            </text>
          </g>
        );
      })}

      <motion.g initial={false} animate={{ x: PTS[k][0], y: PTS[k][1] - 8 }} transition={{ duration: 0.7, ease: EASE }}>
        <g transform="rotate(50)">
          <ellipse cx="0" cy="8.5" rx="2.2" ry="4" fill="#FDBA74" className="sv-flame" />
          <path d="M0 -10 C4.5 -6 4.5 3 3.2 6.5 L-3.2 6.5 C-4.5 3 -4.5 -6 0 -10 Z" fill="#F8FAFC" />
          <circle cx="0" cy="-2.5" r="1.8" fill="#818CF8" />
          <path d="M-3.2 3 L-6 8 L-3 6.5 Z M3.2 3 L6 8 L3 6.5 Z" fill="#F472B6" />
        </g>
      </motion.g>
    </Frame>
  );
}

/* ───────────── Web3 module: wallet signs a tx, a coin lands, blocks confirm ───────────── */

function WalletTx({ className }: { className?: string }) {
  const { language } = useLanguage();
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(750);
  const s = reduced ? 7 : tick % 9;
  const signed = s >= 2;
  const landed = s >= 4;
  const conf = [0, 0, 0, 0, 1, 4, 8, 12, 12][s];
  const coin = s < 3 ? { x: 46, y: 64, o: 0 } : s === 3 ? { x: 46, y: 64, o: 1 } : { x: 160, y: 66, o: 0 };
  return (
    <Frame id="web3-addon" svgRef={ref} className={className} label={pick({ en: "Wallet signing a transaction that gets confirmed on chain", ru: "Кошелёк подписывает транзакцию, сеть её подтверждает", zh: "钱包签署一笔交易并在链上完成确认", tr: "Bir işlemi imzalayan ve zincirde onaylanan cüzdan", ar: "محفظة توقّع معاملة ثم تُؤكَّد على السلسلة" }, language)}>
      <defs>
        <linearGradient id="sv-w-card" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7C3AED" />
          <stop offset="1" stopColor="#4338CA" />
        </linearGradient>
      </defs>
      {/* tx request */}
      <motion.g initial={false} animate={{ opacity: s >= 1 ? 1 : 0.35 }} transition={T}>
        <rect x="8" y="30" width="78" height="62" rx="7" fill="rgba(255,255,255,0.05)" stroke={signed ? "rgba(74,222,128,0.55)" : "rgba(255,255,255,0.12)"} style={{ transition: "stroke .4s" }} />
        <text x="15" y="43" fontSize="6.5" fill="rgba(255,255,255,0.5)">{pick({ en: "SIGN REQUEST", ru: "ПОДПИСЬ", zh: "签名请求", tr: "İMZA TALEBİ", ar: "طلب توقيع" }, language)}</text>
        <text x="15" y="57" fontSize="10" fontWeight="700" fill="#fff">+1.00 ETH</text>
        <text x="15" y="67" fontSize="6" fill="rgba(255,255,255,0.4)">to 0x7f3a…c9e1</text>
        <rect x="15" y="74" width="64" height="12" rx="6" fill={signed ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)"} style={{ transition: "fill .4s" }} />
        {signed ? (
          <text x="47" y="82.5" fontSize="6.5" textAnchor="middle" fill="#86EFAC">{pick({ en: "signed ✓", ru: "подписано ✓", zh: "已签名 ✓", tr: "imzalandı ✓", ar: "تم التوقيع ✓" }, language)}</text>
        ) : (
          <text x="47" y="82.5" fontSize="6.5" textAnchor="middle" fill="rgba(255,255,255,0.6)">{pick({ en: "awaiting…", ru: "ожидает…", zh: "等待中…", tr: "bekleniyor…", ar: "بانتظار…" }, language)}</text>
        )}
      </motion.g>
      {s === 2 && <circle cx="47" cy="61" r="20" fill="none" stroke="#A78BFA" strokeWidth="1.5" className="sv-ping" />}

      {/* wallet card */}
      <g className="sv-bob">
        <rect x="102" y="26" width="116" height="76" rx="10" fill="url(#sv-w-card)" />
        <rect x="102" y="26" width="116" height="76" rx="10" fill="none" stroke="rgba(255,255,255,0.25)" />
        <rect x="112" y="36" width="14" height="10" rx="2" fill="#FDE68A" opacity="0.85" />
        <text x="208" y="44" fontSize="6.5" textAnchor="end" fill="rgba(255,255,255,0.7)">WALLET</text>
        <text x="112" y="62" fontSize="6.5" fill="rgba(255,255,255,0.6)">{pick({ en: "Balance", ru: "Баланс", zh: "余额", tr: "Bakiye", ar: "الرصيد" }, language)}</text>
        <text x="112" y="77" fontSize="13" fontWeight="700" fill="#fff">{landed ? "3.40" : "2.40"} ETH</text>
        <text x="112" y="93" fontSize="6" fill="rgba(255,255,255,0.5)">0x7f3a…c9e1</text>
        {landed && !reduced && <circle cx="160" cy="64" r="22" fill="none" stroke="#F0ABFC" strokeWidth="1.5" className="sv-ping" />}
      </g>
      <g className="sv-bob" style={{ animationDelay: "-1.3s" }}>
        <circle cx="222" cy="26" r="8" fill="#F7931A" />
        <text x="222" y="29.5" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fff">₿</text>
      </g>
      <g className="sv-bob" style={{ animationDelay: "-2.6s" }}>
        <circle cx="100" cy="102" r="7" fill="#627EEA" />
        <text x="100" y="105.5" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#fff">Ξ</text>
      </g>
      {/* flying coin */}
      <motion.g initial={false} animate={{ x: coin.x, y: coin.y, opacity: coin.o }} transition={{ duration: 0.7, ease: EASE }}>
        <circle r="7" fill="#627EEA" stroke="#fff" strokeWidth="1" />
        <text y="3.2" fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#fff">Ξ</text>
      </motion.g>

      {/* confirmations */}
      <rect x="234" y="30" width="78" height="62" rx="7" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" />
      <text x="241" y="43" fontSize="6.5" fill="rgba(255,255,255,0.5)">{pick({ en: "CONFIRMATIONS", ru: "ПОДТВЕРЖДЕНИЯ", zh: "确认数", tr: "ONAYLAR", ar: "التأكيدات" }, language)}</text>
      <text x="241" y="60" fontSize="12" fontWeight="700" fill="#fff">{conf}/12</text>
      <rect x="241" y="68" width="64" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
      <motion.rect x="241" y="68" height="4" rx="2" fill="#A78BFA" initial={false} animate={{ width: r2((64 * conf) / 12) }} transition={{ duration: 0.6, ease: EASE }} />
      <motion.g initial={false} animate={{ opacity: conf === 12 ? 1 : 0 }} transition={T}>
        <text x="241" y="84" fontSize="6.5" fill="#86EFAC">{pick({ en: "finalized ✓", ru: "финализировано ✓", zh: "已最终确认 ✓", tr: "kesinleşti ✓", ar: "تم الحسم نهائيًا ✓" }, language)}</text>
      </motion.g>

      {/* chain */}
      {Array.from({ length: 6 }, (_, i) => {
        const last = i === 5;
        const x = 14 + i * 50;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: last && !landed ? 0 : 1, y: last && !landed ? 6 : 0 }} transition={T}>
            {i > 0 && <line x1={x - 14} x2={x} y1="129" y2="129" stroke="rgba(167,139,250,0.5)" strokeWidth="1.2" />}
            <rect x={x} y="120" width="36" height="18" rx="4" fill={last ? "rgba(217,70,239,0.3)" : "rgba(255,255,255,0.05)"} stroke={last ? "#F0ABFC" : "rgba(255,255,255,0.14)"} />
            <text x={x + 18} y="131.5" fontSize="6" textAnchor="middle" fill={last ? "#fff" : "rgba(255,255,255,0.45)"}>#{(4091 + i).toString(16)}</text>
          </motion.g>
        );
      })}
    </Frame>
  );
}

export function PackageVisual({ id, className }: { id: string; className?: string }) {
  if (id === "launch-site") return <SiteBuild className={className} />;
  if (id === "mvp-sprint") return <SprintBoard className={className} />;
  if (id === "startup-key") return <LaunchCurve className={className} />;
  if (id === "web3-addon") return <WalletTx className={className} />;
  if (id === "mobile-app") return <AppStore className={className} />;
  if (id === "time-access") return <AccessGate className={className} />;
  if (id === "parking") return <ParkingGate className={className} />;
  if (id === "cctv") return <CctvGrid className={className} />;
  if (id === "conference-av") return <AudioRoom className={className} />;
  if (id === "fintech") return <FinFlow className={className} />;
  if (id === "carbon-credits") return <CarbonLedger className={className} />;
  if (id === "it-support") return <UptimeWatch className={className} />;
  if (id === "branding") return <BrandBuild className={className} />;
  return null;
}
