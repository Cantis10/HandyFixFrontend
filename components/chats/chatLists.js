import react from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import Chat_icon from "../../assets/chats/user.png";

import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export default function ChatLists({ route, navigation }) {
  const sendData = route.params ?? {};

  const { theme, user, setUser, link } = useContext(AppContext);
  const styles = createStyles(theme);
  const chats = chatData();
  const groupedChats = chats.reduce((acc, message) => {
    const existing = acc.find((chat) => chat.ticket_id === message.ticket_id);
    if (existing) {
      existing.lastMessage = message;
    } else {
      acc.push({ ticket_id: message.ticket_id, lastMessage: message });
    }
    return acc;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollable}>
        {groupedChats.map((chat) => (
          <TouchableHighlight
            key={chat.ticket_id}
            onPress={() =>
              navigation.navigate("Chat Details", { ticket_id: chat.ticket_id })
            }
          >
            <View style={styles.chatRow}>
              <View style={styles.ticketOverview}>
                <Text>{chat.ticket_id}</Text>
              </View>
              <Image source={Chat_icon} style={styles.avatar} />
              <View style={styles.chatInfo}>
                <Text style={styles.message}>{chat.lastMessage.message}</Text>
                <Text style={styles.time}>
                  {new Date(chat.lastMessage.date).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
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
    chatRow: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.rows,
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      width: "90%",
    },
    ticketOverview: {
      marginRight: 10,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    chatInfo: {
      flex: 1,
    },
    message: {
      fontSize: 16,
      color: theme.colors.text,
    },
    time: {
      fontSize: 12,
      color: theme.colors.primary,
      marginTop: 5,
    },
    scrollable: {
      width: "100%",
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
};
