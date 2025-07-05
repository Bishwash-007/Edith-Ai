import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, { SlideInUp, FadeIn } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

import Button from "@/components/ui/Button";
import OAuthButton from "@/components/ui/OAuth";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const router = useRouter();
  const handleOAuth = (provider: string) => {
    console.log(`Signing in with ${provider}`);
    // Add your OAuth flow trigger here
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          backgroundColor: "white",
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center justify-center bg-white dark:bg-black">
          <StatusBar style="auto" />

          {/* Animation Entrance */}
          <Animated.View
            entering={SlideInUp.springify().damping(15)}
            className="items-center"
          >
            <LottieView
              source={require("@/assets/animations/Animation - 1751714621617.json")}
              autoPlay
              loop
              style={{ width: width * 0.6, height: width * 0.6 }}
            />
          </Animated.View>

          {/* Welcome Text */}
          <Animated.View entering={FadeIn.delay(600)} className="mt-6 mb-8">
            <Text className="text-3xl font-bold text-black dark:text-white text-center">
              Welcome to the Edith
            </Text>
          </Animated.View>

          {/* Buttons Container */}
          <Animated.View
            entering={FadeIn.delay(800).duration(400)}
            className="w-full space-y-4"
          >
            {/* Sign In / Sign Up Buttons */}
            <Button
              title="Get Started"
              onPress={() => router.push("/(auth)/sign-up")}
              className="mx-6"
              iconRight={
                <AntDesign name="arrowright" size={24} color="black" />
              }
            />

            {/* Separator */}
            <View className="flex-row items-center justify-center my-6 gap-3">
              <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
              <Text className="text-sm text-muted-500 dark:text-muted-400 font-poppinsLight">
                or
              </Text>
              <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
            </View>

            {/* OAuth Buttons Row */}
            <View className="flex-row justify-center gap-4">
              <OAuthButton
                iconName="google"
                onPress={() => handleOAuth("google")}
              />
              <OAuthButton
                iconName="github"
                onPress={() => handleOAuth("github")}
              />
              <OAuthButton
                iconName="facebook"
                onPress={() => handleOAuth("facebook")}
              />
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Onboarding;
