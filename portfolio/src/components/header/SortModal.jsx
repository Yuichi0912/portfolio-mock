import "./SortModal.scss";

export const SortModal = ({showSort,setShowSort}) => {
  if (showSort) {
    return (
      <div className="sort__overlay" onClick={()=>setShowSort(false)}>
        <div className="sort__content">
          <h2>モーダル画面</h2>
          <p>工事中</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
