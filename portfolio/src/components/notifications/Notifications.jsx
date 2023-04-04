import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { SuggestRegistration } from "../../routes/SuggestRegistration";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import "./Notifications.scss";
import { RequestList } from "./RequestList";

export const Notifications = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="notifications">
      <Header />
      {user ? <RequestList /> : <SuggestRegistration />}
      <Footer />
    </div>
  );
};
