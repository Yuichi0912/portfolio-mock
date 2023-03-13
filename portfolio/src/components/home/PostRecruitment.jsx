import { useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import { residenceKey } from "../../const";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import "./PostRecruitment.scss";

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

  // console.log(userData);

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
      hashtag: hashtag,
      date: Timestamp.fromDate(new Date(date)),
      place: selectedPlace,
      id: "",
      hostName: userData.userName,
      hostAge: userData.age,
      hostResidence: userData.residence,
      timestamp: serverTimestamp(),
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
    <div className="post-page">
      <Header />
      <h2>投稿する</h2>
      <Link to="/home">戻る</Link>
      <form className="post-form" onSubmit={handleSubmit}>
        <label htmlFor="title">タイトル</label>{" "}
        <input
          id="title"
          className="post__title"
          type="text"
          placeholder="タイトルを入力してください"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label htmlFor="pref">場所</label>{" "}
        <select
          id="pref"
          className="post__preflist"
          onChange={(e) => setSelectedPlace(e.target.value)}
        >
          {place.map((data) => {
            return (
              <option key={data.prefCode} value={data.prefName}>
                {data.prefName}
              </option>
            );
          })}
        </select>
        <label id="date">日時</label>{" "}
        <input
          id="date"
          className="post__datetime"
          type="datetime-local"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <label htmlFor="number">募集人数</label> <p>{number} 人</p>
        <input
          id="number"
          className="post__number"
          type="range"
          onChange={(e) => setNumber(e.target.value)}
        ></input>
        <label htmlFor="tag">タグの選択</label>
        <select
          id="tag"
          className="post__tag"
          onChange={(e) => setHashtag(e.target.value)}
        >
          <option value="▼選択する">▼選択する</option>
          <option value="ワイワイしたい">ワイワイしたい</option>
          <option value="ガチ練したい">ガチ練したい</option>
          <option value="試合に出たい">試合に出たい</option>
          <option value="試合を見たい">試合を見たい</option>
          <option value="教えてほしい">教えてほしい</option>
        </select>
        <label htmlFor="description">説明文</label>{" "}
        <textarea
          id="description"
          className="post__description"
          type="text"
          placeholder="説明文を入力してください"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="post__submit-button">投稿する</button>
      </form>
      <Footer />
    </div>
  );
};
