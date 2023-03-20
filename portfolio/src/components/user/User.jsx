import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";

export const User = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams(); // クリックされたユーザーの、ユーザー🆔
  const docRef = query(
    collection(db, "usersData"),
    where("userId", "==", `${id}`)
  );

  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div className="mypage">
      <Header />
      {userData.map((data) => {
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
      })}
      <Footer />
    </div>
  );
};
