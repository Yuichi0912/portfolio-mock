import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <h2>存在しないページです。</h2>
      <Link to="/login">ログインはこちら</Link>
    </div>
  );
};
