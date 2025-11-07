import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function RequestCard({ request, onAccept, onDecline, showStatus }) {
  return (
    <Card style={styles.card}>
      <Card.Content>

        {/* ✅ Product Name */}
        <Title>{request.product}</Title>

        {/* ✅ Requested By */}
        <Paragraph style={{ marginTop: 6 }}>
          Requested By: {request.requestedBy}
        </Paragraph>

        {/* ✅ Quantity */}
        <Paragraph style={{ marginTop: 6 }}>
          Quantity: {request.quantity}
        </Paragraph>

        {/* ✅ Remarks */}
        <Paragraph style={{ marginTop: 6 }}>
          Remarks: {request.remarks || "—"}
        </Paragraph>

        {/* ✅ Status (only in accepted/other screens) */}
        {showStatus && request.status && (
          <Paragraph
            style={{
              marginTop: 6,
              fontWeight: "600",
              color:
                request.status === "accepted"
                  ? "green"
                  : request.status === "rejected"
                  ? "red"
                  : "#2f6fed",
            }}
          >
            {request.status.toUpperCase()}
          </Paragraph>
        )}
      </Card.Content>

      {/* ✅ Accept & Decline Buttons (only in Pending screen) */}
      {!showStatus && (
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            onPress={() => onAccept?.(request.id)}
            style={styles.button}
          >
            Accept
          </Button>

          <Button
            mode="outlined"
            onPress={() => onDecline?.(request.id)}
            style={styles.button}
          >
            Decline
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  actions: {
    justifyContent: "space-between",
    padding: 12,
  },
  button: {
    borderRadius: 8,
  },
});
