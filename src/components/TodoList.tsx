import TodoCard from "@/components/TodoCard";
import { Platform, ScrollView, StyleSheet } from "react-native";

const todos = [
  { done: true, title: "Apprendre TypeScript" },
  { done: true, title: "Apprendre React" },
  { done: false, title: "Apprendre React Native" },
  { done: true, title: "Apprendre l'Anglais" },
  { done: false, title: "Apprendre le Japonais" },
  { done: false, title: "Apprendre React Native" },
  { done: true, title: "Apprendre l'Anglais" },
  { done: false, title: "Apprendre le Japonais" },
];

export default function TodoList() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerRoot}
    >
      {todos.map((todo, index) => (
        <TodoCard key={index} done={todo.done} title={todo.title} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRoot: {
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 16,
    gap: 16,
    paddingBottom: Platform.select({
      ios: 32,
      android: 64,
    }),
  },
});
