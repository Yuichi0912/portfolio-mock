import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"
import "./Notifications.scss"
import { RequestList } from "./RequestList"

export const Notifications = () =>{
    return(
        <div className="notifications">
            <Header />
        <h2>実装予定日（３・１０まで）</h2>
        <RequestList/>
        <Footer />
        </div>
    )
}