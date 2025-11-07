import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import { Title, Card, Paragraph, Snackbar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../Constants/Api_url";
import { useFocusEffect } from "@react-navigation/native";

export default function CompletedRequests() {
  const [completedList, setCompletedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);

  // ✅ Fetch completed work
  const fetchCompleted = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      const response = await axios.get(
        `${API_BASE_URL}/production/my-completed`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const formatted = response.data.data.map((item) => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
          completedAt: new Date(item.completedAt).toLocaleString(),
          remarks: item.remarks,
          requestedBy: item.requestedBy,
        }));

        setCompletedList(formatted);
      } else {
        setCompletedList([]);
      }
    } catch (error) {
      console.error("Error fetching completed requests:", error);
      setSnackMsg("Failed to load completed requests");
      setSnackVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Runs EVERY TIME user opens this tab
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchCompleted();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading completed work...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Completed Requests</Title>

      {completedList.length === 0 ? (
        <View style={styles.empty}>
          <Text>No completed work yet.</Text>
        </View>
      ) : (
        <FlatList
          data={completedList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Paragraph style={styles.productName}>{item.product}</Paragraph>

                <Paragraph>Quantity: {item.quantity}</Paragraph>
                <Paragraph>Completed At: {item.completedAt}</Paragraph>
                <Paragraph>Requested By: {item.requestedBy}</Paragraph>

                <Paragraph style={{ marginTop: 4, color: "gray" }}>
                  Remarks: {item.remarks || "—"}
                </Paragraph>
              </Card.Content>

              <Card.Actions style={styles.iconRow}>
                <Ionicons name="checkmark-circle" size={26} color="#2ecc71" />
              </Card.Actions>
            </Card>
          )}
          contentContainerStyle={{ padding: 12, paddingBottom: 30 }}
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
  title: { textAlign: "center", marginVertical: 8, fontSize: 20, fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { marginVertical: 8, marginHorizontal: 2, borderRadius: 12, elevation: 2 },
  productName: { fontWeight: "700", fontSize: 16, marginBottom: 6 },
  iconRow: { justifyContent: "flex-end", paddingRight: 14, paddingBottom: 8 },
});
