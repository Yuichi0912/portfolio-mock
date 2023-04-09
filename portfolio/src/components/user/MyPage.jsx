import { auth, db } from "../../firebase";
import { useLocation, useNavigate } from "react-router";
import "./MyPage.scss";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { Settings } from "./Settings";
import { SuggestRegistration } from "../../routes/SuggestRegistration";
import { Sidebar } from "../sidebar/Sidebar";
import { SideAd } from "../../routes/SideAd";

export const MyPage = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const id = auth.currentUser ? auth.currentUser.uid : [{}];

  const docRef = query(
    collection(db, "usersData"),
    where("userId", "==", `${id}`)
  );
  const [showEditPage, setShowEditPage] = useState(false);
  console.log(id);
  // 登録したユーザー情報をブラウザに表示する (.lengthが0と1でreturn文の出しわけをするため)
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // ログアウト
  const handleLogout = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isRendered ? (
    <>
      <div className="mypage">
        {isSmallScreen ? (
          <>
            {" "}
            <Header />
            {user ? (
              <>
                {/* <Settings /> */}
                {userData.length == 1 ? (
                  userData.map((data) => {
                    return (
                      <div key={data.userId} className="profile">
                        <p className="profile__level">Lv. {data.level}</p>
                        <img
                          src={data.image}
                          alt="プロフィール画像"
                          className="profile__image"
                        />
                        <br />
                        <Link
                          className="settings__menu--edit-profile"
                          to={"/mypage/edit"}
                        >
                          プロフィールを編集する
                        </Link>

                        <p className="profile__username">{data.userName}</p>
                        <p className="profile__age-residence">
                          {data.age}歳 | {data.residence}
                        </p>
                        <p className="profile__word">{data.word}</p>
                        <p className="profile__introduction-title">自己紹介</p>
                        <p className="profile__introduction">
                          {data.introduction}
                        </p>
                        <button
                          className="settings__menu--logout"
                          onClick={handleLogout}
                        >
                          ログアウトする
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <button
                      className="profile__edit-button"
                      onClick={() => navigate("/mypage/edit")}
                    >
                      プロフィールを編集する
                    </button>
                  </>
                )}
              </>
            ) : (
              <SuggestRegistration />
            )}
            <Footer />
          </>
        ) : (
          <>
            {" "}
            <Header />
            <Sidebar />
            <SideAd />
            {user ? (
              <>
                {/* <Settings /> */}
                {userData.length == 1 ? (
                  userData.map((data) => {
                    return (
                      <div key={data.userId} className="profile">
                        <p className="profile__level">Lv. {data.level}</p>

                        <img
                          src={data.image}
                          alt="プロフィール画像"
                          className="profile__image"
                        />
                        <br />
                        <Link
                          className="settings__menu--edit-profile"
                          to={"/mypage/edit"}
                        >
                          プロフィールを編集する
                        </Link>

                        <p className="profile__username">{data.userName}</p>
                        <p className="profile__age-residence">
                          {data.age}歳 | {data.residence}
                        </p>
                        <p className="profile__word">{data.word}</p>
                        <p className="profile__introduction-title">自己紹介</p>
                        <p className="profile__introduction">
                          {data.introduction}
                        </p>
                        <button
                          className="settings__menu--logout"
                          onClick={handleLogout}
                        >
                          ログアウトする
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <button
                      className="profile__edit-button"
                      onClick={() => navigate("/mypage/edit")}
                    >
                      プロフィールを編集する
                    </button>
                  </>
                )}
              </>
            ) : (
              <SuggestRegistration />
            )}
          </>
        )}
      </div>
    </>
  ) : (
    <></>
  );
};
