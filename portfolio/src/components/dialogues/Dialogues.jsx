import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { SideAd } from "../../routes/SideAd";
import { SuggestRegistration } from "../../routes/SuggestRegistration";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { RecruitmentList } from "../home/RecruitmentList";
import { Sidebar } from "../sidebar/Sidebar";
import { ApprovedJoinPosts } from "./ApprovedJoinPosts";
import { ChattingPosts } from "./ChattingPosts";
import "./Dialogues.scss";
import { OwnPostLists } from "./OwnPostLists";

export const Dialogues = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [user] = useAuthState(auth);

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dialogues">
      {isSmallScreen ? (
        <>
          {" "}
          <Header />
          {user ? (
            <>
              {" "}
              <OwnPostLists />
              <ChattingPosts />
              <ApprovedJoinPosts />
            </>
          ) : (
            <SuggestRegistration />
          )}
          <Footer />
        </>
      ) : (
        <>
          {" "}
          <Sidebar />
          <SideAd />
          {user ? (
            <>
              {" "}
              <OwnPostLists />
              <ChattingPosts />
              <ApprovedJoinPosts />
            </>
          ) : (
            <SuggestRegistration />
          )}
        </>
      )}
    </div>
  );
};
