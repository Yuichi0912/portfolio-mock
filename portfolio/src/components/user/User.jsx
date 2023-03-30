import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { AnimatePresence, motion } from "framer-motion";
import "./User.scss"

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
    <>
      <Header />
      <motion.div
        className="mypage"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          // duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <Link className="user__backward" to={`/home`}>
          <img src="../../images/chevron-left.svg" alt="戻るボタン" />
        </Link>
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
      </motion.div>
      <Footer />
    </>
  );
};
