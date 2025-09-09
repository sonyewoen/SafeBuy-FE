// src/components/BtnAddPhoto.tsx
import React, { useId } from "react";
import { palette } from "../tokens/token";

type BtnAddPhotoProps = {
  /** 현재 등록된 사진 수 */
  count: number;
  /** 최대 등록 가능 개수 (기본 1) */
  max?: number;
  /** 파일 선택 시 호출 (첫 번째 파일만 전달) */
  onSelect?: (file: File) => void;
  /** input accept (기본: 이미지) */
  accept?: string;
  /** 외부에서 추가 스타일을 주고 싶을 때 */
  className?: string;
  /** 명시적으로 비활성화 */
  disabled?: boolean;
};

export default function BtnAddPhoto({
  count,
  max = 1,
  onSelect,
  accept = "image/*",
  className = "",
  disabled,
}: BtnAddPhotoProps) {
  const uid = useId();
  const isFull = disabled || count >= max;

  const borderColor = isFull ? palette.gray["20"] : palette.gray["30"];
  const textColor = borderColor; // 디자인 시안과 동일하게 테두리 색과 텍스트 색을 맞춤

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect?.(file);
    // 같은 파일을 다시 선택할 수 있도록 초기화
    e.currentTarget.value = "";
  };

  return (
    <div className={className}>
      <input
        id={uid}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={isFull}
        className="sr-only"
      />

      <label
        htmlFor={uid}
        aria-disabled={isFull}
        className={[
          "relative block w-[107px] h-[107px] p-4 rounded-md border bg-white",
          "flex items-center justify-center",
          isFull ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:shadow-sm",
        ].join(" ")}
        style={{ borderColor }}
      >
        <div className="flex w-[67px] flex-col items-center gap-[9px]">
          {/* 카메라 아이콘 (라인 아이콘) */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="6"
              width="22"
              height="14"
              rx="2"
              ry="2"
              stroke={textColor}
              strokeWidth="2"
            />
            <circle cx="12" cy="13" r="4" stroke={textColor} strokeWidth="2" />
            <path d="M8 6l1.2-2h5.6L16 6" stroke={textColor} strokeWidth="2" />
          </svg>

          <div
            className="text-center text-[14px] leading-[21px] font-semibold"
            style={{ color: textColor }}
          >
            <div>사진 등록</div>
            <div>({count}/{max})</div>
          </div>
        </div>
      </label>
    </div>
  );
}
