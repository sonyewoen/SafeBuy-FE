// src/components/CautionInfo.tsx
import { useEffect, useRef, useState } from 'react';

// 8장의 주의 카드 이미지 (파일명: caution1.svg ~ caution8.svg)
import c1 from '../assets/img/caution1.png';
import c2 from '../assets/img/caution2.png';
import c3 from '../assets/img/caution3.png';
import c4 from '../assets/img/caution4.png';
import c5 from '../assets/img/caution5.png';
import c6 from '../assets/img/caution6.png';
import c7 from '../assets/img/caution7.png';
import c8 from '../assets/img/caution8.png';

const DEFAULT_IMAGES = [c1, c2, c3, c4, c5, c6, c7, c8];

type Props = {
  /** 보여줄 카드 이미지들 (기본: caution1~8) */
  images?: string[];
  /** 전환 간격(ms) — 기본 3초 */
  intervalMs?: number;
  /** 시작 인덱스 (0 기반) */
  startIndex?: number;
  /** 외부 스타일 */
  className?: string;
  /** 포커스/호버 시 자동전환 멈춤 여부 (기본 true) */
  pauseOnHover?: boolean;
};

export default function CautionInfo({
  images = DEFAULT_IMAGES,
  intervalMs = 3000,
  startIndex = 0,
  className = '',
  pauseOnHover = true,
}: Props) {
  const [idx, setIdx] = useState(startIndex % images.length);
  const [fadeKey, setFadeKey] = useState(0); // 리렌더마다 페이드 재생용
  const timerRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const run = () => {
      timerRef.current = window.setInterval(() => {
        if (!pausedRef.current) {
          setIdx((p) => (p + 1) % images.length);
          setFadeKey((k) => k + 1);
        }
      }, intervalMs);
    };
    run();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [images.length, intervalMs]);

  return (
    <div
      className={`relative inline-block select-none ${className}`}
      onMouseEnter={() => (pausedRef.current = pauseOnHover ? true : false)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = pauseOnHover ? true : false)}
      onBlur={() => (pausedRef.current = false)}
      role="img"
      aria-label={`안내 카드 ${idx + 1} / ${images.length}`}
    >
      {/* 카드 이미지 */}
      <img
        key={fadeKey}
        src={images[idx]}
        alt=""
        className="block w-full h-auto animate-[fade_400ms_ease]"
        draggable={false}
      />
    </div>
  );
}
