import clsx from "clsx";

interface PosterProps {
  title: string;
  label: string;
  domain: string;
  palette: [string, string, string, string];
  className?: string;
}

/** Typographic cover in the project's palette — used when there is no screenshot. */
export function Poster({ title, label, domain, palette, className }: PosterProps) {
  const [bg, fg, accent, soft] = palette;
  return (
    <div
      aria-hidden="true"
      className={clsx("absolute inset-0 flex flex-col justify-between overflow-hidden p-5 md:p-7", className)}
      style={{ background: bg, color: fg }}
    >
      <span
        className="absolute -right-[18%] -bottom-[38%] aspect-square w-[80%] rounded-full border-[28px] opacity-60"
        style={{ borderColor: accent }}
      />
      <span
        className="absolute -right-[4%] -bottom-[16%] aspect-square w-[44%] rounded-full border-[12px] opacity-50"
        style={{ borderColor: soft }}
      />
      <span className="relative flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">
        <span className="truncate">{label}</span>
        <span className="hidden truncate sm:inline">{domain}</span>
      </span>
      <span className="relative max-w-[85%] font-brand text-2xl font-semibold leading-[1.05] tracking-tight md:text-4xl">
        {title}
      </span>
    </div>
  );
}
