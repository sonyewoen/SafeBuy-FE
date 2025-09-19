// src/components/ItemDetail.tsx
import { palette } from "../tokens/token";

type ItemProps = {
  imageUrl: string;
  maker: string;
  itemName: string;
  price: string;
  link: string;
  size: "small" | "large"; // 카드 사이즈 분기
};

export default function ItemDetail({
  //더미데이터
  imageUrl,
  maker = "브랜드",
  itemName = "콩순이 노래하고 연주하는 드럼실로폰",
  price = "23,000원",
  size = "large",
  link,
}: ItemProps) {
  // 사이즈별 스타일 정의
  const sizeConfig = {
    small: {
      container: "w-[126px]",
      image: "h-[110px] w-[110px]",
      makerFont: "14px",
      itemFont: "14px",
      priceFont: "12px",
    },
    large: {
      container: "w-[166px] h-[268px]",
      image: "h-[150px] w-[150px]",
      makerFont: "16px",
      itemFont: "16px",
      priceFont: "14px",
    },
  }[size];
  // 클릭 시 제품 링크로 이동
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };
  
  return (
    <div
      className={`flex flex-col bg-[#fff] items-center rounded-lg cursor-pointer p-2 ${sizeConfig.container}`}
      onClick={handleClick}
    >
      {/* 이미지 */}
      <div className={`${sizeConfig.image} bg-gray-200 rounded mb-2`}>
        <img
          src={imageUrl}
          alt={itemName}
          className="w-full h-full object-cover"
        />
      </div>
      {/* 상품 정보 */}
      <div className="block w-full font-semibold">
        {/* 브랜드+상품명  */}
        <div
          className="block w-full"
          style={{
            fontSize: sizeConfig.itemFont,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis", //2줄 이상은 말줄임표 처리
          }}
        >
          <span className="mr-[6px]" style={{ fontWeight: "600" }}>
            {maker}
          </span>
          <span style={{ fontWeight: "400" }}>{itemName}</span>
        </div>
        <div
          className="font-semibold"
          style={{
            fontSize: sizeConfig.priceFont,
            color: palette.gray["50"],
          }}
        >
          {price}
        </div>
      </div>
    </div>
  );
}
