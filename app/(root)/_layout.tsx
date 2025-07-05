import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import CustomDrawer from "@/components/CustomDrawer";

const MainLayout = () => {
  const { isOpen } = useDrawerStore();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Stack must only contain Stack.Screens */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="settings" />
        </Stack>

        {/* Put CustomDrawer OUTSIDE Stack */}
        {isOpen && <CustomDrawer />}
      </View>
    </GestureHandlerRootView>
  );
};

export default MainLayout;