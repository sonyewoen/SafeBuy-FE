// src/components/ImagePopup.tsx
import { useEffect } from 'react';
import { palette } from '../tokens/token';

type Props = {
  open: boolean;
  onClose: () => void;
  imageSrc: string;
  closeIconSrc: string;
  maxWidth?: number; // px
};

export default function ImagePopup({
  open,
  onClose,
  imageSrc,
  closeIconSrc,
  maxWidth = 360,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      style={{ background: palette.gray['90a70'] }} // 반투명 딤
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{ width: 'min(90vw, 100%)', maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imageSrc} alt="" className="block w-full h-auto" />
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-2 right-2 p-1"
          style={{ lineHeight: 0 }}
        >
          {/* 원형 배경/그림자 제거, 아이콘만 표시 */}
          <img src={closeIconSrc} alt="" className="block w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
