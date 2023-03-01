import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruitmentList.scss";

export const RecruitmentList = () => {
  const [recruitmentId, setRecruitmentId] = useState("");
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const detailData = collection(db, "recruitments");

  useEffect(() => {
    getDocs(detailData).then((querySnapshot) => {
      console.log(querySnapshot.docs[0].id); // ドキュメント🆔の取得
      console.log(querySnapshot.docs);
      setRecruitmentsData(
        querySnapshot.docs.map((doc) => {
          const docData = doc.data()
          docData.id = doc.id;
          console.log(docData);
        }) // 配列内のオブジェクトが分解されてる、分解せずにidを追加したい
      );
      console.log(recruitmentsData);

      setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  console.log(recruitmentsData);


  return (
    <>
      {recruitmentsData.map((data) => {
        return (
          <div
            key={data.title}
            className="list"
            onClick={() => navigate("/detail")}
          >
            <h3 className="list__level">Lv. 8</h3>
            <img
              src="../images/takkyu_tabletennis_man.png"
              alt="プロフィール画像"
              className="list__image"
            />
            <p className="list__title">{data.title}</p>
            <p className="list__detail"> | 京都 | </p>
            <p className="list__tag"># ワイワイしたい</p>
            <p className="list__deadline">あと7日</p>
          </div>
        );
      })}
    </>
  );
};
