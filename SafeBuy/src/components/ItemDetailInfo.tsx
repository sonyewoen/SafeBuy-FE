// src/components/ItemDetailInfo.tsx
import React from "react";
import { colors, typography } from "../tokens/token";

type ProductDetail = {
  modelName: string;
  defectInfo: string;
  manufacturer: string;
  date: string;
  url: string;
};

// 라벨+값 좌우로 배치
function LabelRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      {/* 라벨 */}
      <span
        className="shrink-0  min-w-[52px]"
        style={{
          ...typography.body.b4,
          lineHeight: "normal", // 토큰에서 내려오는 값 덮어쓰기(위아래 간격 제거용)
          color: colors.textMuted,
        }}
      >
        {label}
      </span>
      {/* 값 */}
      <span
        style={{
          ...typography.body.b5,
          lineHeight: "normal",
          color: colors.textPrimary,
        }}
      >
        {value}
      </span>
    </div>
  );
}
export default function ItemDetailInfo() {
  //  더미데이터(API 연동시 props로 대체)
  const dummy: ProductDetail = {
    modelName: "베비라보 호빵맨 사이좋은 콘서트",
    defectInfo:
      "해당 상품의 일부에서 충격이 가해지면 일부 피규어가 분리되는 문제가 있고, 분리된 피규어를 잘못 마실 우려가 있기 때문.",
    manufacturer: "주식회사 반다이",
    date: "2024-10-02",
    url: "https://www.safetykorea.kr/recall/ajax/fRecallBoard",
  };

  return (
    <div className="rounded-md p-4">
      <div className="space-y-2 text-sm">
        <LabelRow label="모델명" value={dummy.modelName} />
        <LabelRow label="결함 내용" value={dummy.defectInfo} />
        <LabelRow label="제조사" value={dummy.manufacturer} />
        <LabelRow label="공표일" value={dummy.date} />
        <LabelRow
          label="원본 링크"
          value={
            <a
              href={dummy.url}
              target="_blank"
              rel="noreferrer"
              className="break-all"
              style={{
                ...typography.body.b5,
                lineHeight: "normal",
                color: colors.primary,
              }}
            >
              {dummy.url}
            </a>
          }
        />
      </div>
    </div>
  );
}
