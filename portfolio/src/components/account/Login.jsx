import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";
import { useNavigate } from "react-router";
import { useState,useEffect } from "react";

export const Login = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Googleでのログイン
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate("/home"))
      .catch((err) => alert(err.message));
  };

  // パスワード・emailでのログイン
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.email);
    // const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/home"))
      .catch((err) => alert(err.message));
  };

  // ログイン中は/homeに遷移
  useEffect(()=>{
    if (user) return navigate("/home");
  },[user])

  return (
    <div className="login-page">
      <h1 className="login__title">PinLoop</h1>
      <h2 className="login__description">ログイン</h2>
      <button className="login__google" onClick={loginWithGoogle}>
        {" "}
        <p>Googleでログイン</p>
      </button>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__email"
          name="email"
          type="email"
          placeholder="メールアドレス"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__password"
          name="password"
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__subumit-button">
          <p>ログインする</p>
        </button>
      </form>
      <button
        className="login__navigate-signup"
        onClick={() => navigate("/signup")}
      >
        <p>アカウントの新規登録はこちら</p>
      </button>
    </div>
  );
};
