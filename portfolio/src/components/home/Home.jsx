import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RecruitmentList } from "./RecruitmentList";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  // useEffect(()=>{
  //   if (!user) return navigate("/login");
  // },[user])


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
            <TabPanel className="tabpanel__user-list"></TabPanel>
          </Tabs>

          <button className="post-button" onClick={() => navigate("/post")}>
            <img src="../images/pencil.svg" alt="投稿アイコン" />
          </button>
        </main>
      ) : (
        <>
        {navigate("/login")}
          {/* <Navigate replace to="/login" />{" "} */}
        </>
      )}
      <Footer />
    </>
  );
};
