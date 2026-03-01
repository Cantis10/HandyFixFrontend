import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
} from "react-native";

import { useContext, useState } from "react";
import { AppContext } from "../../contexts/appContext";

export default function signIn({ route, navigation }) {
  const sendData = route.params ?? {};
  const { theme, registerAuth, loginAuth } = useContext(AppContext);
  const styles = createStyles(theme);

  const [formRegisterData, setFormRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    age: "",
    contact_number: "",
    address: "", //optional
  });

  const confirmRegister = async () => {
    if (
      !formRegisterData.first_name ||
      !formRegisterData.last_name ||
      !formRegisterData.email ||
      !formRegisterData.password ||
      !formRegisterData.confirm_password ||
      !formRegisterData.age ||
      !formRegisterData.contact_number
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (formRegisterData.password !== formRegisterData.confirm_password) {
      alert("Password and confirm password does not match!");
      return;
    }

    console.log(
      "confirmRegister log:",
      JSON.stringify(formRegisterData, null, 2),
    );

    const result = await registerAuth(formRegisterData);

    if (result.success) {
      alert("Register successful");

      loginAuth(formRegisterData.email, formRegisterData.password);
    } else {
      alert("Login failed: " + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>There is Nothing... To register Tbh</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formRegisterData.first_name}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, first_name: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formRegisterData.last_name}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, last_name: text })
        }
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={formRegisterData.confirm_password}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, confirm_password: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={formRegisterData.age}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, age: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={formRegisterData.contact_number}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, contact_number: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Address (Optional)"
        value={formRegisterData.address}
        onChangeText={(text) =>
          setFormRegisterData({ ...formRegisterData, address: text })
        }
      />
      <TouchableHighlight
        onPress={() => {
          confirmRegister();
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
