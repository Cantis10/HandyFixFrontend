import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

export default function SettingsPage() {
  const { theme, link, clearUserData } = useAppContext();
  const navigate = useNavigate();
  const [polledMessages, setPolledMessages] = useState(null);
  const [postResponse, setPostResponse] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(link.url + "test")
        .then((response) => {
          if (!response.ok) throw new Error("Network response not ok");
          return response.json();
        })
        .then((json) => setPolledMessages(json.messages))
        .catch((error) => console.error("Fetch error:", error));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [link.url]);

  useEffect(() => {
    const postData = { message: "Hello from the app!" };

    fetch(link.url + "post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response not ok");
        return response.json();
      })
      .then((json) => setPostResponse(json.message))
      .catch((error) => console.error("POST error:", error));
  }, [link.url]);

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">Settings</h1>
      <p>Theme color: {theme.colors.primary}</p>
      <p>Polling response: {polledMessages ?? "Loading..."}</p>
      <p>Post response: {postResponse ?? "Sending..."}</p>
      <button
        type="button"
        onClick={() => {
          clearUserData();
          navigate("/register");
        }}
      >
        Clear User Data & Logout
      </button>
    </section>
  );
}
