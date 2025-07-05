import React, { useState } from "react";
import {
  View,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import ChatHistory, { ChatItem } from "./ChatHistory";
import Footer from "./Footer";
import { useRouter } from "expo-router";
import Avatar from "./ui/Avatar";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomDrawer = () => {
  const { closeDrawer } = useDrawerStore();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const translateX = useSharedValue(0);

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const [optionsOpenId, setOptionsOpenId] = useState<string | null>(null);
  const chat: ChatItem[] = Array.from({ length: 17 }, (_, i) => ({
    id: i.toString(),
    label: `Chat ${i}`,
  }));

  const navigateToProfile = () => {
    router.push("/profile");
    closeDrawer();
  };

  const routeToSettings = () => {
    router.push("/settings");
    closeDrawer();
  };

  const handleChatSelect = (id: string) => {
    router.push(`/(root)/chat/${id}`);
    closeDrawer();
  };

  const handleLogOut = () => {
    // TODO: Implement logout logic
    console.log("Log out");
  };

  return (
    <>
      {/* Backdrop */}
      <Pressable onPress={closeDrawer} style={StyleSheet.absoluteFillObject}>
        <BlurView
          intensity={40}
          tint={colorScheme === "dark" ? "dark" : "light"}
          style={StyleSheet.absoluteFill}
        />
      </Pressable>

      {/* Drawer Panel */}
      <Animated.View
        entering={SlideInLeft.springify().damping(25).stiffness(100)}
        exiting={SlideOutLeft.delay(200)
          .duration(400)
          .springify()
          .stiffness(50)}
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: SCREEN_WIDTH * 0.75,
            zIndex: 50,
          },
          animatedDrawerStyle,
        ]}
        className="bg-white dark:bg-black"
      >
        {/* chat logo  */}
        <View className="items-center mt-10 mb-6">
          <Avatar
            uri="https://t0.gstatic.com/images?q=tbn:ANd9GcTzEMn9FI59qysZbAAnImz7GVhhx2Z2rd7xdyB5FXSnDh3YtbIa"
            size={80}
            onPress={navigateToProfile}
          />
        </View>

        <ChatHistory
          data={chat}
          optionsOpenId={optionsOpenId}
          onOpenOptions={(id) => setOptionsOpenId(id)}
          onCloseOptions={() => setOptionsOpenId(null)}
          onDelete={(id) => {
            console.log("Deleted Chat:", id);
            setOptionsOpenId(null);
          }}
          onRename={(id) => {
            console.log("Renamed Chat:", id);
            setOptionsOpenId(null);
          }}
          onItemPress={handleChatSelect}
        />

        <View className="p-6">
          <Footer
            onPressLogout={handleLogOut}
            onPressSettings={routeToSettings}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default CustomDrawer;
