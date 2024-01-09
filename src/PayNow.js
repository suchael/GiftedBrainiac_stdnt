import React, { useContext, useState } from "react";
import ReactContext from "./Context/ReactContext.js";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { color } from "../Color.js";

const MyComponent = () => {
  const { stdntSession, stdntPayment } = useContext(ReactContext);

  const accountNumber = "0253620510";
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
  };

  const handleBtn = () => {
    copyToClipboard();
    alert("Account number copied successfully");
  };
  return (
    <View style={{ flex: 1,     backgroundColor: color.colorWhite,}}>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "black",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            You are in{" "}
            <Text style={{ fontWeight: "bold" }}>{stdntSession},</Text>
            {"\t"}Pay{" "}
            <Text style={{ fontWeight: "bold", color: color.primaryColor, fontSize: 20 }}>
              {"\n\n"}
              {stdntPayment.monthlyPayment}
            </Text>{" "}
            Monthly
          </Text>
          <Text
            style={{ fontWeight: "500", textAlign: "center", fontSize: 20 }}
          >
            Or
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "black",
              textAlign: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", color: color.primaryColor, fontSize: 20 }}>
              {stdntPayment.weeklyPayment}
            </Text>{" "}
            Weekly
          </Text>
          <Text
            style={{ fontWeight: "500", textAlign: "center", fontSize: 20 }}
          >
            Or
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
              color: "black",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", color: color.primaryColor, fontSize: 20 }}>
              {stdntPayment.dailyPayment}
            </Text>{" "}
            Daily
          </Text>
          <View
            style={{
              marginVertical: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderColor: "lightgray",
                paddingVertical: 8,
                paddingHorizontal: 10,
                gap: 8,
              }}
            >
              <Text style={styles.text}>
                Bank:{"\t\t"}
                <Text style={{ fontWeight: "500" }}>Wema Bank</Text>
              </Text>
              <Text style={styles.text}>
                Account Name:{"\t\t"}
                <Text style={{ fontWeight: "500" }}>John Prosper</Text>
              </Text>
              <TouchableOpacity
                onPress={handleBtn}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 15,
                  paddingVertical: 5,
                }}
              >
                <Text style={styles.text}>
                  Account Number:{"\t\t"}
                  <Text style={{ fontWeight: "500" }}>{accountNumber}</Text>
                </Text>
                <MaterialIcons name="content-copy" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <HaveYOuPaid />
        </View>
      </ScrollView>
      <PaymentHistoryBtn />
    </View>
  );
};

function HaveYOuPaid() {
  const navigation = useNavigation();
  const [click, setClick] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20, 30],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleBtn = () => {
    setClick(!click);
  };

  const [submitBtnWasClicked, setSubmitBtnWasClicked] = useState(false);
  const handleSubmit = () => {
    setClick(true); // close drop down view
    setSubmitBtnWasClicked(true);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleBtn}
        style={{
          backgroundColor: color.primaryColor,
          paddingHorizontal: 15,
          marginHorizontal: 15,
          paddingVertical: 4,
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 5,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
          Click me if you just made payment
        </Text>
        {click ? (
          <FontAwesome name="angle-down" size={34} color="white" />
        ) : (
          <FontAwesome name="angle-up" size={34} color="white" />
        )}
      </TouchableOpacity>
      {submitBtnWasClicked && (
        <View
          style={{
            marginHorizontal: 25,
            paddingHorizontal: 10,
            paddingTop: 5,
            flexDirection: "row",
            flex: 1,
          }}
        >
          <View>
            <Text style={styles.text}>Payment Status:{"\t\t"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "600", color: "blue", fontSize: 17 }}>
              Your payment is waiting to be verified
            </Text>
          </View>
        </View>
      )}
      {!click && (
        <View
          style={{
            borderWidth: 2,
            borderColor: "lightgray",
            marginHorizontal: 15,
            padding: 15,
          }}
        >
          <ToggleOptions />
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: color.primaryColor,
              paddingHorizontal: 15,
              marginHorizontal: 15,
              paddingVertical: 7,
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Upload Picture of debit alert
            </Text>
          </TouchableOpacity>
          {image && (
            <View
              style={{
                justifyConten: "center",
                alignItems: "center",
                marginVertical: 10,
                padding: 10,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 240, height: 400 }}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  backgroundColor: color.primaryColor,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginVertical: 15,
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 5,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "600", color: "white" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

function ToggleOptions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ["Monthly", "Weekly", "Daily"];
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  return (
    <View>
      <Text style={{ fontSize: 17, fontWeight: "500" }}>Payment Type:</Text>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => handleOptionPress(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function PaymentHistoryBtn() {
  const navigation = useNavigation();
  const handleBtn = () => {
    navigation.navigate("PaymentHistory");
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 15,
        marginHorizontal: -15,
        position: "absolute",
        left: 15,
        right: 15,
        bottom: 0,
      }}
    >
      <TouchableOpacity
        onPress={handleBtn}
        style={{
          backgroundColor: color.primaryColor,
          paddingHorizontal: 15,
          paddingVertical: 8,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
          Payment History
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 120,
    backgroundColor: color.colorWhite,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "lightblue",
  },
});

export default MyComponent;
