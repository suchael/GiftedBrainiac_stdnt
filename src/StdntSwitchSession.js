import React, { useContext, useState } from "react";
import ReactContext from "./Context/ReactContext.js";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// my import
import { PaymentCategory } from "./PaymentOption.js";

const ToggleComponent = () => {
  const { stdntSession, stdntPayment, index, setIndex } = useContext(ReactContext);
// console.log(stdntSession, stdntPayment)

  const [selectedOption, setSelectedOption] = useState(null);
  const [userInput, setUserInput] = useState('');
  const correctPassword = 'Gb Tut';

  const options = Object.keys(PaymentCategory);


  const handleOptionPress = (option, index) => {
    setSelectedOption(option);
    setIndex(index);
  };

  const handleDonePress = () => {
    if (userInput === correctPassword) {
      // Save the user's preference or perform other actions
      console.log('User preference saved:', selectedOption);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hi, do you know you have the option to switch session?</Text>
      <Text>But you can only do this once for ₦500 </Text>
      <Text>Now choose a new session</Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, selectedOption === option && styles.selectedOption]}
            onPress={() => handleOptionPress(option, index)}
          >
            <Text>{option} - {PaymentCategory[option].monthlyPayment} (Monthly)</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder={`Type "${correctPassword}" to save`}
        onChangeText={(text) => setUserInput(text)}
      />

      <TouchableOpacity style={styles.doneButton} onPress={handleDonePress}>
        <Text>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    gap: 10,
    marginVertical: 10,
  },
  option: {
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    fontWeight: "600",
  },
  doneButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
});

export default ToggleComponent;
