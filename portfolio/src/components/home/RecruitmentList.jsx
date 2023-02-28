import { useNavigate } from "react-router-dom";
import "./RecruitmentList.scss"

export const RecruitmentList = () => {

const navigate = useNavigate();

  return (
    <div className="list" onClick={()=>navigate("/detail")}>
      <h3 className="list__level">Lv. 8</h3>
      <img
        src="../images/takkyu_tabletennis_man.png"
        alt="プロフィール画像"
        className="list__image"
      />
      <p className="list__title">京都市内で卓球できる人！</p>
      <p className="list__detail">1/25 | 京都 | 2/4人</p>
      <p className="list__tag"># ワイワイしたい</p>
      <p className="list__deadline">あと7日</p>
    </div>
  );
};
