import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import { createContext, PropsWithChildren, useState } from "react";

interface Todo {
  id: string;
  title: string;
  done: boolean;
}

const todosMock: Todo[] = [
  { id: "1", done: true, title: "Apprendre TypeScript" },
  { id: "2", done: true, title: "Apprendre React" },
  { id: "3", done: false, title: "Apprendre React Native" },
  { id: "4", done: true, title: "Apprendre l'Anglais" },
  { id: "5", done: false, title: "Apprendre le Japonais" },
  { id: "6", done: false, title: "Apprendre React Native" },
];

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
});

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const persistedTodos = SecureStore.getItem("EXPO_TODOS_LIST");
  const [todos, setTodos] = useState<Todo[]>(
    persistedTodos === null ? todosMock : JSON.parse(persistedTodos),
  );

  const persistTodos = (newTodos: Todo[]) => {
    SecureStore.setItem("EXPO_TODOS_LIST", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const addTodo = (title: string) => {
    const newTodo: Todo = { id: Crypto.randomUUID(), title, done: false };
    persistTodos([newTodo, ...todos]);
  };

  const updateTodo = (updatedTodo: Todo) => {
    persistTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    persistTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
