import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";

export default function ExpenseTracker() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Function to add a new expense (Matches HTML/JS reference)
  const addExpense = () => {
    const amount = parseFloat(expenseAmount);
    
    // Validation matching the reference
    if (expenseName.trim() === "" || isNaN(amount)) {
      Alert.alert("Error", "Please enter valid expense details.");
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      name: expenseName,
      amount: amount
    };

    setExpenses([...expenses, newExpense]);
    
    // Reset inputs
    setExpenseName("");
    setExpenseAmount("");
  };

  // Function to delete an expense by matching the ID logic
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate total amount
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      
      {/* Form Container */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={expenseAmount}
          onChangeText={setExpenseAmount}
        />
        
        <TouchableOpacity style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Expense Table Simulation */}
      <View style={styles.tableContainer}>
        
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.nameCol]}>Expense Name</Text>
          <Text style={[styles.headerCell, styles.amountCol]}>Amount</Text>
          <Text style={[styles.headerCell, styles.actionCol]}>Action</Text>
        </View>

        {/* Expense List (TBody) */}
        <FlatList
          data={expenses}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, styles.nameCol]} numberOfLines={1}>{item.name}</Text>
              <Text style={[styles.cell, styles.amountCol]}>₹{item.amount.toFixed(2)}</Text>
              <TouchableOpacity style={styles.actionCol} onPress={() => deleteExpense(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        
        {/* Total Amount Footer */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: '#333' },
  
  formContainer: { marginBottom: 20 },
  input: { 
    backgroundColor: "#fff", 
    padding: 12, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: "#ccc",
    marginBottom: 10
  },
  button: { 
    backgroundColor: "#4CAF50", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  
  tableContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333'
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    alignItems: 'center'
  },
  cell: {
    fontSize: 14,
    color: '#555'
  },
  
  // Column sizing to simulate table
  nameCol: { flex: 2 },
  amountCol: { flex: 1 },
  actionCol: { flex: 1, alignItems: 'flex-end', paddingRight: 5 },
  
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  listContainer: { paddingBottom: 10 },
  
  totalContainer: { 
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 2,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 5,
  },
  totalLabel: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333",
    marginRight: 5 
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60' // Green color for total
  }
});
