import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Fixes", path: "/fixes" },
  { label: "Logs", path: "/logs" },
  { label: "Chat", path: "/chat" },
  { label: "Settings", path: "/settings" },
];

export default function GlobalNav() {
  const navigate = useNavigate();
  const { theme, clearUserData } = useAppContext();

  return (
    <nav
      className="global-nav"
      style={{ backgroundColor: theme.colors.primary, color: "#fff" }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className="primary"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          clearUserData();
          navigate("/register");
        }}
      >
        Sign Out
      </button>
    </nav>
  );
}
