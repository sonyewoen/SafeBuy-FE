// src/pages/LoadingPage.tsx
import Loading from '../components/Loading';
import CautionInfo from '../components/CautionInfo';
import { colors, typography, palette } from '../tokens/token';
import mascot from '../assets/img/mascot.svg';

export default function LoadingPage() {
  // 🔧 레이아웃/스타일 노브
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
        background: UI.bgUseGradient
          ? `linear-gradient(180deg, ${palette.blue['20']} 0%, #ffffff 31%)`
          : colors.primarySoft,
      }}
    >
      <main
        className="relative w-full min-h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ maxWidth: UI.canvasW, paddingLeft: UI.padX, paddingRight: UI.padX }}
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
          <div className="relative z-20" style={{ width: UI.cautionW, margin: '0 auto' }}>
            <CautionInfo
              className="w-full"
              intervalMs={UI.cautionInterval}
              startIndex={UI.cautionStart}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
