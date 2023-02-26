import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./HomeTabs.scss";
import { RecruitmentList } from "./RecruitmentList";
export const HomeTabs = () => (
  <Tabs className="tabs">
    <TabList className="tablist">
      <Tab className="tab__recruitment-list">募集一覧</Tab>
      <Tab className="tab__user-list">ユーザー</Tab>
    </TabList>

    <TabPanel>
      <RecruitmentList />
      <RecruitmentList />
      <RecruitmentList />
      <RecruitmentList />
      <RecruitmentList />
      <RecruitmentList />
      <RecruitmentList />
    </TabPanel>
    <TabPanel>
      <h2>ユーザー</h2>
    </TabPanel>
  </Tabs>
);
