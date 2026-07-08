import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Tabs.Screen options={{ headerShown: false }} />
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </>
  );
}
