import { db, auth } from "../../firebase";
import {
  collection,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DetailRecruitment.scss";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

export const DetailRecruitment = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const [toJoinData, setToJoinData] = useState("");
  const [userData, setUserData] = useState("");
  const [approvedUserData, setApprovedUserData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されている🆔を出力
  const docRef = doc(db, "recruitments", `${id}`);

  // ログインしているユーザーのID取得
  const uid = auth.currentUser.uid;
  const userRef = doc(db, "usersData", `${uid}`);

  // 登録したユーザー情報の取得
  useEffect(() => {
    getDoc(userRef).then((querySnapshot) => {
      setUserData(querySnapshot.data());
    });
  }, []);

  // 投稿の情報取得
  useEffect(() => {
    getDoc(docRef).then((querySnapshot) => {
      // フォローリクエスト用に取得
      setToJoinData(querySnapshot.data());

      const arrList = [querySnapshot.data()];
      setRecruitmentsData(arrList);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 承認されたユーザー情報の取得
  const approved = query(
    collection(db, "approvedUsers"),
    where("postId", "==", `${id}`)
  );
  useEffect(() => {
    getDocs(approved).then((querySnapshot) => {
      setApprovedUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // ユーザーデータは取ってこれた。後は何も入っていない時の対処法

  // 参加リクエストの送信
  const onRequestJoin = () => {
    addDoc(collection(db, "joinRequest"), {
      hostUid: toJoinData.userId, // 投稿者のユーザーID
      title: toJoinData.title,
      name: userData.userName,
      image: userData.image,
      requestingId: userData.userId, // リクエストした人のユーザーID
      postId: `${id}`,
      docId: "",
    })
      .then((docRef) => {
        updateDoc(docRef, {
          docId: docRef.id,
        });
        alert("リクエストを送信しました！");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="detail-page">
      <Header />
      {recruitmentsData.map((data) => {
        return (
          <div key={data.id}>
            <h3 className="detail-page__title">{data.title}</h3>

            <div className="detail-usercard">
              <img
                className="detail-usercard__image"
                src={data.image}
                alt="プロフィール画像"
              />
              <p className="detail-usercard__hostname">{data.hostName}</p>
              <p className="detail-usercard__level">Lv. {data.level}</p>
              <p className="detail-usercard__age-residence">
                {data.hostAge} | {data.hostResidence}
              </p>
            </div>

            <div className="detail-outline">
              <p className="detail-outline__place">
                {" "}
                <img
                  className="detail-outline__place-svg"
                  src="../images/map-pin.svg"
                  alt="場所アイコン"
                />
                {data.place}
              </p>
              <p className="detail-outline__date">
                <img
                  className="detail-outline__date-svg"
                  src="../images/calendar.svg"
                  alt="日時アイコン"
                />
                {dayjs(data.date.toDate()).format("YYYY-MM-DD HH:mm")}
              </p>
              <p className="detail-outline__number">
                {" "}
                <img
                  className="detail-outline__number-svg"
                  src="../images/users.svg"
                  alt="参加者一覧アイコン"
                />
                {approvedUserData.length}/{data.number}人
              </p>

              {approvedUserData.map((data) => {
                return (
                  <div className="approved-user" key={data.requestingId}>
                    <img
                      className="approved-user__image"
                      src={data.image}
                      alt="参加者のアイコン"
                    />
                  </div>
                );
              })}
              <p className="detail-outline__hashtag">#{data.hashtag}</p>
              <p className="detail-outline__description">{data.description}</p>
            </div>
          </div>
        );
      })}

      <button
        className="button__navigate-chat"
        onClick={() => navigate(`/detail/${id}/chat`)}
      >
        <img src="../images/message-circle-2.svg" alt="チャットアイコン" />
      </button>
      <button className="button__request-join" onClick={onRequestJoin}>
        {/* <img src="../images/send (1).svg" alt="リクエストアイコン" /> */}
        参加リクエストを送る
      </button>
      <Footer />
    </div>
  );
};
