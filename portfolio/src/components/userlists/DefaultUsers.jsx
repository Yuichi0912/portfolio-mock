import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import "./DefaultUsers.scss";

export const DefaultUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const docRef = collection(db, "usersData");
  const navigate = useNavigate();

  // 登録したユーザー情報をすべてブラウザに表示する
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUsersData(querySnapshot.docs.map((doc) => doc.data()));
    });
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

  const truncateText = (text) => {
    if (text.length > 70) {
      return text.slice(0, 70) + "...";
    } else {
      return text;
    }
  };


  return (
    <div className="defaultuser-page">
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
        <>
          {" "}
          {usersData.map((data) => {
            return (
              <div
                key={data.userId}
                className="default-users__large"
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
