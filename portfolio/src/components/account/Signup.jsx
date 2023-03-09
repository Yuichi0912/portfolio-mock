import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Signup.scss";

export const Signup = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(email.value, password.value);

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      navigate("/home");
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  if (user) return navigate("/home");

  return (
    <div className="signup-page">
      <h1 className="signup__title">PinLoop</h1>
      <h2 className="signup__description">アカウントを作成する</h2>
      <form className="signup__form" onSubmit={handleSubmit}>
        <input
          className="signup__email"
          name="email"
          type="email"
          placeholder="メールアドレス"
        />
        <input
          className="signup__password"
          name="password"
          type="password"
          placeholder="パスワード"
        />
        <button className="signup__subumit-button">
          <p>登録する</p>
        </button>
      </form>
      <button
        className="signup__navigate-login"
        onClick={() => navigate("/login")}
      >
        <p>アカウントをお持ちの方はこちら</p>
      </button>
    </div>
  );
};

// import { createUserWithEmailAndPassword } from "@firebase/auth";
// import { useNavigate } from "react-router";
// import { auth } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// // import { Navigate } from "react-router-dom"

// export const Signup = () => {
//   const [user] = useAuthState(auth);
//   const navigate = useNavigate();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, password } = e.target.elements;
//     console.log(email.value, password.value);

//     try {
//       await createUserWithEmailAndPassword(auth, email.value, password.value);
//       navigate("/home")
//     } catch (error) {
//       alert("正しく入力してください");
//     }

//   };

//   if(user) return navigate("/home")

//   return (
//     <div>
//     <h2>アカウント登録画面</h2>
//     <form onSubmit={handleSubmit}>
//       <input name="email" type="email" placeholder="メールアドレス" />
//       <input name="password" type="password" placeholder="パスワード" />
//       <button>
//         <p>登録する</p>
//       </button>
//     </form>
//   </div>

//   );
// };
