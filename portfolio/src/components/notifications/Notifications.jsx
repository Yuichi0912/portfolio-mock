import "./Notifications.scss"
import { RequestList } from "./RequestList"

export const Notifications = () =>{
    return(
        <div className="notifications">
        <h2>実装予定日（３・１０まで）</h2>
        <RequestList/>
        </div>
    )
}