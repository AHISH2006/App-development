import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from "react-native";

export default function ToDoTask() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do Task</Text>
      
      <View style={styles.formGroup}>
        <TextInput
          style={styles.input}
          placeholder="Enter a new task"
          value={task}
          onChangeText={setTask}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)} style={styles.removeButton}>
              <Text style={styles.removeText}>Done</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  formGroup: { marginBottom: 15 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#5856D6", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  list: { marginTop: 20 },
  taskItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
  taskText: { fontSize: 16, flex: 1 },
  removeButton: { backgroundColor: "#ffebee", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  removeText: { color: "#c62828", fontWeight: "bold" }
});
