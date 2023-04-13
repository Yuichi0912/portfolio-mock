import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { getDocs, collection, onSnapshot, orderBy } from "firebase/firestore";
import "./UsersList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { useNavigate } from "react-router-dom";
import { DefaultUsers } from "../userlists/DefaultUsers";
import { SuggestAddProfile } from "../../routes/SuggestAddProfile";
import { useAuthState } from "react-firebase-hooks/auth";
import { NewUsers } from "../userlists/NewUsers";
import { PrefectureUsers } from "../userlists/PrefectureUsers";
import { residenceKey } from "../../const";
import axios from "axios";

export const UsersList = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [residence, setResidence] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [user] = useAuthState(auth);

  const navigate = useNavigate();
  const docRef = collection(db, "usersData");

  // 登録したユーザー情報をすべてブラウザに表示する
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUsersData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1020);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
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

  console.log(residence);

  return (
    <div className="userslist">
      {isSmallScreen ? (
        <>
          {" "}
          <select onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="おすすめ">おすすめ</option>
            {/* <option value="新規登録">新規登録</option> */}
            <option value="都道府県">都道府県</option>
          </select>

          {selectedUser == "" && <DefaultUsers />}
          {selectedUser == "おすすめ" && <DefaultUsers />}

          {selectedUser == "都道府県" && (
            <select>
              {residence.map((data) => {
                <option key={data.prefCode} value={data.prefName}>
                  {data.prefName}
                </option>;
              })}
            </select>
          )}
          {/* {selectedUser == "新規登録" && <NewUsers />}        */}
          {selectedUser == "都道府県" && <PrefectureUsers />}
        </>
      ) : (
        <>
          {usersData.map((data) => {
            return (
              <div
                key={data.userId}
                className="usersinfo"
                onClick={() => navigate(`/user/${data.userId}`)}
              >
                <div className="userinfo__card">
                  <p className="usersinfo__level">Lv. {data.level}</p>
                  <img
                    src={data.image}
                    alt="プロフィール画像"
                    className="usersinfo__image"
                  />
                  <p className="usersinfo__username">{data.userName}</p>
                  <p className="usersinfo__age-residence">
                    {data.age}歳 | {data.residence}
                  </p>

                  <p className="userinfo__word">{data.word}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
