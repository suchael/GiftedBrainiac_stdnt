import React, { useState } from 'react';
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
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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
      Alert.alert('Error', 'First name is required.');
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

    // Perform login logic here

    // If login is successful, navigate to the next page
    navigation.navigate('Home');
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainContainer}>
          {/* Login Section */}
          <View style={styles.loginSection}>
            <Text style={[styles.sectionText, {textAlign: "center", fontSize: 24, fontWeight: "bold"}]}>
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
            {/* Closing - Phone number */}

            <TouchableOpacity
              onPress={handleLogin}
              style={styles.loginButton}
            >
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
  homeHeader: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  homeHeaderText: {
    fontSize: 20,
    fontWeight: '600',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 80,
    backgroundColor: 'lightgray',
  },
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginTop: -5,
    borderWidth: 2,
    borderColor: '#999',
    padding: 10,
  },
  loginSection: {
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 20,
  },
  input: {
    paddingLeft: 20,
    backgroundColor: 'lightgray',
    color: 'black',
    fontSize: 16,
    marginTop: -2,
    height: 42,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#777',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  successText: {
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
  loginButton: {
    height: 42,
    borderRadius: 35,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
