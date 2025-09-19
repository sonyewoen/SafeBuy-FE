// src/pages/SearchDetail.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, typography } from '../tokens/token';
import Header from '../components/Header';
import BtnAddPhoto from '../components/BtnAddPhoto';
import InputInfo from '../components/InputInfo';
import BtnLong from '../components/BtnLong';
import iconX from '../assets/icon/icon_X.svg';

type SearchPayload = {
  productName?: string | null;
  manufacturer?: string | null;
  modelName?: string | null;   // ← 브랜드를 modelName 으로 매핑
  image?: File | null;
};

export default function SearchDetail() {
  const navigate = useNavigate();

  const [photoCount, setPhotoCount] = useState(0);
  const [photo, setPhoto] = useState<{ file: File; url: string } | null>(null);

  // 입력값(버튼 활성화 조건에 사용)
  const [name, setName]   = useState('');
  const [maker, setMaker] = useState('');
  const [brand, setBrand] = useState('');

  // 버튼 활성화 규칙: 사진이 있거나 (상품명 && 브랜드)
  const isReady =
  name.trim().length > 0 ||
  maker.trim().length > 0 ||
  brand.trim().length > 0 ||
  !!photo;

  useEffect(() => {
    return () => {
      if (photo?.url) URL.revokeObjectURL(photo.url);
    };
  }, [photo]);

  // 위치/크기 조절 노브
  const UI = {
    canvasW: 393,
    pagePadX: 16,
    headerTop: 12,
    introTop: 24,
    titleMaxW: 360,
    photoTop: 32,
    photoGapY: 12,
    formTop: 32,
    fieldGap: 16,
    labelGap: 6,
    ctaTop: 32,

    // 업로드 버튼과 동일한 107×107
    previewSize: 107,
    previewRadius: 6,
    photoGapX: 10,
  };

  // ✅ 제출: 로딩 페이지로 이동하면서 API 페이로드 전달
  const handleSubmit = () => {
    if (!isReady) return;

    const payload: SearchPayload = {
      productName: name || null,
      manufacturer: maker || null,
      modelName: brand || null,
      image: photo?.file ?? null,
    };

    // /loading 에서 실제 API 호출(fetch) 수행
    navigate('/loading', { state: { payload } });
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      <main
        className="mx-auto w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{
          maxWidth: UI.canvasW,
          paddingLeft: UI.pagePadX,
          paddingRight: UI.pagePadX,
        }}
      >
        {/* 헤더 위치 조절용 래퍼 */}
        <div style={{ marginTop: UI.headerTop }}>
          <Header title="제품정보 입력" />
        </div>

        {/* 상단 안내 */}
        <section style={{ marginTop: UI.introTop }}>
          <h2
            className="text-[#333]"
            style={{
              maxWidth: UI.titleMaxW,
              ...typography.head.h3,
              lineHeight: `${typography.head.h3.lineHeight}px`,
            }}
          >
            제품 정보를 입력해주세요.
          </h2>
          <p
            style={{
              marginTop: 4,
              ...typography.body.b4,
              color: colors.textSecondary,
              lineHeight: `${typography.body.b4.lineHeight}px`,
            }}
          >
            자세히 입력할수록 정확한 결과가 나와요.
          </p>
        </section>

        {/* 제품 사진 */}
        <section style={{ marginTop: UI.photoTop }}>
          <div
            style={{
              ...typography.body.b2,
              color: colors.textPrimary,
              lineHeight: `${typography.body.b2.lineHeight}px`,
            }}
          >
            제품 사진
          </div>

          {/* 업로드 + 미리보기 나란히 */}
          <div
            className="flex items-start"
            style={{ marginTop: UI.photoGapY, columnGap: UI.photoGapX }}
          >
            <BtnAddPhoto
              count={photoCount}
              max={1}
              disabled={!!photo}
              onSelect={(file) => {
                if (photo?.url) URL.revokeObjectURL(photo.url);
                const url = URL.createObjectURL(file);
                setPhoto({ file, url });
                setPhotoCount(1);
              }}
            />

            {photo && (
              <div
                className="relative overflow-hidden"
                style={{
                  width: UI.previewSize,
                  height: UI.previewSize,
                  borderRadius: UI.previewRadius,
                }}
              >
                <img
                  src={photo.url}
                  alt="업로드한 이미지"
                  className="block w-full h-full object-cover"
                />
                {/* X 아이콘 흰색 틴트 + drop-shadow */}
                <button
                  type="button"
                  aria-label="사진 삭제"
                  onClick={() => {
                    URL.revokeObjectURL(photo.url);
                    setPhoto(null);
                    setPhotoCount(0);
                  }}
                  className="absolute top-1.5 right-1.5 p-1"
                  style={{ lineHeight: 0 }}
                >
                  <img
                    src={iconX}
                    alt=""
                    className="block w-5 h-5"
                    style={{
                      filter: 'brightness(0) invert(1) drop-shadow(0 0 2px rgba(0,0,0,.45))',
                      opacity: 0.95,
                    }}
                  />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 입력 폼 */}
        <section style={{ marginTop: UI.formTop }}>
          {/* 상품명 */}
          <div>
            <div
              style={{
                marginBottom: UI.labelGap,
                ...typography.body.b2,
                color: colors.textPrimary,
                lineHeight: `${typography.body.b2.lineHeight}px`,
              }}
            >
              상품명
            </div>
            <InputInfo
              placeholder="상품명을 입력해주세요."
              value={name}
              onChange={setName}
            />
          </div>

          {/* 제조사 */}
          <div style={{ marginTop: UI.fieldGap }}>
            <div
              style={{
                marginBottom: UI.labelGap,
                ...typography.body.b2,
                color: colors.textPrimary,
                lineHeight: `${typography.body.b2.lineHeight}px`,
              }}
            >
              제조사
            </div>
            <InputInfo
              placeholder="제조사를 입력해주세요."
              value={maker}
              onChange={setMaker}
            />
          </div>

          {/* 브랜드 */}
          <div style={{ marginTop: UI.fieldGap }}>
            <div
              style={{
                marginBottom: UI.labelGap,
                ...typography.body.b2,
                color: colors.textPrimary,
                lineHeight: `${typography.body.b2.lineHeight}px`,
              }}
            >
              브랜드
            </div>
            <InputInfo
              placeholder="브랜드를 입력해주세요."
              value={brand}
              onChange={setBrand}
            />
          </div>
        </section>

        {/* 하단 버튼 */}
        <div style={{ marginTop: UI.ctaTop }}>
          <BtnLong
            label="안전성 확인하기"
            disabled={!isReady}
            onClick={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
}
