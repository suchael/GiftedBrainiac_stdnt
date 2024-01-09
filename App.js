import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

// My import
// import Header from "./src/Header.js";
import PaymentHistory from "./src/PaymentHistory.js";
import PayNow from "./src/PayNow.js";
import StdntSwitchSession from "./src/StdntSwitchSession.js";
import { PaymentCategory } from "./src/PaymentOption.js";
import ReactContext from "./src/Context/ReactContext.js";
import StdntMain from "./userAcctType/StdntMain.js";
import TeachersMain from "./userAcctType/TeachersMain.js";
import TeacherPaymentHistoryBtn from "./userAcctType/TeacherPaymentHistoryBtn.js";
import SignUp from "./src/loginSignup/SignUp.js";
import Login from "./src/loginSignup/Login.js";

import { color } from "./Color.js";

const Stack = createNativeStackNavigator();
function App() {
  const [index, setIndex] = useState(1);
  const [stdntSession, setStdntSession] = useState(
    Object.keys(PaymentCategory)[index]
  ); // Morning session
  const [stdntPayment, setStdntPayment] = useState(
    PaymentCategory[stdntSession]
  ); // contains {"monthlyPayment": "₦7,000", "time": "9AM to 1PM", "weeklyPayment": "₦1,850"}

  const contextValue = {
    stdntSession,
    setStdntSession,
    stdntPayment,
    setStdntPayment,
    index,
    setIndex,
  };
  return (
    <ReactContext.Provider value={contextValue}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentHistory"
            component={PaymentHistory}
            options={{ title: "Payment History" }}
          />
          <Stack.Screen
            name="PayNow"
            component={PayNow}
            options={{ title: "Pay Now" }}
          />
          <Stack.Screen
            name="StdntSwitchSession"
            component={StdntSwitchSession}
            options={{ title: "Switch session" }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: "Sign up", headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="TeacherPaymentHistoryBtn"
            component={TeacherPaymentHistoryBtn}
            options={{ title: "Payment History" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReactContext.Provider>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <StatusBar
        backgroundColor={color.primaryColor}
        barStyle="light-content"
      />
      <Text style={styles.headerText}>Gifted Brainiac Tutor</Text>
      <Text style={styles.subHeaderText}>Gb Tut</Text>
    </View>
  );
}

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <StdntMain />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
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
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "white",
  },
  orText: {
    fontSize: 24,
    fontWeight: "500",
  },
  buttonTeacher: {
    backgroundColor: "#2ECC71",
    borderWidth: 4,
    borderColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 10,
  },
  main: {
    paddingHorizontal: 15,
    marginTop: 30,
    paddingBottom: 50,
    flex: 1,
  },
});
export default App;
