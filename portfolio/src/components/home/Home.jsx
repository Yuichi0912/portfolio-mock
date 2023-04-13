// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RecruitmentList } from "./RecruitmentList";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { UsersList } from "../home/UsersList";
import { useEffect, useState } from "react";
import "swiper/scss";
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppBar } from "@mui/material";
import { Sidebar } from "../sidebar/Sidebar";
import { SideAd } from "../../routes/SideAd";
import { SuggestAddProfile } from "../../routes/SuggestAddProfile";

export const Home = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showLevel, setShowLevel] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [swiper, setSwiper] = useState(null);
  const [value, setValue] = useState(0);
  const slideChange = (index) => {
    setValue(index);
  };

  const tabChange = (event, newValue) => {
    setValue(newValue);
    swiper.slideTo(newValue);
  };

  useEffect(() => {
    setIsRendered(true);
  }, []);

  // レスポンシブの状態管理（デスクトップサイズ）
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onNavigatePost = () => {
    if (!user) {
      setShowLevel(true);
    } else {
      navigate("/post");
    }
  };


  return (
    <>
      {isRendered ? (
        <>
          {isSmallScreen ? (
            <>
              {" "}
              <main className="home">
                <Header />
                <AppBar
                  sx={{ width: "100%", bgcolor: "background.paper", mt: 13 }}
                  elevation={0}
                >
                  <Tabs value={value} onChange={tabChange} variant="fullWidth">
                    <Tab label="募集一覧" value={0} />
                    <Tab label="ユーザー" value={1} />
                  </Tabs>
                </AppBar>

                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={(index) => slideChange(index.activeIndex)}
                  onSwiper={(swiper) => {
                    const swiperInstance = swiper;
                    setSwiper(swiperInstance);
                  }}
                >
                  <SwiperSlide className="tab__recruitment-list">
                    <RecruitmentList />
                  </SwiperSlide>
                  <SwiperSlide className="tab__user-list">
                    <UsersList />
                  </SwiperSlide>
                </Swiper>

                <button className="post-button-small" onClick={onNavigatePost}>
                  <img src="../images/pencil.svg" alt="投稿アイコン" />
                </button>
                <SuggestAddProfile
                  showLevel={showLevel}
                  setShowLevel={setShowLevel}
                />
                <Footer />
              </main>
            </>
          ) : (
            <>
              <main className="home">
                <Header />
                <Sidebar />
                <div className="home-contents">
                  <div className="home-contents__leftside">
                    <div className="recruitment-bar">
                      <p className="recruitment-bar-title">募集一覧</p>
                      <RecruitmentList />
                    </div>
                  </div>
                  <div
                    className="home-contents__rightside"
                  >
                    <div className="user-bar">
                      <p className="user-bar__title">ユーザー</p>
                      <Link
                        to="/home/people"
                        className="user-bar__link-userpage"
                      >
                        すべて表示する
                      </Link>
                    </div>
                    <UsersList />

                    <button
                      className="post-button-large"
                      onClick={onNavigatePost}
                    >
                      <img src="../images/pencil.svg" alt="投稿アイコン" />
                      <p>投稿する</p>
                    </button>
                    <SuggestAddProfile
                      showLevel={showLevel}
                      setShowLevel={setShowLevel}
                    />
                  </div>
                  <div className="advertisement">
                    <SideAd />
                  </div>
                </div>
              </main>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
