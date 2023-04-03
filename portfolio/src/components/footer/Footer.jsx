import { Link } from "react-router-dom";
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
console.log(user);

  
  // 現在ログインしているユーザーのIDを取得
 
  // const id = auth.currentUser.uid;
  

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
        {user ?(<></>) :(<></>)}
        {/* <Link to={user ? `/mypage/${id}` : "/mypage"}>
        <UserIcon stroke="#edb886" />
        </Link> */}
      </footer>
    </div>
  );
};
