import "./EditProfile.scss";
import axios from "axios";
import { residenceKey } from "../../const";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { Footer } from "../footer/Footer";
import { DescriptionLevel } from "./DescriptionLevel";
import Compressor from "compressorjs";
import { Sidebar } from "../sidebar/Sidebar";
import { SideAd } from "../../routes/SideAd";

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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const navigate = useNavigate();
  // const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const id = auth.currentUser ? auth.currentUser.uid : [{}];
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

    // new Compressor(file, {
    //   quality: 0.6,
    //   success(result) {
    //     const formData = new FormData();
    //     formData.append("image",result);
    //     console.log(formData.get("image"));

    //     // console.log(file);
    //     const storageRef = ref(storage, "images/" + formData.name);
    //     uploadBytes(storageRef, formData).then((snapshot) => {
    //       const url = snapshot.ref._location.path_;
    //       getDownloadURL(ref(storage, `${url}`)).then((getUrl) => {
    //         setImage(getUrl);
    //         console.log(getUrl);
    //       });
    //       console.log(snapshot.ref._location.path_);
    //       console.log("Uploaded a blob or file!");
    //     });

    //   },
    // });

    console.log(file);
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
        navigate("/mypage/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fileInput = useRef(null);

  const handleUploadImage = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="edit-page__content">
      <div className="edit-page__header">
        <Link className="edit-page__header--cancel" to={"/mypage"}>
          キャンセル
        </Link>
        <p className="edit-page__header--title">編集</p>
        <button
          type="submit"
          className="edit-page__header--update-button"
          onClick={handleSubmit}
        >
          更新する
        </button>
      </div>
      {isSmallScreen ? (
        <>
          {" "}
          {userData.length == 1 ? (
            <>
              {userData.map((userData) => {
                return (
                  <div className="edit-page__form" key={userData.userId}>
                    <div className="edit-page__form--image">
                      <img
                        className="edit-page__form--image-now"
                        src={userData.image}
                        alt="プロフィール画像"
                      />
                      {image === "" ? (
                        <img
                          src="../../images/camera-plus.svg"
                          className="edit-page__form--image-default"
                        />
                      ) : (
                        <img
                          src={image}
                          className="edit-page__form--image-changed"
                        />
                      )}
                    </div>
                    <button
                      className="edit-page__form--image-uploader"
                      onClick={handleUploadImage}
                    >
                      ファイルを選択
                    </button>
                    <input
                      type="file"
                      ref={fileInput}
                      accept=".png, .jpeg, .jpg"
                      onChange={onImageUpload}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="username">名前</label>
                    <input
                      className="edit-page__form--username"
                      type="text"
                      id="username"
                      defaultValue={userData.userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="名前"
                    />
                    <label htmlFor="level">レベル</label>
                    <div className="edit-page__form--level">
                      {userData && (
                        <p className="edit-page__form--level-confirm">
                          Lv. {userData.level} → Lv. {level}
                        </p>
                      )}
                      <input
                        className="edit-page__form--level-input"
                        type="range"
                        id="level"
                        min="0"
                        max="10"
                        defaultValue={userData.level}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <br />
                      <button
                        className="edit-page__header--aboutlevel"
                        onClick={() => setShowLevel(true)}
                      >
                        レベルとは？
                      </button>
                      <DescriptionLevel
                        showLevel={showLevel}
                        setShowLevel={setShowLevel}
                      />
                    </div>
                    <label htmlFor="age">年齢</label>
                    <div className="edit-page__form--age">
                      <p>
                        {userData.age}歳 → {age}歳
                      </p>
                      {/* <p>{age}歳</p> */}
                      <input
                        type="range"
                        id="age"
                        defaultValue={userData.age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="年齢"
                      />
                    </div>
                    <label htmlFor="residence">居住地</label>
                    <div className="edit-page__form--residence">
                      <p>{userData.residence}</p>
                      <p>→</p>
                      <select
                        className="edit-page__form--select"
                        id="residence"
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
                    </div>
                    {/* <p>フォローフォロワー</p> */}
                    <label htmlFor="word">ひとこと</label>
                    <div className="edit-page__form--word">
                      <input
                        className="edit-page__form--word-input"
                        type="text"
                        id="word"
                        defaultValue={userData.word}
                        onChange={(e) => setWord(e.target.value)}
                      />
                    </div>
                    <label htmlFor="introduction">自己紹介</label>
                    <div className="edit-page__form--introduction">
                      <textarea
                        className="edit-page__form--introduction-input"
                        type="text"
                        id="introduction"
                        defaultValue={userData.introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="edit-page__form--image">
                {image === "" ? (
                  <img
                    src="../../images/camera-plus.svg"
                    className="edit-page__form--image-default"
                  />
                ) : (
                  <img src={image} className="edit-page__form--image-changed" />
                )}
              </div>
              <button
                className="edit-page__form--image-uploader"
                onClick={handleUploadImage}
              >
                ファイルを選択
              </button>
              <input
                type="file"
                ref={fileInput}
                accept=".png, .jpeg, .jpg"
                onChange={onImageUpload}
                style={{ display: "none" }}
              />

              <label htmlFor="username">名前</label>
              <input
                className="edit-page__form--username"
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="名前"
              />
              <label htmlFor="level">レベル</label>
              <div className="edit-page__form--level">
                <p>Lv. {level}</p>
                <input
                  type="range"
                  id="level"
                  min="1"
                  max="10"
                  onChange={(e) => setLevel(e.target.value)}
                />
                <button
                  className="edit-page__header--aboutlevel"
                  onClick={() => setShowLevel(true)}
                >
                  レベルとは？
                </button>
                <DescriptionLevel
                  showLevel={showLevel}
                  setShowLevel={setShowLevel}
                />
              </div>

              <label htmlFor="age">年齢</label>
              <div className="edit-page__form--age">
                <p>{age}歳</p>
                <input
                  type="range"
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="年齢"
                />
              </div>
              <label htmlFor="residence">居住地</label>
              <div className="edit-page__form--residence">
                <select
                  className="edit-page__form--select"
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
              </div>
              {/* <p>フォローフォロワー</p> */}
              <label htmlFor="word">ひとこと</label>
              <div className="edit-page__form--word">
                <input
                  className="edit-page__form--word-input"
                  type="text"
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="例：右利きのドライブマンです"
                />
              </div>
              <label htmlFor="introduction">自己紹介</label>
              <div className="edit-page__form--introduction">
                <textarea
                  className="edit-page__form--introduction-input"
                  type="text"
                  onChange={(e) => setIntroduction(e.target.value)}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <Sidebar/>
          <SideAd />
          {userData.length == 1 ? (
            <>
              {userData.map((userData) => {
                return (
                  <div className="edit-page__form" key={userData.userId}>
                    <div className="edit-page__form--image">
                      <img
                        className="edit-page__form--image-now"
                        src={userData.image}
                        alt="プロフィール画像"
                      />
                      {image === "" ? (
                        <img
                          src="../../images/camera-plus.svg"
                          className="edit-page__form--image-default"
                        />
                      ) : (
                        <img
                          src={image}
                          className="edit-page__form--image-changed"
                        />
                      )}
                    </div>
                    <button
                      className="edit-page__form--image-uploader"
                      onClick={handleUploadImage}
                    >
                      ファイルを選択
                    </button>
                    <input
                      type="file"
                      ref={fileInput}
                      accept=".png, .jpeg, .jpg"
                      onChange={onImageUpload}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="username">名前</label>
                    <input
                      className="edit-page__form--username"
                      type="text"
                      id="username"
                      defaultValue={userData.userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="名前"
                    />
                    <label htmlFor="level">レベル</label>
                    <div className="edit-page__form--level">
                      {userData && (
                        <p className="edit-page__form--level-confirm">
                          Lv. {userData.level} → Lv. {level}
                        </p>
                      )}
                      <input
                        className="edit-page__form--level-input"
                        type="range"
                        id="level"
                        min="0"
                        max="10"
                        defaultValue={userData.level}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <button
                        className="edit-page__header--aboutlevel"
                        onClick={() => setShowLevel(true)}
                      >
                        レベルとは？
                      </button>
                      <DescriptionLevel
                        showLevel={showLevel}
                        setShowLevel={setShowLevel}
                      />
                    </div>
                    <label htmlFor="age">年齢</label>
                    <div className="edit-page__form--age">
                      <p>
                        {userData.age}歳 → {age}歳
                      </p>
                      {/* <p>{age}歳</p> */}
                      <input
                        type="range"
                        id="age"
                        defaultValue={userData.age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="年齢"
                      />
                    </div>
                    <label htmlFor="residence">居住地</label>
                    <div className="edit-page__form--residence">
                      <p>{userData.residence}</p>
                      <p>→</p>
                      <select
                        className="edit-page__form--select"
                        id="residence"
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
                    </div>
                    {/* <p>フォローフォロワー</p> */}
                    <label htmlFor="word">ひとこと</label>
                    <div className="edit-page__form--word">
                      <input
                        className="edit-page__form--word-input"
                        type="text"
                        id="word"
                        defaultValue={userData.word}
                        onChange={(e) => setWord(e.target.value)}
                      />
                    </div>
                    <label htmlFor="introduction">自己紹介</label>
                    <div className="edit-page__form--introduction">
                      <textarea
                        className="edit-page__form--introduction-input"
                        type="text"
                        id="introduction"
                        defaultValue={userData.introduction}
                        onChange={(e) => setIntroduction(e.target.value)}
                      />
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="edit-page__form--image">
                {image === "" ? (
                  <img
                    src="../../images/camera-plus.svg"
                    className="edit-page__form--image-default"
                  />
                ) : (
                  <img src={image} className="edit-page__form--image-changed" />
                )}
              </div>
              <button
                className="edit-page__form--image-uploader"
                onClick={handleUploadImage}
              >
                ファイルを選択
              </button>
              <input
                type="file"
                ref={fileInput}
                accept=".png, .jpeg, .jpg"
                onChange={onImageUpload}
                style={{ display: "none" }}
              />

              <label htmlFor="username">名前</label>
              <input
                className="edit-page__form--username"
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
                placeholder="名前"
              />
              <label htmlFor="level">レベル</label>
              <div className="edit-page__form--level">
                <p>Lv. {level}</p>
                <input
                  type="range"
                  id="level"
                  min="1"
                  max="10"
                  onChange={(e) => setLevel(e.target.value)}
                />
                <button
                  className="edit-page__header--aboutlevel"
                  onClick={() => setShowLevel(true)}
                >
                  レベルとは？
                </button>
                <DescriptionLevel
                  showLevel={showLevel}
                  setShowLevel={setShowLevel}
                />
              </div>

              <label htmlFor="age">年齢</label>
              <div className="edit-page__form--age">
                <p>{age}歳</p>
                <input
                  type="range"
                  id="age"
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="年齢"
                />
              </div>
              <label htmlFor="residence">居住地</label>
              <div className="edit-page__form--residence">
                <select
                  className="edit-page__form--select"
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
              </div>
              {/* <p>フォローフォロワー</p> */}
              <label htmlFor="word">ひとこと</label>
              <div className="edit-page__form--word">
                <input
                  className="edit-page__form--word-input"
                  type="text"
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="例：右利きのドライブマンです"
                />
              </div>
              <label htmlFor="introduction">自己紹介</label>
              <div className="edit-page__form--introduction">
                <textarea
                  className="edit-page__form--introduction-input"
                  type="text"
                  onChange={(e) => setIntroduction(e.target.value)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
