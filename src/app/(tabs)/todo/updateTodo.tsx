import UpdateTodo from "@/components/UpdateTodo";
import { Stack, useLocalSearchParams } from "expo-router";

export default function UpdateTodoScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isCreateMode = typeof id === "undefined";
  return (
    <>
      <Stack.Screen
        options={{
          title: isCreateMode ? "Nouvelle TODO" : "Edition d'une TODO",
          headerBackTitle: "Retour",
        }}
      />
      <UpdateTodo id={id} />
    </>
  );
}
