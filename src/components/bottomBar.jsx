import React from "react";
import { useNavigate } from "react-router-dom";

import HomeImage from "../assets/bottomBar/home.png";
import BookingsImage from "../assets/bottomBar/bookings.png";
import ProfileImage from "../assets/bottomBar/profile.png";

const tiles = [
  { label: "Home", path: "/home", icon: HomeImage },
  { label: "Bookings", path: "/bookings", icon: BookingsImage },
  { label: "Profile", path: "/profile", icon: ProfileImage },
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
