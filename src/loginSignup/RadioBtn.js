// DynamicButtons.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { color } from "../../Color.js";


const DynamicButtons = ({ options, selectedOption, onSelect, displayText }) => {
  const handlePress = (option) => {
    onSelect(option);
    Alert.alert(`${option} session \nCost: 500 Naira Monthly`);
};

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17, fontWeight: '500' }}>{displayText}</Text>
      <View style={styles.buttonContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedOption === option ? styles.selectedButton : null,
            ]}
            onPress={() => handlePress(option)}
          >
            <Text style={[styles.buttonText, selectedOption === option && styles.selectedButtonText]}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Display buttons in a row
    justifyContent: 'space-between', // Adjust this based on your layout needs
  },
  button: {
    flex: 1, 
    padding: 10,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: color.primaryColor, 
  },
  selectedButtonText: {
    color: color.colorWhite, 
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default DynamicButtons;
