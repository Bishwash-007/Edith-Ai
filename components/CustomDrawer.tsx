import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import Animated, {
  SlideInLeft,
  SlideOutLeft,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { useDrawerStore } from "@/hooks/useDrawerStore";

const SCREEN_WIDTH = Dimensions.get("window").width;

const CustomDrawer = () => {
  const { closeDrawer } = useDrawerStore();
  const translateX = useSharedValue(0);

  // Apply translation from gesture
  const animatedDrawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <>
      {/* Backdrop */}
      <Pressable onPress={closeDrawer} style={StyleSheet.absoluteFillObject}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
      </Pressable>

      {/* Swipeable Drawer */}
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
            backgroundColor: "#fff",
            zIndex: 50,
          },
          animatedDrawerStyle,
        ]}
      >
        <View className="items-center mb-6 mt-10">
          <Image
            source={{
              uri: "https://img.freepik.com/premium-vector/generate-ai-artificial-intelligence-logo-ai-logo-concept_268834-2200.jpg",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        </View>

        <View className="mt-auto mb-10 px-6">
          <Text className="text-xs text-muted-500">v1.0.0</Text>
        </View>
      </Animated.View>
    </>
  );
};

export default CustomDrawer;
