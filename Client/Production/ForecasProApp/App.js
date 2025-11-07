import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./navigation/BottomTabs";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  // Hardcoded initial pending requests
  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: "John Doe", requestType: "Material Pickup", date: "2025-11-05" },
    { id: 2, name: "Jane Smith", requestType: "Quality Check", date: "2025-11-06" },
  ]);

  // Accepted Requests (initially empty)
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  // Completed Requests (hardcoded)
  const [completedRequests] = useState([
    { id: 1, name: "Sam Wilson", requestType: "Assembly Task", date: "2025-10-28" },
    { id: 2, name: "Alex Green", requestType: "Final Inspection", date: "2025-10-30" },
  ]);

  // Handler: accept a pending request
  const acceptRequest = (requestId) => {
    setPendingRequests((prev) => {
      const req = prev.find((r) => r.id === requestId);
      if (!req) return prev;
      // Move to accepted
      setAcceptedRequests((a) => [...a, { ...req, status: "Accepted" }]);
      return prev.filter((r) => r.id !== requestId);
    });
  };

  const declineRequest = (requestId) => {
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId));
    // declined requests are not stored
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} />}
          </Stack.Screen>

          {/* Pass application state/handlers as props to BottomTabs */}
          <Stack.Screen name="Main">
            {(props) => (
              <BottomTabs
                {...props}
                pendingRequests={pendingRequests}
                acceptedRequests={acceptedRequests}
                completedRequests={completedRequests}
                onAccept={acceptRequest}
                onDecline={declineRequest}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
