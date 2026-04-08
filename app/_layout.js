import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF", headerTitleAlign: 'center' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "BMI",
          tabBarIcon: ({ color }) => <Ionicons name="body" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expense"
        options={{
          title: "Expense",
          tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: "Converter",
          tabBarIcon: ({ color }) => <Ionicons name="swap-horizontal" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: "To Do",
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
