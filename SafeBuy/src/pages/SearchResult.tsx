import search from "../assets/img/searchbarWhite.svg";
import Header from "../components/Header";
import GaugeInfo from "../components/GaugeInfo";
import ItemDetailInfo from "../components/ItemDetailInfo";
import ItemDetail from "../components/ItemDetail";
import { colors, typography } from "../tokens/token";
import { useNavigate } from "react-router-dom";

export default function SearchResult() {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 min-h-[100dvh]"
      style={{ background: colors.primarySoft }}
    >
      <Header title="검색 결과" />
      <button
        type="button"
        onClick={() => navigate("/search")}
        className="block w-full p-0 bg-transparent"
        aria-label="제품 정보 입력 화면으로 이동"
      >
        <img src={search} />
      </button>
      {/* 리콜 조회 결과(위험 점수) */}
      <div className="bg-[#ffffff] rounded-lg px-4 py-6 mt-6 mb-4">
        <GaugeInfo
          value={80}
          title="베비라보 호빵맨 사이좋은 콘서트"
          note=" "
        />
      </div>
      {/* 상세 정보 */}
      <div className="bg-[#ffffff] rounded-lg mb-[42px]">
        <ItemDetailInfo />
      </div>
      {/* 대체상품 추천 */}
      <h1
        style={{
          color: colors.textPrimary,
          ...typography.head.h5,
          lineHeight: `${typography.head.h5.lineHeight}px`,
        }}
      >
        대체상품 추천
      </h1>
      <h3
        style={{
          color: colors.textSecondary,
          ...typography.body.b4,
          lineHeight: `${typography.body.b4.lineHeight}px`,
          marginBottom: "16px",
        }}
      >
        안전한 대체 상품을 추천해드려요.
      </h3>
      {/* 추천 상품 카드리스트 */}
      <div className="overflow-hidden -mr-4">
        <div className="flex gap-3">
          <ItemDetail size="small" />
          <ItemDetail size="small" mark="KC 안전인증" />
          <ItemDetail size="small" />
        </div>
      </div>
      {/* 더보기 버튼 */}
      <button
        className="w-full border text-center rounded-lg px-4 py-3 mt-4 bg-[#FFF] cursor-pointer"
        style={{
          color: colors.textSecondary,
          ...typography.body.b2,
          lineHeight: `${typography.body.b2.lineHeight}px`,
          marginBottom: "16px",
          borderColor: colors.border,
        }}
        onClick={() => navigate("/products")}
      >
        대체상품 더보기
      </button>
    </div>
  );
}
