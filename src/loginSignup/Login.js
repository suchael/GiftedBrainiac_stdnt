import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { color } from "../../Color.js";

export default function Login() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (text) => {
    // Check if the entered text is a number
    if (!/^\d+$/.test(text)) {
      // If not, don't update the state
      return;
    }

    setPhoneNumber(text);
  };

  const handleLogin = () => {
    // Validate fields before allowing navigation
    if (!firstName) {
      Alert.alert("Error", "First name is required.");
      return;
    }

    if (!phoneNumber) {
      Alert.alert("Error", "Phone number is required.");
      return;
    }

    if (phoneNumber.length !== 11) {
      Alert.alert("Error", "Phone number must be 11 digits.");
      return;
    }

    // Perform login logic here

    // If login is successful, navigate to the next page
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <StatusBar
          backgroundColor={color.primaryColor}
          barStyle="light-content"
        />
        <Text style={styles.headerText}>Gifted Brainiac Tutor</Text>
        <Text style={styles.subHeaderText}>Gb Tut</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {/* Login Section */}
          <View style={styles.loginSection}>
            <Text
              style={[
                styles.sectionText,
                { textAlign: "center", fontSize: 24, fontWeight: "bold" },
              ]}
            >
              Login section
            </Text>

            {/* First name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First name</Text>
              <TextInput
                placeholder=" "
                onChangeText={(text) => setFirstName(text)}
                style={styles.input}
              />
            </View>
            {/* Closing - First name */}

            {/* Phone number */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone number</Text>
              <View>
                <TextInput
                  placeholder=" "
                  onChangeText={handlePhoneNumberChange}
                  style={styles.input}
                  keyboardType="numeric"
                />
                {phoneNumber.length >= 1 && phoneNumber.length <= 10  && (
                  <Text style={styles.errorText}>
                    Keep typing... Your phone number is not complete yet
                  </Text>
                )}
              </View>
            </View>
            {/* Closing - Phone number */}

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* Closing - Login Section */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
    
  },
  header: {
    zIndex: 10,
    elevation: 10,
    backgroundColor: color.primaryColor,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: color.colorWhite,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: "500",
    color: color.colorWhite,
  },
  homeHeader: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 80,
    backgroundColor: color.secondaryColor,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    width: "100%",
    elevation: 10,
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: -5,
    borderWidth: 2,
    borderColor: color.primaryColor,
    padding: 10,
  },
  loginSection: {
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: "600",
    paddingLeft: 20,
  },
  input: {
    elevation: 10,
    paddingLeft: 20,
    backgroundColor: "#F5F5F5",
    color: "black",
    fontSize: 16,
    marginTop: -2,
    height: 42,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#777",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  successText: {
    color: "blue",
    textAlign: "center",
    fontSize: 16,
  },
  loginButton: {
    height: 42,
    borderRadius: 35,
    backgroundColor: color.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
