import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ItemDetail from "../components/ItemDetail";
import { colors, typography } from "../tokens/token";
import type { SearchResponse } from "../service/api";

export default function Products() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { data?: SearchResponse; error?: boolean; message?: string };
  };

  const data = state?.data;
  const error = state?.error;
  const message = state?.message;

  if (error) {
    return (
      <div className="p-4">
        <p style={{ color: "red" }}>{message ?? "오류가 발생했습니다."}</p>
      </div>
    );
  }

  if (!data) {
    // state가 없으면 홈으로 돌려보내기
    navigate("/", { replace: true });
    return null;
  }

  const alternatives = data.alternatives ?? [];

  return (
    <div
      className="p-4 min-h-[100dvh] max-w-[393px] mx-auto"
      style={{ background: colors.primarySoft }}
    >
      <Header title="대체 상품" />

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
          ...typography.body.b3,
          lineHeight: `${typography.body.b3.lineHeight}px`,
          marginBottom: "16px",
        }}
      >
        안전한 대체 상품을 추천해드려요.
      </h3>

      {/* 추천 상품 카드리스트 */}
      <div className="overflow-hidden -mr-4">
        <div className="grid grid-cols-2 gap-4">
          {alternatives.map((product, index) => (
            <ItemDetail
              key={index}
              size="large"
              imageUrl={product.image}
              maker={product.maker}
              itemName={product.title}
              price={product.price}
              link={product.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
