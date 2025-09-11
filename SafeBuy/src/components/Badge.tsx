// src/components/Badge.tsx
import { palette, typography } from "../tokens/token";

type BadgeProps = {
  level: "고위험" | "중위험" | "저위험";
};

export default function Badge({ level }: BadgeProps) {
  return (
    <div
      className="inline-block px-2 py-[2px] rounded"
      style={{
        backgroundColor:
          level === "고위험"
            ? palette.red.tint10
            : level === "중위험"
              ? palette.yellow.tint10
              : palette.green.tint10,
        color:
          level === "고위험"
            ? palette.red.base
            : level === "중위험"
              ? palette.yellow.base
              : palette.green.base,

        ...typography.body.b4,
        lineHeight: "normal", // 토큰에서 내려오는 값 덮어쓰기(위아래 간격 제거용)
      }}
    >
      {level}
    </div>
  );
}
