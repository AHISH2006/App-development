import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable } from "react-native";

// Mocking the conversion-data.json right here so it works seamlessly!
const cd = {
  unit_names: [
    { label: "Length", value: "length" },
    { label: "Volume", value: "volume" },
    { label: "Weight", value: "weight" }
  ],
  length: [
    { label: "Meter", value: 1 },
    { label: "Kilometer", value: 0.001 },
    { label: "Centimeter", value: 100 },
    { label: "Mile", value: 0.000621371 }
  ],
  volume: [
    { label: "Litre", value: 1 },
    { label: "Millilitre", value: 1000 },
    { label: "US Gallon", value: 0.264172 }
  ],
  weight: [
    { label: "Kilogram", value: 1 },
    { label: "Gram", value: 1000 },
    { label: "Pound", value: 2.20462 }
  ]
};

// A simple local custom dropdown using a Modal to provide an overlay effect
const DropdownComponent = ({ dta, value, setValue, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = dta.find(item => item.value === value)?.label || placeholder;

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownBox} onPress={() => setIsOpen(true)}>
        <Text style={styles.dropdownText}>{selectedLabel}</Text>
        <Text>▼</Text>
      </TouchableOpacity>
      
      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={() => setIsOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            {dta.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.dropdownItem} 
                onPress={() => {
                  setValue(item.value);
                  setIsOpen(false);
                }}
              >
                <Text style={item.value === value ? styles.selectedItemText : styles.itemText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default function UnitConverter() {
  const [unit, setUnit] = useState(cd["unit_names"][0]["value"]);
  const [from_unit, setFrom_unit] = useState(null);
  const [to_unit, setTo_unit] = useState(null);
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('0.00');

  useEffect(() => {
    // Whenever the base unit category changes, reset the sub units and output
    setFrom_unit(cd[unit][0]["value"]);
    setTo_unit(cd[unit][0]["value"]);
    setOutputData('0.00');
    setInputData('');
  }, [unit]);

  // Recalculate whenever inputs or dropdowns change
  useEffect(() => {
    if (inputData !== '' && from_unit && to_unit) {
      calculate_conversion(inputData);
    } else {
      setOutputData('0.00');
    }
  }, [inputData, from_unit, to_unit]);

  const calculate_conversion = (value) => {
    setInputData(value);
    
    // Safety check just in case from_unit isn't selected yet
    if (!from_unit) return;
    
    let to_base = Number(value) / from_unit;
    let to_final = to_base * to_unit;
    
    // Formatting out extremely long decimals
    setOutputData(to_final.toFixed(4).replace(/\.?0+$/, "")); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>
      
      <Text style={styles.label}>Select Category</Text>
      <DropdownComponent
        dta={cd["unit_names"]}
        value={unit}
        setValue={setUnit}
        placeholder="Select Unit Type"
      />

      <View style={styles.conversionRow}>
        <View style={styles.conversionBlock}>
          <Text style={styles.label}>From</Text>
          <DropdownComponent
            dta={cd[unit]}
            value={from_unit}
            setValue={setFrom_unit}
            placeholder="From Unit"
          />
          <TextInput
            style={styles.input}
            value={inputData}
            keyboardType="numeric"
            placeholder="0"
            onChangeText={(text) => setInputData(text)}
          />
        </View>

        <Text style={styles.equalsSign}>=</Text>

        <View style={styles.conversionBlock}>
          <Text style={styles.label}>To</Text>
          <DropdownComponent
            dta={cd[unit]}
            value={to_unit}
            setValue={setTo_unit}
            placeholder="To Unit"
          />
          <View style={styles.outputBox}>
             <Text style={styles.outputData}>{outputData}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#34495e'
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 5,
  },
  conversionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  conversionBlock: {
    flex: 1,
  },
  equalsSign: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#95a5a6',
    marginHorizontal: 15,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    textAlign: 'center'
  },
  outputBox: {
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#eaf2f8',
    marginTop: 10,
    alignItems: 'center'
  },
  outputData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9'
  },
  
  // Custom Dropdown Styles
  dropdownContainer: {
    marginBottom: 10,
    position: 'relative',
    zIndex: 1000 // Ensure dropdown list goes over other items
  },
  dropdownBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  dropdownText: {
    fontSize: 16,
    color: '#2c3e50'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden'
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6'
  },
  itemText: {
    fontSize: 16,
    color: '#34495e'
  },
  selectedItemText: {
    fontSize: 16,
    color: '#3498db',
    fontWeight: 'bold'
  }
});
