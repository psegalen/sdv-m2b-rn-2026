import { TodoContext } from "@/data/TodoContext";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { Button, Card } from "react-native-paper";

interface UpdateTodoProps {
  id?: string;
}

const UpdateTodo = ({ id }: UpdateTodoProps) => {
  const isCreateMode = typeof id === "undefined";
  const { todos, addTodo, updateTodo, deleteTodo } = useContext(TodoContext);
  const initialTodo = isCreateMode
    ? null
    : todos.find((todo) => todo.id === id);
  const [isDone, setIsDone] = useState(initialTodo?.done || false);
  const [title, setTitle] = useState(initialTodo?.title || "");
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardContainer}>
          <TextInput
            placeholder="Tâche à faire"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          {isCreateMode ? undefined : (
            <View style={styles.row}>
              <Switch value={isDone} onValueChange={setIsDone} />
              <Text>Fait ?</Text>
            </View>
          )}
          <Button
            onPress={() => {
              if (isCreateMode) {
                addTodo(title);
              } else {
                updateTodo({ id: id!, title, done: isDone });
              }
              router.back();
            }}
          >
            {isCreateMode ? "Créer" : "Mettre à jour"}
          </Button>
          {isCreateMode ? undefined : (
            <Button
              onPress={() => {
                deleteTodo(id!);
                router.back();
              }}
            >
              Supprimer
            </Button>
          )}
        </View>
      </Card>
    </View>
  );
};

export default UpdateTodo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 24,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 8,
  },
});
