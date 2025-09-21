// src/components/ItemDetailInfo.tsx
import React from "react";
import { colors, typography } from "../tokens/token";
import icon from "../assets/icon/icon_arrow_R_2.svg";
type ItemDetailInfoProps = {
  productName?: string | null; // 모델명/제품명
  defectContent?: string | null; // 결함 내용
  manufacturer?: string | null; // 제조사
  publicationDate?: string | null; // 공표일(YYYY-MM-DD 또는 ISO)
  url?: string | null; // 원본 링크(있으면)
};

//날짜 정규화
function formatDate(input?: string | null): string | null {
  if (!input) return null;

  const year = input.slice(0, 4);
  const month = input.slice(4, 6);
  const day = input.slice(6, 8);

  return `${year}-${month}-${day}`;
}

// 라벨+값 좌우 배치
function LabelRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className="shrink-0 min-w-[52px]"
        style={{
          ...typography.body.b4,
          lineHeight: "normal",
          color: colors.textMuted,
        }}
      >
        {label}
      </span>
      <span
        style={{
          ...typography.body.b5,
          lineHeight: "normal",
          color: colors.textPrimary,
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function ItemDetailInfo({
  productName,
  defectContent,
  manufacturer,
  publicationDate,
  url,
}: ItemDetailInfoProps) {
  const safeName = productName?.trim() || "—";
  const safeDefect = defectContent?.trim() || "—";
  const safeMaker = manufacturer?.trim() || "—";
  const safeDate = formatDate(publicationDate) || "—";

  const handleClick = () => {
    if (url) {
      window.open(url, "_blank"); // 새 탭에서 열기
    }
  };
  return (
    <div className="rounded-md p-4">
      <div className="space-y-2 text-sm">
        <LabelRow label="모델명" value={safeName} />
        <LabelRow label="결함 내용" value={safeDefect} />
        <LabelRow label="제조사" value={safeMaker} />
        <LabelRow label="공표일" value={safeDate} />
        <span
          onClick={handleClick}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginTop: 16,
            ...typography.body.b4,
            lineHeight: "normal",
            color: colors.textMuted,
            cursor: "pointer",
          }}
        >
          더 자세한 내용 보러가기{" "}
          <img src={icon} style={{ width: 12, height: 12 }} />
        </span>
      </div>
    </div>
  );
}
