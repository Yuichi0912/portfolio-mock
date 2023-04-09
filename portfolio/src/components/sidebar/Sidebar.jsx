import { Link, NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./home-2.svg";
import { ReactComponent as MessageIcon } from "./message-2.svg";
import { ReactComponent as AlertIcon } from "./bell.svg";
import { ReactComponent as UserIcon } from "./user.svg";
import "./Sidebar.scss";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/home" className="sidebar-title">
        PinLoop
      </NavLink>

      <div className="sidebar-icons">
        <NavLink to={"/home"} className="sidebar-homeicon">
          {({ isActive }) => (
            <>
              <HomeIcon
                stroke={isActive ? "#edb886" : "#000000"}
                width="40px"
                height="40px"
              />
              <p style={{color: isActive ? "#edb886" : "#000000"}} >ホーム</p>
            </>
          )}
        </NavLink>
        <NavLink to={"/dialogues"} className="sidebar-messageicon">
          {({ isActive }) => (
            <>
              <MessageIcon
                stroke={isActive ? "#edb886" : "#000000"}
                width="40px"
                height="40px"
              />
              <p style={{color: isActive ? "#edb886" : "#000000"}} >やりとり</p>
            </>
          )}
        </NavLink>
        <NavLink to={"/notifications"} className="sidebar-alerticon">
          {({ isActive }) => (
            <>
              <AlertIcon
                stroke={isActive ? "#edb886" : "#000000"}
                width="40px"
                height="40px"
              />
              <p style={{color: isActive ? "#edb886" : "#000000"}}>お知らせ</p>
            </>
          )}
        </NavLink>
        <NavLink to="/mypage" className="sidebar-usericon">
          {({ isActive }) => (
            <>
              <UserIcon
                stroke={isActive ? "#edb886" : "#000000"}
                width="40px"
                height="40px"
              />
              <p style={{color: isActive ? "#edb886" : "#000000"}}>マイページ</p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};
