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
import { useEffect, useLayoutEffect, useState } from "react";
import dayjs from "dayjs";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./DetailRecruitment.scss";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "../../routes/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "../sidebar/Sidebar";
import { SideAd } from "../../routes/SideAd";
import { ReactComponent as BackIcon } from "./chevron-left.svg";
import { SuggestAddProfile } from "../../routes/SuggestAddProfile";

export const DetailRecruitment = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const [toJoinData, setToJoinData] = useState("");
  const [userData, setUserData] = useState("");
  const [approvedUserData, setApprovedUserData] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されている🆔を出力
  const docRef = doc(db, "recruitments", `${id}`);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // ログインしているユーザーのID取得

  const [user] = useAuthState(auth);

  const uid = auth.currentUser ? auth.currentUser.uid : [{}];
  const userRef = doc(db, "usersData", `${uid}`);

  // 登録したユーザー情報の取得
  useLayoutEffect(() => {
    getDoc(userRef).then((querySnapshot) => {
      setUserData(querySnapshot.data());
    });
  }, []);

  // 投稿の情報取得
  useLayoutEffect(() => {
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
  useLayoutEffect(() => {
    getDocs(approved).then((querySnapshot) => {
      setApprovedUserData(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // ユーザーデータは取ってこれた。後は何も入っていない時の対処法

  const onNavigateChat = () => {
    if (!userData) {
      setShowLevel(true);
    } else {
      navigate(`/detail/${id}/chat`);
    }
  };

  // 参加リクエストの送信
  const onRequestJoin = () => {
    if (!userData) {
      setShowLevel(true);
    }

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

  useEffect(() => {
    setIsRendered(true);
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
    <div>
      <Header />
      {isSmallScreen ? (
        <>
          <motion.div
            className="detail-page"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            // transition={
            //   {
            //     // duration: 0.8,
            //     // ease: [0, 0.71, 0.2, 1.01],
            //   }
            // }
            exit={{ x: -600,opacity: 0 }}
            // animate={{ x: -200 }}
          >
            {recruitmentsData.map((data) => {
              return (
                <div key={data.id}>
                  <Link className="detail__backward" to={`/home`}>
                    <BackIcon width="35px" height="35px" />
                  </Link>

                  <h3 className="detail-page__title">{data.title}</h3>

                  <div
                    className="detail-usercard"
                    onClick={() => navigate(`/user/${data.userId}`)}
                  >
                    <p className="detail-usercard__level">Lv. {data.level}</p>

                    <img
                      className="detail-usercard__image"
                      src={data.image}
                      alt="プロフィール画像"
                    />
                    <p className="detail-usercard__hostname">{data.hostName}</p>
                    <p className="detail-usercard__age-residence">
                      {data.hostAge} 歳 | {data.hostResidence}
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
                      {dayjs(data.date.toDate()).format("YYYY/MM/DD HH:mm")}
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
                    <div className="approved-user">
                      {approvedUserData.map((data) => {
                        return (
                          <div key={data.requestingId}>
                            <img
                              className="approved-user__image"
                              src={data.image}
                              alt="参加者のアイコン"
                              onClick={() =>
                                navigate(`/user/${data.requestingId}`)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      to={`/detail/${id}/users`}
                      className="approved-user__list"
                    >
                      参加者一覧を表示する
                    </Link>

                    <p className="detail-outline__hashtag">#{data.hashtag}</p>
                    <p className="detail-outline__description">
                      {data.description}
                    </p>
                  </div>
                  <button
                    className="button__navigate-chat"
                    onClick={onNavigateChat}
                  >
                    <img
                      src="../images/message-circle-2.svg"
                      alt="チャットアイコン"
                    />
                  </button>
                  <SuggestAddProfile
                    showLevel={showLevel}
                    setShowLevel={setShowLevel}
                  />

                  <button
                    className="button__request-join"
                    onClick={onRequestJoin}
                    // disabled={approvedUserData.length === data.number}
                  >
                    {/* <img src="../images/send (1).svg" alt="リクエストアイコン" /> */}
                    参加リクエストを送る
                  </button>
                  <SuggestAddProfile
                    showLevel={showLevel}
                    setShowLevel={setShowLevel}
                  />
                </div>
              );
            })}
          </motion.div>
        </>
      ) : (
        <>
          <Sidebar />
          <SideAd />{" "}
          <div className="detail-page">
            {recruitmentsData.map((data) => {
              return (
                <div key={data.id}>
                  <Link className="detail__backward" to={`/home`}>
                    <BackIcon width="35px" height="35px" />
                  </Link>

                  <h3 className="detail-page__title">{data.title}</h3>

                  <div
                    className="detail-usercard"
                    onClick={() => navigate(`/user/${data.userId}`)}
                  >
                    <p className="detail-usercard__level">Lv. {data.level}</p>

                    <img
                      className="detail-usercard__image"
                      src={data.image}
                      alt="プロフィール画像"
                    />
                    <p className="detail-usercard__hostname">{data.hostName}</p>
                    <p className="detail-usercard__age-residence">
                      {data.hostAge} 歳 | {data.hostResidence}
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
                      {dayjs(data.date.toDate()).format("YYYY/MM/DD HH:mm")}
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
                    <div className="approved-user">
                      {approvedUserData.map((data) => {
                        return (
                          <div key={data.requestingId}>
                            <img
                              className="approved-user__image"
                              src={data.image}
                              alt="参加者のアイコン"
                              onClick={() =>
                                navigate(`/user/${data.requestingId}`)
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                    <Link
                      to={`/detail/${id}/users`}
                      className="approved-user__list"
                    >
                      参加者一覧を表示する
                    </Link>

                    <p className="detail-outline__hashtag">#{data.hashtag}</p>
                    <p className="detail-outline__description">
                      {data.description}
                    </p>
                  </div>
                  <button
                    className="button__navigate-chat"
                    onClick={onNavigateChat}
                  >
                    <img
                      src="../images/message-circle-2.svg"
                      alt="チャットアイコン"
                    />
                  </button>
                  <SuggestAddProfile
                    showLevel={showLevel}
                    setShowLevel={setShowLevel}
                  />
                  <button
                    className="button__request-join"
                    onClick={onRequestJoin}
                  >
                    {/* <img src="../images/send (1).svg" alt="リクエストアイコン" /> */}
                    参加リクエストを送る
                  </button>
                  <SuggestAddProfile
                    showLevel={showLevel}
                    setShowLevel={setShowLevel}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
