// src/pages/SearchResult.tsx
import { useLocation, useNavigate } from "react-router-dom";
import search from "../assets/img/searchbarWhite.svg";
import Header from "../components/Header";
import GaugeInfo from "../components/GaugeInfo";
import ItemDetailInfo from "../components/ItemDetailInfo";
import ItemDetail from "../components/ItemDetail";
import { colors, typography } from "../tokens/token";
import type { SearchResponse } from "../service/api";

export default function SearchResult() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { data?: SearchResponse; error?: boolean; message?: string };
  };

  const data = state?.data;
  const error = state?.error;
  const message = state?.message;

  return (
    // 🔹 전체 화면 배경 전용 래퍼 (레이아웃 영향 없음)
    <div
      className="min-h-[100dvh] w-full"
      style={{ background: colors.primarySoft }}
    >
      {/* ⬇ 기존 컨테이너: 위치/여백 그대로 유지 (배경 제거) */}
      <div className="p-4 min-h-[100dvh] max-w-[393px] mx-auto">
        <Header title="검색 결과" />

        <button
          type="button"
          onClick={() => navigate("/search")}
          className="block w-full p-0 bg-transparent cursor-pointer"
          aria-label="상품 정보 입력 화면으로 이동"
        >
          <img src={search} alt="" />
        </button>

        {/* 에러 처리 */}
        {error && (
          <div className="bg-white rounded-lg p-6 mt-6">
            <p style={{ ...typography.body.b2, color: "red" }}>
              검색 중 오류 발생: {message}
            </p>
          </div>
        )}

        {/* API 응답 데이터 */}
        {data && (
          <>
            {console.log("API 응답 데이터:", data)}
            {/* 리콜 조회 결과(위험 점수) */}
            <div className="bg-[#ffffff] rounded-lg px-4 py-6 mt-6 mb-4">
              <GaugeInfo
                value={data.riskScore}
                needleOffsetDeg={18}
                riskLevel={data.riskLevel}
                title={data.productName ?? "알 수 없는 상품"}
                note={
                  data.found ? (
                    <span
                      style={{
                        color: colors.textSecondary,
                        ...typography.body.b2,
                        lineHeight: `${typography.body.b2.lineHeight}px`,
                      }}
                    >
                      해당 상품은{" "}
                      <span
                        style={{
                          color: colors.textPrimary,
                          ...typography.body.b1,
                          lineHeight: `${typography.body.b1.lineHeight}px`,
                        }}
                      >
                        리콜 상품
                      </span>
                      으로 확인되었습니다.
                    </span>
                  ) : undefined
                }
              />
            </div>
            {/* 상세 정보 */}
            <div className="bg-[#ffffff] rounded-lg mb-[42px]">
              <ItemDetailInfo
                productName={data.productName}
                defectContent={data.defectContent}
                manufacturer={data.manufacturer}
                publicationDate={data.publicationDate}
                url={data.detailUrl}
              />
            </div>
            {/* 대체상품 추천 */}
            <h1
              style={{
                color: colors.textPrimary,
                ...typography.head.h5,
                lineHeight: `${typography.head.h5.lineHeight}px`,
              }}
            >
              대체 상품 추천
            </h1>
            <h3
              style={{
                color: colors.textSecondary,
                ...typography.body.b4,
                lineHeight: `${typography.body.b4.lineHeight}px`,
                marginBottom: "16px",
              }}
            >
              안전한 대체 상품을 추천해 드려요.
            </h3>
            {/* 추천 상품 카드리스트 */}
            <div className="overflow-x-auto hide-scrollbar -mr-4">
              <div className="flex gap-3">
                {data.alternatives?.slice(0, 3).map((product, index) => (
                  <ItemDetail
                    key={index}
                    size="small"
                    imageUrl={product.image}
                    maker={product.maker}
                    itemName={product.title}
                    price={product.price}
                    link={product.link}
                  />
                ))}
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
              onClick={() => navigate("/products", { state: { data } })}
            >
              대체 상품 더보기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
