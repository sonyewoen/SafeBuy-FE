// src/components/GaugeInfo.tsx
import { useId, useMemo } from 'react';
import { colors, palette } from '../tokens/token';
import needleSvg from '../assets/img/needle.svg';

type Props = {
  value: number;                 // 0~100
  width?: number;                // 게이지 폭(px)
  thickness?: number;            // 링 두께(px)
  title?: string;
  note?: string;
  className?: string;

  // 바늘(이미지) 관련
  needleLengthRatio?: number;    // r 대비 길이 비율 (기본 0.62)
  needleHeightRatio?: number;    // thickness 대비 높이 비율 (기본 0.9)
  needleRestDeg?: number;        // 기본 각도(시안처럼 고정된 방향). 기본 210deg
  needleOpacity?: number;        // 기본 0.35
};

export default function GaugeInfo({
  value,
  width = 210,
  thickness = 18,
  title,
  note,
  className = '',
  needleLengthRatio = 0.62,
  needleHeightRatio = 3,
  needleRestDeg = 200,
  needleOpacity = 0.35,
}: Props) {
  const id = useId();
  const v = clamp(value, 0, 100);

  // ── geometry ──
  const r = width / 2 - thickness / 2;

  // 배지 여백(잘림 방지)
  const badgeR = 18;
  const padX = badgeR + 6;
  const padY = badgeR + 6;

  const svgW = width + padX * 2;
  const svgH = r + thickness * 1.6 + padY;

  const cx = padX + width / 2;
  const cy = r + thickness + padY * 0.2;

  const L = Math.PI * r;                 // 반원 길이
  const progress = (v / 100) * L;

  // 배지 좌표(값 따라 이동)
  const angleRad = Math.PI - (Math.PI * v) / 100; // 좌(180°)→우(0°)
  const badge = useMemo(() => {
    const bx = cx + r * Math.cos(angleRad);
    const by = cy - r * Math.sin(angleRad);
    return { bx, by, br: badgeR };
  }, [angleRad, cx, cy, r]);

  const { label, tone, ring, text } = getStatus(v);

  // 바늘 이미지 배치(왼쪽 중앙이 회전축)
  const needleLen = r * needleLengthRatio;
  const needleH = thickness * needleHeightRatio;
  const needleX = cx;               // 왼쪽끝을 중심에 붙임
  const needleY = cy - needleH / 2; // 수직 중앙

  return (
    <div className={['w-full', className].join(' ')}>
      <div className="flex flex-col items-center">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="block">
          <defs>
            <path id={`arc-${id}`} d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} />
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.green.base} />
              <stop offset="50%" stopColor={palette.yellow.base} />
              <stop offset="100%" stopColor={palette.red.base} />
            </linearGradient>
          </defs>

          {/* 트랙 */}
          <use
            href={`#arc-${id}`}
            stroke="#EAEAEA"
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
          />

          {/* 진행(값에 따라) */}
          <use
            href={`#arc-${id}`}
            stroke={`url(#grad-${id})`}
            strokeWidth={thickness}
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: `${L} ${L}`,
              strokeDashoffset: L - progress,
              transition: 'stroke-dashoffset 600ms ease',
            }}
          />

          {/* 바늘: 시안처럼 '기본 각도'로 고정 */}
          <g
            transform={`rotate(${needleRestDeg} ${cx} ${cy})`}
            style={{ transition: 'transform 300ms ease' }}
            opacity={needleOpacity}
          >
            <image
              href={needleSvg}
              x={needleX}
              y={needleY}
              width={needleLen}
              height={needleH}
              preserveAspectRatio="xMinYMid meet"
            />
          </g>

          {/* 점수 배지 */}
          <g transform={`translate(${badge.bx}, ${badge.by})`}>
            <circle r={badge.br} fill="#fff" stroke={ring} strokeWidth="3" />
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="14"
              fontWeight={700}
              fill={text}
            >
              {v}
            </text>
          </g>
        </svg>

        {title && (
          <h3 className="mt-4 text-[16px] leading-[24px] font-bold text-[#333] text-center">
            {title}
          </h3>
        )}

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center gap-1 text-[16px] leading-[24px]">
            <span className="text-[#888] font-semibold">위험점수</span>
            <span className="font-semibold" style={{ color: tone }}>
              {v}점
            </span>
          </div>
          <span
            className="rounded px-2 py-[2px] text-[14px] font-semibold"
            style={{ color: tone, background: withAlpha(tone, 0.1) }}
          >
            {label}
          </span>
        </div>

        {note && (
          <p className="mt-4 text-[16px] leading-[24px] text-center">
            <span className="font-semibold text-[#555]">해당 제품은 </span>
            <span className="font-bold text-[#333]">리콜 제품</span>
            <span className="font-semibold text-[#555]">으로 확인되었습니다.</span>
          </p>
        )}
      </div>
    </div>
  );
}

/* helpers */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function withAlpha(hex: string, a: number) {
  const s = hex.replace('#', '');
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
function getStatus(v: number) {
  if (v >= 70)
    return { label: '위험', tone: colors.error, ring: colors.error, text: colors.error };
  if (v >= 40)
    return { label: '주의', tone: colors.warning, ring: colors.warning, text: '#b08900' };
  return { label: '안전', tone: colors.success, ring: colors.success, text: '#2f7a2f' };
}
