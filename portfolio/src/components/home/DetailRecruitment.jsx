import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const DetailRecruitment = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const detailData = collection(db, "recruitments");

  useEffect(() => {
    getDocs(detailData).then((querySnapshot) => {
      console.log(querySnapshot.docs.map((doc) => doc.data()));
      setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ひとまずでkeyの値を設定しているので、ユニークな🆔を追加してかぶらないようにする

  return (
    <div>
      <h2>詳細ページだよ</h2>
      <h2>詳細ページだよ</h2>
      {recruitmentsData.map((data) => {
        return (
          <div key={data.title}>
            <p>{data.title}</p>
            <p>{data.number}</p>
            <img src={data.image} alt="プロフィール画像" />
            <p>{dayjs(data.date.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
            <p>{data.description}</p>
          </div>
        );
      })}
    </div>
  );
};
