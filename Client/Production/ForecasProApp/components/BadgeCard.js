import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function BadgeCard({ badge }) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Ionicons name={badge.icon || "star"} size={36} />
        <Title style={{ marginTop: 8 }}>{badge.name}</Title>
        {badge.subtitle && <Paragraph>{badge.subtitle}</Paragraph>}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    height: 160,
    margin: 8,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
