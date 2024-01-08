import React, { useState } from 'react';
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
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

// Icons
import { FontAwesome } from '@expo/vector-icons';

import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,updateProfile } from 'firebase/auth';
console.log(updateProfile)
// My import
import RadioBtn from './RadioBtn.js';
import {auth} from "../../Backend/firebase.js";

export default function Signup() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [image, setImage] = useState(null);

  const [showSignup, setShowSignup] = useState(false);

  const handlePhoneNumberChange = (text) => {
    // Check if the entered text is a number
    if (!/^\d+$/.test(text)) {
      // If not, don't update the state
      return;
    }

    setPhoneNumber(text);
  };

  const handleSignup = () => {
    // Validate fields before allowing navigation
    if (!firstName) {
      Alert.alert('Error', 'First name is required.');
      return;
    }

    if (!lastName) {
      Alert.alert('Error', 'Last name is required.');
      return;
    }

    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is required.');
      return;
    }

    if (phoneNumber.length !== 11) {
      Alert.alert('Error', 'Phone number must be 11 digits.');
      return;
    }
    if (!email) {
      Alert.alert('Error', 'Incorrect Email');
      return;
    }

    if (!selectedDepartment) {
      Alert.alert('Error', 'Department selection is required.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Passport image is required.');
      return;
    }

    // If signup is successful, navigate to the next page
    navigation.navigate('Login');
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

  const signUp = async () => {
    try {
        const userCredential = await signInWithEmailAndPassword (auth, "hi@gmail.com", "cu134");
        const userDetails = userCredential.user;
        await updateProfile(userDetails, {
            displayName: "John Doe", // Add display name for testing
            phoneNumber: "+2349031143122",
            photoURL: "https://fineBoy.com",
        });
        console.log("userCred: ", userDetails);
    } catch (error) {
        console.error("error: ", error);
    }
};



  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <StatusBar backgroundColor="lightgray" barStyle="light-content" />
        <Text style={{ fontSize: 21, fontWeight: '600' }}>
          Gifted Brainiac Tutor{' '}
        </Text>
        <Text style={{ fontSize: 19, fontWeight: '500' }}>Gb Tut </Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {showSignup ? (
          // Render Signup Section
          <View
            style={{
              paddingLeft: insets.left + 15,
              paddingRight: insets.right + 15,
              paddingTop: insets.top + 10,
              paddingBottom: insets.bottom + 80,
              flex: 1,
              backgroundColor: 'lightgray',
            }}
          >
            {/* Signup Section */}
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 14,
                marginTop: -5,
                borderWidth: 2,
                borderColor: '#999',
                padding: 10,
              }}
            >
              <Text
                style={[
                  styles.sectionText,
                  { textAlign: 'center', fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
                ]}
              >
                Signup section
              </Text>

              {/* First name */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', paddingLeft: 20 }}>
                  First name
                </Text>
                <TextInput
                  placeholder=" "
                  onChangeText={(text) => setFirstName(text)}
                  style={{
                    paddingLeft: 20,
                    backgroundColor: 'lightgray',
                    color: 'black',
                    fontSize: 16,
                    marginTop: -2,
                    height: 42,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: '#777',
                  }}
                />
              </View>
              {/* Closing - First name */}

              {/* Last name */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', paddingLeft: 20 }}>
                  Last name
                </Text>
                <TextInput
                  placeholder=" "
                  onChangeText={(text) => setLastName(text)}
                  style={{
                    paddingLeft: 20,
                    backgroundColor: 'lightgray',
                    color: 'black',
                    fontSize: 16,
                    marginTop: -2,
                    height: 42,
                    borderRadius: 35,
                    borderWidth: 2,
                    borderColor: '#777',
                  }}
                />
              </View>
              {/* Closing - Last name */}

              {/* Phone number */}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', paddingLeft: 20 }}>
                  Phone number
                </Text>
                <View>
                  <TextInput
                    placeholder=" "
                    onChangeText={handlePhoneNumberChange}
                    style={{
                      paddingLeft: 20,
                      backgroundColor: 'lightgray',
                      color: 'black',
                      fontSize: 16,
                      marginTop: -2,
                      height: 42,
                      borderRadius: 35,
                      borderWidth: 2,
                      borderColor: '#777',
                    }}
                    keyboardType="numeric"
                  />
                  {phoneNumber.length === 10 ? (
                    <Text style={{ color: 'red', textAlign: 'center', fontSize: 16 }}>
                      Your number is not 11 digits. Add 1 more digit
                    </Text>
                  ) : phoneNumber.length === 11 ? (
                    <Text style={{ color: 'blue', textAlign: 'center', fontSize: 16 }}>
                      Good! This number will be used as your password
                    </Text>
                  ) : null}
                </View>
              </View>
              {/* Phone number */}

              {/* Email*/}
              <View style={{ marginBottom: 12 }}>
                <Text style={{ fontSize: 17, fontWeight: '600', paddingLeft: 20 }}>
                  Email
                </Text>
                <View>
                  <TextInput
                    placeholder=" "
                    onChangeText={(text) => setEmail(text)}
                    style={{
                      paddingLeft: 20,
                      backgroundColor: 'lightgray',
                      color: 'black',
                      fontSize: 16,
                      marginTop: -2,
                      height: 42,
                      borderRadius: 35,
                      borderWidth: 2,
                      borderColor: '#777',
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    accessibilityLabel="Email Address"
                  />
                </View>
              </View>
              {/* Closing - Email */}

              {/* Department selection */}
              <RadioBtn
                options={['Morning', 'Hybrid', 'Afternoon']}
                selectedOption={selectedDepartment}
                onSelect={(department) => setSelectedDepartment(department)}
                displayText="What session do you want to be in?"
              />
              {/* Closing - Department selection */}

              {/* Passport upload */}
              <CameraBtn pickImage={pickImage} image={image} />
              {/* Closing - Passport upload */}

              <TouchableOpacity
                // onPress={handleSignup}
                onPress={handleSignup}
                style={{
                  height: 42,
                  borderRadius: 35,
                  backgroundColor: 'blue',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 25,
                }}
              >
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
                  Signup
                </Text>
              </TouchableOpacity>
            </View>
            {/* Closing - Signup Section */}
          </View>
        ) : (
          // Render Button Section
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => setShowSignup(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Signup Section</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
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

function CameraBtn({ pickImage, image }) {
  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: 'blue',
          paddingHorizontal: 15,
          paddingVertical: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 5,
          flexDirection: 'row',
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '600', color: 'white' }}>
          {image ? 'Change' : 'Upload'} your passport
        </Text>
        <FontAwesome name="angle-down" size={24} color="white" />
      </TouchableOpacity>

      {image && (
        <View
          style={{
            borderWidth: 2,
            borderColor: 'lightgray',
            marginHorizontal: 15,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              padding: 10,
            }}
          >
            <Image source={{ uri: image }} style={{ width: 240, height: 400 }} />
          </View>
        </View>
      )}
    </View>
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
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 20,
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 42,
    borderRadius: 35,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: '60%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
