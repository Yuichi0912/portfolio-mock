import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { SuggestRegistration } from "../../routes/SuggestRegistration";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { RecruitmentList } from "../home/RecruitmentList";
import { ApprovedJoinPosts } from "./ApprovedJoinPosts";
import { ChattingPosts } from "./ChattingPosts";
import "./Dialogues.scss";
import { OwnPostLists } from "./OwnPostLists";

export const Dialogues = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="dialogues">
      <Header />
      {user ? (
        <>
          {" "}
          <OwnPostLists />
          <ChattingPosts />
          <ApprovedJoinPosts />
        </>
      ) : (
        <SuggestRegistration />
      )}
      <Footer />
    </div>
  );
};
