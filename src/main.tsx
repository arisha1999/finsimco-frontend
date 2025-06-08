import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
import App from "./client/App";
import NotFound from "./client/404";

const ValidatedTeamRoute = () => {
  const { teamId } = useParams();
  if (teamId === "team1" || teamId === "team2") {
    return <App />;
  }
  return <NotFound />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/team/team1" />} />
        <Route path="/team/:teamId" element={<ValidatedTeamRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);