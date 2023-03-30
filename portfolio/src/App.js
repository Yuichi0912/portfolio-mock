import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { Router } from "./routes/Router";

export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
};
