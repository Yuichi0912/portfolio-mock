import { db } from "../../firebase";
import { collection, getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export const DetailRecruitment = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // 投稿に付与されている🆔を出力
  const docRef = doc(db, "recruitments", `${id}`);

  useEffect(() => {
    getDoc(docRef).then((querySnapshot) => {
      const arrList = [querySnapshot.data()];
      // arrList.push(querySnapshot.data())
      setRecruitmentsData(arrList);
      // setRecruitmentsData(querySnapshot.data())
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(recruitmentsData);

  return (
    <div>
      <h2>詳細ページだよ</h2>
      <h2>詳細ページだよ</h2>
      {/* <p>{recruitmentsData.title}</p>
      <p>{recruitmentsData.number}</p>
      <img src={recruitmentsData.image} alt="プロフィール画像" />
            <p>{dayjs(recruitmentsData.date.toDate()).format("YYYY-MM-DD HH:mm:ss")}</p>
            <p>{recruitmentsData.description}</p> */}
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
      <button onClick={() => navigate(`/detail/${id}/chat`)}>
        チャット画面に進む
      </button>
    </div>
  );
};
