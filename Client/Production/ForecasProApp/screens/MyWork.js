import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Title, Snackbar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WorkCard from "../components/Workcard";
import { API_BASE_URL } from "../Constants/Api_url";
import { useFocusEffect } from "@react-navigation/native";

export default function MyWork() {
  const [workList, setWorkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);

  const fetchMyWork = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${API_BASE_URL}/production/get-mywork`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success && response.data.data) {
        const formatted = response.data.data.map((item) => ({
          id: item.id,                 
          product: item.product,
          quantity: item.quantity,
          remarks: item.remarks,
          requestedBy: item.requestedBy,
          status: item.status
        }));

        setWorkList(formatted);
      } else {
        setWorkList([]);
      }
    } catch (error) {
      console.error("Error fetching work:", error);
      setSnackMsg("Failed to load work");
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchMyWork();
    }, [])
  );

  // ✅ Mark work as completed
  const handleComplete = async (id) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.post(
        `${API_BASE_URL}/production/completed`,
        { requestId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {

        // ✅ Remove card instantly from UI
        setWorkList((prev) => prev.filter((item) => item.id !== id));

        setSnackMsg("✅ Marked as Completed");
        setSnackVisible(true);

        // ✅ Optional reload from server
        fetchMyWork();

      } else {
        setSnackMsg("Failed to update");
        setSnackVisible(true);
      }
    } catch (error) {
      console.error("Error completing work:", error);
      setSnackMsg("Server error");
      setSnackVisible(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading my work...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>My Work</Title>

      {workList.length === 0 ? (
        <View style={styles.empty}>
          <Text>No work assigned</Text>
        </View>
      ) : (
        <FlatList
          data={workList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkCard request={item} onComplete={handleComplete} />
          )}
        />
      )}

      <Snackbar visible={snackVisible} onDismiss={() => setSnackVisible(false)} duration={2000}>
        {snackMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f7fb", paddingTop: 8 },
  title: { textAlign: "center", marginVertical: 8, fontWeight: "bold", fontSize: 18 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
