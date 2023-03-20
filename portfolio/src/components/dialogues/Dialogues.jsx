import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"
import { RecruitmentList } from "../home/RecruitmentList"
import { ApprovedJoinPosts } from "./ApprovedJoinPosts"
import { ChattingPosts } from "./ChattingPosts"
import "./Dialogues.scss"
import { OwnPostLists } from "./OwnPostLists"

export const Dialogues =()=>{

    return(
        <div className="dialogues">
            <Header />
        <OwnPostLists />
        <ChattingPosts />
        <ApprovedJoinPosts />
        <Footer />
        </div>
    )
}