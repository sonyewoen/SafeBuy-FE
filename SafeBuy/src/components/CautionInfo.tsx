// src/components/CautionInfo.tsx
import { useEffect, useRef, useState } from "react";

// 8장의 주의 카드 이미지 (caution1.png ~ caution8.png)
import c1 from "../assets/img/caution1.png";
import c2 from "../assets/img/caution2.png";
import c3 from "../assets/img/caution3.png";
import c4 from "../assets/img/caution4.png";
import c5 from "../assets/img/caution5.png";
import c6 from "../assets/img/caution6.png";
import c7 from "../assets/img/caution7.png";
import c8 from "../assets/img/caution8.png";

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
  /** 컨테이너 가로:세로 비율(레이아웃 고정용). 예: 361/160 */
  aspectRatio?: number;
  /** aspectRatio 대신 픽셀 고정 높이를 쓰고 싶을 때 */
  fixedHeightPx?: number;
};

export default function CautionInfo({
  images = DEFAULT_IMAGES,
  intervalMs = 3000,
  startIndex = 0,
  className = "",
  pauseOnHover = true,
  aspectRatio = 361 / 160,
  fixedHeightPx,
}: Props) {
  const len = Math.max(1, images.length);
  const safeStart = ((startIndex % len) + len) % len;

  const [idx, setIdx] = useState<number>(safeStart);
  const [fadeKey, setFadeKey] = useState<number>(0); // 페이드 재생용 키
  const pausedRef = useRef<boolean>(false);

  // 이미지 배열 길이/간격이 바뀔 때마다 타이머 재설정
  useEffect(() => {
    if (len <= 1) return;

    const id = window.setInterval(() => {
      if (!pausedRef.current) {
        setIdx((p) => (p + 1) % len);
        setFadeKey((k) => k + 1);
      }
    }, intervalMs);

    return () => {
      clearInterval(id); // 항상 void 반환 → TS OK
    };
  }, [len, intervalMs]);

  // 시작 인덱스나 이미지 길이가 바뀌면 현재 인덱스 리셋
  useEffect(() => {
    setIdx(safeStart);
  }, [safeStart, len]);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => (pausedRef.current = pauseOnHover)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocus={() => (pausedRef.current = pauseOnHover)}
      onBlur={() => (pausedRef.current = false)}
      role="img"
      aria-label={`안내 카드 ${idx + 1} / ${len}`}
      // 높이 사전 예약(레이아웃 시프트 방지)
      style={
        fixedHeightPx
          ? { width: "100%", height: fixedHeightPx, overflow: "hidden" }
          : { width: "100%", aspectRatio, overflow: "hidden" }
      }
    >
      <img
        key={fadeKey}
        src={images[idx] || ""}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain animate-[fade_400ms_ease]"
      />
    </div>
  );
}
