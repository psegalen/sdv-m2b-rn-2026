import * as SecureStore from "expo-secure-store";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Alert } from "react-native";
import { Api, Todo } from "./Api";

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => Promise.resolve(),
  updateTodo: () => Promise.resolve(),
  deleteTodo: () => Promise.resolve(),
  isLoading: false,
});

export const TodoProvider = ({ children }: PropsWithChildren) => {
  // const persistedTodos = SecureStore.getItem("EXPO_TODOS_LIST");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const apiTodos = await Api.getTodos();
      setTodos(apiTodos);
      setIsLoading(false);
    })();
  }, []);

  const persistTodos = (newTodos: Todo[]) => {
    SecureStore.setItem("EXPO_TODOS_LIST", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo: Todo = await Api.addTodo(title);
      persistTodos([newTodo, ...todos]);
    } catch (error) {
      console.error("Error adding todo:", error);
      Alert.alert("Error", "Failed to add todo. Please try again.");
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      const newTodo = await Api.updateTodo(updatedTodo);
      persistTodos(
        todos.map((todo) => (todo.id === updatedTodo.id ? newTodo : todo)),
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      Alert.alert("Error", "Failed to update todo. Please try again.");
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await Api.deleteTodo(id);
      persistTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      Alert.alert("Error", "Failed to delete todo. Please try again.");
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, updateTodo, deleteTodo, isLoading }}
    >
      {children}
    </TodoContext.Provider>
  );
};
