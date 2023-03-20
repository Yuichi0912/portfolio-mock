import dayjs from "dayjs";
import {
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";

export const ChattingPosts = () => {
  const navigate = useNavigate();
  const [chattingPosts, setChattingPosts] = useState([]);

  // 現在ログインしているユーザーのID取得
  const [user] = useAuthState(auth);

  // チャットを送信した投稿の取得
  //   const roadToChats = doc(db, "recruitments", "chats");
  const chatRef = query(
    collection(db, "recruitments"),
    where((doc(db, "recruitments", "chats"), "userId"), "==", `${user.uid}`)
  );
  //   const chatRef = query(
  //     collectionGroup(db, "chats"),
  //     where("userId", "==", `${user.uid}`)
  //   );
  useEffect(() => {
    onSnapshot(chatRef, (querySnapshot) => {
      setChattingPosts(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(chattingPosts);

  return (
    <div>
      <h2>やりとり中</h2>
      {chattingPosts.length != 0 ? (
        <>
          {" "}
          {chattingPosts.map((data) => {
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
          <p>やりとりがまだありません</p>
        </>
      )}
    </div>
  );
};
