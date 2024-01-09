import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Backend/firebase.js";


import RadioBtn from "./RadioBtn.js";
import { color } from "../../Color.js";


export default function Signup() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [image, setImage] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const handlePhoneNumberChange = (text) => {
    if (!/^\d+$/.test(text)) {
      return;
    }
    setPhoneNumber(text);
  };

  const handleSignup = () => {
    const isInvalid = (field, errorMessage) => {
      if (!field) {
        Alert.alert("Error", errorMessage);
        return true;
      }
      return false;
    };

    if (
      isInvalid(firstName, "First name is required.") ||
      isInvalid(lastName, "Last name is required.") ||
      isInvalid(phoneNumber, "Phone number is required.") ||
      (phoneNumber.length !== 11 &&
        isInvalid(true, "Phone number must be 11 digits.")) ||
      isInvalid(email, "Incorrect Email") ||
      isInvalid(selectedDepartment, "Department selection is required.") ||
      isInvalid(image, "Passport image is required.")
    ) {
      return;
    }

    // If signup is successful, navigate to the next page
    navigation.navigate("Login");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [20, 30],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar backgroundColor={color.primaryColor} barStyle="light-content" />
        <Text style={styles.headerText}>Gifted Brainiac Tutor</Text>
        <Text style={styles.subHeaderText}>Gb Tut</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {showSignup ? (
          <View
            style={{
              paddingLeft: insets.left + 15,
              paddingRight: insets.right + 15,
              paddingTop: insets.top + 10,
              paddingBottom: insets.bottom + 80,
              flex: 1,
              backgroundColor: color.secondaryColor,
            }}
          >
            <View style={styles.signupSection}>
              <Text style={styles.sectionText}>Signup section</Text>

              {renderInputField("First name", setFirstName)}
              {renderInputField("Last name", setLastName)}
              {renderPhoneInputField(handlePhoneNumberChange, phoneNumber)}
              {renderInputField(
                "Email",
                setEmail,
                "email-address",
                false,
                "Email Address"
              )}
              <RadioBtn
                options={["Morning", "Hybrid", "Afternoon"]}
                selectedOption={selectedDepartment}
                onSelect={(department) => setSelectedDepartment(department)}
                displayText="What session do you want to be in?"
              />
              <CameraBtn pickImage={pickImage} image={image} />

              <TouchableOpacity
                onPress={handleSignup}
                style={styles.signupButton}
              >
                <Text style={styles.buttonText}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => setShowSignup(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Signup Section</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login Section</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function renderInputField(
  label,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = true,
  accessibilityLabel = ""
) {
  return (
    <View style={styles.inputField}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        placeholder=" "
        onChangeText={(text) => onChangeText(text)}
        style={styles.input}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize ? "sentences" : "none"}
        autoCorrect={false}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

function renderPhoneInputField(handlePhoneNumberChange, phoneNumber) {
  return (
    <View style={styles.inputField}>
      <Text style={styles.inputLabel}>Phone number</Text>
      <View>
        <TextInput
          placeholder=" "
          onChangeText={handlePhoneNumberChange}
          style={styles.input}
          keyboardType="numeric"
        />
        {phoneNumber.length === 10 ? (
          <Text style={styles.errorText}>
            Your number is not 11 digits. Add 1 more digit
          </Text>
        ) : phoneNumber.length === 11 ? (
          <Text style={styles.successText}>
            Good! This number will be used as your password
          </Text>
        ) : null}
      </View>
    </View>
  );
}

function CameraBtn({ pickImage, image }) {
  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={styles.cameraButton}>
        <Text style={styles.buttonText}>
          {image ? "Change" : "Upload"} your passport
        </Text>
        <FontAwesome name="angle-down" size={24} color="white" />
      </TouchableOpacity>

      {image && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image }} style={styles.previewImage} />
        </View>
      )}
    </View>
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
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 30
  },
  
  signupSection: {
    elevation:10,
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: -5,
    borderWidth: 2,
    borderColor: color.primaryColor,
    padding: 10,
  },
  sectionText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  inputField: {
    marginBottom: 12,
  },
  inputLabel: {
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
    color: "black",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  cameraButton: {
    backgroundColor: color.primaryColor,
    paddingHorizontal: 15,
    paddingVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  imagePreview: {
    borderWidth: 2,
    borderColor: "lightgray",
    marginHorizontal: 15,
    paddingHorizontal: 15,
  },
  previewImage: {
    width: 240,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  signupButton: {
    height: 42,
    borderRadius: 35,
    backgroundColor: color.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    elevation: 10,
    height: 42,
    borderRadius: 35,
    backgroundColor: color.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    width: "60%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
