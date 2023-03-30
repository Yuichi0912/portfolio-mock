import { db } from "../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruitmentList.scss";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";

export const RecruitmentList = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const detailData = collection(db, "recruitments");
  const q = query(detailData, orderBy("timestamp", "desc"));
  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  return (
    <motion.div
      className="list-page"
      animate={{ x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      {recruitmentsData.map((data) => {
        return (
          <div
            key={data.id}
            className="list"
            onClick={() => navigate(`/detail/${data.id}`)}
          >
            <h3 className="list__level">Lv. {data.level}</h3>
            <img
              src={data.image}
              alt="プロフィール画像"
              className="list__image"
            />
            <div className="list-center">
              <p className="list-center__title">{data.title}</p>
              <p className="list-center__detail">
                {dayjs(data.date.toDate()).format("MM/DD")} | {data.place} |
                {data.number}人
              </p>
              <p className="list-center__tag">#{data.hashtag}</p>
            </div>
            {/* <p className="list__deadline">あと7日</p> */}
          </div>
        );
      })}
    </motion.div>
  );
};
