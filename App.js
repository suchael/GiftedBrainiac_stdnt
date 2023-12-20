import React, { useState, useEffect  } from "react";
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
import * as SecureStore from 'expo-secure-store';


// My import
import PaymentHistory from "./src/PaymentHistory.js";
import PayNow from "./src/PayNow.js";
import StdntSwitchSession from "./src/StdntSwitchSession.js";
import { PaymentCategory } from "./src/PaymentOption.js";
import ReactContext from "./src/Context/ReactContext.js";
import StdntMain from "./userAcctType/StdntMain.js";
import TeachersMain from "./userAcctType/TeachersMain.js";
import TeacherPaymentHistoryBtn from "./userAcctType/TeacherPaymentHistoryBtn.js";

const Stack = createNativeStackNavigator();
function App() {
  const [index, setIndex] = useState(1);
  const [stdntSession, setStdntSession] = useState(
    Object.keys(PaymentCategory)[index]
  ); // Morning session
  const [stdntPayment, setStdntPayment] = useState(
    PaymentCategory[stdntSession]
  ); // contains {"monthlyPayment": "₦7,000", "time": "9AM to 1PM", "weeklyPayment": "₦1,850"}

  console.log("INDEX_App: ", index);
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
        <Stack.Navigator initialRouteName="Home">
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
            name="TeacherPaymentHistoryBtn"
            component={TeacherPaymentHistoryBtn}
            options={{ title: "Payment History" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReactContext.Provider>
  );
}

const Home = () => {
    const [isStudent, setIsStudent] = useState(null);

  useEffect(() => {
    // Load user preference from SecureStore when the component mounts
    loadUserPreference();
  }, []);

  const handleStudentButtonClick = () => {
    setIsStudent(true);
    saveUserPreference(true);
  };

  const handleTeacherButtonClick = () => {
    setIsStudent(false);
    saveUserPreference(false);
  };

  const saveUserPreference = async (value) => {
    try {
      await SecureStore.setItemAsync('userPreference', JSON.stringify(value));
    } catch (error) {
      console.error('Error saving user preference:', error);
    }
  };

  const loadUserPreference = async () => {
    try {
      const storedPreference = await SecureStore.getItemAsync('userPreference');
      if (storedPreference !== null) {
        // Convert the stored preference back to a boolean
        setIsStudent(JSON.parse(storedPreference));
      }
    } catch (error) {
      console.error('Error loading user preference:', error);
    }
  };
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="lightgray" barStyle="light-content" />
        <Header />
        {isStudent === null ? (
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Choose carefully</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleStudentButtonClick} style={styles.button}>
                <Text style={styles.buttonText}>Student</Text>
              </TouchableOpacity>
              <Text style={styles.orText}>Or</Text>
              <TouchableOpacity onPress={handleTeacherButtonClick} style={styles.buttonTeacher}>
                <Text style={styles.buttonText}>Teacher</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : isStudent ? (
          <StdntMain />
        ) : (
          <TeachersMain />
        )}
      </SafeAreaView>
    );
  };
  

function Header() {
  return (
    <View style={styles.header}>
      <Text style={{ fontSize: 21, fontWeight: "600" }}>
        Gifted Brainiac Tutor{" "}
      </Text>
      <Text style={{ fontSize: 19, fontWeight: "500" }}>Gb Tut </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
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
  header: {
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  main: {
    paddingHorizontal: 15,
    marginTop: 30,
    paddingBottom: 50,
    flex: 1,
  },
});
export default App;
