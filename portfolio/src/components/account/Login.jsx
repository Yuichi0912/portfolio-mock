import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.scss";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

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
  const onLogin = (e) => {
    e.preventDefault();
    // console.log(e.target.elements.email);
    // const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => navigate("/home"))
      .catch((err) => alert(err.message));
  };

  // ログイン中は/homeに遷移
  useEffect(() => {
    if (user) return navigate("/home");
  }, [user]);

  // バリデーションの設定

  const schema = yup.object({
    email: yup
      .string()
      .email("※正しいメールアドレスの形式ではありません。")
      .required("※入力必須"),
    password: yup.string().required("※入力必須(6文字以上)"),
  });

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: schema,
  });

  return (
    <div className="background-image">
      <div className="login-page">
        <h1 className="login__title">PinLoop</h1>
        <h2 className="login__description">ログイン</h2>
        <button className="login__google" onClick={loginWithGoogle}>
          {" "}
          <p>Googleでログイン</p>
        </button>
        <form className="login__form" onSubmit={handleSubmit}>
          {errors.email && (
            <label htmlFor="email" className="error-message">
              {errors.email}
            </label>
          )}
          <input
            className="login__email"
            name="email"
            type="email"
            placeholder="メールアドレス"
            id="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.password && (
            <label htmlFor="password" className="error-message">
              {errors.password}
            </label>
          )}

          <input
            className="login__password"
            name="password"
            type="password"
            placeholder="パスワード"
            id="password"
            value={values.password}
            onChange={handleChange}
          />
          <button className="login__subumit-button" onClick={onLogin}>
            <p>ログインする</p>
          </button>
        </form>
        <Link className="login__navigate-signup" to="/signup">
          アカウントの新規登録はこちら
        </Link>
      </div>
    </div>
  );
};
