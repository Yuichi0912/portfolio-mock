import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"
import { RecruitmentList } from "../home/RecruitmentList"
import "./Dialogues.scss"
import { OwnPostLists } from "./OwnPostLists"

export const Dialogues =()=>{

    return(
        <div className="dialogues">
            <Header />
        <p>やりとりがまだありません</p>
        <OwnPostLists />
        <Footer />
        </div>
    )
}