import "./Home.scss"
import { HomeTabs } from "./HomeTabs"

export const Home = () =>{
    return(
        <main className="home">
            <HomeTabs />

        <button className="post-button">
        <img src="../images/pencil.svg" alt="投稿アイコン" />
        </button>
        </main>
    )
}