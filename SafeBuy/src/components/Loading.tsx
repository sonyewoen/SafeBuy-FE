// src/components/Loading.tsx
import { colors } from '../tokens/token';

type LoadingProps = {
  size?: number;          // px
  thickness?: number;     // stroke width
  arcColor?: string;      // 진행 아크 색
  className?: string;
  'aria-label'?: string;
};

export default function Loading({
  size = 64,
  thickness = 8,
  arcColor = colors.primary,          // #5c7df2
  className = '',
  ...rest
}: LoadingProps) {
  // 원형 진행 아크 길이 계산
  const r = size / 2 - thickness / 2;
  const C = 2 * Math.PI * r;
  const arc = C * 0.28; // 원의 28% 정도 길이로 표시 (시안 느낌)

  return (
    <div
      role="status"
      aria-busy="true"
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="animate-[spin_1.2s_linear_infinite]" /* v4 임의 속성 */
      >
        {/* 바깥 흰 테두리 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#ffffff"
          strokeWidth={thickness}
          fill="none"
        />
        {/* 진행 아크 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={arcColor}
          strokeWidth={thickness}
          strokeLinecap="butt"
          strokeDasharray={`${arc} ${C}`}
          fill="none"
          transform={`rotate(90 ${size / 2} ${size / 2})`} // 시작점 12시 방향
        />
      </svg>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
