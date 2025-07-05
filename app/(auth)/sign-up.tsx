import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import OAuthButton from "@/components/ui/OAuth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const keyboard = useAnimatedKeyboard();

  const formAnimatedStyle = useAnimatedStyle(() => ({
    marginBottom: keyboard.height.value > 0 ? keyboard.height.value/2 : 0,
  }));

  const handleSignUp = () => {
    console.log("Signing up:", { email, username, password });
    // navigate or show success
  };

  const handleOAuth = (provider: string) => {
    console.log(`Signing in with ${provider}`);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
      }}
    >
      <Animated.View
        className="flex-1 justify-center items-center bg-muted-50 dark:bg-black p-8"
        entering={FadeIn.duration(400)}
      >
        {/* ✨ Page Title */}
        <Animated.Text
          className="font-poppinsSemibold text-3xl text-muted-800 dark:text-muted-100 mb-8 text-center"
          entering={FadeIn.duration(400)}
        >
          Edith AI
        </Animated.Text>

        {/* ⚙️ Form and Buttons */}
        <Animated.View
          style={[formAnimatedStyle, { width: "100%" }]}
          className="items-center"
        >
          <Animated.View
            entering={FadeIn.duration(400)}
            className="w-full space-y-5 mb-6"
          >
            <InputField
              label="Username"
              placeholder="yourname"
              value={username}
              onChangeText={setUsername}
              iconLeft={
                <Ionicons name="person-outline" size={20} color="#737373" />
              }
              className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
            />
            <InputField
              label="Email"
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              iconLeft={
                <Ionicons name="mail-outline" size={20} color="#737373" />
              }
              className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
            />
            <InputField
              label="Password"
              placeholder="Your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              iconLeft={
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#737373"
                />
              }
              iconRight={
                <TouchableWithoutFeedback
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <View>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#737373"
                    />
                  </View>
                </TouchableWithoutFeedback>
              }
              className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
            />
          </Animated.View>

          <Animated.View entering={FadeIn.duration(400)} className="w-full">
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              className="w-full bg-muted-800 dark:bg-muted-200 mb-4"
            />
          </Animated.View>

          <Animated.View entering={FadeIn.duration(400)} className="w-full">
            <Link href="/(auth)/sign-in" asChild>
              <Text className="text-sm text-muted-500 dark:text-muted-400 text-center mb-6">
                Already have an account?{" "}
                <Text className="underline">Sign In</Text>
              </Text>
            </Link>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400)}
            className="w-full flex-row items-center justify-center gap-3 mb-6"
          >
            <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
            <Text className="text-sm text-muted-500 dark:text-muted-400">
              or
            </Text>
            <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400)}
            className="flex-row w-full justify-center gap-4"
          >
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
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </ScrollView>
  );
};

export default SignUp;
