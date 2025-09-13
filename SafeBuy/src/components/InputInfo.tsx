// src/components/InputInfo.tsx
import { useEffect, useState } from "react";
import { palette, typography } from "../tokens/token";
import XIcon from "../assets/icon/icon_x_circle.svg";

type InputProps = {
  placeholder?: string;
  /** 부모가 값을 제어하고 싶을 때 사용 (선택) */
  value?: string;
  /** 부모 제어 모드에서 값이 바뀔 때 콜백 (선택) */
  onChange?: (v: string) => void;
  /** X 버튼으로 비웠을 때 알림(선택) */
  onClear?: () => void;
};

export default function InputInfo({
  placeholder,
  value: valueProp,
  onChange,
  onClear,
}: InputProps) {
  // 내부 상태(비제어용). 부모가 value를 주면 그 값을 우선 사용.
  const [inner, setInner] = useState("");
  const controlled = valueProp !== undefined;
  const value = controlled ? (valueProp as string) : inner;

  const [focused, setFocused] = useState(false);

  // 부모가 value를 갱신하면 내부 표시도 동기화
  useEffect(() => {
    if (controlled) setInner(valueProp as string);
  }, [controlled, valueProp]);

  const handleChange = (v: string) => {
    if (controlled) onChange?.(v);
    else setInner(v);
  };

  const handleClear = () => {
    if (controlled) onChange?.("");
    else setInner("");
    onClear?.();
  };

  return (
    <div
      className="flex items-center justify-between w-full py-3 px-4 rounded-lg h-[46px] border-2"
      style={{
        borderColor: focused ? palette.gray["70"] : palette.gray["20"], // 포커스에 따라 테두리 색 변경
      }}
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 outline-none"
        style={{
          ...typography.body.b3,
          lineHeight: "normal", // 토큰에서 내려오는 값 덮어쓰기(위아래 간격 제거용)
        }}
      />
      {/* 입력 값이 있을 때만 X 버튼 표시 */}
      {value && (
        <button
          onClick={handleClear}
          type="button"
          className="ml-2 w-6 h-6 flex items-center justify-center cursor-pointer"
          aria-label="입력 내용 지우기"
        >
          <img src={XIcon} alt="" />
        </button>
      )}
    </div>
  );
}
