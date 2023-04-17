import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Signup.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

export const Signup = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log(values.email);
    // const { email, password } = e.target.elements;
    // console.log(email.value, password.value);

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      navigate("/home");
    } catch (error) {
      alert("正しく入力してください");
    }
  };

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
      <div className="signup-page">
        <h1 className="signup__title">PinLoop</h1>
        <h2 className="signup__description">アカウントを作成する</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          {errors.email && (
            <label htmlFor="email" className="error-message">
              {errors.email}
            </label>
          )}
          <input
            className="signup__email"
            name="email"
            type="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            placeholder="メールアドレス"
          />
          {errors.password && (
            <label htmlFor="password" className="error-message">{errors.password}</label>
          )}
          <input
            className="signup__password"
            name="password"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="パスワード"
          />
          <button
            type="submit"
            className="signup__subumit-button"
            onClick={onSignUp}
          >
            <p>登録する</p>
          </button>
        </form>
        <Link className="signup__navigate-login" to={"/login"}>
          アカウントをお持ちの方はこちら
        </Link>
      </div>
    </div>
  );
};
