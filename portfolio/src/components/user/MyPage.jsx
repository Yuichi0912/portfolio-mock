import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import "./MyPage.scss";

export const MyPage = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="mypage">
      <h2>マイページ</h2>
      <button onClick={handleLogout}>ログアウトする</button>
    </div>
  );
};
