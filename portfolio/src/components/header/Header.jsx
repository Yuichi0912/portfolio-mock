import "./Header.scss";

export const Header = () => {
  return (
      <header className="header">
        <h1>PinLoop</h1>
        {/* <div className="header__button-group"> */}
          <button>
            {" "}
            <img src="../images/search.svg" alt="検索アイコン" />
          </button>
          <button>
            {" "}
            <img src="../images/sort-descending.svg" alt="ソートアイコン" />
          </button>
        {/* </div> */}
      </header>
  );
};
