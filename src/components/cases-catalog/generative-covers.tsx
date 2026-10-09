import { GoMarketScene } from "./go-market-scene";
import { L1Terminal } from "./l1-terminal";

// Illustrated covers for case studies that have no screenshots (NDA work).
// Each is an SVG scene on a 1600×1000 canvas, scaled like `object-fit: cover`.
// Motion lives in globals.css (.gcover …); `data-active` speeds it up on hover.

type CoverProps = { active: boolean };

function Frame({ active, bg, children }: CoverProps & { bg: string; children: React.ReactNode }) {
  return (
    <svg
      className="gcover absolute inset-0 h-full w-full"
      data-active={active}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ background: bg }}
    >
      {children}
    </svg>
  );
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const SANS = "var(--font-manrope), system-ui, sans-serif";

/** Wallets around an RPC node, requests travelling along the links */
function WalletRpc({ active }: CoverProps) {
  const wallets = [
    { x: 300, y: 250, name: "MetaMask", c: "#F6851B" },
    { x: 300, y: 750, name: "Rabby", c: "#8697FF" },
    { x: 1300, y: 250, name: "WalletConnect", c: "#3B99FC" },
    { x: 1300, y: 750, name: "Coinbase", c: "#0052FF" },
    { x: 800, y: 130, name: "Trust", c: "#22D3EE" },
  ];
  return (
    <Frame active={active} bg="radial-gradient(circle at 50% 45%, #1E1B4B 0%, #0B0B14 70%)">
      <defs>
        <pattern id="wr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        </pattern>
        <radialGradient id="wr-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#4F46E5" />
        </radialGradient>
      </defs>
      <rect width="1600" height="1000" fill="url(#wr-grid)" />
      {wallets.map((w, i) => (
        <g key={w.name}>
          <line x1={w.x} y1={w.y} x2="800" y2="520" stroke="#8B5CF6" strokeOpacity="0.35" strokeWidth="3" />
          <line className="gc-flow" x1={w.x} y1={w.y} x2="800" y2="520" stroke={w.c} strokeWidth="5" strokeDasharray="14 46" style={{ animationDelay: `${i * -0.4}s` }} />
          <g className="gc-float" style={{ animationDelay: `${i * -1.1}s` }}>
            <rect x={w.x - 120} y={w.y - 52} width="240" height="104" rx="22" fill="#151528" stroke="#ffffff" strokeOpacity="0.12" />
            <circle cx={w.x - 72} cy={w.y} r="24" fill={w.c} />
            <text x={w.x - 36} y={w.y + 9} fill="#E9E7FF" fontSize="26" fontFamily={SANS} fontWeight="600">{w.name}</text>
          </g>
        </g>
      ))}
      <circle className="gc-pulse" cx="800" cy="520" r="150" fill="#6366F1" fillOpacity="0.18" />
      <circle cx="800" cy="520" r="96" fill="url(#wr-core)" />
      <text x="800" y="512" textAnchor="middle" fill="#fff" fontSize="34" fontWeight="700" fontFamily={MONO}>RPC</text>
      <text x="800" y="550" textAnchor="middle" fill="#E0E7FF" fontSize="20" fontFamily={MONO}>eth_chainId</text>
      {/* sparks around the node */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <circle key={i} className="gc-spark" cx={Math.round(800 + Math.cos(a) * 190)} cy={Math.round(520 + Math.sin(a) * 190)} r="5" fill={i % 2 ? "#22D3EE" : "#C4B5FD"} style={{ animationDelay: `${i * -0.25}s` }} />;
      })}
      {/* signature request */}
      <g className="gc-float" transform="translate(1110 420)" style={{ animationDelay: "-2s" }}>
        <rect width="380" height="200" rx="24" fill="#151528" stroke="#8B5CF6" strokeOpacity="0.5" />
        <text x="28" y="50" fill="#C4B5FD" fontSize="22" fontFamily={MONO}>eth_signTypedData_v4</text>
        <text x="28" y="96" fill="#fff" fontSize="30" fontWeight="700" fontFamily={SANS}>Sign request</text>
        <rect x="28" y="124" width="324" height="14" rx="7" fill="#ffffff" fillOpacity="0.08" />
        <rect className="gc-progress" x="28" y="124" width="324" height="14" rx="7" fill="#8B5CF6" />
        <text x="28" y="176" fill="#34D399" fontSize="22" fontFamily={MONO}>✓ signature valid</text>
      </g>
      <g transform="translate(560 800)">
        <rect width="480" height="150" rx="18" fill="#0F0F1F" stroke="#ffffff" strokeOpacity="0.12" />
        <text x="28" y="50" fill="#22D3EE" fontSize="22" fontFamily={MONO}>{"{ \"jsonrpc\": \"2.0\","}</text>
        <text x="28" y="84" fill="#C4B5FD" fontSize="22" fontFamily={MONO}>{"  \"result\": \"0x2105\" }"}</text>
        <text x="28" y="122" fill="#34D399" fontSize="22" fontFamily={MONO}>✓ 200 · 38 ms</text>
      </g>
    </Frame>
  );
}

/** MVP → Launch → Support: a growth line climbing through three stages */
function StartupLaunch({ active }: CoverProps) {
  const stages = [
    { x: 260, label: "MVP", sub: "4–6 weeks" },
    { x: 760, label: "Launch", sub: "release" },
    { x: 1260, label: "Support", sub: "SLA 24/7" },
  ];
  return (
    <Frame active={active} bg="linear-gradient(160deg, #ECFDF5 0%, #D1FAE5 45%, #A7F3D0 100%)">
      <defs>
        <linearGradient id="sl-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[200, 350, 500, 650, 800].map((y) => (
        <line key={y} x1="120" x2="1480" y1={y} y2={y} stroke="#065F46" strokeOpacity="0.08" strokeWidth="2" />
      ))}
      <path d="M120 800 C 380 780, 520 700, 700 600 S 1060 360, 1480 170 L1480 900 L120 900 Z" fill="url(#sl-area)" />
      <path className="gc-draw" d="M120 800 C 380 780, 520 700, 700 600 S 1060 360, 1480 170" fill="none" stroke="#059669" strokeWidth="10" strokeLinecap="round" pathLength={1} />
      {stages.map((s, i) => (
        <g key={s.label} className="gc-rise" style={{ animationDelay: `${0.2 + i * 0.25}s` }}>
          <rect x={s.x} y={i === 0 ? 560 : i === 1 ? 400 : 230} width="300" height="150" rx="26" fill="#ffffff" stroke="#065F46" strokeOpacity="0.1" />
          <circle cx={s.x + 52} cy={(i === 0 ? 560 : i === 1 ? 400 : 230) + 75} r="26" fill="#059669" />
          <text x={s.x + 52} y={(i === 0 ? 560 : i === 1 ? 400 : 230) + 84} textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700" fontFamily={SANS}>{i + 1}</text>
          <text x={s.x + 98} y={(i === 0 ? 560 : i === 1 ? 400 : 230) + 72} fill="#064E3B" fontSize="40" fontWeight="700" fontFamily={SANS}>{s.label}</text>
          <text x={s.x + 98} y={(i === 0 ? 560 : i === 1 ? 400 : 230) + 108} fill="#047857" fontSize="24" fontFamily={MONO}>{s.sub}</text>
        </g>
      ))}
      <g className="gc-float" transform="translate(1380 110)">
        <circle r="44" fill="#059669" />
        <path d="M-14 12 L0 -20 L14 12 L0 4 Z" fill="#fff" />
      </g>
    </Frame>
  );
}

/** Invoices pass under a scanning beam, extracted fields appear on the right */
function AiAccounting({ active }: CoverProps) {
  const fields = [
    ["Vendor", "Northwind Supply"],
    ["Total", "$ 128,450.00"],
    ["Tax", "$ 21,408.33"],
    ["GL account", "2100 · AP"],
  ];
  return (
    <Frame active={active} bg="linear-gradient(135deg, #F0FDF4 0%, #ECFEFF 100%)">
      <g transform="translate(170 140) rotate(-6)">
        <rect width="560" height="720" rx="24" fill="#fff" stroke="#0F766E" strokeOpacity="0.12" />
        <rect x="48" y="56" width="220" height="28" rx="8" fill="#134E4A" />
        {[140, 190, 240, 290, 340, 420, 470, 520, 570].map((y, i) => (
          <rect key={y} x="48" y={y} width={i % 3 === 2 ? 300 : 464} height="16" rx="8" fill="#CCFBF1" />
        ))}
        <rect x="320" y="620" width="192" height="52" rx="12" fill="#14B8A6" fillOpacity="0.15" stroke="#14B8A6" />
        <text x="416" y="655" textAnchor="middle" fill="#0F766E" fontSize="24" fontWeight="700" fontFamily={MONO}>TOTAL</text>
        <g className="gc-scan">
          <rect x="-20" y="0" width="600" height="6" fill="#14B8A6" />
          <rect x="-20" y="-80" width="600" height="80" fill="#14B8A6" fillOpacity="0.12" />
        </g>
      </g>
      <g transform="translate(860 180)">
        <text x="0" y="0" fill="#134E4A" fontSize="30" fontWeight="700" fontFamily={SANS}>Auto-extracted fields</text>
        {fields.map(([k, v], i) => (
          <g key={k} className="gc-rise" transform={`translate(0 ${50 + i * 132})`} style={{ animationDelay: `${0.15 + i * 0.18}s` }}>
            <rect width="580" height="108" rx="20" fill="#fff" stroke="#0F766E" strokeOpacity="0.12" />
            <text x="32" y="44" fill="#5EEAD4" fontSize="22" fontFamily={MONO}>{k}</text>
            <text x="32" y="82" fill="#0F172A" fontSize="32" fontWeight="700" fontFamily={SANS}>{v}</text>
            <circle cx="532" cy="54" r="20" fill="#14B8A6" />
            <path d="M522 54 l7 7 l13 -14" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </g>
    </Frame>
  );
}

/** BI dashboard: KPI tiles, bars, and a forecast line running ahead of the data */
function AnalyticsBi({ active }: CoverProps) {
  const bars = [320, 420, 380, 520, 480, 610, 560, 700];
  return (
    <Frame active={active} bg="linear-gradient(160deg, #EEF2FF 0%, #F5F3FF 50%, #ECFEFF 100%)">
      <rect x="110" y="90" width="1380" height="820" rx="36" fill="#ffffff" stroke="#4338CA" strokeOpacity="0.08" />
      {[
        ["Revenue", "$ 48.2M", "#4F46E5"],
        ["Margin", "31.4%", "#0EA5E9"],
        ["Q4 forecast", "+12%", "#10B981"],
      ].map(([k, v, c], i) => (
        <g key={k} className="gc-rise" transform={`translate(${170 + i * 440} 150)`} style={{ animationDelay: `${i * 0.12}s` }}>
          <rect width="400" height="150" rx="22" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="28" y="30" width="10" height="90" rx="5" fill={c} />
          <text x="62" y="62" fill="#64748B" fontSize="24" fontFamily={MONO}>{k}</text>
          <text x="62" y="112" fill="#0F172A" fontSize="44" fontWeight="800" fontFamily={SANS}>{v}</text>
        </g>
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          className="gc-bar"
          x={200 + i * 120}
          y={850 - h * 0.62}
          width="70"
          height={h * 0.62}
          rx="12"
          fill={i === bars.length - 1 ? "#4F46E5" : "#C7D2FE"}
          style={{ animationDelay: `${i * 0.06}s` }}
        />
      ))}
      <path className="gc-draw" d="M235 680 C 400 640, 520 650, 640 600 S 900 520, 1000 470 S 1150 420, 1200 400" fill="none" stroke="#4F46E5" strokeWidth="8" strokeLinecap="round" pathLength={1} />
      <path className="gc-dash" d="M1200 400 C 1290 370, 1360 330, 1430 300" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="18 16" strokeLinecap="round" />
      <circle className="gc-pulse" cx="1430" cy="300" r="22" fill="#10B981" />
      <text x="1300" y="260" fill="#047857" fontSize="24" fontWeight="700" fontFamily={MONO}>forecast</text>
    </Frame>
  );
}


// ── Geo heatmap: isometric 3D hex columns ───────────────────────
// A city plane seen at an angle; every hex bin is a prism whose height is
// the event density there (a few gaussian hotspots, deterministic so the
// server and client render identical SVG). Columns rise in a wave and breathe.
const GROUND = 780;
const HOTSPOTS = [
  { x: 250, y: 300, r: 120, w: 1 },
  { x: 520, y: 480, r: 110, w: 0.85 },
  { x: 560, y: 180, r: 90, w: 0.6 },
  { x: 200, y: 620, r: 95, w: 0.5 },
  { x: 680, y: 660, r: 80, w: 0.45 },
];
const HEAT = ["#312E81", "#4F46E5", "#7C3AED", "#DB2777", "#F97316", "#FACC15"];
const HEX_R = 30;
const ISO_X = 800;
const ISO_Y = 250;
const MAX_H = 300;
const iso = (x: number, y: number, h = 0): [number, number] => [ISO_X + (x - y) * 0.9, ISO_Y + (x + y) * 0.46 - h];
const r1 = (n: number) => Math.round(n * 10) / 10;

type Column = { key: string; top: string; sides: string[]; color: string; shade: string[]; base: [number, number]; delay: number; v: number };
const COLUMNS: Column[] = (() => {
  const cols: (Column & { depth: number })[] = [];
  const w = Math.sqrt(3) * HEX_R;
  const hStep = 1.5 * HEX_R;
  for (let row = 0; row * hStep <= GROUND; row++) {
    for (let col = 0; col * w <= GROUND; col++) {
      const x = col * w + (row % 2 ? w / 2 : 0);
      const y = row * hStep;
      let v = 0;
      for (const s of HOTSPOTS) v += s.w * Math.exp(-((x - s.x) ** 2 + (y - s.y) ** 2) / (2 * s.r * s.r));
      v = Math.round(Math.min(1, v) * 1000) / 1000;
      const h = 6 + Math.pow(v, 1.3) * MAX_H;
      const corners = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        return [x + (HEX_R - 2) * Math.cos(a), y + (HEX_R - 2) * Math.sin(a)] as [number, number];
      });
      const top = corners.map(([cx, cy]) => iso(cx, cy, h));
      const bottom = corners.map(([cx, cy]) => iso(cx, cy, 0));
      const sides: string[] = [];
      const shadeIdx: number[] = [];
      for (let i = 0; i < 6; i++) {
        const j = (i + 1) % 6;
        // faces whose bottom edge is in front of the centre are visible
        const midY = (bottom[i][1] + bottom[j][1]) / 2;
        if (midY <= iso(x, y)[1]) continue;
        sides.push(`M${r1(bottom[i][0])} ${r1(bottom[i][1])} L${r1(bottom[j][0])} ${r1(bottom[j][1])} L${r1(top[j][0])} ${r1(top[j][1])} L${r1(top[i][0])} ${r1(top[i][1])}Z`);
        shadeIdx.push((bottom[j][0] - bottom[i][0]) > 0 ? 0 : 1);
      }
      const color = HEAT[Math.min(HEAT.length - 1, Math.floor(v * HEAT.length))];
      const dist = Math.min(...HOTSPOTS.map((s) => Math.hypot(x - s.x, y - s.y)));
      cols.push({
        key: `${row}-${col}`,
        top: top.map(([px, py], i) => `${i ? "L" : "M"}${r1(px)} ${r1(py)}`).join(" ") + "Z",
        sides,
        color,
        shade: shadeIdx.map((k) => (k ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)")),
        base: iso(x, y).map(r1) as [number, number],
        delay: Math.round(dist * 4) / 1000,
        v,
        depth: x + y,
      });
    }
  }
  return cols.sort((a, b) => a.depth - b.depth);
})();

function GeoHeatmap({ active }: CoverProps) {
  const ground = [iso(0, 0), iso(GROUND, 0), iso(GROUND, GROUND), iso(0, GROUND)];
  const peaks = HOTSPOTS.slice(0, 3).map((s) => iso(s.x, s.y, 6 + Math.pow(Math.min(1, s.w), 1.3) * MAX_H + 40).map(r1));
  return (
    <Frame active={active} bg="radial-gradient(circle at 50% 35%, #1B1A3A 0%, #07070F 75%)">
      <defs>
        <filter id="geo-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" />
        </filter>
      </defs>
      {/* ground plane with a street grid */}
      <path d={`M${ground.map((p) => p.map(r1).join(" ")).join(" L")}Z`} fill="#0E0E22" stroke="#6366F1" strokeOpacity="0.25" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => (i + 1) * (GROUND / 10)).map((t) => {
        const [a1, b1] = [iso(t, 0), iso(t, GROUND)];
        const [a2, b2] = [iso(0, t), iso(GROUND, t)];
        return (
          <g key={t} stroke="#A5B4FC" strokeOpacity="0.08" strokeWidth="2">
            <line x1={a1[0]} y1={a1[1]} x2={b1[0]} y2={b1[1]} />
            <line x1={a2[0]} y1={a2[1]} x2={b2[0]} y2={b2[1]} />
          </g>
        );
      })}
      {/* heat glow on the ground */}
      <g filter="url(#geo-glow)" opacity="0.7">
        {HOTSPOTS.map((s) => {
          const [gx, gy] = iso(s.x, s.y);
          return <ellipse key={`${s.x}-${s.y}`} cx={gx} cy={gy} rx={s.r * 1.3} ry={s.r * 0.65} fill="#DB2777" opacity={s.w * 0.8} />;
        })}
      </g>
      {/* columns, back to front */}
      {COLUMNS.map((c) => (
        <g
          key={c.key}
          className="geo-col"
          style={{ transformOrigin: `${c.base[0]}px ${c.base[1]}px`, animationDelay: `${c.delay}s` }}
        >
          {c.sides.map((d, i) => (
            <g key={i}>
              <path d={d} fill={c.color} />
              <path d={d} fill={c.shade[i]} />
            </g>
          ))}
          <path d={c.top} fill={c.color} stroke="#ffffff" strokeOpacity={r1(0.08 + c.v * 0.3)} strokeWidth="1.5" />
        </g>
      ))}
      {/* pins over the three busiest areas */}
      {peaks.map(([px, py], i) => (
        <g key={i} className="geo-pin" transform={`translate(${px} ${py})`} style={{ animationDelay: `${i * -0.7}s` }}>
          <circle className="gc-ring" r="18" fill="none" stroke="#FACC15" strokeWidth="4" style={{ animationDelay: `${i * -0.8}s` }} />
          <circle r="9" fill="#FEF3C7" />
          <line x1="0" y1="9" x2="0" y2="34" stroke="#FEF3C7" strokeOpacity="0.6" strokeWidth="3" />
        </g>
      ))}
      {/* live panel */}
      <g transform="translate(1110 800)">
        <rect width="400" height="140" rx="20" fill="#0B0B18" fillOpacity="0.85" stroke="#ffffff" strokeOpacity="0.12" />
        <circle className="gc-pulse" cx="34" cy="40" r="8" fill="#22C55E" />
        <text x="54" y="47" fill="#A5B4FC" fontSize="20" fontFamily={MONO}>LIVE · aggregation</text>
        <text x="28" y="98" fill="#ffffff" fontSize="36" fontWeight="800" fontFamily={SANS}>H3 · res 8</text>
        <text x="236" y="98" fill="#94A3B8" fontSize="22" fontFamily={MONO}>hex bins</text>
        {HEAT.map((c, i) => (
          <rect key={c} x={28 + i * 58} y="114" width="54" height="10" rx="5" fill={c} />
        ))}
      </g>
    </Frame>
  );
}

export const GENERATIVE_COVERS: Record<string, (p: CoverProps) => React.ReactElement> = {
  "wallet-rpc-evm-compatibility": WalletRpc,
  "startup-under-key-mvp-launch-support": StartupLaunch,
  "ai-accounting-system": AiAccounting,
  "analytics-pro-enterprise-bi": AnalyticsBi,
  "geo-heatmap-backend": GeoHeatmap,
  "go-market": GoMarketScene,
  "web3-l1-dex": ({ active }) => <L1Terminal active={active} />,
};
