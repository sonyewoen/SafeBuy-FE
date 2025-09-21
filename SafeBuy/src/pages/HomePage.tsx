// src/pages/HomePage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { palette, typography } from '../tokens/token';
import logo from '../assets/img/logo.svg';
import mascot from '../assets/img/mascot.svg';
import searchbar from '../assets/img/searchbar.svg';
import iconQ from '../assets/icon/icon_Q.svg';
import iconX from '../assets/icon/icon_X.svg';
import popup from '../assets/img/popup.svg';
import ImagePopup from '../components/ImagePopup';

export default function HomePage() {
  // 🔧 위치/크기 조절 노브 (px 단위)
  const UI = {
    canvasW: 393,          // 디자인 기준 폭
    headerTop: 20,         // 상단 마진
    headerGap: 8,          // 로고 ↔ ? 아이콘 간격

    heroTop: 60,           // 카피+마스코트 섹션 상단 여백
    heroColGap: 12,        // 카피 ↔ 마스코트 사이 간격
    titleMaxW: 330,        // 카피 최대 폭
    mascotW: 120,          // 마스코트 너비
    mascotShiftX: 0,       // 마스코트 미세 이동 (→ +)
    mascotShiftY: 14,      // 마스코트 미세 이동 (↓ +)

    searchTop: 30,         // 서치바 상단 여백
    indicatorTop: 40,      // 홈 인디케이터 상단 여백
  };

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="grid place-items-center min-h-[100dvh]"
      style={{ background: `linear-gradient(180deg, ${palette.blue['20']} 0%, #fff 31%)` }}
    >
      <main
        className="w-full min-h-[100dvh] px-4 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ maxWidth: UI.canvasW }}
      >
        {/* 상단 */}
        <header
          className="flex items-center justify-between"
          style={{ marginTop: UI.headerTop, columnGap: UI.headerGap }}
        >
          <img src={logo} alt="SafeBuy" className="block h-[26px] w-auto" />
          <button
            type="button"
            aria-label="도움말 열기"
            onClick={() => setOpen(true)}
            className="block h-6 w-6 cursor-pointer"
            style={{ lineHeight: 0 }}
          >
            <img src={iconQ} alt="" className="block h-6 w-6" />
          </button>
        </header>

        {/* 히어로: 카피 + 마스코트 */}
        <section
          className="grid grid-cols-[1fr_auto] items-end"
          style={{ marginTop: UI.heroTop, columnGap: UI.heroColGap }}
        >
          <h1
            className="text-[#333] font-semibold"
            style={{
              maxWidth: UI.titleMaxW,
              fontFamily: typography.head.h4.fontFamily,
              fontSize: typography.head.h4.fontSize,
              lineHeight: `${typography.head.h4.lineHeight}px`,
            }}
          >
            해외 직구 상품,<br />안전한지 확인해 보세요!
          </h1>

          <img
            src={mascot}
            alt=""
            className="block h-auto select-none pointer-events-none"
            style={{
              width: UI.mascotW,
              transform: `translate(${UI.mascotShiftX}px, ${UI.mascotShiftY}px)`,
            }}
          />
        </section>

        {/* 서치바(이미지) */}
        <section style={{ marginTop: UI.searchTop }}>
            <button
                type="button"
                onClick={() => navigate('/search')}
                className="block w-full p-0 bg-transparent"
                aria-label="제품 정보 입력 화면으로 이동">
          <img src={searchbar} alt="제품 정보를 입력해 보세요." className="block w-full h-auto cursor-pointer" />
          </button>
        </section>
      </main>

      {/* 팝업: Q 아이콘 클릭 시 열림 */}
      <ImagePopup
        open={open}
        onClose={() => setOpen(false)}
        imageSrc={popup}
        closeIconSrc={iconX}
        maxWidth={360}
      />
    </div>
  );
}
