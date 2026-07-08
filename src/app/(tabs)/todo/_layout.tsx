import { TodoProvider } from "@/data/TodoContext";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <TodoProvider>
      <Tabs.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </TodoProvider>
  );
}
