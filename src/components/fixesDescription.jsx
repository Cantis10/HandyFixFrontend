import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

export default function FixesDescription({ fixType }) {
  const navigate = useNavigate();
  const { theme } = useAppContext();

  console.log("Testing");

  return (
    <section
      className="page-section"
      style={{ backgroundColor: theme.colors.background }}
    >
      <h1 className="section-heading">{fixType}</h1>
    </section>
  );
}
