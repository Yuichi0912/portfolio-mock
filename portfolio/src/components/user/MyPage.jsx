import { auth, db } from "../../firebase";
import { useNavigate } from "react-router";
import "./MyPage.scss";
import { useEffect, useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const MyPage = () => {
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  // const [residence, setResidence] = useState("");
  const [word, setWord] = useState("");
  const [introduction, setIntroduction] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const docRef = doc(db, "usersData", `${id}`);

  // 登録したユーザー情報をブラウザに表示する
  useEffect(() => {
    getDoc(docRef).then((querySnapshot) => {
      const arrList = [querySnapshot.data()];
      setUserData(arrList);
    });
  }, []);

  // ユーザー情報の更新
  const handleSubmit = (e) => {
    e.preventDefault();
    setDoc(docRef, {
      userName: userName,
      image: image,
      level: level,
      age: age,
      word: word,
      introduction: introduction,
      id: `${id}`,
      // residence
    }).catch((err) => {
      console.log(err);
    });
  };

  // ログアウト
  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };
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

  // console.log(image);

  return (
    <div className="mypage">
      <h2>マイページ</h2>

      {userData.map(
        ({ userName, image, id, level, age, word, introduction }) => {
          return (
            <div key={id}>
              <p>{userName}</p>
              <img src={image} />
              <p>{level}</p>
              <p>{age}</p>
              <p>{word}</p>
              <p>{introduction}</p>
            </div>
          );
        }
      )}

      <form onSubmit={handleSubmit}>
        <img
          src="../images/takkyu_tabletennis_man.png"
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
        <p>フォローフォロワー</p>
        <p>ひとこと</p>
        <input type="text" onChange={(e) => setWord(e.target.value)} />
        <p>自己紹介</p>
        <input type="text" onChange={(e) => setIntroduction(e.target.value)} />
        <button>更新する</button>
      </form>
      <button onClick={handleLogout}>ログアウトする</button>
    </div>
  );
};
