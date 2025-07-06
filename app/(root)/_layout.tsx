import React from "react";
import { useColorScheme, View } from "react-native";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import CustomDrawer from "@/components/CustomDrawer";
import Colors from "@/constants/colors";

const MainLayout = () => {
  const { isOpen } = useDrawerStore();
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: scheme === "dark" ? Colors.black : Colors.white,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Stack contains all screen routes */}
        <Stack>
          <Stack.Screen
            name="chat/[id]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="callscreen"
            options={{
              headerShown: true,
              headerBackButtonMenuEnabled: true,
              title: "Call Screen",
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
              title: "Profile",
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              headerShown: true,
              headerBackButtonMenuEnabled: true,
              title: "Settings",
            }}
          />
        </Stack>

        {/* Drawer rendered on top of Stack screens */}
        {isOpen && <CustomDrawer />}
      </View>
    </GestureHandlerRootView>
  );
};

export default MainLayout;
