import "./EditProfile.scss";
import axios from "axios";
import { residenceKey } from "../../const";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Footer } from "../footer/Footer";
import { DescriptionLevel } from "./DescriptionLevel";

export const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [word, setWord] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [residence, setResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState("");
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState([]);
  const [showLevel, setShowLevel] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const docRef = query(
    collection(db, "usersData"),
    where("userId", "==", `${id}`)
  );

  // 登録したユーザー情報をブラウザに表示する(defaultvalue用)
  useEffect(() => {
    getDocs(docRef).then((querySnapshot) => {
      setUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // console.log(userData[0].userId);
  // 都道府県の情報を取得
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
        headers: { "X-API-KEY": `${residenceKey} ` }, // 文字列で送るっぽい
      })
      .then((res) => {
        setResidence(res.data.result);
      });
  }, []);

  // プロフィール画像のアップロード・URLの取得
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "images/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      const url = snapshot.ref._location.path_;
      getDownloadURL(ref(storage, `${url}`)).then((getUrl) => {
        setImage(getUrl);
        // console.log(getUrl);
      });
      console.log(snapshot.ref._location.path_);
      console.log("Uploaded a blob or file!");
    });
  };

  // プロフィールの更新
  const handleSubmit = (e) => {
    e.preventDefault();
    setDoc(doc(db, "usersData", `${id}`), {
      userName: userName === "" ? userData[0].userName : userName,
      image: image === "" ? userData[0].image : image,
      level: level === "" ? userData[0].level : level,
      age: age === "" ? userData[0].age : age,
      residence:
        selectedResidence == "" ? userData[0].residence : selectedResidence,
      word: word == "" ? userData[0].word : word,
      introduction:
        introduction == "" ? userData[0].introduction : introduction,
      userId: `${id}`,
      // residence
    })
      .then(() => {
        navigate(`/mypage/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(userData);

  return (
      <div className="edit-page__content">
        <h2>編集画面</h2>
        {userData.length == 1 ? (
          <form onSubmit={handleSubmit}>
            {userData.map((userData) => {
              return (
                <div key={userData.userId}>
                  {/* <img
                    src={image}
                    alt="プロフィール画像"
                    className="list__image"
                  /> */}
                  <input
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={onImageUpload}
                  />
                  <p>名前</p>
                  <input
                    type="text"
                    defaultValue={userData.userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="名前"
                  />
                  <p>レベル</p>
                  <button onClick={()=>setShowLevel(true)}>？</button>
                  <DescriptionLevel showLevel={showLevel} setShowLevel={setShowLevel} />
                  {userData && <p>{userData.level}</p>}
                  <p>{level} </p>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue={userData.level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                  <p>年齢|居住地</p>
                  <p>{userData.age}</p>
                  <p>{age}</p>
                  <input
                    type="range"
                    defaultValue={userData.age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="年齢"
                  />
                  <p>{userData.residence}</p>
                  <select
                    onChange={(e) => setSelectedResidence(e.target.value)}
                  >
                    {residence.map((data) => {
                      return (
                        <option key={data.prefCode} value={data.prefName}>
                          {data.prefName}
                        </option>
                      );
                    })}
                  </select>
                  <p>フォローフォロワー</p>
                  <p>ひとこと</p>
                  <input
                    type="text"
                    defaultValue={userData.word}
                    onChange={(e) => setWord(e.target.value)}
                  />
                  <p>自己紹介</p>
                  <textarea
                    type="text"
                    defaultValue={userData.introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                  <button>更新する</button>
                </div>
              );
            })}
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <img src={image} alt="プロフィール画像" className="list__image" />
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={onImageUpload}
            />
            {/* <button onClick={onPhotoUpload}>画像アップロード</button> */}
            <p>@ユーザー🆔</p>
            <p>名前</p>
            <input
              type="text"
              // defaultValue={userData.userName || ""}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="名前"
            />
            <p>レベル</p>
            {/* {userData && <p>{userData.level}</p>} */}
            <p>{level}</p>
            <input
              type="range"
              min="1"
              max="10"
              // defaultValue={userData.level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <p>年齢|居住地</p>
            {/* <p>{userData.age}</p> */}
            <p>{age}</p>
            <input
              type="range"
              // defaultValue={userData.age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="年齢"
            />
            {/* <p>{userData.residence}</p> */}
            <select onChange={(e) => setSelectedResidence(e.target.value)}>
              {residence.map((data) => {
                return (
                  <option key={data.prefCode} value={data.prefName}>
                    {data.prefName}
                  </option>
                );
              })}
            </select>
            <p>フォローフォロワー</p>
            <p>ひとこと</p>
            <input
              type="text"
              // defaultValue={userData.word}
              onChange={(e) => setWord(e.target.value)}
            />
            <p>自己紹介</p>
            <input
              type="text"
              // defaultValue={userData.introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
            <button>更新する</button>
          </form>
        )}
        <button onClick={() => navigate(`/mypage/${id}`)}>×</button>
        <Footer />
      </div>
  );
};
