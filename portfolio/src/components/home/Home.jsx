import { useNavigate } from "react-router-dom";
import "./Home.scss";
import { HomeTabs } from "./HomeTabs";

export const Home = () => {

const navigate = useNavigate();

  return (
    <main className="home">
      <HomeTabs />

      <button className="post-button" onClick={()=>navigate("/post")}>
        <img src="../images/pencil.svg" alt="投稿アイコン" />
      </button>
    </main>
  );
};
