import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const chatData = () => [
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

export default function ChatListPage() {
  const navigate = useNavigate();
  const { theme } = useAppContext();

  const groupedChats = useMemo(() => {
    const data = chatData();
    return data.reduce((acc, message) => {
      const existing = acc.find((chat) => chat.ticket_id === message.ticket_id);
      if (existing) {
        if (new Date(message.date) > new Date(existing.lastMessage.date)) {
          existing.lastMessage = message;
        }
      } else {
        acc.push({ ticket_id: message.ticket_id, lastMessage: message });
      }
      return acc;
    }, []);
  }, []);

  return (
    <section className="page-section" style={{ backgroundColor: theme.colors.background }}>
      <h1 className="section-heading">My Chats</h1>
      <div className="chat-list">
        {groupedChats.map((chat) => (
          <button
            key={chat.ticket_id}
            type="button"
            className="chat-card"
            style={{ textAlign: "left" }}
            onClick={() => navigate(`/chat/${chat.ticket_id}`)}
          >
            <strong>Ticket ID: {chat.ticket_id}</strong>
            <p>{chat.lastMessage.message}</p>
            <small>{new Date(chat.lastMessage.date).toLocaleString()}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
