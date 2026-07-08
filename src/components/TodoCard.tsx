import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export interface TodoCardProps {
  id: string;
  done: boolean;
  title: string;
}

const TodoCard = ({ id, done, title }: TodoCardProps) => {
  const router = useRouter();
  const status = done ? "Fait" : "A faire";
  const titleStyle = done ? [styles.bold, styles.striked] : styles.bold;
  const cardStyle = done ? [styles.card, styles.lessOpacity] : styles.card;
  return (
    <Card
      style={cardStyle}
      onPress={() => router.push(`/todo/updateTodo?id=${id}`)}
    >
      <View style={styles.container}>
        <Text style={titleStyle}>{title}</Text>
        <Text>{status}</Text>
      </View>
    </Card>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  striked: {
    textDecorationLine: "line-through",
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#FFF",
  },
  lessOpacity: {
    opacity: 0.6,
  },
});
