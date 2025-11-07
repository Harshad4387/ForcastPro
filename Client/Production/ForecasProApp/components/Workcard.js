import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function WorkCard({ request, onComplete }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{request.product}</Title>

        <Paragraph style={{ marginTop: 6 }}>
          Quantity: {request.quantity}
        </Paragraph>

        <Paragraph style={{ marginTop: 6 }}>
          Requested By: {request.requestedBy}
        </Paragraph>

        <Paragraph style={{ marginTop: 6 }}>
          Remarks: {request.remarks || "—"}
        </Paragraph>
      </Card.Content>

      <Card.Actions style={styles.actions}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => onComplete(request.id)}
        >
          Mark Completed
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    elevation: 3,
  },
  actions: {
    justifyContent: "flex-end",
    padding: 12,
  },
  button: {
    borderRadius: 8,
  },
});
