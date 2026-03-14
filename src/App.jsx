import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAppContext } from "./contexts/appContext";
import HomePage from "./pages/HomePage";
import FixesSubTypePage from "./pages/FixesSubTypePage";
import SendPage from "./pages/SendPage";
import LogsPage from "./pages/LogsPage";
import ChatListPage from "./pages/ChatListPage";
import ChatDetailsPage from "./pages/ChatDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import GlobalNav from "./components/GlobalNav";

function AuthenticatedRoute() {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  if (!isLoggedIn) {
    //return <Navigate to="/register" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      {isLoggedIn && <GlobalNav />}
      <div className="app-shell">
        <Routes>
          <Route
            path="/register"
            element={
              !isLoggedIn ? <RegisterPage /> : <Navigate to="/" replace />
            }
          />
          <Route element={<AuthenticatedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/fixes/:fixType" element={<FixesSubTypePage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/chat" element={<ChatListPage />} />
            <Route path="/chat/:ticketId" element={<ChatDetailsPage />} />
            <Route path="/ProfilePage" element={<ProfilePage />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/register"} replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
