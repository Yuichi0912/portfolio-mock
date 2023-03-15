import { auth, db } from "../../firebase";
import { useNavigate } from "react-router";
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
import { useParams } from "react-router-dom";
import { EditProfile } from "./EditProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const docRef = query(
    collection(db, "usersData"),
    where("userId", "==", `${id}`)
  );
  const [showEditPage, setShowEditPage] = useState(false);

  // 登録したユーザー情報をブラウザに表示する (.lengthが0と1でreturn文の出しわけをするため)
  useEffect(() => {
    // getDocs(docRef).then((querySnapshot) => {
    //   setUserData(querySnapshot.docs.map((doc) => doc.data()))
    // });
    onSnapshot(docRef, (querySnapshot) => {
      setUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(userData);

  // ログアウト
  const handleLogout = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  return (
    <div className="mypage">
      <Header />
      {userData.length == 1 ? (
        userData.map((data) => {
          return (
            <div key={data.userId} className="profile">
              <img
                src={data.image}
                alt="プロフィール画像"
                className="profile__image"
              />
              <p className="profile__username">{data.userName}</p>
              <p className="profile__level">Lv. {data.level}</p>
              <p className="profile__age-residence">
                {data.age}歳 | {data.residence}
              </p>
              <p>ひとこと</p>
              <p className="profile__word">{data.word}</p>
              <p>自己紹介</p>
              <p className="profile__introduction">{data.introduction}</p>
            </div>
          );
        })
      ) : (
        <><p>プロフィール情報を追加しよう！</p></>
      )}
      <button className="profile__edit-button" onClick={() => navigate(`/mypage/${id}/chat`)}>
        プロフィールを編集する
      </button>
      <button className="logout__button" onClick={handleLogout}>ログアウトする</button>
      <Footer />
    </div>
  );
};
