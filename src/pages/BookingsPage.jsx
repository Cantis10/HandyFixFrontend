import React from "react";
import { useAppContext } from "../contexts/appContext";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/bottomBar";
/**
 * LogsPage component
 *
 * This component renders a page that displays a user's bookings, receipts, and payments.
 * It uses the useAppContext hook to get the user object and the theme object.
 * The component filters the data based on the user's id and renders the results in a section element.
 * The section element has a background color set to the theme's background color.
 * The component also renders a heading element with the text "Bookings".
 */
export default function BookingsPage() {
  const { user, theme } = useAppContext();

  return (
    <section
      className="page-section"
      style={{ backgroundColor: theme.colors.background }}
    >
      <h1 className="section-heading">Bookings</h1>
      <BottomBar />
    </section>
  );
}
