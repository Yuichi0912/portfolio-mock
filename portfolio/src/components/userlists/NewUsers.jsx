import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";

export const NewUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const docRef = query(
    collection(db, "usersData"),
    orderBy("timestamp", "desc")
  );
  const navigate = useNavigate();

  // 登録したユーザー情報をすべてブラウザに表示する
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUsersData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
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
    </div>
  );
};
