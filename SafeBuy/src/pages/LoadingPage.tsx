// src/pages/LoadingPage.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import CautionInfo from "../components/CautionInfo";
import { colors, typography, palette } from "../tokens/token";
import mascot from "../assets/img/mascot.svg";
import { searchRecalls } from "../service/api";
import type { SearchPayload } from "../service/api";

const MIN_SPIN_MS = 3000; // 최소 표시 시간(ms)

export default function LoadingPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { payload?: SearchPayload } };

  // ✅ 모바일에서 뷰포트 높이 보정(--app-vh) 정확도 개선
  useEffect(() => {
    const setVH = () => {
      const vh = window.visualViewport?.height
        ? Math.round(window.visualViewport.height)
        : window.innerHeight;
      document.documentElement.style.setProperty("--app-vh", `${vh}px`);
    };
    setVH();
    window.visualViewport?.addEventListener("resize", setVH);
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);
    return () => {
      window.visualViewport?.removeEventListener("resize", setVH);
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  // ✅ API 호출 + 최소 표시 시간 보장
  useEffect(() => {
    const payload = state?.payload;
    if (!payload) {
      navigate("/", { replace: true });
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    (async () => {
      const started = performance.now();
      try {
        const data = await searchRecalls(payload);

        const elapsed = performance.now() - started;
        if (elapsed < MIN_SPIN_MS) await sleep(MIN_SPIN_MS - elapsed);
        if (cancelled) return;

        if (data?.found === false) {
          navigate("/notfound", { replace: true, state: { payload, data } });
        } else {
          navigate("/searchresult", { replace: true, state: { data } });
        }
      } catch (err: any) {
        const elapsed = performance.now() - started;
        if (elapsed < MIN_SPIN_MS) await sleep(MIN_SPIN_MS - elapsed);
        if (cancelled) return;

        navigate("/notfound", {
          replace: true,
          state: {
            error: true,
            message: err?.message ?? "요청 처리 중 오류가 발생했습니다.",
            payload,
          },
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate, state]);

  // 🔧 레이아웃/스타일 노브(원본 유지)
  const UI = {
    canvasW: 393,
    padX: 16,
    bgUseGradient: false,
    titleTop: 80,
    subGap: 4,
    spinnerGap: 30,
    spinnerSize: 56,
    spinnerThickness: 6,

    cautionTop: 170,
    cautionW: 361,
    cautionInterval: 3000,
    cautionStart: 0,

    // 마스코트: 주의 카드 섹션을 기준으로 배치 (px)
    mascotW: 149,
    mascotRight: 16,
    mascotTopOverCaution: -135, // 섹션 상단에서 아래로(+)/위로(-) 이동
  };

  return (
    <div
      className="min-h-[100dvh] grid place-items-center"
      style={{
        // ⬇️ 뷰포트 고정: dvh 우선, 보정 변수는 보조로
        height: "clamp(100svh, var(--app-vh, 100dvh), 100lvh)",
        background: UI.bgUseGradient
          ? `linear-gradient(180deg, ${palette.blue["20"]} 0%, #ffffff 31%)`
          : colors.primarySoft,
      }}
      aria-busy="true"
    >
      <main
        className="relative w-full min-h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{
          maxWidth: UI.canvasW,
          paddingLeft: UI.padX,
          paddingRight: UI.padX,
          // ⬇️ 뷰포트 보정치로 최소 높이 보장
          height: "100%",
          minHeight: "clamp(100svh, var(--app-vh, 100dvh), 100lvh)",
        }}
      >
        {/* 타이틀 & 서브텍스트 & 스피너 */}
        <section className="text-center" style={{ marginTop: UI.titleTop }} aria-live="polite">
          <h1
            className="text-[#222] font-bold"
            style={{
              ...typography.head.h3,
              lineHeight: `${typography.head.h3.lineHeight}px`,
            }}
          >
            안전성 검증 중...
          </h1>

          <p
            className="text-[#555]"
            style={{
              marginTop: UI.subGap,
              ...typography.body.b3,
              lineHeight: `${typography.body.b3.lineHeight}px`,
            }}
          >
            잠시만 기다려주세요
          </p>

          <div style={{ marginTop: UI.spinnerGap }}>
            <Loading size={UI.spinnerSize} thickness={UI.spinnerThickness} arcColor={colors.primary} />
          </div>
        </section>

        {/* 주의 카드 섹션: 상대배치 기준 생성 */}
        <section className="relative" style={{ marginTop: UI.cautionTop }}>
          {/* 마스코트: 주의 카드 섹션을 기준으로 절대배치 (뒤로) */}
          <img
            src={mascot}
            alt=""
            className="absolute pointer-events-none select-none z-10"
            style={{
              width: UI.mascotW,
              right: UI.mascotRight,
              top: UI.mascotTopOverCaution,
            }}
          />

          {/* 주의 카드(위로) */}
          <div
            className="relative z-20"
            style={{
              width: UI.cautionW,
              margin: "0 auto",
              // ⬇️ 안드로이드에서 비율 깨짐 방지를 위해 CSS 비율 고정
              aspectRatio: `${UI.cautionW} / 160`,
            }}
          >
            <CautionInfo
              className="w-full"
              intervalMs={UI.cautionInterval}
              startIndex={UI.cautionStart}
              // ⬇️ 기존 값 유지 (내부 로직에 사용 중일 수 있어 그대로 둠)
              aspectRatio={UI.cautionW / 160}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
