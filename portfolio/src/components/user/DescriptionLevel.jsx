import "./DescriptionLevel.scss"

export const DescriptionLevel =({showLevel,setShowLevel})=>{
    if (showLevel) {
        return (
          <div className="level__overlay" onClick={()=>setShowLevel(false)}>
            <div className="level__content">
              <h2>レベルについて</h2>
              <p>ソート</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
}