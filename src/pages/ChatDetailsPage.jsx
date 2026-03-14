import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const chatData = () => [
  /* same array? reuse from ChatList? best to import, but for brevity, duplicate. */
  {
    id: 1,
    ticket_id: "12345",
    user_id: "67890",
    contractor_id: "54321",
    message: "Hello, I need help with my plumbing issue.",
    messager_id: "67890",
    date: "2024-06-01T10:00:00Z",
  },
  {
    id: 2,
    ticket_id: "12345",
    user_id: "67890",
    contractor_id: "54321",
    message: "Sure, I can help you with that. Can you provide more details?",
    messager_id: "54321",
    date: "2024-06-01T10:05:00Z",
  },
  {
    id: 3,
    ticket_id: "12345",
    user_id: "67890",
    contractor_id: "54321",
    message: "Yes, the issue is with my kitchen sink. It's leaking.",
    messager_id: "67890",
    date: "2024-06-01T10:10:00Z",
  },
  {
    id: 4,
    ticket_id: "12345",
    user_id: "67890",
    contractor_id: "54321",
    message:
      "I see. I can send a plumber to your location tomorrow. Does that work for you?",
    messager_id: "54321",
    date: "2024-06-01T10:15:00Z",
  },
  {
    id: 5,
    ticket_id: "67891",
    user_id: "67890",
    contractor_id: "54322",
    message: "Hi, I need help with my electrical issue.",
    messager_id: "67890",
    date: "2024-06-02T11:00:00Z",
  },
  {
    id: 6,
    ticket_id: "67891",
    user_id: "67890",
    contractor_id: "54322",
    message:
      "Hello! I can assist you with that. Can you describe the problem?",
    messager_id: "54322",
    date: "2024-06-02T11:05:00Z",
  },
];

export default function ChatDetailsPage() {
  const { ticketId } = useParams();
  const { user, theme } = useAppContext();

  const messages = useMemo(
    () => chatData().filter((message) => message.ticket_id === ticketId),
    [ticketId],
  );

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">Chat {ticketId}</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {messages.map((message) => {
          const isSelf = message.messager_id === String(user?.id);
          return (
            <div
              key={message.id}
              className={`chat-message ${isSelf ? "self" : "other"}`}
            >
              <p>{message.message}</p>
              <small>{new Date(message.date).toLocaleTimeString()}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
