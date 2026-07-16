import { useId, type ReactNode } from 'react';

export type OrnamentTone = 'warm' | 'cool' | 'mixed' | 'light';
export type OrnamentVariant = 'horns' | 'braid' | 'tumar' | 'shyrdak' | 'suu' | 'tabak' | 'vine' | 'floral' | 'palmette' | 'spiralBorder' | 'directionBorder' | 'kochkorDivider';
export type MedallionVariant = 'kochkor' | 'tabak' | 'tumar' | 'rosette';

interface KyrgyzOrnamentProps {
  className?: string;
  compact?: boolean;
  tone?: OrnamentTone;
  variant?: OrnamentVariant;
}

interface KyrgyzMedallionProps {
  className?: string;
  tone?: OrnamentTone;
  variant?: MedallionVariant;
}

const tones: Record<OrnamentTone, { primary: string; secondary: string; accent: string; thread: string; blue: string; neutral: string }> = {
  warm: {
    primary: '#c9473b',
    secondary: '#e8a43a',
    accent: '#7f4b3f',
    thread: '#fff8e9',
    blue: '#3f5d87',
    neutral: '#94857b',
  },
  cool: {
    primary: '#117b76',
    secondary: '#65916c',
    accent: '#d8a33b',
    thread: '#f4fbf8',
    blue: '#3f5d87',
    neutral: '#94857b',
  },
  mixed: {
    primary: '#c9473b',
    secondary: '#117b76',
    accent: '#e8a43a',
    thread: '#fff9ed',
    blue: '#3f5d87',
    neutral: '#94857b',
  },
  light: {
    primary: '#ffffff',
    secondary: '#f8d69e',
    accent: '#bfe5df',
    thread: '#ffffff',
    blue: '#dce9f7',
    neutral: '#eadfd8',
  },
};

function KochkorMotif({ colors }: { colors: (typeof tones)[OrnamentTone] }) {
  return (
    <>
      <path
        d="M72 3c0 13-9 22-23 22-11 0-19-6-19-14 0-7 5-11 12-11 6 0 11 4 11 10 0 5-4 8-9 8-3 0-6-2-6-5"
        stroke={colors.primary}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M76 3c0 13 9 22 23 22 11 0 19-6 19-14 0-7-5-11-12-11-6 0-11 4-11 10 0 5 4 8 9 8 3 0 6-2 6-5"
        stroke={colors.secondary}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="m74 18 13 13-13 13-13-13Z" fill={colors.accent} stroke={colors.thread} strokeWidth="2" />
      <path d="M8 31h43M97 31h43" stroke={colors.accent} strokeWidth="3" />
      <path d="M8 31h43M97 31h43" stroke={colors.thread} strokeWidth="1" strokeDasharray="3 5" />
    </>
  );
}

function OrnamentPattern({
  variant,
  colors,
}: {
  variant: OrnamentVariant;
  colors: (typeof tones)[OrnamentTone];
}): ReactNode {
  if (variant === 'braid') {
    return (
      <>
        <path d="M0 27 22 5l22 22-22 22Z" fill={colors.primary} />
        <path d="m44 27 22-22 22 22-22 22Z" fill={colors.secondary} />
        <path d="m88 27 22-22 22 22-22 22Z" fill={colors.accent} />
        <path d="M10 27 22 15l12 12-12 12ZM54 27l12-12 12 12-12 12ZM98 27l12-12 12 12-12 12Z" fill={colors.thread} fillOpacity=".9" />
        <path d="M0 27h132" stroke={colors.thread} strokeWidth="1.5" strokeDasharray="4 5" />
      </>
    );
  }

  if (variant === 'tumar') {
    return (
      <>
        <path d="M2 48 28 5l26 43Z" fill={colors.primary} />
        <path d="M12 42 28 16l16 26Z" fill={colors.thread} />
        <path d="M17 39 28 22l11 17Z" fill={colors.accent} />
        <path d="M54 48 80 5l26 43Z" fill={colors.secondary} />
        <path d="M64 42 80 16l16 26Z" fill={colors.thread} />
        <path d="M69 39 80 22l11 17Z" fill={colors.primary} />
        <path d="M106 48h18" stroke={colors.accent} strokeWidth="4" />
      </>
    );
  }

  if (variant === 'shyrdak') {
    return (
      <>
        <path
          d="M0 35c12 0 12-23 24-23s12 23 24 23 12-23 24-23 12 23 24 23 12-23 24-23 12 23 24 23"
          stroke={colors.primary}
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M0 13c12 0 12 23 24 23s12-23 24-23 12 23 24 23 12-23 24-23 12 23 24 23 12-23 24-23"
          stroke={colors.secondary}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M0 35c12 0 12-23 24-23s12 23 24 23 12-23 24-23 12 23 24 23 12-23 24-23 12 23 24 23"
          stroke={colors.thread}
          strokeWidth="1.2"
          strokeDasharray="4 5"
        />
        <path d="m24 18 6 6-6 6-6-6ZM72 18l6 6-6 6-6-6ZM120 18l6 6-6 6-6-6Z" fill={colors.accent} />
      </>
    );
  }

  if (variant === 'suu') {
    return (
      <>
        <path
          d="M0 11h17c11 0 11 26 22 26s11-26 22-26 11 26 22 26 11-26 22-26h19"
          stroke={colors.primary}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M0 37h17c11 0 11-26 22-26s11 26 22 26 11-26 22-26 11 26 22 26h19"
          stroke={colors.secondary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M0 24h124"
          stroke={colors.thread}
          strokeWidth="1.4"
          strokeDasharray="3 5"
        />
      </>
    );
  }

  if (variant === 'tabak') {
    return (
      <>
        <circle cx="28" cy="26" r="21" fill={colors.primary} />
        <circle cx="28" cy="26" r="13" fill={colors.thread} />
        <path d="M28 13c0 8-5 13-13 13M28 13c0 8 5 13 13 13M28 39c0-8-5-13-13-13M28 39c0-8 5-13 13-13" stroke={colors.secondary} strokeWidth="5" strokeLinecap="round" />
        <circle cx="76" cy="26" r="21" fill={colors.secondary} />
        <circle cx="76" cy="26" r="13" fill={colors.thread} />
        <path d="M76 13c0 8-5 13-13 13M76 13c0 8 5 13 13 13M76 39c0-8-5-13-13-13M76 39c0-8 5-13 13-13" stroke={colors.primary} strokeWidth="5" strokeLinecap="round" />
      </>
    );
  }

  if (variant === 'vine') {
    return (
      <>
        <path
          d="M4 31c38-35 64 31 101 0s63-31 101 0 63 31 101 0 63-31 101 0"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M38 20c11-18 26-19 39-9-11 1-17 7-19 17-5-6-11-8-20-8ZM120 35c11 18 26 19 39 9-11-1-17-7-19-17-5 6-11 8-20 8ZM214 20c11-18 26-19 39-9-11 1-17 7-19 17-5-6-11-8-20-8ZM300 35c11 18 26 19 39 9-11-1-17-7-19-17-5 6-11 8-20 8Z"
          fill={colors.secondary}
        />
        <path
          d="M82 30c0-19 14-27 27-20 8 4 10 14 5 20-4 5-12 5-16 1-3-4-2-9 2-11M184 30c0 19 14 27 27 20 8-4 10-14 5-20-4-5-12-5-16-1-3 4-2 9 2 11M286 30c0-19 14-27 27-20 8 4 10 14 5 20-4 5-12 5-16 1-3-4-2-9 2-11"
          fill="none"
          stroke={colors.neutral}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M6 31c7-17 20-22 34-15-8 3-12 9-11 18-7-4-14-5-23-3ZM404 31c-7-17-20-22-34-15 8 3 12 9 11 18 7-4 14-5 23-3Z"
          fill={colors.primary}
        />
        <path d="m4 31 13-18 8 18-8 18ZM406 31l-13-18-8 18 8 18Z" fill={colors.primary} />
        <circle cx="154" cy="31" r="5" fill={colors.accent} />
        <circle cx="256" cy="31" r="5" fill={colors.blue} />
      </>
    );
  }

  if (variant === 'floral') {
    return (
      <>
        <g transform="translate(150 26)">
          <circle r="20" fill={colors.neutral} />
          <circle r="15" fill={colors.blue} />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <ellipse cx="0" cy="-14" rx="7" ry="11" fill={colors.secondary} stroke={colors.thread} strokeWidth="2" />
              <circle cy="-14" r="3" fill={colors.thread} />
            </g>
          ))}
          <circle r="7" fill={colors.primary} />
        </g>
        <path d="M18 30c24-30 52-27 75-6-13-3-24 1-31 13-7-9-21-12-44-7ZM282 30c-24-30-52-27-75-6 13-3 24 1 31 13 7-9 21-12 44-7Z" fill={colors.blue} />
        <path d="M42 35c17 15 32 14 45 1M258 35c-17 15-32 14-45 1" fill="none" stroke={colors.neutral} strokeWidth="5" strokeLinecap="round" />
        <path d="M88 31c13-20 27-23 41-10-10 0-16 6-17 16-7-5-15-7-24-6ZM212 31c-13-20-27-23-41-10 10 0 16 6 17 16 7-5 15-7 24-6Z" fill={colors.secondary} />
        <path d="M4 30c9-17 20-21 34-13-8 2-12 8-12 17-7-4-14-5-22-4ZM296 30c-9-17-20-21-34-13 8 2 12 8 12 17 7-4 14-5 22-4Z" fill={colors.primary} />
        <circle cx="33" cy="31" r="3" fill={colors.thread} />
        <circle cx="267" cy="31" r="3" fill={colors.thread} />
      </>
    );
  }

  if (variant === 'palmette') {
    return (
      <>
        <path d="M38 47c-2-17 3-30 16-42 13 12 18 25 16 42-7-10-12-13-16-13s-9 3-16 13Z" fill={colors.primary} />
        <path d="M54 35c-8-12-17-18-29-16 8 5 11 12 9 22 8-1 14-3 20-6ZM54 35c8-12 17-18 29-16-8 5-11 12-9 22-8-1-14-3-20-6Z" fill={colors.primary} />
        <path d="M29 45h50l-8 8H37Z" fill={colors.accent} />
        <path d="M102 43c0-15 9-25 22-25s22 10 22 25c-8-7-15-10-22-10s-14 3-22 10Z" fill={colors.blue} />
        <path d="M124 19c-8-9-16-12-25-8 7 4 10 10 9 18M124 19c8-9 16-12 25-8-7 4-10 10-9 18" fill={colors.secondary} />
        <circle cx="124" cy="29" r="5" fill={colors.thread} />
      </>
    );
  }

  if (variant === 'spiralBorder') {
    return (
      <>
        <path
          d="M5 35c0-17 12-28 28-28 14 0 24 9 24 21 0 10-7 17-16 17-8 0-13-5-13-11 0-6 4-10 9-10 4 0 7 3 7 7 0 3-2 5-5 5"
          fill="none"
          stroke={colors.primary}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M65 35c0-17 12-28 28-28 14 0 24 9 24 21 0 10-7 17-16 17-8 0-13-5-13-11 0-6 4-10 9-10 4 0 7 3 7 7 0 3-2 5-5 5"
          fill="none"
          stroke={colors.primary}
          strokeWidth="8"
          strokeLinecap="round"
          transform="matrix(-1 0 0 1 182 0)"
        />
        <path
          d="M61 10c5 9 12 14 22 16-10 3-17 8-22 17-5-9-12-14-22-17 10-2 17-7 22-16Z"
          fill={colors.primary}
        />
        <path d="M61 4 68 17 61 30 54 17Z" fill={colors.primary} />
        <path
          d="M49 42c4 7 8 11 12 16 4-5 8-9 12-16"
          fill="none"
          stroke={colors.primary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M4 35h10M108 35h12" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" />
      </>
    );
  }

  if (variant === 'directionBorder') {
    return (
      <>
        <path
          d="M8 38c16-25 47-27 65-5 11 14 7 32-7 38-11 5-23 0-26-10-3-9 3-18 12-19 7-1 13 4 13 10 0 5-4 9-9 9"
          fill="none"
          stroke={colors.primary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M292 38c-16-25-47-27-65-5-11 14-7 32 7 38 11 5 23 0 26-10 3-9-3-18-12-19-7-1-13 4-13 10 0 5 4 9 9 9"
          fill="none"
          stroke={colors.primary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M104 47c11-23 27-34 46-34s35 11 46 34c-14-8-27-11-38-8-3-12-6-18-8-18s-5 6-8 18c-11-3-24 0-38 8Z"
          fill={colors.primary}
        />
        <path d="M150 7 161 25 150 43 139 25Z" fill={colors.primary} />
        <path d="M126 52h48l-9 10h-30Z" fill={colors.primary} />
        <path
          d="M132 62c5 10 11 14 18 14s13-4 18-14"
          fill="none"
          stroke={colors.primary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M74 35c13-14 24-17 36-11-8 3-12 10-11 19-8-5-16-7-25-8ZM226 35c-13-14-24-17-36-11 8 3 12 10 11 19 8-5 16-7 25-8Z" fill={colors.primary} />
      </>
    );
  }

  return <KochkorMotif colors={colors} />;
}

export default function KyrgyzOrnament({
  className = '',
  compact = false,
  tone = 'mixed',
  variant = 'horns',
}: KyrgyzOrnamentProps) {
  const id = useId().replace(/:/g, '');
  const colors = tones[tone];

  if (variant === 'kochkorDivider') {
    return (
      <svg
        aria-hidden="true"
        className={className}
        viewBox="0 0 440 84"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 44h88M344 44h88" stroke={colors.neutral} strokeWidth="2" strokeLinecap="round" opacity=".5" />
        <path
          d="M202 42c-17-19-44-19-59-3-11 12-7 29 7 34 11 4 22-2 22-13 0-8-6-13-13-13-6 0-10 4-10 9 0 4 3 7 7 7"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M238 42c17-19 44-19 59-3 11 12 7 29-7 34-11 4-22-2-22-13 0-8 6-13 13-13 6 0 10 4 10 9 0 4-3 7-7 7"
          fill="none"
          stroke={colors.secondary}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M139 41c-10-13-29-14-40-3-8 8-6 20 4 24 8 3 16-1 16-9 0-6-4-9-9-9-4 0-7 3-7 6"
          fill="none"
          stroke={colors.primary}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M301 41c10-13 29-14 40-3 8 8 6 20-4 24-8 3-16-1-16-9 0-6 4-9 9-9 4 0 7 3 7 6"
          fill="none"
          stroke={colors.primary}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M220 8c5 11 12 18 22 22-10 5-17 12-22 23-5-11-12-18-22-23 10-4 17-11 22-22Z" fill={colors.primary} />
        <path d="m220 30 15 15-15 15-15-15Z" fill={colors.accent} stroke={colors.thread} strokeWidth="3" />
        <path d="M204 62h32l-7 9h-18Z" fill={colors.primary} />
        <path d="M96 44c-9-8-18-11-29-8 8 4 12 10 11 19 7-6 13-9 18-11ZM344 44c9-8 18-11 29-8-8 4-12 10-11 19-7-6-13-9-18-11Z" fill={colors.accent} />
        <circle cx="126" cy="44" r="4" fill={colors.accent} />
        <circle cx="314" cy="44" r="4" fill={colors.accent} />
      </svg>
    );
  }

  const motifHeight = variant === 'directionBorder' ? 80 : variant === 'spiralBorder' ? 64 : 52;
  const patternPadding =
    variant === 'directionBorder' || variant === 'spiralBorder' ? 8 : 6;
  const patternHeight = motifHeight + patternPadding * 2;
  const tileWidth =
    variant === 'directionBorder'
      ? 300
      : variant === 'spiralBorder'
      ? 122
      : variant === 'vine'
      ? 410
      : variant === 'floral'
        ? 300
        : variant === 'palmette'
          ? 168
          : variant === 'tumar'
            ? 124
            : variant === 'tabak'
              ? 104
              : variant === 'horns'
                ? 148
                : 132;

  return (
    <svg aria-hidden="true" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={id}
          width={tileWidth}
          height={patternHeight}
          patternUnits="userSpaceOnUse"
          patternTransform={compact ? 'scale(.55)' : undefined}
        >
          <g transform={`translate(0 ${patternPadding})`}>
            <OrnamentPattern variant={variant} colors={colors} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function KyrgyzMedallion({
  className = '',
  tone = 'mixed',
  variant = 'tabak',
}: KyrgyzMedallionProps) {
  const colors = tones[tone];

  return (
    <svg aria-hidden="true" viewBox="0 0 180 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="84" fill={colors.thread} fillOpacity=".78" stroke={colors.accent} strokeWidth="3" />
      <circle cx="90" cy="90" r="72" fill="none" stroke={colors.primary} strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="90" cy="90" r="59" fill={variant === 'tumar' ? colors.secondary : colors.primary} fillOpacity=".12" />

      {variant === 'kochkor' ? (
        <>
          <path d="M90 42c0 25-16 39-38 39-14 0-24-8-24-19 0-9 7-16 16-16 8 0 14 6 14 13 0 6-5 11-11 11-5 0-9-3-9-8" fill="none" stroke={colors.primary} strokeWidth="11" strokeLinecap="round" />
          <path d="M90 42c0 25 16 39 38 39 14 0 24-8 24-19 0-9-7-16-16-16-8 0-14 6-14 13 0 6 5 11 11 11 5 0 9-3 9-8" fill="none" stroke={colors.secondary} strokeWidth="11" strokeLinecap="round" />
          <path d="m90 74 26 26-26 26-26-26Z" fill={colors.accent} stroke={colors.thread} strokeWidth="5" />
          <circle cx="90" cy="100" r="7" fill={colors.primary} />
        </>
      ) : variant === 'tumar' ? (
        <>
          <path d="M40 128 90 42l50 86Z" fill={colors.primary} stroke={colors.thread} strokeWidth="6" strokeLinejoin="round" />
          <path d="M58 119 90 65l32 54Z" fill={colors.thread} />
          <path d="M70 112 90 79l20 33Z" fill={colors.accent} />
          <circle cx="90" cy="105" r="7" fill={colors.secondary} />
        </>
      ) : variant === 'rosette' ? (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
            <g key={angle} transform={`rotate(${angle} 90 90)`}>
              <ellipse cx="90" cy="52" rx="14" ry="24" fill={index % 2 === 0 ? colors.secondary : colors.blue} stroke={colors.thread} strokeWidth="4" />
              <circle cx="90" cy="48" r="5" fill={colors.thread} />
            </g>
          ))}
          <circle cx="90" cy="90" r="28" fill={colors.neutral} stroke={colors.thread} strokeWidth="5" />
          <circle cx="90" cy="90" r="17" fill={colors.primary} />
          <circle cx="90" cy="90" r="6" fill={colors.accent} />
        </>
      ) : (
        <>
          <circle cx="90" cy="90" r="48" fill={colors.primary} />
          <circle cx="90" cy="90" r="31" fill={colors.thread} />
          <path d="M90 58c0 20-12 32-32 32M90 58c0 20 12 32 32 32M90 122c0-20-12-32-32-32M90 122c0-20 12-32 32-32" fill="none" stroke={colors.secondary} strokeWidth="10" strokeLinecap="round" />
          <path d="m90 75 15 15-15 15-15-15Z" fill={colors.accent} />
        </>
      )}

      <path d="M90 8 96 20 90 32 84 20ZM172 90l-12 6-12-6 12-6ZM90 172l-6-12 6-12 6 12ZM8 90l12-6 12 6-12 6Z" fill={colors.accent} />
    </svg>
  );
}
