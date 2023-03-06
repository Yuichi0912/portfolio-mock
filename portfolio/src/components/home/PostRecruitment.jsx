import { useState } from "react";
import { collection, addDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { residenceKey } from "../../const";
import { HashtagList } from "./HashtagLists";

export const PostRecruitment = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [userData, setUserData] = useState([]);
  const [place, setPlace] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [hashtag, setHashtag] = useState("");
  const id = auth.currentUser.uid;
  const userRef = doc(db, "usersData", `${id}`);

  // 登録したユーザー情報をブラウザに表示する
  useEffect(() => {
    getDoc(userRef).then((querySnapshot) => {
      setUserData(querySnapshot.data());
    });
  }, []);

  // 都道府県の情報を取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": `${residenceKey} ` }, // 文字列で送るっぽい
      })
      .then((res) => {
        setPlace(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "recruitments"), {
      title: title,
      number: number,
      image: userData.image,
      level: userData.level,
      userId: userData.userId,
      description: description,
      hashtag:hashtag,
      date: Timestamp.fromDate(new Date(date)),
      place: selectedPlace,
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
        <select onChange={(e) => setSelectedPlace(e.target.value)}>
          {place.map((data) => {
            return (
              <option key={data.prefCode} value={data.prefName}>
                {data.prefName}
              </option>
            );
          })}
        </select>
        <p>日時</p>
        <input
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <p>募集人数</p>
        <p>{number}</p>
        <input type="range" onChange={(e) => setNumber(e.target.value)}></input>
        <p>タグの選択</p>
        <select onChange={(e)=> setHashtag(e.target.value)}>
          <option value="ワイワイしたい">ワイワイしたい</option>
          <option value="ガチ練したい">ガチ練したい</option>
          <option value="試合に出たい">試合に出たい</option>
          <option value="試合を見たい">試合を見たい</option>
          <option value="教えてほしい">教えてほしい</option>
        </select>
        <p>説明文</p>
        <input
          type="text"
          placeholder="説明文を入力してください"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button>投稿する</button>
      </form>
      {/* <HashtagList /> */}
    </div>
  );
};
