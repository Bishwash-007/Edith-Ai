import DrawerContent from "@/components/DrawerContent";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "front",
          drawerHideStatusBarOnOpen: true,
          drawerStyle: {
            width: "70%",
            backgroundColor: "#fff",
          },
          drawerContentStyle: {
            backgroundColor: "#fff",
          },
          headerRight: () => (
            <Ionicons
              name="chatbubble"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="(auth)/index"
          options={{
            title: "Profile",
            headerShown: true,
            drawerLabel: "Profile",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: true,
            drawerLabel: "Settings",
          }}
        />
        <Drawer.Screen
          name="chat/[id]"
          options={{
            drawerItemStyle: { display: "none" },
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
