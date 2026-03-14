import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";
import CarpentryImage from "../assets/home/fixes/carpentry.png";
import ElectricalImage from "../assets/home/fixes/electrical.png";
import PlumbingImage from "../assets/home/fixes/plumbing.png";
import ToolsImage from "../assets/home/fixes/tools.png";
import HomeImage from "../assets/home/fixes/home.png";

const fixTypes = [
  { label: "Carpentry", icon: CarpentryImage },
  { label: "Electrical", icon: ElectricalImage },
  { label: "Plumbing", icon: PlumbingImage },
  { label: "Tools", icon: ToolsImage },
  { label: "Home Maintenance", icon: HomeImage },
];

export default function FixesPage() {
  const navigate = useNavigate();
  const { theme } = useAppContext();

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">Choose a Service Category</h1>
      <div className="service-grid">
        {fixTypes.map((type) => (
          <button
            key={type.label}
            className="service-card"
            type="button"
            onClick={() => navigate(`/fixes/${encodeURIComponent(type.label)}`)}
          >
            <img src={type.icon} alt={type.label} style={{ width: 100, height: 100 }} />
            <strong>{type.label}</strong>
            <span>Explore {type.label} offerings</span>
          </button>
        ))}
      </div>
    </section>
  );
}
