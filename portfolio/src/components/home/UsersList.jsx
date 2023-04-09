import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import "./UsersList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { useNavigate } from "react-router-dom";

export const UsersList = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [usersData, setUsersData] = useState([]);
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

  return (
    <div className="userslist">
      {isSmallScreen ? (
        <>
          {" "}
          <Swiper
            spaceBetween={50}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 480px
              560: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              780: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {usersData.map((data) => {
              return (
                <SwiperSlide
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
                </SwiperSlide>
              );
            })}
          </Swiper>
          <p className="advertisement">広告</p>
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
