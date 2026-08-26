"use client";

// A stand-in "plate" for a photograph / sketch / material shot, used until
// real project photography is uploaded via /admin. Once a project has a
// real uploaded `src` (an https URL from Blob storage), that image renders
// instead of the placeholder gradient.

const PALETTES: Record<string, [string, string]> = {
  cream: ["#ffedd1", "#f6d9ad"],
  coral: ["#fdc1b4", "#f3a48f"],
  aqua: ["#bcdddc", "#96c6c4"],
  ink: ["#e7ded1", "#c9beac"],
};

function paletteFor(seed: string) {
  const keys = Object.keys(PALETTES);
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return PALETTES[keys[h % keys.length]];
}

export default function Plate({
  seed,
  src,
  label,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  seed: string;
  src?: string;
  label?: string;
  className?: string;
  ratio?: string;
}) {
  const hasRealImage = !!src && src.startsWith("http");

  if (hasRealImage) {
    return (
      <div className={`relative overflow-hidden ${ratio} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label ?? ""} className="h-full w-full object-cover" />
        {label && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
            {label}
          </span>
        )}
      </div>
    );
  }

  const [a, b] = paletteFor(seed);
  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{
        background: `linear-gradient(155deg, ${a} 0%, ${b} 100%)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-25 mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
        <filter id={`grain-${seed.replace(/[^a-z0-9]/gi, "")}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed.replace(/[^a-z0-9]/gi, "")})`} />
      </svg>
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
