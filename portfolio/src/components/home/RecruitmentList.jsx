import { db } from "../../firebase";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecruitmentList.scss";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroller";
import { ListLoading } from "./ListLoading";

export const RecruitmentList = () => {
  const [recruitmentsData, setRecruitmentsData] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const detailData = collection(db, "recruitments");

  // 投稿の取得（５個）
  const initialQuery = query(
    detailData,
    orderBy("timestamp", "desc"),
    limit(5)
  );
  useEffect(() => {
    getDocs(initialQuery).then((querySnapshot) => {
      setRecruitmentsData(querySnapshot.docs.map((doc) => doc.data()));
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreData = (page) => {
    console.log(page);

    // 最初の5個以降を取得
    const nextQuery = query(
      detailData,
      orderBy("timestamp", "desc"),
      startAfter(lastDoc),
      limit(5)
    );

    console.log("scroll");
    getDocs(nextQuery).then((querySnapshot) => {
      setRecruitmentsData((prevState) => [
        ...prevState,
        ...querySnapshot.docs.map((doc) => doc.data()),
      ]);
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    });
  };

  const hasMoreItems = !!lastDoc;

  const loading = (
    <div key={0}>
<ListLoading />
    </div>
  );

  return (
    <motion.div
      className="list-page"
      animate={{ x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
    >
      {/* <div className="list-page"> */}
      <InfiniteScroll
        // pageStart={0}
        loadMore={loadMoreData}
        hasMore={hasMoreItems}
        loader={loading}
        // useWindow={false}
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
      </InfiniteScroll>
      {/* </div> */}
    </motion.div>
  );
};
