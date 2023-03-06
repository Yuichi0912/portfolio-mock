import { auth, db } from "../../firebase";
import { useNavigate } from "react-router";
import "./MyPage.scss";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { EditProfile } from "./EditProfile";

export const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const docRef = doc(db, "usersData", `${id}`);
  const [showEditPage, setShowEditPage] = useState(false);

  // 登録したユーザー情報をブラウザに表示する
  useEffect(() => {
    getDoc(docRef).then((querySnapshot) => {
      const arrList = [querySnapshot.data()];
      setUserData(arrList);
    });
  }, []);

  // ログアウト
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  // ユーザーの情報が登録されたら表示する。

  return (
    <div className="mypage">
      {userData != undefined ? (
        <>
          {" "}
          {userData.map(
            ({
              userName,
              image,
              userId,
              level,
              age,
              word,
              introduction,
              residence,
            }) => {
              return (
                <div key={userId} className="profile">
                  <img
                    src={image}
                    alt="プロフィール画像"
                    className="profile__image"
                  />
                  <p className="profile__username">{userName}</p>
                  <p className="profile__level">Lv. {level}</p>
                  <p className="profile__age-residence">
                    {age}歳 | {residence}
                  </p>
                  <p>ひとこと</p>
                  <p className="profile__word">{word}</p>
                  <p>自己紹介</p>
                  <p className="profile__introduction">{introduction}</p>
                </div>
              );
            }
          )}
          <button onClick={() => setShowEditPage(true)}>
            プロフィールを編集する
          </button>
          <EditProfile
            showEditPage={showEditPage}
            setShowEditPage={setShowEditPage}
          />
          <button onClick={handleLogout}>ログアウトする</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={() => setShowEditPage(true)}>
            プロフィールを編集する
          </button>
          <EditProfile
            showEditPage={showEditPage}
            setShowEditPage={setShowEditPage}
          />
          <button onClick={handleLogout}>ログアウトする</button>
        </>
      )}
    </div>
  );
};
