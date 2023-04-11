import { Link, useNavigate } from "react-router-dom";
import "./SuggestAddProfile.scss";

export const SuggestAddProfile = ({ showLevel, setShowLevel }) => {
  const navigate = useNavigate();

  if (showLevel) {
    return (
      <div className="suggest__overlay" onClick={() => setShowLevel(false)}>
        <div className="suggest__content">
          <h3>この機能を利用するにはユーザー情報の登録が必要です</h3>
          <button
            className="suggest__add--profile"
            onClick={() => navigate("/mypage/edit")}
          >
            ユーザー情報を登録する
          </button>

          <Link to="/login" className="suggest__login"> ※ログイン・新規会員登録がお済みでない方</Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
