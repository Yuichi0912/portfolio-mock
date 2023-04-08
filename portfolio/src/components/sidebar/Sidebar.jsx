import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./home-2.svg";
import { ReactComponent as MessageIcon } from "./message-2.svg";
import { ReactComponent as AlertIcon } from "./bell.svg";
import { ReactComponent as UserIcon } from "./user.svg";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/home" className="sidebar-title">
        PinLoop
      </Link>

      <div className="sidebar-icons">
        <Link to={"/home"} className="sidebar-homeicon">
          <HomeIcon stroke="#edb886" width="40px" height="40px" />
          <p>ホーム</p>
        </Link>
        <Link to={"/dialogues"} className="sidebar-messageicon">
          <MessageIcon stroke="#edb886" width="40px" height="40px" />{" "}
          <p>やりとり</p>
        </Link>
        <Link to={"/notifications"} className="sidebar-alerticon">
          <AlertIcon stroke="#edb886" width="40px" height="40px" />
          <p>お知らせ</p>
        </Link>
        <Link to="/mypage" className="sidebar-usericon">
          <UserIcon stroke="#edb886" width="40px" height="40px" />
          <p>プロフィール</p>
        </Link>
      </div>
    </div>
  );
};
