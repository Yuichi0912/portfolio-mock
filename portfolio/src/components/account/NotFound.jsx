import { Link } from "react-router-dom"

export const NotFound = () =>{
    return (
        <div>
            <h2>ログアウトされています</h2>
            <Link to="/login">ログインはこちら</Link>
        </div>
    )
}