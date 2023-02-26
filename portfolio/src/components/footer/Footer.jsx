import { Link } from "react-router-dom";
import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <Link to={"/home"}>
          {" "}
          <img src="../images/home-2.svg" alt="ホームアイコン" />
        </Link>
        <Link to={"/dialogues"}>
          {" "}
          <img src="../images/message-2.svg" alt="メッセージアイコン" />
        </Link>
        <Link to={"/notifications"}>
          {" "}
          <img src="../images/bell.svg" alt="通知アイコン" />
        </Link>
        <Link to={"/mypage"}>
          {" "}
          <img src="../images/user.svg" alt="ユーザーアイコン" />
        </Link>
      </footer>
    </div>
  );
};
