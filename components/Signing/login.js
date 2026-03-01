import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

import { useContext, useState } from "react";
import { AppContext } from "../../contexts/appContext";

export default function Login({ route, navigation }) {
  const sendData = route.params ?? {};
  const { theme, loginAuth } = useContext(AppContext);
  const styles = createStyles(theme);

  const [formRegisterData, setFormRegisterData] = useState({
    email: "",
    password: "",
  });

  const confirmLogin = async () => {
    if (!formRegisterData.email || !formRegisterData.password) {
      alert("Please fill in all fields");
      return;
    }

    const result = await loginAuth(
      formRegisterData.email,
      formRegisterData.password,
    );

    if (result.success) {
      alert("Login successful");
    } else {
      alert(
        "Login failed: " +
          (result.status === 401 ? "Invalid credentials" : result.error),
      );
      console.log(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text>There is Nothing... To login Tbh</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formRegisterData.email}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, email: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formRegisterData.password}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, password: text })
        }
      />

      <TouchableHighlight
        onPress={() => {
          confirmLogin();
        }}
      >
        <Text>Login</Text>
      </TouchableHighlight>
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
    input: {
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
  });
