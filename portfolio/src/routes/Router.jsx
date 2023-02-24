import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dialogues } from "../components/Dialogues";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Home } from "../components/Home";
import { Notifications } from "../components/Notifications";

export const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dialogues" element={<Dialogues />} />
        <Route path="/notifications" element={<Notifications />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
