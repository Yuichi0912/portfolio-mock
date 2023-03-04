import { useState } from "react";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export const PostRecruitment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [userData, setUserData] = useState([]);

  const id = auth.currentUser.uid;
  const userRef = doc(db, "usersData", `${id}`);

  // 登録したユーザー情報をブラウザに表示する
  useEffect(() => {
    getDoc(userRef).then((querySnapshot) => {
      setUserData(querySnapshot.data());
      // const arrList = [querySnapshot.data()];
      // console.log(arrList);
      // setUserData(arrList);
    });
  }, []);

  // console.log(userData);
  // imageとレベルに直接GEtしてきたデータを入れられないかやってみる

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "recruitments"), {
      title: title,
      number: number,
      image: userData.image,
      level: userData.level,
      userId: userData.userId,
      description: description,
      date: Timestamp.fromDate(new Date(date)),
      id: "",
    })
      .then((docRef) => {
        updateDoc(docRef, {
          id: docRef.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/home");
  };

  return (
    <div className="">
      <h2>投稿画面</h2>
      <form onSubmit={handleSubmit}>
        <h3>投稿</h3>
        <p>タイトル</p>
        <input
          type="text"
          placeholder="タイトルを入力してください"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>場所</p>
        <p>日時</p>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <p>募集人数</p>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <p>タグの選択</p>
        <p>説明文</p>
        <input
          type="text"
          placeholder="説明文を入力してください"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>投稿する</button>
      </form>
    </div>
  );
};
