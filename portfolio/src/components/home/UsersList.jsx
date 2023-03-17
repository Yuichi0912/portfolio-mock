import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import "./UsersList.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/scss';

export const UsersList = () => {
  const [usersData, setUsersData] = useState([]);
  const docRef = collection(db, "usersData");

  // 登録したユーザー情報をすべてブラウザに表示する
  useEffect(() => {
    onSnapshot(docRef, (querySnapshot) => {
        setUsersData(querySnapshot.docs.map((doc) => doc.data()));
      });  
  }, []);

  console.log(usersData);
  return (
    <div className="userslist">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {usersData.map((data) => {
          return (
            <SwiperSlide key={data.userId} className="usersinfo">
              <img
                src={data.image}
                alt="プロフィール画像"
                className="usersinfo__image"
              />
              <p className="usersinfo__username">{data.userName}</p>
              <p className="usersinfo__level">Lv. {data.level}</p>
              <p className="userinfo__word">{data.word}</p>
              <p className="usersinfo__age-residence">
                {data.age}歳 | {data.residence}
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
