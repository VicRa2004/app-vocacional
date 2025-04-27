import { ConfigIcon, HomeIcon } from "@/components/ui/Icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000" },
        tabBarActiveTintColor: "purple",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color }) => <ConfigIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
