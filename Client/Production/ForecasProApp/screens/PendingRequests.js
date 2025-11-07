import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Title, Snackbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RequestCard from "../components/RequestCard";
import { API_BASE_URL } from "../Constants/Api_url";
import { useFocusEffect } from "@react-navigation/native";

export default function PendingRequestsScreen() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);

  // ✅ Fetch all pending requests
  const fetchPendingRequests = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${API_BASE_URL}/production/get-all-pending`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // ✅ Map fields EXACTLY as backend returns
        const formatted = response.data.data.map((item) => ({
          id: item._id,              // ✅ _id → id (frontend key)
          _id: item._id,             // keep backup
          product: item.product,     // ✅ string
          quantity: item.quantity,   // ✅ number
          remarks: item.remarks || "",
          requestedBy: item.requestedBy,
          status: "pending",
        }));

        setPendingRequests(formatted);
      } else {
        setPendingRequests([]);
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
      setSnackMsg("Failed to fetch requests");
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on screen focus
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchPendingRequests();
    }, [])
  );

  // ✅ Accept Request
  const handleAccept = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.post(
        `${API_BASE_URL}/production/accept-request`,
        { requestId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSnackMsg("✅ Request Accepted!");
        setSnackVisible(true);
        fetchPendingRequests();
      } else {
        setSnackMsg("❌ Failed to accept");
        setSnackVisible(true);
      }
    } catch (error) {
      console.error("Error accepting:", error);
      setSnackMsg("Server error");
      setSnackVisible(true);
    }
  };

  // ✅ Decline Request
  const handleDecline = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.post(
        `${API_BASE_URL}/production/decline-request`,
        { requestId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setSnackMsg("Request Declined");
        setSnackVisible(true);
        fetchPendingRequests();
      } else {
        setSnackMsg("Failed to decline");
        setSnackVisible(true);
      }
    } catch (error) {
      console.error("Error declining:", error);
      setSnackMsg("Server error");
      setSnackVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading pending requests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Pending Requests</Title>

      {pendingRequests.length === 0 ? (
        <View style={styles.empty}>
          <Text>No pending requests</Text>
        </View>
      ) : (
        <FlatList
          data={pendingRequests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RequestCard
              request={item}
              onAccept={() => handleAccept(item.id)}
              onDecline={() => handleDecline(item.id)}
              showStatus={false}
            />
          )}
        />
      )}

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2000}
      >
        {snackMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f7fb", paddingTop: 8 },
  title: { textAlign: "center", marginVertical: 8, fontWeight: "bold", fontSize: 18 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
