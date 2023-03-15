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
import { Header } from "../header/Header";

export const ChatWithUsers = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されているIDを出力
  // const chatRef = query(collection(db, "chats", "container", `${id}`),orderBy("timestamp","desc"))
  const chatRef = collection(db, "chats", "container", `${id}`); // チャットルームまでの階層構造
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
      {/* <Header /> */}
      <h2 className="chat__header">
        {" "}
        <Link to={`/detail/${id}`}>
          <img src="../../images/chevron-left.svg" alt="戻るボタン" />
        </Link>
        メッセージ
      </h2>
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
              <p>{name}</p>
              <p>{message}</p>
              <img src={image} />
            </div>
          );
        })}
      </div>
      <form className="chat__form" onSubmit={handleSubmit}>
        <input
          className="chat__input-space"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="chat__submit-button">
          <img src="../../images/send.svg" alt="送信ボタン" />
        </button>
      </form>
    </div>
  );
};
