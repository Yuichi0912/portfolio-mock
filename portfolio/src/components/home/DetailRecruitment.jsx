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
import { useNavigate, useParams } from "react-router-dom";
import "./DetailRecruitment.scss";
import { Header } from "../header/Header";

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
              <img src={data.image} alt="プロフィール画像" />
              <p>{data.hostName}</p>
              <p>Lv. {data.level}</p>
              <p>{data.hostAge} | {data.hostResidence}</p>
            </div>

            <div className="detail-outline">
              <p>{data.place}</p>
              <p>{dayjs(data.date.toDate()).format("MM/DD")}</p>
              <p>{data.number}人</p>
              <p>#{data.hashtag}</p>
              <p>{data.description}</p>
            </div>
          </div>
        );
      })}


      {approvedUserData.map((data) => {
        return (
          <div key={data.requestingId}>
            <p>{data.name}</p>
          </div>
        );
      })}


      <button
        className="button__navigate-chat"
        onClick={() => navigate(`/detail/${id}/chat`)}
      >
        チャット画面に進む
      </button>
      <button className="button__request-join" onClick={onRequestJoin}>
        参加リクエストを送る
      </button>
    </div>
  );
};
