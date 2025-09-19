// src/components/ItemDetailInfo.tsx
import React from "react";
import { colors, typography } from "../tokens/token";

type ItemDetailInfoProps = {
  productName?: string | null;      // 모델명/제품명
  defectContent?: string | null;    // 결함 내용
  manufacturer?: string | null;     // 제조사
  publicationDate?: string | null;  // 공표일(YYYY-MM-DD 또는 ISO)
  url?: string | null;              // 원본 링크(있으면)
};

// YYYY-MM-DD 형태로 최대한 정규화
function formatDate(input?: string | null) {
  if (!input) return null;
  // 1) 이미 YYYY-MM-DD라면 그대로
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input;
  // 2) ISO 형태 등에서 앞 10자리 자르기
  const d = input.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : input;
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

  return (
    <div className="rounded-md p-4">
      <div className="space-y-2 text-sm">
        <LabelRow label="모델명" value={safeName} />
        <LabelRow label="결함 내용" value={safeDefect} />
        <LabelRow label="제조사" value={safeMaker} />
        <LabelRow label="공표일" value={safeDate} />
        <LabelRow
          label="원본 링크"
          value={
            url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="break-all"
                style={{
                  ...typography.body.b5,
                  lineHeight: "normal",
                  color: colors.primary,
                }}
              >
                {url}
              </a>
            ) : (
              "—"
            )
          }
        />
      </div>
    </div>
  );
}
