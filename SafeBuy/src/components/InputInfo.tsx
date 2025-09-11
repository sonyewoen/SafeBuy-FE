// src/components/InputInfo.tsx
import { useState } from "react";
import { palette, typography } from "../tokens/token";
import XIcon from "../assets/icon/icon_x_circle.svg";

type InputProps = {
  placeholder?: string;
};

export default function InputInfo({ placeholder }: InputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="flex items-center justify-between w-full py-3 px-4 rounded-lg h-[46px] border-2"
      style={{
        borderColor: focused ? palette.gray["70"] : palette.gray["20"], //포커스 여부에 따라 테두리 색 변경
      }}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 outline-none"
        style={{
          ...typography.body.b3,
          lineHeight: "normal", // 토큰에서 내려오는 값 덮어쓰기(위아래 간격 제거용)
        }}
      />
      {/* 입력 값이 있을때만 x버튼 표시 */}
      {value && (
        <button
          onClick={() => setValue("")}
          type="button"
          className="ml-2 w-6 h-6 flex items-center justify-center cursor-pointer"
        >
          <img src={XIcon} />
        </button>
      )}
    </div>
  );
}
