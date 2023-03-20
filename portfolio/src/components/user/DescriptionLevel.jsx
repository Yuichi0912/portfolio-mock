import "./DescriptionLevel.scss"

export const DescriptionLevel =({showLevel,setShowLevel})=>{
    if (showLevel) {
        return (
          <div className="level__overlay" onClick={()=>setShowLevel(false)}>
            <div className="level__content">
              <h2>レベルについて</h2>
              <p>あなたの競技レベルを設定することで、ミスマッチを無くせます！</p>
              <p>Lv.0 完全初心者/見る専</p>
              <p>Lv.1 趣味でやってます/温泉卓球</p>
              <p>Lv.2 最近始めました/競技歴半年未満</p>
              <p>Lv.3 競技歴1年</p>
              <p>Lv.4 競技歴3年</p>
              <p>Lv.5 競技歴5年〜</p>
              <p>Lv.6 県大会出場/オープン戦入賞</p>
              <p>Lv.7 県大会上位/オープン戦優勝</p>
              <p>Lv.8 全国出場経験あり</p>
              <p>Lv.9 全国ランク経験あり</p>
              <p>Lv.10 全国優勝経験あり</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
}