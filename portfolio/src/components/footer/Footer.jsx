import { Link } from "react-router-dom";
import "./Footer.scss";
import { auth } from "../../firebase";
import { ReactComponent as HomeIcon } from "./home-2.svg";
import { ReactComponent as MessageIcon } from "./message-2.svg";
import { ReactComponent as AlertIcon } from "./bell.svg";
import { ReactComponent as UserIcon } from "./user.svg";


export const Footer = () => {
  // 現在ログインしているユーザーのIDを取得
  const id = auth.currentUser.uid;

  return (
    <div className="footer">
      <footer>
        <Link to={"/home"}>
          <HomeIcon stroke="#edb886" />
        </Link>
        <Link to={"/dialogues"}>
        <MessageIcon stroke="#edb886" />
        </Link>
        <Link to={"/notifications"}>
        <AlertIcon stroke="#edb886" />
        </Link>
        <Link to={`/mypage/${id}`}>
        <UserIcon stroke="#edb886" />
        </Link>
      </footer>
    </div>
  );
};
