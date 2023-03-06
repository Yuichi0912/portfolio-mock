import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/home"))
      .catch((err) => alert(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => navigate("/home"))
      .catch((err) => alert(err.message));
  };

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  if (user) return navigate("/home");

  return (
    <div>
      <h2>ログイン画面</h2>
      <button onClick={loginWithGoogle}>
        {" "}
        <p>Googleでログイン</p>
      </button>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="メールアドレス" />
        <input name="password" type="password" placeholder="パスワード" />
        <button>
          <p>ログインする</p>
        </button>
      </form>
      {user ? (
        <>
          <p>ログイン中です</p>
        </>
      ) : (
        <p>ログインしてないよ</p>
      )}
      <button onClick={handleLogout}>ログアウトする</button>
    </div>
  );
};
