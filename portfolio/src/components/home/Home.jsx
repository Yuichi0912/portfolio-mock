import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RecruitmentList } from "./RecruitmentList";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { UsersList } from "../home/UsersList";
import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";

export const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1020);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      {user ? (
        <main className="home">
          <Tabs className="tabs">
            <TabList className="tablist">
              <Tab className="tab__recruitment-list">募集一覧</Tab>
              <Tab className="tab__user-list">ユーザー</Tab>
            </TabList>

            <TabPanel className="tabpanel__recruitment-list">
              <RecruitmentList />
            </TabPanel>
            <TabPanel className="tabpanel__user-list">
              <UsersList />
            </TabPanel>
          </Tabs>

          {isSmallScreen ? (
            <button
              className="post-button-small"
              onClick={() => navigate("/post")}
            >
              <img src="../images/pencil.svg" alt="投稿アイコン" />
            </button>
          ) : (
            <button
              className="post-button-large"
              onClick={() => navigate("/post")}
            >
              <img src="../images/pencil.svg" alt="投稿アイコン" />
              <p>投稿する</p>
            </button>
          )}
        </main>
      ) : (
        <></>
      )}
      <Footer />
    </>
  );
};
