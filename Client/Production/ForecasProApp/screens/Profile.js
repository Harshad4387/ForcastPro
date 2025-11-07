import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Title, Paragraph, Avatar, Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  // ✅ Hardcoded badges (replace with API later)
  const badges = [
    { id: "b1", name: "Top Performer", icon: "trophy" },
    { id: "b2", name: "Quick Finisher", icon: "flash" },
    { id: "b3", name: "Accuracy Expert", icon: "checkmark-done" },
  ];

  return (
    <View style={styles.screen}>
      
      {/* ✅ TOP SECTION — PROFILE INFO */}
      <View style={styles.profileSection}>
        <Avatar.Text size={120} label="TU" style={styles.avatar} />

        <Title style={styles.name}>Test User</Title>
        <Paragraph style={styles.email}>test@example.com</Paragraph>
        <Paragraph style={styles.role}>Role: Production Worker</Paragraph>
      </View>

      {/* ✅ BOTTOM SECTION — BADGES */}
      <View style={styles.badgeSection}>
        <Title style={styles.badgeTitle}>My Badges</Title>

        {badges.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No badges earned yet.</Text>
        ) : (
          <FlatList
            data={badges}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.badgeCard}>
                <Card.Content style={{ alignItems: "center" }}>
                  <Ionicons name={item.icon} size={28} color="#2f6fed" />
                  <Paragraph style={styles.badgeName}>{item.name}</Paragraph>
                </Card.Content>
              </Card>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },

  // ✅ PROFILE SECTION
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "white",
    elevation: 2,
    marginBottom: 14,
  },
  avatar: {
    backgroundColor: "#e6eefc",
  },
  name: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    color: "gray",
    marginTop: 4,
  },
  role: {
    marginTop: 4,
    fontWeight: "500",
  },

  // ✅ BADGE SECTION
  badgeSection: {
    flex: 1,
    paddingHorizontal: 14,
  },
  badgeTitle: {
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "700",
  },
  badgeCard: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    elevation: 2,
    paddingVertical: 20,
    alignItems: "center",
  },
  badgeName: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: "600",
  },
});
