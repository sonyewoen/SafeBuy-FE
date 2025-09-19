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
  console.log("SearchResult state:", state);

  const data = state?.data;
  const error = state?.error;
  const message = state?.message;

  return (
    <div
      className="p-4 min-h-[100dvh] max-w-[393px] mx-auto"
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
          {/* 리콜 조회 결과(위험 점수) */}
          <div className="bg-[#ffffff] rounded-lg px-4 py-6 mt-6 mb-4">
            <GaugeInfo
              value={data.found ? 80 : 0} // TODO: 위험도 계산 로직 연결
              title={data.productName ?? "알 수 없는 제품"}
              note={
                data.found ? (
                  <span
                    style={{
                      color: colors.textSecondary,
                      ...typography.body.b2,
                      lineHeight: `${typography.body.b2.lineHeight}px`,
                    }}
                  >
                    해당 제품은{" "}
                    <span
                      style={{
                        color: colors.textPrimary,
                        ...typography.body.b1,
                        lineHeight: `${typography.body.b1.lineHeight}px`,
                      }}
                    >
                      리콜 제품
                    </span>
                    으로 확인되었습니다.
                  </span>
                ) : (
                  ""
                )
              }
            />
          </div>

          {/* 상세 정보 */}
          <div className="bg-[#ffffff] rounded-lg mb-[42px]">
            <ItemDetailInfo
              productName={data?.productName}
              defectContent={data?.defectContent}
              manufacturer={data?.manufacturer}
              publicationDate={data?.publicationDate}
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
            대체상품 더보기
          </button>
        </>
      )}
    </div>
  );
}
