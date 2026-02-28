import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

export default function FixesSubType({ route, navigation }) {
  const fixData = typeOfFix(route.params.fixType);

  const { theme } = useContext(AppContext);
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text>Fixes Sub Type Screen, {route.params.fixType}</Text>
      <View style={styles.rowContainer}>
        {fixData.services.map((service, index) => (
          <TouchableHighlight
            style={styles.serviceButton}
            key={index}
            onPress={() =>
              navigation.navigate("Send Service", {
                fixType: route.params.fixType,
                service: service,
              })
            }
          >
            <Text style={styles.serviceText}>{service}</Text>
          </TouchableHighlight>
        ))}
      </View>
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
    serviceButton: {
      backgroundColor: theme.colors.rows,
      padding: 20,
      borderRadius: 10,
      marginVertical: 10,
    },
  });

const typeOfFix = (fixType) => {
  switch (fixType) {
    case "Plumbing":
      return {
        services: [
          "Leak Repair",
          "Drain Cleaning",
          "Toilet Installation",
          "Water Heater Installation",
          "Pipe Installation and Replacement",
        ],
      };
    case "Electrical":
      return {
        services: [
          "Light Installation and Repair",
          "Outlet and Switch Repair",
          "Circuit Breaker Repair",
          "Wiring Installation and Troubleshooting",
          "Air Conditioning Installation and Repair",
        ],
      };
    case "Carpentry":
      return {
        services: [
          "Furniture Assembly",
          "Cabinet Installation and Repair",
          "Door Installation and Repair",
          "Window Frame Repair",
          "Shelving Installation",
        ],
      };
    case "Home Maintenance":
      return {
        services: [
          "Wall Patching and Minor Repairs",
          "Tile Repair and Replacement",
          "Roof Leak Repair",
          "Gutter Cleaning and Repair",
          "Painting and Touch-ups",
        ],
      };
    case "Tools":
      return {
        services: [
          "Basic Plumbing Repair Kit",
          "Electric Safety Repair Kit",
          "Wall Repair and Patching Kit",
          "Furniture Repair Kit",
          "Emergency Home Repair Kit",
        ],
      };
    default:
      return { services: [] };
  }
};
