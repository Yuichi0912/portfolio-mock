import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
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

export const Router = () => {
  const [user, loading] = useAuthState(auth);
  // const[loading,setLoading] = useState(false);

  // useEffect(()=>{
  //   if(!user) setLoading(true) //ログインしてない間loadingはtrue
  //   else setLoading(false)
  // },[])

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      {/* {user ? (
        <>
          {" "}
          <Header />
          <Footer />
        </>
      ) : (
        <></>
      )} */}

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {user ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/detail/:id" element={<DetailRecruitment />} />
            <Route path="/post" element={<PostRecruitment />} />
            <Route path="/dialogues" element={<Dialogues />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/mypage/:id" element={<MyPage />} />
            <Route path="/mypage/:id/chat" element={<EditProfile />} />
            <Route path="/detail/:id/chat" element={<ChatWithUsers />} />
            <Route path="/user/:id" element={<User />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

// ルーティング記述候補1

// {user ? (
//   <>
//     <Route
//       path="/home"
//       element={user ? <Home /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/detail/:id"
//       element={user ? <DetailRecruitment /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/post"
//       element={user ? <PostRecruitment /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/dialogues"
//       element={user ? <Dialogues /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/notifications"
//       element={user ? <Notifications /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/mypage/:id"
//       element={user ? <MyPage /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/mypage/:id/chat"
//       element={user ? <EditProfile /> : <Navigate to="/login" />}
//     />
//     <Route
//       path="/detail/:id/chat"
//       element={user ? <ChatWithUsers /> : <Navigate to="/login" />}
//     />
//   </>
// ) : (
//   <Route element={<NotFound />} />
// )}
