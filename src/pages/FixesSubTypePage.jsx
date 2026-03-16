import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";
import BottomBar from "../components/bottomBar";
import FixesDescription from "../components/fixesDescription";
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
  const [showTypes, setShowTypes] = useState(true);
  const [showSelected, setShowSelected] = useState(false);
  const [selectedService, setSelectedService] = useState(false);
  const { fixType } = useParams();
  const navigate = useNavigate();
  const { theme } = useAppContext();

  const services = FIX_SERVICES[fixType] ?? [];

  function showSubsections(string) {
    //dont navigate, call fixesDescription to display
    setShowTypes(false);
    setShowSelected(true);
    setSelectedService(string);
    console.log(string);
  }

  function goBack() {
    setShowTypes(true);
    setShowSelected(false);
  }

  return (
    <section
      className="page-section"
      style={{ backgroundColor: theme.colors.background }}
    >
      <h1 className="section-heading">
        Services for {fixType ?? "your selection"}
      </h1>
      {!showTypes ? null : (
        <div className="sub-service-grid">
          {services.map((service) => (
            <button
              key={service}
              className="service-card"
              type="button"
              onClick={() => showSubsections(service)}
            >
              <strong>{service}</strong>
            </button>
          ))}
        </div>
      )}

      {!showSelected ? null : (
        <div className="sub-service-grid">
          <button
            className="service-card"
            type="button"
            onClick={() => goBack()}
          >
            Go Back
          </button>
          <FixesDescription
            fixType={selectedService}
            goBack={() => setShowTypes(true)}
          />
        </div>
      )}

      <BottomBar />
    </section>
  );
}
