import { getDoc, getDocs, updateDoc,limit, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatWithUsers.scss"
import { Header } from "../header/Header";

export const ChatWithUsers = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されているIDを出力
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
      id:"",
    }).then((docRef) => {
        updateDoc(docRef, {
          id: docRef.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });; //chatの送信先を指定
  };

  useEffect(() => {
    // getDocs(chatRef).then((querysnapshot) => {
    //   setChats(querysnapshot.docs.map((doc) => doc.data()));
    // });
    onSnapshot(chatRef,(querysnapshot)=>{
      setChats(querysnapshot.docs.map((doc) => doc.data()))
    })
  }, []);
  return (
    <div className="chat-page">
      <Header />
      <h2 className="chat__header">メッセージ</h2>
      <button className="chat__backward"             onClick={() => navigate(`/detail/${id}`)}
>戻る</button>
      {chats.map(({message,id,image,name,userId}) => {
        return (
          <div className={userId === `${loginUserId}` ? "chat__send-side" : "chat__received-side"} key={id}>
            <p>{name}</p>
            <p>{message}</p>
            <img src={image}/>
          </div>
        );
      })}
      <form className="chat__form" onSubmit={handleSubmit}>
        <input className="chat__input-space" type="text" onChange={(e) => setMessage(e.target.value)} />
        <button className="chat__submit-button"><img src="../../images/send.svg" alt="送信ボタン" /></button>
      </form>
    </div>
  );
};
