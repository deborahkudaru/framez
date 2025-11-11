import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import { useAuth } from "../../context/AuthContext";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  // const { user } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#0a0a0a" : "#ffffff",
          borderTopColor: colorScheme === "dark" ? "#27272a" : "#e5e5e5",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#71717a" : "#666666",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          title: "Create",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
