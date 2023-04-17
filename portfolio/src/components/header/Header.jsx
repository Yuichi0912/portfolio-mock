import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useParams } from "react-router-dom";
import "./Header.scss";
import { SearchModal } from "./SearchModal";
import { SortModal } from "./SortModal";

export const Header = () => {
  const [showSort, setShowSort] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { id } = useParams();
  const location = useLocation();

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
    <header className="header">
      {isSmallScreen ? (
        <>
          {" "}
          <Link to="/home">
            {" "}
            <h1 className="header-title">PinLoop</h1>
          </Link>
          <div className="page-titles">
            {location.pathname === "/dialogues" && <h2>やりとり</h2>}
            {location.pathname === "/notifications" && <h2>通知</h2>}
            {location.pathname === "/mypage" && <h2>マイページ</h2>}
            {location.pathname === "/post" && <h2>投稿</h2>}
            {location.pathname === `/detail/${id}` && <h2>詳細</h2>}
            {location.pathname === `/detail/${id}/users` && <h2>参加者一覧</h2>}
          </div>
          {location.pathname === "/home" && (
            <div className="header__button-group">
              <button onClick={() => setShowSort(true)}>
                {" "}
                <img src="../images/sort-descending.svg" alt="ソートアイコン" />
              </button>
              {createPortal(
                <>
                  {" "}
                  <SortModal showSort={showSort} setShowSort={setShowSort} />
                </>,
                document.body
              )}
              <button onClick={() => setShowSearch(true)}>
                {" "}
                <img src="../images/search.svg" alt="検索アイコン" />
              </button>
              {createPortal(
                <>
                  {" "}
                  <SearchModal
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                  />
                </>,
                document.body
              )}
            </div>
          )}
        </>
      ) : (
        <>
          {" "}
          <Link to="/home">
            {" "}
            <h1 className="header-title">PinLoop</h1>
          </Link>
          <div className="page-titles">
            {location.pathname === "/home" && <h2>ホーム</h2>}
            {location.pathname === "/home/people" && <h2>ユーザー</h2>}
            {location.pathname === "/dialogues" && <h2>やりとり</h2>}
            {location.pathname === "/notifications" && <h2>通知</h2>}
            {location.pathname === "/mypage" && <h2>マイページ</h2>}
            {location.pathname === "/post" && <h2>投稿</h2>}
            {location.pathname === `/detail/${id}` && <h2>詳細</h2>}
            {location.pathname === `/detail/${id}/users` && <h2>参加者一覧</h2>}
          </div>
        </>
      )}
    </header>
  );
};
