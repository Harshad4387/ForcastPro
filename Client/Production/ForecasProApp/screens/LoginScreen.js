import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Title, Snackbar } from "react-native-paper";
import axios from "axios";
import { API_BASE_URL } from "../Constants/Api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setSnackMsg("Please enter both email and password");
      setSnackVisible(true);
      return;
    }

    try {
      console.log("🔗 Sending login request to:", `${API_BASE_URL}/auth/login`);

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

    //   console.log("✅ Login Response:", response.data);

      if (response.data.success) {
        // Store token (optional)
        await AsyncStorage.setItem("authToken", response.data.token);
        const token = await AsyncStorage.getItem("authToken");
       console.log(token);
        // Navigate to main screen
        navigation.replace("Main");
      } else {
        setSnackMsg(response.data.message || "Invalid credentials");
        setSnackVisible(true);
      }
    } catch (error) {
      console.error("❌ Login Error:", error.response?.data || error.message);
      setSnackMsg(
        error.response?.data?.message || "Server error. Please try again later."
      );
      setSnackVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Title style={styles.title}>Production Workers of ForecasPro</Title>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={handleLogin} style={styles.loginBtn}>
          Login
        </Button>
      </View>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2500}
      >
        {snackMsg}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: "#f6f7fb", justifyContent: "center" },
  container: {
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },
  input: { marginTop: 12 },
  loginBtn: { marginTop: 20, borderRadius: 8 },
});
