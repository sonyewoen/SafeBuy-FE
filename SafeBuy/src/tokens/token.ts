// src/tokens/token.ts

// ─────────────────────────────────────────────────────────────
// Color (palette + semantic)
// ─────────────────────────────────────────────────────────────
export const palette = {
  gray: {
    '10': '#f5f5f5',
    '20': '#d9d9d9',
    '30': '#888888',
    '50': '#555555',
    '70': '#333333',
    '90': '#222222',
    // Figma: "90(50)" (#222222b3, 약 70% alpha)
    '90a70': '#222222b3',
  },
  blue: {
    '20': '#eef2ff',
    '50': '#a5b8fe',
    '80': '#5c7df2', // main
    '90': '#3057e0',
  },
  red: {
    base: '#e63429',
    tint10: '#e634291a',
  },
  green: {
    base: '#76d075',
    tint10: '#74d0761a',
  },
  yellow: {
    base: '#f9d237',
    tint10: '#f5d1431a',
  },
} as const;

// UI에서 바로 쓰기 쉬운 시맨틱 매핑(필요에 따라 수정/확장)
export const colors = {
  // 브랜드
  primary: palette.blue['80'],
  primaryHover: palette.blue['90'],
  primarySoft: palette.blue['20'],

  // 텍스트
  textPrimary: palette.gray['90'],
  textSecondary: palette.gray['50'],
  textMuted: palette.gray['30'],
  textOnPrimary: '#ffffff',

  // 배경/서피스
  surface: '#ffffff',
  surfaceMuted: palette.gray['10'],

  // 보더
  border: palette.gray['20'],
  borderStrong: palette.gray['50'],

  // 상태
  success: palette.green.base,
  successBg: palette.green.tint10,
  warning: palette.yellow.base,
  warningBg: palette.yellow.tint10,
  error: palette.red.base,
  errorBg: palette.red.tint10,
} as const;

// ─────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────
const fontStack =
  "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif";

export const typography = {
  head: {
    h1: { fontFamily: fontStack, fontSize: 32, lineHeight: 48, fontWeight: 700, letterSpacing: 0 },
    h2: { fontFamily: fontStack, fontSize: 28, lineHeight: 36.4, fontWeight: 700, letterSpacing: 0 },
    h3: { fontFamily: fontStack, fontSize: 24, lineHeight: 36, fontWeight: 700, letterSpacing: 0 },
    h4: { fontFamily: fontStack, fontSize: 24, lineHeight: 31.2, fontWeight: 600, letterSpacing: 0 },
    h5: { fontFamily: fontStack, fontSize: 20, lineHeight: 30, fontWeight: 700, letterSpacing: 0 },
    h6: { fontFamily: fontStack, fontSize: 20, lineHeight: 30, fontWeight: 500, letterSpacing: 0 },
  },
  body: {
    b1: { fontFamily: fontStack, fontSize: 16, lineHeight: 24, fontWeight: 700, letterSpacing: 0 },
    b2: { fontFamily: fontStack, fontSize: 16, lineHeight: 24, fontWeight: 600, letterSpacing: 0 },
    b3: { fontFamily: fontStack, fontSize: 16, lineHeight: 24, fontWeight: 500, letterSpacing: 0 },
    b4: { fontFamily: fontStack, fontSize: 14, lineHeight: 21, fontWeight: 600, letterSpacing: 0 },
    b5: { fontFamily: fontStack, fontSize: 14, lineHeight: 21, fontWeight: 500, letterSpacing: 0 },
    // 상품카드-브랜드
    b6: { fontFamily: fontStack, fontSize: 14, lineHeight: 18.2, fontWeight: 600, letterSpacing: 0 },
    // 상품카드-상품명
    b7: { fontFamily: fontStack, fontSize: 14, lineHeight: 18.2, fontWeight: 500, letterSpacing: 0 },
    b8: { fontFamily: fontStack, fontSize: 12, lineHeight: 18, fontWeight: 600, letterSpacing: 0 },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// (옵션) Grid 메타 – 필요 시 참고용
// ─────────────────────────────────────────────────────────────
export const grids = {
  '11': {
    rows1: { pattern: 'rows', gutter: 24, alignment: 'stretch', count: 1, offset: 24 },
    rows4: { pattern: 'rows', gutter: 24, alignment: 'stretch', count: 4, offset: 34 },
    cols4: { pattern: 'columns', gutter: 24, alignment: 'stretch', count: 4, offset: 16 },
  },
  '22': {
    cols5: { pattern: 'columns', gutter: 20, alignment: 'stretch', count: 5, offset: 25 },
  },
  standard: {
    rows1: { pattern: 'rows', gutter: 24, alignment: 'stretch', count: 1, offset: 24 },
    rows4: { pattern: 'rows', gutter: 24, alignment: 'stretch', count: 4, offset: 32 },
    cols4: { pattern: 'columns', gutter: 24, alignment: 'stretch', count: 4, offset: 16 },
  },
} as const;

// 편의상 한 번에 가져오고 싶으면 아래 export 사용
export const tokens = { palette, colors, typography, grids } as const;
