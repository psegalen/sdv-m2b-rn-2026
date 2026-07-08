import UpdateTodo from "@/components/UpdateTodo";
import { Stack } from "expo-router";

export default function UpdateTodoScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Nouvelle TODO",
          headerBackTitle: "Retour",
        }}
      />
      <UpdateTodo />
    </>
  );
}
