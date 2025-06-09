import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css"
import {
  BrowserRouter,
  Routes,
  Route,
  useParams
} from "react-router-dom";
import App from "./client/App";
import NotFoundPage from "./client/404";
import MainPage from "./client/MainPage";

const ValidatedTeamRoute = () => {
  const { teamId } = useParams();
  if (teamId === "team1" || teamId === "team2") {
    return <App />;
  }
  return <NotFoundPage />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/team/:teamId" element={<ValidatedTeamRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);