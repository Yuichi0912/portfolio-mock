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

export const PrefectureUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [myUsersData, setMyUsersData] = useState([]);
  const navigate = useNavigate();

  const id = auth.currentUser ? auth.currentUser.uid : [{}];

  const userRef = query(
    collection(db, "usersData"),
    where("userId", "==", `${id}`)
  );

  // 登録したユーザー情報をブラウザに表示する (.lengthが0と1でreturn文の出しわけをするため)
  useEffect(() => {
    onSnapshot(userRef, (querySnapshot) => {
      setMyUsersData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    if (myUsersData.length !== 0) {
      const docRef = query(
        collection(db, "usersData"),
        where("residence", "==", `${myUsersData[0].residence}`)
      );
      onSnapshot(docRef, (querySnapshot) => {
        setUsersData(querySnapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [myUsersData]);
  
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
