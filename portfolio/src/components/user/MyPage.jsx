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
  },[]);

  // ログアウト
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="mypage">

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
            <div key={userId}>
              <img src={image} alt="プロフィール画像"/>
              <p>{userName}</p>
              <p>{level}</p>
              <p>{age}</p>
              <p>{residence}</p>
              <p>ひとこと</p>
              <p>{word}</p>
              <p>自己紹介</p>
              <p>{introduction}</p>
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
    </div>
  );
};
