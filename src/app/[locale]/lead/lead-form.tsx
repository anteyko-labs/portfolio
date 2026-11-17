"use client";

import { useEffect, useRef, useState } from "react";
import { trackLead } from "@/components/meta-pixel";
import { NEEDS, SPHERES } from "@/lib/lead-options";
import s from "./lead.module.css";

const TRACK_KEY = "al-track";
const TRACK_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "src"];

type Track = Record<string, string>;
type Field = "name" | "phone" | "sphere" | "need";

/** UTM tags from the ad: a new set replaces the old one, kept for the visit. */
function readTrack(): Track {
  let t: Track = {};
  try {
    t = JSON.parse(sessionStorage.getItem(TRACK_KEY) || "{}");
  } catch {
    /* storage blocked */
  }
  const q = new URLSearchParams(window.location.search);
  if (TRACK_PARAMS.some((k) => q.get(k))) {
    t = {};
    for (const k of TRACK_PARAMS) {
      const v = q.get(k);
      if (v) t[k] = v.slice(0, 200);
    }
  }
  if (!t.landing) t.landing = window.location.href.split("#")[0].slice(0, 300);
  if (!t.referrer) t.referrer = (document.referrer || "").slice(0, 300);
  try {
    sessionStorage.setItem(TRACK_KEY, JSON.stringify(t));
  } catch {
    /* storage blocked */
  }
  return t;
}

const phoneOk = (v: string) => {
  const d = v.replace(/\D/g, "").length;
  return d >= 9 && d <= 15;
};

const ERRORS: Record<Field, string> = {
  name: "Напишите, как к Вам обращаться.",
  phone: "Проверьте номер: нужен телефон с кодом страны, например +996 555 123 456.",
  sphere: "Выберите сферу.",
  need: "Выберите, что ближе к Вашей ситуации.",
};

export function LeadForm() {
  const [v, setV] = useState({ name: "", phone: "", sphere: "", need: "", company: "", website: "" });
  const [bad, setBad] = useState<Partial<Record<Field, boolean>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const started = useRef(0);
  const track = useRef<Track>({});
  const doneRef = useRef<HTMLDivElement>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    sphere: useRef<HTMLSelectElement>(null),
    need: useRef<HTMLSelectElement>(null),
  };

  useEffect(() => {
    started.current = Date.now();
    track.current = readTrack();
  }, []);

  useEffect(() => {
    if (state === "done") doneRef.current?.focus();
  }, [state]);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setV((o) => ({ ...o, [k]: e.target.value }));
    if (k in bad) setBad((b) => ({ ...b, [k]: false }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, boolean>> = {
      name: !v.name.trim(),
      phone: !phoneOk(v.phone),
      sphere: !v.sphere,
      need: !v.need,
    };
    setBad(next);
    const first = (Object.keys(refs) as Field[]).find((k) => next[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }

    setState("sending");
    const { landing = "", referrer = "", ...utm } = track.current;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, consent: true, track: utm, landing, referrer, elapsed: Date.now() - started.current }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead({ content_name: "lead-form", content_category: v.sphere });
      setState("done");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className={s.done} ref={doneRef} tabIndex={-1} aria-live="polite">
        <span className={s.okMark}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 className={s.h2}>Заявка принята</h2>
        <p>Менеджер свяжется с&nbsp;Вами в&nbsp;ближайшее рабочее время.</p>
      </div>
    );
  }

  const cls = (f: Field) => `${s.field} ${bad[f] ? s.invalid : ""}`;

  return (
    <div className={s.formView}>
      <h2 id="lead-form-h" className={s.h2}>Заявка</h2>
      <form onSubmit={submit} noValidate className={s.form}>
        <div className={cls("name")}>
          <label htmlFor="f-name">
            Имя <span className={s.req}>*</span>
          </label>
          <input ref={refs.name} type="text" id="f-name" name="name" autoComplete="name" maxLength={120} placeholder="Как к Вам обращаться" value={v.name} onChange={set("name")} aria-invalid={!!bad.name} aria-describedby="e-name" />
          <span className={s.errMsg} id="e-name">{ERRORS.name}</span>
        </div>
        <div className={cls("phone")}>
          <label htmlFor="f-phone">
            Телефон <span className={s.req}>*</span>
          </label>
          <input ref={refs.phone} type="tel" id="f-phone" name="phone" autoComplete="tel" inputMode="tel" maxLength={24} placeholder="+996 ___ ___ ___" value={v.phone} onChange={set("phone")} aria-invalid={!!bad.phone} aria-describedby="e-phone" />
          <span className={s.errMsg} id="e-phone">{ERRORS.phone}</span>
        </div>
        <div className={cls("sphere")}>
          <label htmlFor="f-sphere">
            Сфера бизнеса <span className={s.req}>*</span>
          </label>
          <select ref={refs.sphere} id="f-sphere" name="sphere" className={v.sphere ? "" : s.empty} value={v.sphere} onChange={set("sphere")} aria-invalid={!!bad.sphere} aria-describedby="e-sphere">
            <option value="">Выберите</option>
            {SPHERES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <span className={s.errMsg} id="e-sphere">{ERRORS.sphere}</span>
        </div>
        <div className={cls("need")}>
          <label htmlFor="f-need">
            Что&nbsp;беспокоит <span className={s.req}>*</span>
          </label>
          <select ref={refs.need} id="f-need" name="need" className={v.need ? "" : s.empty} value={v.need} onChange={set("need")} aria-invalid={!!bad.need} aria-describedby="e-need">
            <option value="">Выберите</option>
            {NEEDS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <span className={s.errMsg} id="e-need">{ERRORS.need}</span>
        </div>
        <div className={s.field}>
          <label htmlFor="f-company">
            Название компании <span className={s.opt}>по&nbsp;желанию</span>
          </label>
          <input type="text" id="f-company" name="company" autoComplete="organization" maxLength={160} placeholder="Например: кофейня в центре" value={v.company} onChange={set("company")} />
        </div>
        <div className={s.hp} aria-hidden="true">
          <label>
            Сайт <input type="text" name="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
          </label>
        </div>
        <button className={s.btn} type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Отправляем…" : "Оставить заявку"}
        </button>
        <p className={s.note}>
          Нажимая кнопку, Вы&nbsp;соглашаетесь на&nbsp;обработку данных для&nbsp;связи по&nbsp;заявке.{" "}
          <a href="/ru/privacy" target="_blank" rel="noopener">Политика конфиденциальности</a>
        </p>
        <div className={`${s.status} ${state === "error" ? s.statusErr : ""}`} role="status" aria-live="polite">
          {state === "error" ? "Не получилось отправить заявку. Проверьте интернет и нажмите ещё раз." : ""}
        </div>
      </form>
    </div>
  );
}
