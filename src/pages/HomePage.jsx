import React from "react";
import { useAppContext } from "../contexts/appContext";
import BottomBar from "../components/bottomBar";
import Fixes from "../components/Fixes";

export default function HomePage() {
  const { user } = useAppContext();

  return (
    <section className="page-section">
      <h1 className="section-heading">
        Hello {user?.first_name ? user.first_name : "Guest"}!
      </h1>
      <p>
        Choose a section below to start a service request or review your
        activity.
      </p>
      <Fixes />
      <BottomBar />
    </section>
  );
}
