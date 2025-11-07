import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Title } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RequestCard from "../components/RequestCard";
import { API_BASE_URL } from "../Constants/Api_url";
import { useFocusEffect } from "@react-navigation/native";


export default function AcceptedRequests() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");


  const getAuthHeaders = (token) => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });


  // ✅ Fetch accepted requests
  const fetchAcceptedRequests = async () => {
    try {
      setLoading(true);
      setErrorMsg("");


      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        setErrorMsg("No token found. Please log in again.");
        return;
      }


      const response = await axios.get(
        `${API_BASE_URL}/production/get-all-accepted`,
        {
          headers: getAuthHeaders(token),
        }
      );


      if (response.data?.success) {
        setAcceptedRequests(response.data.data || []);
      } else {
        setErrorMsg(response.data?.message || "Failed to load requests");
      }
    } catch (error) {
      setErrorMsg("Server error while fetching accepted requests");
    } finally {
      setLoading(false);
    }
  };


  // ✅ Refresh screen on focus
  useFocusEffect(
    React.useCallback(() => {
      fetchAcceptedRequests();
    }, [])
  );


  // ✅ Accept Request
  const acceptRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");


      const res = await axios.post(
        `${API_BASE_URL}/production/accept-request`, // ✅ Fixed endpoint
        { id: requestId },
        { headers: getAuthHeaders(token) }
      );


      if (res.data?.success) {
        Alert.alert("Success", "Request accepted successfully!");
        fetchAcceptedRequests(); // refresh after accept
      } else {
        Alert.alert("Error", res.data?.message || "Failed to accept request");
      }
    } catch (error) {
      Alert.alert("Error", "Server error while accepting request");
    }
  };


  // ✅ Mark as Collected
  const markAsCollected = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");


      const res = await axios.put(
        `${API_BASE_URL}/production/update-to-collected`, // Backend endpoint
        { requestId },
        { headers: getAuthHeaders(token) }
      );


      if (res.data?.success) {
        Alert.alert("Success", "Request marked as materials collected!");
        fetchAcceptedRequests();
      } else {
        Alert.alert("Error", res.data?.message || "Failed to update request");
      }
    } catch (error) {
      Alert.alert("Error", "Server error while updating request status");
    }
  };


  return (
    <View style={styles.screen}>
      <Title style={styles.title}>Accepted Requests</Title>


      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text>Loading accepted requests...</Text>
        </View>
      ) : errorMsg ? (
        <View style={styles.error}>
          <Text style={{ color: "red" }}>{errorMsg}</Text>
        </View>
      ) : acceptedRequests.length === 0 ? (
        <View style={styles.empty}>
          <Text>No accepted requests found</Text>
        </View>
      ) : (
        <FlatList
          data={acceptedRequests}
          keyExtractor={(item) => String(item.id || item._id)}
          renderItem={({ item }) => (
            <RequestCard
              request={item}
              showStatus={true}
              onAccept={() => acceptRequest(item.id || item._id)}
              onCollect={() => markAsCollected(item.id || item._id)} // ✅ Added button action
            />
          )}
          refreshing={loading}
          onRefresh={fetchAcceptedRequests} // ✅ Pull-to-refresh
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f6f7fb", paddingTop: 8 },
  title: { textAlign: "center", marginVertical: 8, fontSize: 20, fontWeight: "600" },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 30 },
});





