import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
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
import { ChatWithUsers } from "../components/home/ChatWithUsers";
import { NotFound } from "../components/account/NotFound";
import { EditProfile } from "../components/user/EditProfile";
import { useEffect, useState } from "react";
import { User } from "../components/user/User";
import { Loading } from "./Loading";
import { AnimatePresence } from "framer-motion";
import { SuggestRegistration } from "./SuggestRegistration";
import { ApprovedUsers } from "../components/home/ApprovedUsers";
import { People } from "../components/home/People";

export const Router = () => {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/people" element={<People />} />
        <Route path="/detail/:id" element={<DetailRecruitment />} />
        <Route path="/detail/:id/users" element={<ApprovedUsers />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/dialogues" element={<Dialogues />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/mypage" element={<MyPage />} />

        {user ? (
          <>
            {" "}
            <Route path="/post" element={<PostRecruitment />} />
            <Route path="/mypage/edit" element={<EditProfile />} />
            <Route path="/detail/:id/chat" element={<ChatWithUsers />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/home" />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
};
