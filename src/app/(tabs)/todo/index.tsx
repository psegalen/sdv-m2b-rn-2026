import TodoList from "@/components/TodoList";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native-paper";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "TODO-list",
          headerRight: () => (
            <Button
              onPress={() => {
                router.push("/todo/updateTodo");
              }}
            >
              Créer
            </Button>
          ),
        }}
      />
      <TodoList />
    </>
  );
}
