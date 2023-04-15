import { SideAd } from "../../routes/SideAd";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import "./People.scss";
import { UsersList } from "./UsersList";
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

export const People = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [residence, setResidence] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedResidence, setSelectedResidence] = useState("");

  const navigate = useNavigate();

  const docRef = collection(db, "usersData");

  // 登録したユーザー情報をすべてブラウザに表示する
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
      setUsersData(querySnapshot.docs.map((doc) => doc.data()));
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
    <div className="peoplelists">
      {isSmallScreen ? (
        <>{navigate("/home")}</>
      ) : (
        <>
          <Header />
          <Sidebar />
          <SideAd />

          <div className="peoplelists__select">
            <select
              className="peoplelists__select-box"
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="おすすめ">おすすめ</option>
              {/* <option value="新規登録">新規登録</option> */}
              <option value="都道府県">都道府県</option>
            </select>
            {selectedUser == "都道府県" && (
              <select
                className="peoplelists__select-box--pref"
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
            )}
          </div>
          {selectedUser == "" && <DefaultUsers />}
          {selectedUser == "おすすめ" && <DefaultUsers />}
          {/* {selectedUser == "新規登録" && <NewUsers />}        */}
          {selectedUser == "都道府県" && (
            <PrefectureUsers selectedResidence={selectedResidence} />
          )}
        </>
      )}
    </div>
  );
};
