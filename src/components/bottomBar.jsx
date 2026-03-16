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

export default function buttomButtons() {
  const navigate = useNavigate();

  return (
    <div className="bottom-buttons-grid">
      {tiles.map((tile) => (
        <button
          key={tile.path}
          type="button"
          className="bottom-button"
          onClick={() => navigate(tile.path)}
        >
          <img src={tile.icon} alt={tile.label} />
          <span>{tile.label}</span>
        </button>
      ))}
    </div>
  );
}
