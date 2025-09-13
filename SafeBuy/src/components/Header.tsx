import { useNavigate } from "react-router-dom";
import BackIcon from "../assets/icon/icon_arrow_L.svg";

export default function Header({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center w-full mb-6">
      {/* 뒤로가기 버튼 */}
      <button className={"cursor-pointer"} onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="뒤로가기"/>
      </button>
      {/* 페이지 타이틀 */}
      <h1 className="flex-1 text-center text-[20px] font-medium">{title}</h1>
      {/* 좌우 정렬 용(버튼 크기만큼의 빈 공간) */}
      <div className="w-6" />
    </header>
  );
}
