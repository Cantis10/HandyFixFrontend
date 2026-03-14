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
    <section className="page-section">
      <div
        className="service-grid"
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        {fixTypes.map((type) => (
          <button
            key={type.label}
            className="service-card"
            type="button"
            onClick={() => navigate(`/fixes/${encodeURIComponent(type.label)}`)}
          >
            <img src={type.icon} alt={type.label} style={{ width: "100%" }} />
          </button>
        ))}
      </div>
    </section>
  );
}
