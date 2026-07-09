import TodoCard from "@/components/TodoCard";
import { TodoContext } from "@/data/TodoContext";
import { useContext } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function TodoList() {
  const { todos, isLoading } = useContext(TodoContext);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerRoot}
    >
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        todos.map((todo, index) => (
          <TodoCard
            key={index}
            id={todo.id}
            done={todo.done}
            title={todo.title}
          />
        ))
      )}
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
