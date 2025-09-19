// src/service/api.ts
export type SearchPayload = {
  productName?: string | null;
  manufacturer?: string | null;
  modelName?: string | null;
  image?: File | null;
};

export type SearchResponse = {
  found: boolean;
  productName: string | null;
  defectContent: string | null;
  manufacturer: string | null;
  publicationDate: string | null;
  message: string | null;
};

const API_BASE =
  import.meta.env.VITE_API_BASE?.replace(/\/$/, '') ||
  'https://dontrecallme.shop'; // ✅ 프리픽스 포함

export async function searchRecalls(payload: SearchPayload): Promise<SearchResponse> {
  const fd = new FormData();
  if (payload.productName)  fd.append('productName', payload.productName);
  if (payload.manufacturer) fd.append('manufacturer', payload.manufacturer);
  if (payload.modelName)    fd.append('modelName', payload.modelName);
  if (payload.image)        fd.append('image', payload.image);

  const res = await fetch(`${API_BASE}/recalls/search`, {
    method: 'POST',
    body: fd, // 브라우저가 multipart 헤더 자동 설정
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
