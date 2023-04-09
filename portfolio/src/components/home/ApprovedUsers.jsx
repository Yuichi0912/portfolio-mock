import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { SideAd } from "../../routes/SideAd";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { ReactComponent as BackIcon } from "./chevron-left.svg";


export const ApprovedUsers =()=>{
    const [approvedUserData, setApprovedUserData] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const { id } = useParams(); // 投稿に付与されている🆔を出力

      // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
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


    return(
        <div className="approved-users-page">
            {isSmallScreen ?(<>
            <Header />
            <Link className="detail__backward" to={`/detail/${id}`}>
                    <BackIcon width="35px" height="35px" />
                  </Link>

            <Footer />
            </>) :(<>
            <Header />
            <Sidebar />
            <SideAd />
            </>)}

        </div>
    )
}