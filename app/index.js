import React, { useState } from "react";
import { SafeAreaView, Button, TextInput, View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function BMIScreen() {
  // Defined useStates to keep track of values
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState('');

  // the func calculates bmi and updates the bmi value
  function calculate_bmi() {
    let h = Number(height) / 100;
    let w = Number(weight);
    let r = (w / (h * h)).toFixed(1); 
    if (r > 0) {
      setBmi("BMI: " + r);
    } else {
      setBmi('Invalid data');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          keyboardType="number-pad"
          placeholder="in cms"
        />
        
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          keyboardType="number-pad"
          placeholder="in kgs"
        />
        
        <View style={styles.buttonContainer}>
          <Button
            title="Compute BMI"
            onPress={calculate_bmi}
          />
        </View>

        <Text style={styles.bmiLabel}>{bmi}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    flex: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    margin: 8,
    padding: 8,
    width: 300,
  },
  buttonContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  bmiLabel: {
    fontSize: 40,
    margin: 10,
    textAlign: 'center'
  }
});