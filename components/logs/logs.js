import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";

import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export default function Logs({ route, navigation }) {
  const { theme, user, link } = useContext(AppContext);
  const styles = createStyles(theme);

  const tickets = TicketData().filter((ticket) => ticket.user_id === user.id);
  const receipts = ReceiptsData().filter(
    (receipt) => receipt.user_id === user.id,
  );
  const payments = PaymentsData().filter(
    (payment) => payment.user_id === user.id,
  );
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollable}>
        {tickets.map((ticket) => (
          <View key={ticket.id} style={styles.logEntry}>
            <Text style={styles.logTitle}>Ticket</Text>
            <Text style={styles.logDescription}>
              {ticket.type} - {ticket.sub_type}
            </Text>
            <Text style={styles.logDate}>{ticket.date}</Text>
          </View>
        ))}
        {receipts.map((receipt) => (
          <View key={receipt.id} style={styles.logEntry}>
            <Text style={styles.logTitle}>Receipt</Text>
            <Text style={styles.logDescription}>
              {receipt.amount} - {receipt.method}
            </Text>
            <Text style={styles.logDate}>{receipt.date}</Text>
          </View>
        ))}
        {payments.map((payment) => (
          <View key={payment.id} style={styles.logEntry}>
            <Text style={styles.logTitle}>Payment</Text>
            <Text style={styles.logDescription}>
              {payment.price} - {payment.current_paid}
            </Text>
            <Text style={styles.logDate}>{payment.date}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: "center",
      justifyContent: "center",
    },
    logEntry: {
      backgroundColor: theme.colors.rows,
      padding: 20,
      borderRadius: 10,
      marginVertical: 10,
      alignSelf: "center",
      width: "90%",
    },
    logTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 5,
    },
    logDescription: {
      fontSize: 14,
      marginBottom: 5,
    },
    logDate: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    scrollable: {
      width: "100%",
    },
  });

const TicketData = () => {
  return [
    {
      id: 1,
      user_id: 67890,
      date: "2026-02-20",
      type: "Plumbing",
      sub_type: "Leak Repair",
      description: "Kitchen sink pipe is leaking under the cabinet.",
      state: "open",
    },
    {
      id: 2,
      user_id: 67890,
      date: "2026-02-18",
      type: "Electrical",
      sub_type: "Outlet and Switch Repair",
      description: "Living room outlet is not supplying power.",
      state: "closed",
    },
    {
      id: 3,
      user_id: 67890,
      date: "2026-02-15",
      type: "Carpentry",
      sub_type: "Furniture Assembly",
      description: "Need assistance assembling a newly purchased office desk.",
      state: "open",
    },
    {
      id: 4,
      user_id: 67890,
      date: "2026-02-12",
      type: "Home Maintenance",
      sub_type: "Roof Leak Repair",
      description: "Small roof leak noticed during heavy rain.",
      state: "open",
    },
    {
      id: 5,
      user_id: 67890,
      date: "2026-02-10",
      type: "Tools",
      sub_type: "Emergency Home Repair Kit",
      description: "Requesting emergency repair kit for quick home fixes.",
      state: "cancelled",
    },
    {
      id: 6,
      user_id: 64890,
      date: "2026-02-08",
      type: "Plumbing",
      sub_type: "Water Heater Installation",
      description: "Installing a new water heater in the bathroom.",
      state: "closed",
    },
  ];
};

const ReceiptsData = () => {
  return [
    {
      id: 1,
      user_id: 67890,
      payment_id: 1,
      receipt_number: "ABC123456",
      date: "2026-02-21",
      location: "New York, NY",
      method: "Credit Card",
      amount: "$150.00",
    },
    {
      id: 2,
      user_id: 67890,
      payment_id: 2,
      receipt_number: "DEF789012",
      date: "2026-02-19",
      location: "New York, NY",
      method: "PayPal",
      amount: "$100.00",
    },
    {
      id: 3,
      user_id: 67890,
      payment_id: 3,
      receipt_number: "GHI345678",
      date: "2026-02-16",
      location: "New York, NY",
      method: "Credit Card",
      amount: "$75.00",
    },
  ];
};

const PaymentsData = () => {
  return [
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
};
