import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import "./Settings.scss"

export const Settings = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Footerコンポーネントで渡された,ログインしているユーザーの🆔
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ログアウト
  const handleLogout = () => {
    auth.signOut().then(() => navigate("/login"));
  };

  return (
    <div className="settings-page">
      <button className="settings__button" onClick={handleMenuToggle}>
        {" "}
        <img  src="../../images/settings.svg" />
      </button>
      {isMenuOpen && (
        <>
          <div className="overlay" onClick={handleMenuToggle} />
          <div className="settings__menu">
            <Link className="settings__menu--edit-profile" to={"/mypage/edit"}>プロフィールを編集する</Link>
            <button className="settings__menu--logout" onClick={handleLogout}>
              ログアウトする
            </button>
          </div>
        </>
      )}
    </div>
  );
};
