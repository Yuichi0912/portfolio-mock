// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RecruitmentList } from "./RecruitmentList";
import { useNavigate } from "react-router-dom";
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

export const Home = () => {
  const [isRendered, setIsRendered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
      setIsSmallScreen(window.innerWidth < 1020);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初期表示時に一度呼び出す
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      {isSmallScreen ? (
        <>
          {" "}
          {isRendered ? (
            <main className="home">
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

            
                <button
                  className="post-button-small"
                  onClick={() => navigate("/post")}
                >
                  <img src="../images/pencil.svg" alt="投稿アイコン" />
                </button>
            
             
            </main>
          ) : (
            <></>
          )}
        </>
      ) : (
        <main className="home">
          <RecruitmentList /> <UsersList />
          <button
            className="post-button-large"
            onClick={() => navigate("/post")}
          >
            <img src="../images/pencil.svg" alt="投稿アイコン" />
            <p>投稿する</p>
          </button>
          <p className="advertisement">広告</p>
        </main>
      )}
      <Footer />
    </>
  );
};
