import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PendingRequests from "../screens/PendingRequests";
import AcceptedRequests from "../screens/AcceptedRequests";
import MyWork from "../screens/MyWork";
import CompletedRequests from "../screens/CompletedRequests";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Pending"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTitleAlign: "center",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Pending")
            iconName = focused ? "time" : "time-outline";

          if (route.name === "Accepted")
            iconName = focused ? "checkmark-done" : "checkmark-done-outline";

          if (route.name === "MyWork")
            iconName = focused ? "briefcase" : "briefcase-outline";

          if (route.name === "Completed")
            iconName = focused ? "checkmark-circle" : "checkmark-circle-outline";

          if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },

        tabBarActiveTintColor: "#2f6fed",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Pending" component={PendingRequests} options={{ title: "Pending Requests" }} />
      <Tab.Screen name="Accepted" component={AcceptedRequests} options={{ title: "Accepted Requests" }} />
      <Tab.Screen name="MyWork" component={MyWork} options={{ title: "My Work" }} />
      <Tab.Screen name="Completed" component={CompletedRequests} options={{ title: "Completed Requests" }} />
      <Tab.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}
