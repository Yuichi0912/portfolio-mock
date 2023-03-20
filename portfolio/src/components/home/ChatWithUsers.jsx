import {
  getDoc,
  getDocs,
  updateDoc,
  limit,
  orderBy,
  onSnapshot,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ChatWithUsers.scss";
import dayjs from "dayjs";

export const ChatWithUsers = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されているIDを出力
  const chatRef = collection(db, "recruitments", `${id}`, "chats");
  // const chatRef = collection(db, "chats", "container", `${id}`); // チャットルームまでの階層構造
  const loginUserId = auth.currentUser.uid; // ログインしているユーザーのID取得
  const userRef = doc(db, "usersData", `${loginUserId}`); // ユーザー情報までの階層構造

  // ユーザー情報の取得
  useEffect(() => {
    getDoc(userRef).then((querySnapshot) => {
      setUserData(querySnapshot.data());
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(chatRef, {
      message: message,
      image: userData.image,
      name: userData.userName,
      userId: userData.userId,
      id: "",
      timestamp: serverTimestamp(),
    })
      .then((docRef) => {
        updateDoc(docRef, {
          id: docRef.id,
        });
      })
      .then(() => {
        setMessage("");
      })
      // .then(() => {
      //   setMessage("");
      // })
      .catch((err) => {
        console.log(err);
      }); //chatの送信先を指定
  };

  // これまでに送信されているメッセージの取得
  useEffect(() => {
    onSnapshot(query(chatRef, orderBy("timestamp")), (querysnapshot) => {
      setChats(querysnapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <div className="chat-page">
      <div className="chat__header">
        {" "}
        <Link className="chat__backward" to={`/detail/${id}`}>
          <img src="../../images/chevron-left.svg" alt="戻るボタン" />
        </Link>
        <h2>メッセージ</h2>
      </div>
      <div className="chat__main-block">
        {chats.map(({ message, id, image, name, userId, timestamp }) => {
          return (
            <div
              className={`chat__exchange ${
                userId === `${loginUserId}` ? "send-side" : "received-side"
              }`}
              key={id}
            >
              {/* <p>{timestamp}</p> */}
              {/* <div className="chat__detail"> */}
              <p className="chat__username">{name}</p>
              <p className="chat__message">{message}</p>
              <img className="chat__userimage" src={image} />
              <p className="chat__postdate">
                {timestamp && dayjs(timestamp.toDate()).format("HH:mm")}
              </p>
              {/* </div> */}
            </div>
          );
        })}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          className="chat__input-space"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="chat__submit-button">
          <img src="../../images/send.svg" alt="送信ボタン" />
        </button>
      </form>
    </div>
  );
};
