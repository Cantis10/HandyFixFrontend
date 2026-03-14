import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const FIX_SERVICES = {
  Plumbing: [
    "Leak Repair",
    "Drain Cleaning",
    "Toilet Installation",
    "Water Heater Installation",
    "Pipe Installation and Replacement",
  ],
  Electrical: [
    "Light Installation and Repair",
    "Outlet and Switch Repair",
    "Circuit Breaker Repair",
    "Wiring Installation and Troubleshooting",
    "Air Conditioning Installation and Repair",
  ],
  Carpentry: [
    "Furniture Assembly",
    "Cabinet Installation and Repair",
    "Door Installation and Repair",
    "Window Frame Repair",
    "Shelving Installation",
  ],
  "Home Maintenance": [
    "Wall Patching and Minor Repairs",
    "Tile Repair and Replacement",
    "Roof Leak Repair",
    "Gutter Cleaning and Repair",
    "Painting and Touch-ups",
  ],
  Tools: [
    "Basic Plumbing Repair Kit",
    "Electric Safety Repair Kit",
    "Wall Repair and Patching Kit",
    "Furniture Repair Kit",
    "Emergency Home Repair Kit",
  ],
};

export default function FixesSubTypePage() {
  const { fixType } = useParams();
  const navigate = useNavigate();
  const { theme } = useAppContext();

  const services = FIX_SERVICES[fixType] ?? [];

  return (
    <section
      className="page-section"
      style={{ backgroundColor: theme.colors.background }}
    >
      <h1 className="section-heading">
        Services for {fixType ?? "your selection"}
      </h1>
      {services.length === 0 ? (
        <p>No services listed for "{fixType}".</p>
      ) : (
        <div className="service-grid">
          {services.map((service) => (
            <button
              key={service}
              className="service-card"
              type="button"
              onClick={() =>
                navigate("/send", {
                  state: { fixType, service },
                })
              }
            >
              <strong>{service}</strong>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
