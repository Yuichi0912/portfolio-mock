import "./SearchModal.scss";

export const SearchModal = ({ showSearch, setShowSearch }) => {
  if (showSearch) {
    return (
      <div className="search__overlay" onClick={() => setShowSearch(false)}>
        <div className="search__content">
          <h2>モーダル画面</h2>
          <p>工事中</p>
        </div>

      </div>
    );
  } else {
    return null;
  }
};
