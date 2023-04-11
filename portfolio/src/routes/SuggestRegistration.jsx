import { Link, useNavigate } from "react-router-dom";
import "./SuggestRegistration.scss";

export const SuggestRegistration = () => {
    const navigate = useNavigate();
  return (
    <div className="suggest-registration-page">
        <div className="suggest-registration-text">
      <p>この機能を利用するにはログインが必要です。<br/>        ログイン後、再度お試しください。会員登録がまだの方は、新規会員登録を行ってください。
</p>
      </div>
      <button className="navigate__registration-button" onClick={()=>navigate("/login")}>
        ログイン・新規会員登録
      </button>
    </div>
  );
};
