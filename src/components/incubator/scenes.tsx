"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, useLoop } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";

// Interactive mini-trainers for the incubator page. Each one is a small taste of
// the real trainer: click a server down, push a commit, cut an MVP scope.
// All loops pause off screen and stand still with reduced motion.

type Tx = (v: { en: string; ru: string }) => string;

/* ── 1. System architecture: load balancer, services, cache, database ── */

const SERVICES = [
  { id: 0, y: 40 },
  { id: 1, y: 110 },
  { id: 2, y: 180 },
];

/** Calls onSolve once, the first time `solved` turns true */
function useSolved(solved: boolean, onSolve?: () => void) {
  const fired = useRef(false);
  useEffect(() => {
    if (solved && !fired.current) {
      fired.current = true;
      onSolve?.();
    }
  }, [solved, onSolve]);
}

/** The mission line on top of every scene; turns green when it is done */
function Mission({ text, done, tx }: { text: string; done: boolean; tx: Tx }) {
  return (
    <motion.div
      animate={{ borderColor: done ? "rgba(52,211,153,0.55)" : "rgba(129,140,248,0.35)", backgroundColor: done ? "rgba(52,211,153,0.10)" : "rgba(99,102,241,0.08)" }}
      className="mb-4 flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-body-sm"
    >
      <span className={`mt-px shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] ${done ? "text-emerald-300" : "text-indigo-300"}`}>
        {done ? "✓ " + tx({ en: "done", ru: "готово" }) : tx({ en: "mission", ru: "задача" })}
      </span>
      <span className={done ? "text-emerald-100" : "text-white/85"}>{text}</span>
    </motion.div>
  );
}

export function ArchitectureScene({ tx, onSolve }: { tx: Tx; onSolve?: () => void }) {
  const [spike, setSpike] = useState(false);
  const { ref, tick, run } = useLoop<HTMLDivElement>(spike ? 520 : 1300);
  const [down, setDown] = useState<number[]>([]);
  const [cache, setCache] = useState(false);
  const up = SERVICES.filter((s) => !down.includes(s.id));
  const outage = up.length === 0;
  const latency = outage ? null : Math.round((cache ? 38 : 120) * (3 / up.length) ** 0.7 * (spike ? 2 : 1));
  const target = up.length ? up[tick % up.length] : null;
  const toggle = (id: number) => setDown((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const solved = spike && down.length > 0 && latency !== null && latency < 150;
  useSolved(solved, onSolve);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <Mission
        tx={tx}
        done={solved}
        text={tx({ en: "Traffic spike and a dead server at once. Keep p95 under 150 ms.", ru: "Наплыв трафика и упавший сервер одновременно. Удержите p95 ниже 150 мс." })}
      />
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
        <span>{tx({ en: "Click a service to take it down", ru: "Нажмите на сервис, чтобы «уронить» его" })}</span>
        <motion.span key={latency ?? -1} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className={outage ? "text-rose-400" : latency! >= 150 ? "text-amber-300" : "text-emerald-400"}>
          {outage ? "503 · outage" : `p95 ${latency} ms`}
        </motion.span>
      </div>
      <svg viewBox="0 0 400 220" className="h-auto w-full" role="img" aria-label={tx({ en: "Architecture diagram", ru: "Схема архитектуры" })}>
        <defs>
          <linearGradient id="inc-wire" x1="0" x2="1">
            <stop offset="0" stopColor="#818CF8" stopOpacity="0.2" />
            <stop offset="1" stopColor="#818CF8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        {/* wires */}
        <path d="M58 110 H118" stroke="url(#inc-wire)" strokeWidth="2" fill="none" />
        {SERVICES.map((s) => (
          <g key={s.id}>
            <path d={`M162 110 C190 110 190 ${s.y} 218 ${s.y}`} stroke={down.includes(s.id) ? "#f43f5e55" : "url(#inc-wire)"} strokeWidth="2" fill="none" strokeDasharray={down.includes(s.id) ? "4 4" : undefined} />
            <path d={`M282 ${s.y} C310 ${s.y} 310 ${cache ? 70 : 150} 338 ${cache ? 70 : 150}`} stroke={down.includes(s.id) ? "#f43f5e33" : "url(#inc-wire)"} strokeWidth="2" fill="none" />
          </g>
        ))}

        {/* client and load balancer */}
        <Node x={14} y={92} w={44} label="user" />
        <Node x={118} y={92} w={44} label="LB" accent />

        {/* services */}
        {SERVICES.map((s) => {
          const isDown = down.includes(s.id);
          return (
            <g key={s.id} onClick={() => toggle(s.id)} className="cursor-pointer" role="button" tabIndex={0} aria-pressed={isDown} aria-label={`api-${s.id + 1}`} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle(s.id))}>
              <motion.rect x={218} y={s.y - 18} width={64} height={36} rx={9} animate={{ fill: isDown ? "rgba(244,63,94,0.15)" : "rgba(255,255,255,0.06)", stroke: isDown ? "#f43f5e" : "rgba(255,255,255,0.25)" }} strokeWidth="1.2" />
              <text x={250} y={s.y + 4} textAnchor="middle" className="fill-white font-mono text-[11px]">{isDown ? "✕ down" : `api-${s.id + 1}`}</text>
            </g>
          );
        })}

        {/* data layer */}
        <g opacity={cache ? 1 : 0.35}>
          <Node x={338} y={52} w={52} label="cache" accent={cache} />
        </g>
        <Node x={338} y={132} w={52} label="db" />

        {/* request packets */}
        {run && target && (
          <motion.circle
            key={tick}
            r={4}
            fill="#A5B4FC"
            initial={{ cx: 58, cy: 110, opacity: 0 }}
            animate={{ cx: [58, 140, 250, 364], cy: [110, 110, target.y, cache ? 70 : 150], opacity: [0, 1, 1, 0] }}
            transition={{ duration: cache ? 0.9 : 1.2, ease: "easeInOut", times: [0, 0.3, 0.65, 1] }}
          />
        )}
        {run && outage && (
          <motion.text key={`x${tick}`} x={140} y={80} textAnchor="middle" className="fill-rose-400 font-mono text-[11px]" initial={{ opacity: 0, y: 84 }} animate={{ opacity: [0, 1, 0], y: 70 }} transition={{ duration: 0.7 }}>
            503
          </motion.text>
        )}
      </svg>
      <div className="mt-3 flex flex-wrap gap-2">
        <Chip active={spike} onClick={() => setSpike((s) => !s)}>{tx({ en: "🔥 Traffic spike ×2", ru: "🔥 Наплыв трафика ×2" })}</Chip>
        <Chip active={cache} onClick={() => setCache((c) => !c)}>{tx({ en: "Add a cache", ru: "Добавить кэш" })}</Chip>
        <Chip onClick={() => { setDown([]); setCache(false); setSpike(false); }}>{tx({ en: "Reset", ru: "Сбросить" })}</Chip>
      </div>
      <p className="mt-3 text-body-sm text-white/55">
        {solved
          ? tx({ en: "The cache took the reads off the database, so two servers hold double traffic. This is the trade-off you design for.", ru: "Кэш снял чтения с базы, и два сервера держат двойной трафик. Именно такие компромиссы вы будете проектировать." })
          : outage
            ? tx({ en: "All instances are down. In the trainer you will design so that this does not happen.", ru: "Упали все инстансы. В тренажёре вы спроектируете систему так, чтобы этого не случилось." })
            : spike && latency! >= 150
              ? tx({ en: "Too slow under load. What takes the reads off the database?", ru: "Под нагрузкой слишком медленно. Что снимет чтения с базы?" })
              : down.length
                ? tx({ en: "The balancer routes around the failed node, latency grows.", ru: "Балансировщик обходит упавший узел, задержка растёт." })
                : tx({ en: "Requests are spread across three instances. Turn on the spike and drop a server.", ru: "Запросы распределяются по трём инстансам. Включите наплыв и уроните сервер." })}
      </p>
    </div>
  );
}

function Node({ x, y, w, label, accent }: { x: number; y: number; w: number; label: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={36} rx={9} fill={accent ? "rgba(129,140,248,0.18)" : "rgba(255,255,255,0.06)"} stroke={accent ? "#818CF8" : "rgba(255,255,255,0.25)"} strokeWidth="1.2" />
      <text x={x + w / 2} y={y + 22} textAnchor="middle" className="fill-white font-mono text-[11px]">{label}</text>
    </g>
  );
}

/* ── 2. DevOps: a CI/CD pipeline you can run and break ── */

const STAGES = ["commit", "build", "test", "deploy", "monitor"] as const;

export function DevOpsScene({ tx, onSolve }: { tx: Tx; onSolve?: () => void }) {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(-1);
  const [broken, setBroken] = useState(false);
  const [failed, setFailed] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [shipped, setShipped] = useState(false);
  const timers = useRef<number[]>([]);
  // Mission: ship once cleanly, then catch a broken test before it reaches prod
  const solved = shipped && failed;
  useSolved(solved, onSolve);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const lines: Record<(typeof STAGES)[number], string> = {
    commit: "$ git push origin main",
    build: "› docker build -t app:7f3c .  ✓ 14.2s",
    test: "› npm test  ✓ 128 passed",
    deploy: "› kubectl rollout status deploy/app  ✓",
    monitor: "› healthcheck 200 · error rate 0.0%",
  };

  const runPipeline = () => {
    timers.current.forEach(clearTimeout);
    setFailed(false);
    setLog([]);
    setStage(0);
    const step = reduced ? 0 : 750;
    STAGES.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          if (s === "test" && broken) {
            setFailed(true);
            setStage(i);
            setLog((l) => [...l, "› npm test  ✕ 1 failed: auth.spec.ts", "› pipeline stopped, prod untouched"]);
            timers.current.forEach(clearTimeout);
            return;
          }
          setStage(i);
          setLog((l) => [...l, lines[s]]);
          if (i === STAGES.length - 1) setShipped(true);
        }, i * step),
      );
    });
  };

  const running = stage >= 0 && stage < STAGES.length - 1 && !failed;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <Mission
        tx={tx}
        done={solved}
        text={
          shipped || solved
            ? tx({ en: "Step 2 of 2: break a test and make sure the bug never reaches production.", ru: "Шаг 2 из 2: сломайте тест и убедитесь, что баг не доедет до продакшена." })
            : tx({ en: "Step 1 of 2: ship the release to production with git push.", ru: "Шаг 1 из 2: выкатите релиз в продакшен через git push." })
        }
      />
      <div className="flex items-center gap-1.5 sm:gap-2">
        {STAGES.map((s, i) => {
          const done = stage >= i && !(failed && i === stage);
          const bad = failed && i === stage;
          return (
            <div key={s} className="flex flex-1 items-center gap-1.5 sm:gap-2">
              <motion.div
                className="relative flex h-9 flex-1 items-center justify-center rounded-lg border font-mono text-[10px] sm:text-[11px]"
                animate={{
                  backgroundColor: bad ? "rgba(244,63,94,0.18)" : done ? "rgba(52,211,153,0.16)" : "rgba(255,255,255,0.04)",
                  borderColor: bad ? "#f43f5e" : done ? "rgba(52,211,153,0.6)" : "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <span className={bad ? "text-rose-300" : done ? "text-emerald-300" : "text-white/50"}>{s}</span>
                {stage + 1 === i && running && !reduced && (
                  <motion.span className="absolute inset-x-1 bottom-0.5 h-0.5 origin-left rounded bg-indigo-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.75, ease: "linear" }} />
                )}
              </motion.div>
              {i < STAGES.length - 1 && <span className="hidden text-white/25 sm:inline">→</span>}
            </div>
          );
        })}
      </div>

      <div className="mt-4 h-[136px] overflow-hidden rounded-xl bg-black/40 p-3 font-mono text-[11.5px] leading-relaxed" aria-live="polite">
        {log.length === 0 && <span className="text-white/35">{tx({ en: "# press “git push” to run the pipeline", ru: "# нажмите «git push», чтобы запустить пайплайн" })}</span>}
        <AnimatePresence initial={false}>
          {log.map((l, i) => (
            <motion.div key={i + l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={l.includes("✕") || l.includes("stopped") ? "text-rose-300" : "text-white/75"}>
              {l}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" onClick={runPipeline} disabled={running} className="rounded-full bg-indigo-500 px-4 py-1.5 font-mono text-[12px] text-white transition hover:bg-indigo-400 disabled:opacity-50">
          git push
        </button>
        <Chip active={broken} onClick={() => setBroken((b) => !b)}>{tx({ en: "Break a test", ru: "Сломать тест" })}</Chip>
      </div>
      <p className="mt-3 text-body-sm text-white/55">
        {failed
          ? tx({ en: "The pipeline caught the bug before production. That is the point of CI.", ru: "Пайплайн поймал баг до продакшена. Ради этого и нужен CI." })
          : stage === STAGES.length - 1
            ? tx({ en: "Deployed and monitored. Now try breaking a test.", ru: "Выкатили и наблюдаем. Теперь попробуйте сломать тест." })
            : tx({ en: "Build, test, deploy and monitor, all on every push.", ru: "Сборка, тесты, выкатка и мониторинг на каждый push." })}
      </p>
    </div>
  );
}

/* ── 3. MVP: cut the scope to fit four weeks ── */

const FEATURES = [
  { id: "auth", en: "Sign-up and login", ru: "Регистрация и вход", w: 1, core: true },
  { id: "core", en: "The one key action", ru: "Главное действие продукта", w: 1.5, core: true },
  { id: "pay", en: "Payments", ru: "Оплата", w: 1, core: true },
  { id: "chat", en: "In-app chat", ru: "Чат внутри приложения", w: 1.5, core: false },
  { id: "ai", en: "AI recommendations", ru: "AI-рекомендации", w: 2, core: false },
  { id: "dark", en: "Dark theme", ru: "Тёмная тема", w: 0.5, core: false },
  { id: "admin", en: "Simple admin panel", ru: "Простая админка", w: 0.5, core: true },
];
const BUDGET_WEEKS = 4;

export function MvpScene({ tx, lang, onSolve }: { tx: Tx; lang: "en" | "ru"; onSolve?: () => void }) {
  const [picked, setPicked] = useState<string[]>(FEATURES.map((f) => f.id));
  const weeks = useMemo(() => FEATURES.filter((f) => picked.includes(f.id)).reduce((s, f) => s + f.w, 0), [picked]);
  const over = weeks > BUDGET_WEEKS;
  const coreMissing = FEATURES.some((f) => f.core && !picked.includes(f.id));
  const ready = !over && !coreMissing;
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  useSolved(ready, onSolve);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <Mission
        tx={tx}
        done={ready}
        text={tx({ en: "The founder wants everything. Cut the scope to 4 weeks without breaking the product.", ru: "Основатель хочет всё и сразу. Урежьте объём до 4 недель и не сломайте продукт." })}
      />
      <div className="mb-3 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
        <span>{tx({ en: "Fit the MVP into 4 weeks", ru: "Уложите MVP в 4 недели" })}</span>
        <span className={over ? "text-rose-400" : "text-emerald-400"}>
          {weeks.toFixed(1).replace(".0", "")} / {BUDGET_WEEKS} {tx({ en: "wk", ru: "нед" })}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full" animate={{ width: `${Math.min(100, (weeks / 8) * 100)}%`, backgroundColor: over ? "#f43f5e" : "#34d399" }} transition={{ duration: 0.4, ease: EASE }} />
      </div>
      <div className="relative mt-1 h-3">
        <span className="absolute top-0 h-3 w-px bg-white/40" style={{ left: `${(BUDGET_WEEKS / 8) * 100}%` }} />
      </div>

      <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
        {FEATURES.map((f) => {
          const on = picked.includes(f.id);
          return (
            <li key={f.id}>
              <motion.button
                type="button"
                layout
                onClick={() => toggle(f.id)}
                aria-pressed={on}
                whileTap={{ scale: 0.97 }}
                className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-body-sm transition-colors ${on ? "border-indigo-400/60 bg-indigo-500/15 text-white" : "border-white/10 bg-transparent text-white/40 line-through"}`}
              >
                <span>{f[lang]}</span>
                <span className="shrink-0 font-mono text-[11px] text-white/45">{f.w}w</span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence mode="wait">
        <motion.p key={ready ? "ok" : over ? "over" : "core"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className={`mt-3 text-body-sm ${ready ? "text-emerald-300" : "text-white/55"}`}>
          {ready
            ? tx({ en: "🚀 Ready to launch. Everything else goes to version two.", ru: "🚀 Можно запускать. Всё остальное во вторую версию." })
            : coreMissing
              ? tx({ en: "Without this the product does not work. Bring the core back.", ru: "Без этого продукт не работает. Верните ядро." })
              : tx({ en: "Too much for four weeks. What can wait until users ask for it?", ru: "Слишком много на четыре недели. Что подождёт, пока пользователи не попросят?" })}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ── Hero card: a trainer terminal that types tasks ── */

const TASKS = [
  { tag: "architecture", en: "Design a URL shortener for 10k RPS", ru: "Спроектируйте сокращатель ссылок на 10k RPS" },
  { tag: "devops", en: "Set up CI/CD with rollback on failure", ru: "Настройте CI/CD с откатом при ошибке" },
  { tag: "mvp", en: "Launch a booking MVP in 4 weeks", ru: "Запустите MVP бронирования за 4 недели" },
  { tag: "architecture", en: "Where does the cache go and why?", ru: "Куда поставить кэш и зачем?" },
];

export function TrainerTerminal({ tx, lang }: { tx: Tx; lang: "en" | "ru" }) {
  const { ref, tick, reduced } = useLoop<HTMLDivElement>(55);
  const perTask = 110; // ticks per task: typing + pause
  const i = Math.floor(tick / perTask) % TASKS.length;
  const task = TASKS[i];
  const text = task[lang];
  const shown = reduced ? text : text.slice(0, Math.max(0, (tick % perTask) - 4));
  const solved = reduced || tick % perTask > text.length + 30;

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-[11px] text-text-tertiary">trainer — anteyko labs</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px]">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-accent-primary/10 px-2 py-0.5 text-[11px] text-accent-primary">{task.tag}</span>
          <span className="text-text-muted">{tx({ en: "task", ru: "задача" })} {String(i + 1).padStart(2, "0")}/{String(TASKS.length).padStart(2, "0")}</span>
        </div>
        <p className="min-h-[3em] text-text-primary">
          {shown}
          {!reduced && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent-primary" />}
        </p>
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[tx({ en: "design", ru: "схема" }), tx({ en: "review", ru: "ревью" }), tx({ en: "mentor", ru: "ментор" })].map((s, k) => (
            <motion.div
              key={s}
              className="rounded-lg border px-2 py-1.5 text-center text-[11px]"
              animate={{ borderColor: solved ? "rgba(22,163,74,0.5)" : "var(--color-border)", color: solved ? "#16A34A" : "var(--color-text-muted)" }}
              transition={{ delay: solved ? k * 0.15 : 0 }}
            >
              {solved ? "✓ " : ""}
              {s}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chip({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-[12px] transition-colors ${active ? "border-indigo-400 bg-indigo-500/20 text-white" : "border-white/15 text-white/70 hover:border-white/35 hover:text-white"}`}
    >
      {children}
    </button>
  );
}
