import { Link, NavLink } from "react-router-dom";
import "./Footer.scss";
import { auth } from "../../firebase";
import { ReactComponent as HomeIcon } from "./home-2.svg";
import { ReactComponent as MessageIcon } from "./message-2.svg";
import { ReactComponent as AlertIcon } from "./bell.svg";
import { ReactComponent as UserIcon } from "./user.svg";
import { useAuthState } from "react-firebase-hooks/auth";

export const Footer = () => {
  // ログイン済の場合、user==trueになる
  const [user] = useAuthState(auth);

  // 現在ログインしているユーザーのIDを取得

  // const id = auth.currentUser.uid;
  const id = auth.currentUser ? auth.currentUser.uid : [{}];

  return (
    <div className="footer">
      <footer>
        <NavLink to={"/home"}>
          {({ isActive }) => (
            <HomeIcon stroke={isActive ? "#edb886" : "#000000"} />
          )}
        </NavLink>
        <NavLink to={"/dialogues"}>
          {({ isActive }) => (
            <MessageIcon stroke={isActive ? "#edb886" : "#000000"} />
          )}
        </NavLink>
        <NavLink to={"/notifications"}>
          {({ isActive }) => (
            <AlertIcon stroke={isActive ? "#edb886" : "#000000"} />
          )}
        </NavLink>
        <NavLink to="/mypage">
          {({ isActive }) => (
            <UserIcon stroke={isActive ? "#edb886" : "#000000"} />
          )}
        </NavLink>
      </footer>
    </div>
  );
};
