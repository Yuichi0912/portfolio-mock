import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dialogues } from "../components/dialogues/Dialogues";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Home } from "../components/home/Home";
import { Login } from "../components/account/Login";
import { PostRecruitment } from "../components/home/PostRecruitment.jsx";
import { Notifications } from "../components/notifications/Notifications";
import { MyPage } from "../components/user/MyPage";
import { Signup } from "../components/account/Signup";
import { DetailRecruitment } from "../components/home/DetailRecruitment";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Router = () => {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      {user ? (
        <>
          {" "}
          <Header />
          <Footer />
        </>
      ) : (
        <></>
      )}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<DetailRecruitment />} />
            <Route path="/post" element={<PostRecruitment />} />
            <Route path="/dialogues" element={<Dialogues />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mypage" element={<MyPage />} />
          </>
        ) : (
          <Route element={<Navigate to="/signin" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
