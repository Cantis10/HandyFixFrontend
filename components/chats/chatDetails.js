import react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";

import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";
import Chat_icon from "../../assets/chats/user.png";

export default function ChatDetails({ route, navigation }) {
  const sendData = route.params ?? {};
  const { theme, user, setUser, link } = useContext(AppContext);
  const styles = createStyles(theme);

  const messages = chatData().filter(
    (chat) => chat.ticket_id === sendData.ticket_id,
  );

  return (
    <View style={styles.container}>
      <Text>Chat Details Screen</Text>
      <Text>Ticket ID: {sendData.ticket_id}</Text>
      <ScrollView style={styles.chatRow}>
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              message.messager_id == user.id
                ? styles.selfMessage
                : styles.otherMessage,
              styles.messageContainer,
            ]}
          >
            <Text style={styles.message}>
              {message.message}, user: {message.messager_id}, current: {user.id}
            </Text>
            <Text style={styles.time}>
              {new Date(message.date).toLocaleTimeString()}
            </Text>
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
    selfMessage: {
      backgroundColor: theme.colors.primary,
      alignSelf: "flex-end",
    },
    otherMessage: {
      backgroundColor: theme.colors.rows,
      alignSelf: "flex-start",
    },
    message: {
      fontSize: 16,
    },
    messageContainer: {
      maxWidth: "80%",
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    time: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    chatRow: {
      flex: 1,
      flexDirection: "column",
      width: "100%",
      padding: 10,
    },
  });

const chatData = () => {
  return [
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
      ticket_id: "67890",
      user_id: "67890",
      contractor_id: "54321",
      message: "I've fixed the issue.",
      messager_id: "54321",
      date: "2024-06-01T10:20:00Z",
    },

    {
      id: 7,
      ticket_id: "67891",
      user_id: "67890",
      contractor_id: "54322",
      message:
        "Hello! I can assist you with that. Can you describe the problem?",
      messager_id: "54322",
      date: "2024-06-02T11:05:00Z",
    },
    {
      id: 8,
      ticket_id: "67891",
      user_id: "67890",
      contractor_id: "54322",
      message:
        "Hello! I can assist you with that. Can you describe the problem?",
      messager_id: "54322",
      date: "2024-06-02T11:05:00Z",
    },
    {
      id: 9,
      ticket_id: "67891",
      user_id: "67890",
      contractor_id: "54322",
      message:
        "Hello! I can assist you with that. Can you describe the problem?",
      messager_id: "54322",
      date: "2024-06-02T11:05:00Z",
    },
  ];
};
