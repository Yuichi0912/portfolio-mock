import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { SearchModal } from "./SearchModal";
import { SortModal } from "./SortModal";

export const Header = () => {
  const [showSort, setShowSort] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="header">
      <Link to="/home">
        {" "}
        <h1 className="header-title">PinLoop</h1>
      </Link>
      {/* <div className="header__button-group"> */}
      {/* <button onClick={() => setShowSort(true)}>
        {" "}
        <img src="../images/sort-descending.svg" alt="ソートアイコン" />
      </button>
      <SortModal showSort={showSort} setShowSort={setShowSort} />
      <button onClick={() => setShowSearch(true)}>
        {" "}
        <img src="../images/search.svg" alt="検索アイコン" />
      </button>
      <SearchModal showSearch={showSearch} setShowSearch={setShowSearch} /> */}

      {/* </div> */}
    </header>
  );
};
