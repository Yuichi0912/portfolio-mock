import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Navigate } from "react-router-dom"

export const Signup = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    console.log(email.value, password.value);

    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      navigate("/home")
    } catch (error) {
      alert("正しく入力してください");
    }

  };

  if(user) return navigate("/home")

  return (
    <div>
    <h2>アカウント登録画面</h2>
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="メールアドレス" />
      <input name="password" type="password" placeholder="パスワード" />
      <button>
        <p>登録する</p>
      </button>
    </form>
  </div>
  
  );
};
