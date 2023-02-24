import "./Home.scss"
// import { RecruitmentList } from "./RecruitmentList"

export const Home = () =>{
    return(
        <main>
        <h1>HOME</h1>
        {/* <RecruitmentList /> */}
        <button className="post-button">
        <img src="../images/pencil.svg" alt="投稿アイコン" />
        </button>
        </main>
    )
}