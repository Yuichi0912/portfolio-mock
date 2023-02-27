import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dialogues } from "../components/dialogues/Dialogues";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";
import { PostRecruitment } from "../components/home/PostRecruitment.jsx";
import { Notifications } from "../components/notifications/Notifications";
import { MyPage } from "../components/user/MyPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/post" element={<PostRecruitment />} />
        <Route path="/dialogues" element={<Dialogues />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
