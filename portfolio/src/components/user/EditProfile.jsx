import "./EditProfile.scss";
import axios from "axios";
import { residenceKey } from "../../const";
import { useState } from "react";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";

export const EditProfile = ({ showEditPage, setShowEditPage }) => {
  const [userName, setUserName] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [word, setWord] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [residence, setResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState("");
  const [image, setImage] = useState("../images/user-circle.svg");

  const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const docRef = doc(db, "usersData", `${id}`);

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
    setDoc(docRef, {
      userName: userName,
      image: image,
      level: level,
      age: age,
      residence: selectedResidence,
      word: word,
      introduction: introduction,
      userId: `${id}`,
      // residence
    })
      .then(() => {
        setShowEditPage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (showEditPage) {
    return (
      <div
        className="edit-page__overlay"
        // onClick={() => setShowEditPage(false)}
      >
        <div className="edit-page__content">
          <h2>編集画面</h2>
          <button onClick={() => setShowEditPage(false)}>×</button>
          <form onSubmit={handleSubmit}>
            <img
              src="../images/user-circle.svg"
              alt="プロフィール画像"
              className="list__image"
            />
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
              onChange={(e) => setUserName(e.target.value)}
              placeholder="名前"
            />
            <p>レベル</p>
            <p>{level}</p>
            <input
              type="range"
              min="1"
              max="10"
              onChange={(e) => setLevel(e.target.value)}
            />
            <p>年齢|居住地</p>
            <p>{age}</p>
            <input
              type="range"
              onChange={(e) => setAge(e.target.value)}
              placeholder="年齢"
            />
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
            <input type="text" onChange={(e) => setWord(e.target.value)} />
            <p>自己紹介</p>
            <input
              type="text"
              onChange={(e) => setIntroduction(e.target.value)}
            />
            <button>更新する</button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
