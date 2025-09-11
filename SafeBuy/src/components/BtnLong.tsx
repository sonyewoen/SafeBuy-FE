// src/components/BtnLong.tsx
import { colors, typography } from "../tokens/token";

type BtnLongProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function BtnLong({
  label,
  onClick,
  disabled = false,
}: BtnLongProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full py-3 rounded-lg transition text-center",
        disabled
          ? "bg-[var(--color-disabled)] cursor-not-allowed"
          : "bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] cursor-pointer",
      ].join(" ")}
      style={{
        // tailwind 클래스에서 사용 가능한 CSS 변수 정의
        ["--color-primary" as any]: colors.primary,
        ["--color-primary-hover" as any]: colors.primaryHover,
        ["--color-disabled" as any]: colors.surfaceMuted,
        color: colors.textOnPrimary,
        ...typography.body.b2,
        lineHeight: "normal", // 토큰에서 내려오는 값 덮어쓰기(위아래 간격 제거용)
      }}
    >
      {label}
    </button>
  );
}
