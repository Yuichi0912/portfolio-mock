import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./OwnPostLists.scss";
export const OwnPostLists = () => {
  const [ownPosts, setOwnPosts] = useState([]);
  const navigate = useNavigate();
  // 現在ログインしているユーザーのID取得
  const [user] = useAuthState(auth);

  // 自分が投稿した一覧の取得
  const docRef = query(
    collection(db, "recruitments"),
    where("userId", "==", `${user.uid}`)
  );
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setOwnPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <h2>あなたの投稿</h2>

      {ownPosts.length != 0 ? (
        <>
          {" "}
          {ownPosts.map((data) => {
            return (
              <div
                key={data.id}
                className="ownlist"
                onClick={() => navigate(`/detail/${data.id}`)}
              >
                <h3 className="ownlist__level">Lv. {data.level}</h3>
                <img
                  src={data.image}
                  alt="プロフィール画像"
                  className="ownlist__image"
                />
                <div className="ownlist-center">
                  <p className="ownlist-center__title">{data.title}</p>
                  <p className="ownlist-center__detail">
                    {dayjs(data.date.toDate()).format("MM/DD")} | {data.place} |
                    {data.number}人
                  </p>
                  <p className="ownlist-center__tag">#{data.hashtag}</p>
                </div>
                {/* <p className="list__deadline">あと7日</p> */}
              </div>
            );
          })}
        </>
      ) : (
        <>
          <p className="no-dialogs" >投稿がありません</p>
        </>
      )}
    </div>
  );
};
