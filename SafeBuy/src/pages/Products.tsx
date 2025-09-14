import notFound from "../assets/img/NotFound.svg";
import search from "../assets/img/searchbarWhite.svg";
import searchTip from "../assets/img/searchTip.svg";
import Header from "../components/Header";
import ItemDetail from "../components/ItemDetail";
import { colors, typography } from "../tokens/token";

export default function SearchResult() {
  return (
    <div className="p-4 min-h-[100dvh]">
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
        <div className="grid grid-cols-2">
          <ItemDetail size="large" mark="KC 안전인증" />
          <ItemDetail size="large" />
          <ItemDetail size="large" mark="KC 안전인증" />
          <ItemDetail size="large" />
          <ItemDetail size="large" />
          <ItemDetail size="large" />
        </div>
      </div>
    </div>
  );
}

