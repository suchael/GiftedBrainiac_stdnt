import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Vibration,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Icons
import { Ionicons, FontAwesome } from "@expo/vector-icons";

// My import
import ReactContext from "../src/Context/ReactContext.js";
import { color } from "../Color.js";

export default function StdntMain() {
  const { stdntSession, stdntPayment } = useContext(ReactContext);
  const msg =
    "No payment, No class activity. \nPlease pay your lesson fees between the first 2 days of the beginning of every month or you risk being sent home.";
  const month = "\nJANUARY";
  return (
    <ScrollView>
      <View style={styles.main}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: color.primaryColor,
          }}
        >
          Ahmed Success,{"\t"}
          <Text style={{ fontSize: 16, fontWeight: "500", color: "black" }}>
            Welcome
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            color: "black",
            marginVertical: 10,
          }}
        >
          {stdntSession ? (
            <>
              You are in{" "}
              <Text style={{ fontWeight: "bold" }}>
                {stdntSession} - {stdntPayment.time}
              </Text>
            </>
          ) : (
            "Loading..."
          )}
        </Text>

        
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "black",
              textAlign: "center",
            }}
          >
            Have you paid for the month of {month}?
          </Text>
          <YesButton month={month} />
        </View>
        <UserBtn />
      </View>
    </ScrollView>
  );
}

function YesButton({ month }) {
  const [isYes, setIsYes] = useState(true);
  const THREE_SECOND_IN_MS = 3000;

  const vibrate = () => {
    Vibration.vibrate(THREE_SECOND_IN_MS);
    console.log("Vibrating ...");
  };
  const handlePress = () => {
    console.log(isYes ? "Paid" : "Not Paid");
    isYes && vibrate();
    setIsYes(!isYes);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
            elevation: 10,
          width: 110,
          height: 110,
          backgroundColor: isYes ? color.primaryColor : "red",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 25,
        }}
      >
        {!isYes && <Ionicons name="close-circle" size={40} color="white" />}

        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            color: "white",
            textAlign: "center",
          }}
        >
          {isYes ? "CLICK\nME!" : "NO!"}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          color: isYes ? "green" : "red",
          fontWeight: "bold",
          fontSize: 17,
        }}
      >
        {isYes ? "You've paid for" : "You've Not paid for"} {month}
      </Text>
    </View>
  );
}

function UserBtn() {
  const navigation = useNavigation();
  const buttonTexts = [
    "I want to pay",
    "Payment history",
    "Do you want to switch session?",
  ];
  const numberOfButtons = buttonTexts.length;

  const onPressHandler = (index) => {
    // Define your navigation logic for each button here
    switch (index) {
      case 0:
        navigation.navigate("PayNow");
        break;
      case 1:
        navigation.navigate("PaymentHistory");
        break;
      case 2:
        navigation.navigate("StdntSwitchSession");
        break;
      default:
        break;
    }
  };

  return (
    <View
      style={{
        marginHorizontal: -15,
        paddingHorizontal: 15,
        borderTopWidth: 3,
        borderColor: "gray",
        marginTop: 20,
        paddingVertical: 15,
      }}
    >
      {Array.from({ length: numberOfButtons }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressHandler(index)}
          style={{
            borderWidth: 2,
            backgroundColor: buttonTexts[index] === "I want to pay"? color.primaryColor: "white",
            borderColor: color.primaryColor,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500", color: buttonTexts[index] === "I want to pay"? color.colorWhite : color.colorBlack,
 }}>
            {buttonTexts[index]}
          </Text>
          <FontAwesome name="angle-right" size={24} color={buttonTexts[index] === "I want to pay"? color.colorWhite: color.colorBlack}/>
        </TouchableOpacity>
      ))}
      <ContactUsAndGroupBtn />
      <JampAppBtn />
    </View>
  );
}

function ContactUsAndGroupBtn() {
  const buttonTexts = [
    "Contact Us",
    "Gb Tut - General Group",
    "Gb Tut - Science Group",
    "Gb Tut - Art Group",
    "Gb Tut - Commercial Group",
  ];
  const numberOfButtons = buttonTexts.length;

  const onPressHandler = (index) => {
    switch (index) {
      case 0:
        // Open WhatsApp with a specific phone number
        openWhatsappWithPhoneNumber("+2348168463898"); // Replace with the desired phone number
        break;
      case 1:
        // Open WhatsApp group for "Gb Tut - General Group"
        openWhatsappGroup("https://chat.whatsapp.com/BrXYFhgxTw7HFqA9xNtYPk"); // Replace with the actual group code
        break;
      case 2:
        // Open WhatsApp group for "Gb Tut - Science Group"
        openWhatsappGroup("your-science-group-code"); // Replace with the actual group code
        break;
      case 3:
        // Open WhatsApp group for "Gb Tut - Art Group"
        openWhatsappGroup("your-art-group-code"); // Replace with the actual group code
        break;
      case 4:
        // Open WhatsApp group for "Gb Tut - Commercial Group"
        openWhatsappGroup("your-commercial-group-code"); // Replace with the actual group code
        break;
      default:
        break;
    }
  };

  const openWhatsappWithPhoneNumber = async (phoneNumber) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    await openWhatsappUrl(whatsappUrl);
  };

  const openWhatsappGroup = async (groupCode) => {
    const whatsappGroupUrl = `https://chat.whatsapp.com/invite/${groupCode}`;
    await openWhatsappUrl(whatsappGroupUrl);
  };

  const openWhatsappUrl = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        alert("WhatsApp is not installed on this device");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <View style={{ padding: 15, backgroundColor: color.primaryColor }}>
      {Array.from({ length: numberOfButtons }, (_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPressHandler(index)}
          style={{
            borderWidth: 2,
            borderColor: "lightgray",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 15,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500", color: color.colorWhite }}>
            {buttonTexts[index]}
          </Text>
          <FontAwesome name="angle-right" size={24} color={color.colorWhite} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function JampAppBtn() {
  const openPlayStore = async () => {
    const playStoreUrl =
      "https://play.google.com/store/apps/details?id=com.whatsapp"; 

    try {
      const supported = await Linking.canOpenURL(playStoreUrl);

      if (supported) {
        await Linking.openURL(playStoreUrl);
      } else {
        alert("Play Store is not available on the device");
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <TouchableOpacity
      onPress={openPlayStore}
      style={{
        elevation: 10,
        borderWidth: 3,
        borderColor: "yellow",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: color.lightPrimary,
      }}
    >
      <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
        Download a JAMB CBT App
      </Text>
      <FontAwesome name="angle-right" size={24} color="white" />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
