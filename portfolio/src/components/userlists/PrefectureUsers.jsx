import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import "./PrefectureUsers.scss";

export const PrefectureUsers = ({ selectedResidence }) => {
  const [usersData, setUsersData] = useState([]);
  const [myUsersData, setMyUsersData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const docRef = query(
      collection(db, "usersData"),
      where("residence", "==", `${selectedResidence}`)
    );
    onSnapshot(docRef, (querySnapshot) => {
      setUsersData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [selectedResidence]);

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const truncateText = (text) => {
    if (text.length > 70) {
      return text.slice(0, 70) + "...";
    } else {
      return text;
    }
  };


  if (selectedResidence == "") {
    return (
      <div>
        <p className="select__pref">都道府県を選択してください</p>
      </div>
    );
  }

  return (
    <div className="prefuser-page">
      {isSmallScreen ? (
        <>
          {" "}
          {usersData.map((data) => {
            return (
              <div
                key={data.userId}
                className="usersinfo"
                onClick={() => navigate(`/user/${data.userId}`)}
              >
                <div className="userinfo__card">
                  <p className="usersinfo__level">Lv. {data.level}</p>
                  <img
                    src={data.image}
                    alt="プロフィール画像"
                    className="usersinfo__image"
                  />
                  <p className="usersinfo__username">{data.userName}</p>
                  <p className="usersinfo__age-residence">
                    {data.age}歳 | {data.residence}
                  </p>

                  <p className="userinfo__word">{data.word}</p>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>          {usersData.map((data) => {
          return (
            <div
              key={data.userId}
              className="pref-users__large"
              onClick={() => navigate(`/user/${data.userId}`)}
            >
              <div className="userinfo__large-card">
                <p className="usersinfo__large-level">Lv. {data.level}</p>
                <img
                  src={data.image}
                  alt="プロフィール画像"
                  className="usersinfo__large-image"
                />
                <p className="usersinfo__large-username">{data.userName}</p>
                <p className="usersinfo__large-age-residence">
                  {data.age}歳 | {data.residence}
                </p>

                <p className="userinfo__large-word">{data.word}</p>
              </div>
              <div className="userinfo__large-introduction">
                <p>{truncateText(data.introduction)}</p>
              </div>
            </div>
          );
        })}
</>
      )}
    </div>
  );
};
