import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruitmentList.scss";
import dayjs from "dayjs";

export const RecruitmentList = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const detailData = collection(db, "recruitments");
  const arrList = [];
  useEffect(() => {
    getDocs(detailData).then((querySnapshot) => {
      setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  // console.log(recruitmentsData);

  return (
    <>
      {recruitmentsData.map((data) => {
        return (
          <div
            key={data.id}
            className="list"
            onClick={() => navigate(`/detail/${data.id}`)}
          >
            <h3 className="list__level">Lv. 8</h3>
            <img
              src="../images/takkyu_tabletennis_man.png"
              alt="プロフィール画像"
              className="list__image"
            />
            <p className="list__title">{data.title}</p>
            <p className="list__detail">{dayjs(data.date.toDate()).format("YYYY-MM-DD")} | 京都 | </p>
            <p className="list__tag"># ワイワイしたい</p>
            <p className="list__deadline">あと7日</p>
          </div>
        );
      })}
    </>
  );
};

// useEffect(() => {
//   getDocs(detailData).then((querySnapshot) => {
//     querySnapshot.docs.map((doc) => {
//       const docData = doc.data();
//       docData.id = doc.id;
//       arrList.push(docData)
//       console.log(arrList);
//       // console.log(arrList);
//       setRecruitmentsData(arrList);
//     });
//     // setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
//   });
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
