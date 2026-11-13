"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link as NextLink } from "@/i18n/navigation";
import { EASE } from "@/components/motion/kit";
import { useReducedMotion } from "@/lib/hooks";

type Tx = (v: { en: string; ru: string }) => string;

const INITIAL = {
  name: "",
  telegram: "",
  phone: "",
  university: "",
  course: "",
  specialty: "",
  level: "",
  job: "",
  goals: "",
  portfolio: "",
  heard: "",
  website: "", // honeypot
};
type Field = keyof typeof INITIAL;

const SRC_KEY = "anteyko-incubator-src";

export function ApplyForm({ tx, channelUrl }: { tx: Tx; channelUrl: string }) {
  const reduced = useReducedMotion();
  const [data, setData] = useState(INITIAL);
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | "interests" | "consent" | "contact", string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [src, setSrc] = useState("");
  const opened = useRef(0);

  // ?src=talk-1311 marks where the student came from; it survives navigation in this tab
  useEffect(() => {
    opened.current = Date.now();
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("src");
      if (fromUrl) sessionStorage.setItem(SRC_KEY, fromUrl.slice(0, 60));
      setSrc(fromUrl || sessionStorage.getItem(SRC_KEY) || "");
    } catch {
      /* storage blocked */
    }
  }, []);

  const set = (f: Field, v: string) => {
    setData((d) => ({ ...d, [f]: v }));
    if (errors[f] || ((f === "telegram" || f === "phone") && errors.contact)) setErrors((e) => ({ ...e, [f]: undefined, contact: undefined }));
  };

  const required = [data.name, data.telegram || data.phone, data.university, data.course, interests.length ? "y" : "", data.level, consent ? "y" : ""];
  const progress = Math.round((required.filter(Boolean).length / required.length) * 100);

  const validate = () => {
    const req = tx({ en: "Required", ru: "Обязательное поле" });
    const e: typeof errors = {};
    if (!data.name.trim()) e.name = req;
    if (!data.telegram.trim() && !data.phone.trim()) e.contact = tx({ en: "Leave Telegram or a phone number", ru: "Оставьте Telegram или телефон" });
    if (data.telegram && !/^@?[a-zA-Z0-9_]{4,32}$/.test(data.telegram.replace(/^https?:\/\/t\.me\//i, "").trim())) e.telegram = tx({ en: "Looks like a wrong username", ru: "Похоже на неверный ник" });
    if (data.phone && data.phone.replace(/\D/g, "").length < 9) e.phone = tx({ en: "Too short", ru: "Слишком короткий номер" });
    if (!data.university.trim()) e.university = req;
    if (!data.course) e.course = req;
    if (!interests.length) e.interests = tx({ en: "Pick at least one", ru: "Выберите хотя бы одно" });
    if (!data.level) e.level = req;
    if (!consent) e.consent = tx({ en: "We need your consent to process the application", ru: "Без согласия мы не сможем обработать заявку" });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector<HTMLElement>("[data-inc-error='true']")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/incubator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, interests, consent, src, elapsed: Date.now() - opened.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const interestOptions = useMemo(
    () => [
      { v: "architecture", l: tx({ en: "System architecture", ru: "Системная архитектура" }) },
      { v: "devops", l: "DevOps" },
      { v: "mvp", l: tx({ en: "MVP and product", ru: "MVP и продукт" }) },
    ],
    [tx],
  );
  const levelOptions = [
    { v: "zero", l: tx({ en: "From scratch", ru: "С нуля" }) },
    { v: "basics", l: tx({ en: "Know the basics", ru: "Знаю основы" }) },
    { v: "projects", l: tx({ en: "Have projects", ru: "Есть свои проекты" }) },
    { v: "work", l: tx({ en: "Have worked", ru: "Уже работал(а)" }) },
  ];
  const jobOptions = [
    { v: "yes", l: tx({ en: "Yes, job or internship", ru: "Да, работу или стажировку" }) },
    { v: "later", l: tx({ en: "Later", ru: "Позже" }) },
    { v: "no", l: tx({ en: "Not now", ru: "Пока нет" }) },
  ];
  const courses = ["1", "2", "3", "4", "5+", tx({ en: "Graduate", ru: "Выпускник" })];

  if (status === "done") return <Success tx={tx} name={data.name.split(" ")[0]} channelUrl={channelUrl} reduced={reduced} />;

  return (
    <form onSubmit={submit} noValidate className="relative rounded-3xl border border-border bg-bg-primary p-5 shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] sm:p-8">
      {/* progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between font-mono text-caption text-text-tertiary">
          <span>{tx({ en: "Application", ru: "Заявка" })}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-bg-tertiary">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-400" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: EASE }} />
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="inc-website">Website</label>
        <input id="inc-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <Group title={tx({ en: "About you", ru: "О вас" })} n="01">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2" data-inc-error={!!errors.name}>
            <Input id="inc-name" label={tx({ en: "Name *", ru: "Имя *" })} autoComplete="name" value={data.name} onChange={(e) => set("name", e.target.value)} error={errors.name} />
          </div>
          <div data-inc-error={!!(errors.telegram || errors.contact)}>
            <Input id="inc-tg" label="Telegram" placeholder="@username" value={data.telegram} onChange={(e) => set("telegram", e.target.value)} error={errors.telegram || errors.contact} />
          </div>
          <div data-inc-error={!!errors.phone}>
            <Input id="inc-phone" label={tx({ en: "Phone", ru: "Телефон" })} type="tel" autoComplete="tel" placeholder="+996 …" value={data.phone} onChange={(e) => set("phone", e.target.value)} error={errors.phone} />
          </div>
        </div>
      </Group>

      <Group title={tx({ en: "Studies", ru: "Учёба" })} n="02">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2" data-inc-error={!!errors.university}>
            <Input id="inc-uni" label={tx({ en: "University *", ru: "Вуз *" })} placeholder={tx({ en: "e.g. AUCA, KSTU, Manas", ru: "Например, АУЦА, КГТУ, Манас" })} value={data.university} onChange={(e) => set("university", e.target.value)} error={errors.university} />
          </div>
          <div data-inc-error={!!errors.course}>
            <p className="mb-2 block text-body-sm font-medium text-text-secondary">{tx({ en: "Year *", ru: "Курс *" })}</p>
            <div className="flex flex-wrap gap-1.5">
              {courses.map((c) => (
                <Pill key={c} on={data.course === c} onClick={() => set("course", c)}>{c}</Pill>
              ))}
            </div>
            {errors.course && <p className="mt-2 text-caption text-error">{errors.course}</p>}
          </div>
          <Input id="inc-spec" label={tx({ en: "Major", ru: "Специальность" })} value={data.specialty} onChange={(e) => set("specialty", e.target.value)} />
        </div>
      </Group>

      <Group title={tx({ en: "What you want", ru: "Что интересно" })} n="03">
        <div className="space-y-6">
          <div data-inc-error={!!errors.interests}>
            <p className="mb-2 text-body-sm font-medium text-text-secondary">{tx({ en: "Tracks * (several is fine)", ru: "Направления * (можно несколько)" })}</p>
            <div className="grid gap-2 sm:grid-cols-3">
              {interestOptions.map((o) => {
                const on = interests.includes(o.v);
                return (
                  <motion.button
                    key={o.v}
                    type="button"
                    aria-pressed={on}
                    whileTap={reduced ? undefined : { scale: 0.96 }}
                    onClick={() => {
                      setInterests((i) => (on ? i.filter((x) => x !== o.v) : [...i, o.v]));
                      setErrors((e) => ({ ...e, interests: undefined }));
                    }}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-body-sm transition-colors ${on ? "border-accent-primary bg-accent-primary/[0.06] text-text-primary" : "border-border text-text-secondary hover:border-border-hover"}`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${on ? "border-accent-primary bg-accent-primary text-white" : "border-border-hover"}`}>
                      <AnimatePresence>
                        {on && (
                          <motion.svg viewBox="0 0 20 20" className="h-3.5 w-3.5" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </span>
                    {o.l}
                  </motion.button>
                );
              })}
            </div>
            {errors.interests && <p className="mt-2 text-caption text-error">{errors.interests}</p>}
          </div>

          <div data-inc-error={!!errors.level}>
            <p className="mb-2 text-body-sm font-medium text-text-secondary">{tx({ en: "Your level *", ru: "Ваш уровень *" })}</p>
            <Segmented options={levelOptions} value={data.level} onChange={(v) => set("level", v)} id="level" reduced={reduced} />
            {errors.level && <p className="mt-2 text-caption text-error">{errors.level}</p>}
          </div>

          <div>
            <p className="mb-2 text-body-sm font-medium text-text-secondary">{tx({ en: "Looking for a job?", ru: "Ищете работу?" })}</p>
            <Segmented options={jobOptions} value={data.job} onChange={(v) => set("job", v)} id="job" reduced={reduced} />
          </div>

          <Textarea id="inc-goals" label={tx({ en: "What do you expect from the incubator?", ru: "Чего ждёте от инкубатора?" })} placeholder={tx({ en: "A couple of lines is enough", ru: "Пары строк достаточно" })} value={data.goals} onChange={(e) => set("goals", e.target.value)} className="min-h-[96px]" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="inc-portfolio" label={tx({ en: "GitHub or portfolio", ru: "GitHub или портфолио" })} placeholder="github.com/…" value={data.portfolio} onChange={(e) => set("portfolio", e.target.value)} />
            <Input id="inc-heard" label={tx({ en: "How did you hear about us?", ru: "Откуда узнали?" })} value={data.heard} onChange={(e) => set("heard", e.target.value)} />
          </div>
        </div>
      </Group>

      <label className="mt-2 flex cursor-pointer items-start gap-3 text-body-sm text-text-secondary" data-inc-error={!!errors.consent}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setErrors((er) => ({ ...er, consent: undefined }));
          }}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-accent-primary)]"
        />
        <span>
          {tx({ en: "I agree to the processing of my personal data under the ", ru: "Согласен(на) на обработку персональных данных по " })}
          <NextLink href="/privacy" className="text-accent-primary underline-offset-2 hover:underline">
            {tx({ en: "privacy policy", ru: "политике конфиденциальности" })}
          </NextLink>
          .{errors.consent && <span className="mt-1 block text-caption text-error">{errors.consent}</span>}
        </span>
      </label>

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" isLoading={status === "sending"} disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? tx({ en: "Sending…", ru: "Отправляем…" }) : tx({ en: "Send application", ru: "Отправить заявку" })}
        </Button>
        <span className="text-caption text-text-tertiary">{tx({ en: "Free. Takes about 2 minutes.", ru: "Бесплатно. Займёт около 2 минут." })}</span>
      </div>
      {status === "error" && (
        <p className="mt-4 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-body-sm text-error" role="alert">
          {tx({ en: "Could not send. Check the connection and try again, or write to us in Telegram.", ru: "Не получилось отправить. Проверьте интернет и попробуйте ещё раз или напишите нам в Telegram." })}
        </p>
      )}
    </form>
  );
}

function Group({ title, n, children }: { title: string; n: string; children: React.ReactNode }) {
  return (
    <fieldset className="mb-8 border-0 p-0">
      <legend className="mb-4 flex items-center gap-3">
        <span className="font-mono text-caption text-accent-primary">{n}</span>
        <span className="font-brand text-heading-sm font-semibold text-text-primary">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`min-w-11 rounded-lg border px-3 py-2 text-body-sm transition-colors ${on ? "border-accent-primary bg-accent-primary text-white" : "border-border text-text-secondary hover:border-border-hover"}`}>
      {children}
    </button>
  );
}

function Segmented({ options, value, onChange, id, reduced }: { options: { v: string; l: string }[]; value: string; onChange: (v: string) => void; id: string; reduced: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-bg-tertiary p-1 sm:flex" role="radiogroup">
      {options.map((o) => {
        const on = value === o.v;
        return (
          <button key={o.v} type="button" role="radio" aria-checked={on} onClick={() => onChange(o.v)} className={`relative flex-1 rounded-lg px-3 py-2 text-body-sm transition-colors ${on ? "text-text-primary" : "text-text-tertiary hover:text-text-secondary"}`}>
            {on && <motion.span layoutId={reduced ? undefined : `seg-${id}`} className="absolute inset-0 rounded-lg bg-bg-primary shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{o.l}</span>
          </button>
        );
      })}
    </div>
  );
}

function Success({ tx, name, channelUrl, reduced }: { tx: Tx; name: string; channelUrl: string; reduced: boolean }) {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <motion.div initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="relative overflow-hidden rounded-3xl border border-border bg-bg-primary p-8 text-center sm:p-12" role="status">
      <div className="relative mx-auto mb-6 h-20 w-20">
        {!reduced &&
          dots.map((i) => {
            const a = (i / dots.length) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
                style={{ background: ["#6366F1", "#D946EF", "#F59E0B", "#10B981"][i % 4] }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ x: Math.cos(a) * 70, y: Math.sin(a) * 70, opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
              />
            );
          })}
        <motion.div initial={reduced ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg viewBox="0 0 20 20" className="h-9 w-9" fill="none">
            <motion.path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
          </svg>
        </motion.div>
      </div>
      <h3 className="font-brand text-heading-lg font-semibold">{tx({ en: `Thank you${name ? `, ${name}` : ""}!`, ru: `Спасибо${name ? `, ${name}` : ""}, заявка у нас` })}</h3>
      <p className="mx-auto mt-3 max-w-md text-body-md text-text-secondary">
        {tx({ en: "We will write to you in Telegram or call within a few days to get acquainted. Meanwhile, follow the news in our channel.", ru: "В ближайшие дни напишем в Telegram или позвоним, чтобы познакомиться. А пока следите за новостями в нашем канале." })}
      </p>
      <a href={channelUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-5 py-3 text-body-md font-medium text-white transition hover:brightness-110">
        <TelegramIcon className="h-5 w-5" />
        {tx({ en: "Anteyko Labs channel", ru: "Telegram-канал Anteyko Labs" })}
      </a>
    </motion.div>
  );
}

export function TelegramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.78 15.27l-.4 4.02c.57 0 .82-.25 1.12-.54l2.68-2.56 5.56 4.07c1.02.56 1.74.27 2.02-.94l3.66-17.15c.33-1.51-.54-2.1-1.53-1.73L1.4 8.62C-.07 9.2-.05 10.03 1.15 10.4l5.5 1.71L19.4 4.06c.6-.4 1.15-.18.7.22" />
    </svg>
  );
}
