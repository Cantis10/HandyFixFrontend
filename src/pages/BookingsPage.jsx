import React from "react";
import { useAppContext } from "../contexts/appContext";

const paymentsData = () => [
  {
    id: 1,
    user_id: 67890,
    receipt_number: "ABC123456",
    price: "$150.00",
    current_paid: "$150.00",
    date: "2026-02-21",
  },
  {
    id: 2,
    user_id: 67890,
    receipt_number: "DEF789012",
    price: "$200.00",
    current_paid: "$100.00",
    date: "2026-02-19",
  },
  {
    id: 3,
    user_id: 67890,
    receipt_number: "GHI345678",
    price: "$75.00",
    current_paid: "$75.00",
    date: "2026-02-16",
  },
  {
    id: 4,
    user_id: 47890,
    receipt_number: "JKL901234",
    price: "$50.00",
    current_paid: "$50.00",
    date: "2026-02-14",
  },
];

export default function LogsPage() {
  const { user, theme } = useAppContext();
  const tickets = ticketData().filter((ticket) => ticket.user_id === user?.id);
  const receipts = receiptsData().filter(
    (receipt) => receipt.user_id === user?.id,
  );
  const payments = paymentsData().filter(
    (payment) => payment.user_id === user?.id,
  );

  return (
    <section
      className="page-section"
      style={{ backgroundColor: theme.colors.background }}
    >
      <h1 className="section-heading">Logs & Receipts</h1>
      {tickets.map((ticket) => (
        <article className="log-card" key={`ticket-${ticket.id}`}>
          <strong>Ticket</strong>
          <p>
            {ticket.type} · {ticket.sub_type}
          </p>
          <small>Date: {ticket.date}</small>
        </article>
      ))}
      {receipts.map((receipt) => (
        <article className="log-card" key={`receipt-${receipt.id}`}>
          <strong>Receipt</strong>
          <p>
            {receipt.amount} via {receipt.method}
          </p>
          <small>
            {receipt.date} • {receipt.location}
          </small>
        </article>
      ))}
      {payments.map((payment) => (
        <article className="log-card" key={`payment-${payment.id}`}>
          <strong>Payment</strong>
          <p>
            {payment.price} · Paid: {payment.current_paid}
          </p>
          <small>
            {payment.date} • Receipt #{payment.receipt_number}
          </small>
        </article>
      ))}
    </section>
  );
}
