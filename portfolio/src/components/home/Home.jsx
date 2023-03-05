import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RecruitmentList } from "./RecruitmentList";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  const navigate = useNavigate();

  return (
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
  );
};
