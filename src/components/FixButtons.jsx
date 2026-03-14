import React from "react";
import { useNavigate } from "react-router-dom";

import FixImage from "../assets/home/fix.png";
import LogsImage from "../assets/home/logs.png";
import ChatImage from "../assets/home/chat.png";
import SettingsImage from "../assets/home/settings.png";

const tiles = [
  { label: "Fix", path: "/fixes", icon: FixImage },
  { label: "Logs", path: "/logs", icon: LogsImage },
  { label: "Chat", path: "/chat", icon: ChatImage },
  { label: "Settings", path: "/settings", icon: SettingsImage },
];

export default function FixButtons() {
  const navigate = useNavigate();

  return (
    <div className="fix-buttons-grid">
      {tiles.map((tile) => (
        <button
          key={tile.path}
          type="button"
          className="fix-button"
          onClick={() => navigate(tile.path)}
        >
          <img src={tile.icon} alt={tile.label} />
          <span>{tile.label}</span>
        </button>
      ))}
    </div>
  );
}
