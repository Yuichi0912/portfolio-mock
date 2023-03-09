import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"
import "./Notifications.scss"
import { RequestList } from "./RequestList"

export const Notifications = () =>{
    return(
        <div className="notifications">
            <Header />
        <RequestList/>
        <Footer />
        </div>
    )
}