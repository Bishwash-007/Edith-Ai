import React from "react";
import {
  View,
  Text,
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
import ChatHistory from "./ChatHistory";
import Footer from "./Footer";
import { useRouter } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomDrawer = () => {
  const { closeDrawer } = useDrawerStore();
  const colorScheme = useColorScheme(); // "light" or "dark"
  const translateX = useSharedValue(0);

  const router = useRouter();

  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const navigateToProfile = () => {
    router.push("/profile");
    closeDrawer();
  };

  const handleLogOut = () => {
    //TODO implement Log out logic
    console.log("Log out ");
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

      {/* Drawer */}
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
        {/* Profile */}
        <View className="items-center mt-10 mb-6">
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/generate-ai-artificial-intelligence-logo-ai-logo-concept_268834-2200.jpg",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>

        {/* Chat List */}
        <ChatHistory />

        {/* Footer */}
        <View className="mt-auto mb-10 px-6">
          <Footer
            onPressAvatar={navigateToProfile}
            onPressLogout={handleLogOut}
          />
        </View>
      </Animated.View>
    </>
  );
};

export default CustomDrawer;
