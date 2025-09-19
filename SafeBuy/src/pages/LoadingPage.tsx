import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import CautionInfo from "../components/CautionInfo";
import { colors, typography } from "../tokens/token";
import mascot from "../assets/img/mascot.svg";
import { searchRecalls } from "../service/api"; // 함수
import type { SearchPayload } from "../service/api"; // 타입

export default function LoadingPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { payload?: SearchPayload } };

  useEffect(() => {
    console.log("API_BASE =", import.meta.env.VITE_API_BASE);
    const payload = state?.payload;
    if (!payload) {
      navigate("/", { replace: true });
      return;
    }

    (async () => {
      try {
        const data = await searchRecalls(payload);
        navigate("/searchresult", { state: { data } });
      } catch (err: any) {
        navigate("/searchresult", {
          state: {
            error: true,
            message: err?.message ?? "요청 처리 중 오류가 발생했습니다.",
          },
        });
      }
    })();
  }, [navigate, state]);

  return (
    <div
      className="min-h-[100dvh] grid place-items-center"
      style={{
        background: colors.primarySoft,
      }}
    >
      <main
        className="relative w-full min-h-[100dvh] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        style={{ maxWidth: 393, paddingLeft: 16, paddingRight: 16 }}
      >
        <section
          className="text-center"
          style={{ marginTop: 80 }}
          aria-live="polite"
        >
          <h1 className="text-[#222] font-bold" style={typography.head.h3}>
            안전성 검증 중...
          </h1>
          <p
            className="text-[#555]"
            style={{ ...typography.body.b3, marginTop: 4 }}
          >
            잠시만 기다려주세요
          </p>
          <div style={{ marginTop: 30 }}>
            <Loading size={56} thickness={6} arcColor={colors.primary} />
          </div>
        </section>

        <section className="relative" style={{ marginTop: 170 }}>
          <img
            src={mascot}
            alt=""
            className="absolute pointer-events-none select-none z-10"
            style={{ width: 149, right: 16, top: -135 }}
          />
          <div
            className="relative z-20"
            style={{ width: 361, margin: "0 auto" }}
          >
            <CautionInfo className="w-full" intervalMs={3000} startIndex={0} />
          </div>
        </section>
      </main>
    </div>
  );
}
