import "./Header.scss"

export const Header = () => {
  return (
    <header>
      <h1>PinLoop</h1>
      <button>
        {" "}
        <img src="../images/search.svg" alt="検索アイコン" />
      </button>
      <button>
        {" "}
        <img src="../images/sort-descending.svg" alt="ソートアイコン" />
      </button>
      <button></button>
    </header>
  );
};
