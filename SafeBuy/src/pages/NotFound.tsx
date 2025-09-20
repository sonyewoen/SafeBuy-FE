// src/pages/NotFound.tsx
import notFound from "../assets/img/NotFound.svg";
import search from "../assets/img/searchbarWhite.svg";
import searchTip from "../assets/img/searchTip.svg";
import Header from "../components/Header";
import { colors, typography } from "../tokens/token";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: {
      payload?: {
        productName?: string | null;
        manufacturer?: string | null;
        modelName?: string | null;
      };
    };
  };

  // 전달된 검색어(있으면 표시, 없으면 '입력하신 제품')
  const term =
    state?.payload?.productName ??
    state?.payload?.modelName ??
    state?.payload?.manufacturer ??
    "입력하신 제품";

  return (
    <div
      className="p-4 min-h-[100dvh] max-w-[393px] mx-auto"
      style={{ background: colors.primarySoft }}
    >
      <Header title="검색 결과" />

      {/* 검색 바 */}
      <button
        type="button"
        onClick={() => navigate("/search")}
        className="block w-full p-0 bg-transparent"
        aria-label="제품 정보 입력 화면으로 이동"
      >
        <img src={search} alt="" />
      </button>

      <h1
        className="text-center mt-11"
        style={{
          ...typography.head.h5,
          lineHeight: `${typography.head.h5.lineHeight}px`,
        }}
      >
        <span style={{ color: colors.primary }}>'{term}'</span>
        에 <br />
        해당하는 검색결과가 없어요
      </h1>

      {/* 캐릭터 이미지 */}
      <img src={notFound} className="flex m-auto mt-3 mb-6" alt="" />

      {/* 검색 팁 박스 이미지 */}
      <img src={searchTip} alt="" />
    </div>
  );
}
