import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, useColorScheme, View } from "react-native";
import Animated, {
  FadeIn,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import OAuthButton from "@/components/ui/OAuth";
import Colors from "@/constants/colors";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const scheme = useColorScheme();

  const router = useRouter();
  const keyboard = useAnimatedKeyboard();

  const animatedStyles = useAnimatedStyle(() => ({
    marginBottom: keyboard.height.value > 0 ? keyboard.height.value / 2 : 0,
  }));

  const handleSignIn = () => {
    router.replace(`/chat/${1}`);
    console.log("Signing in:", { username, password });
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
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        className="flex-1 w-full p-8 justify-center items-center bg-muted-50 dark:bg-black"
        entering={FadeIn.duration(600)}
      >
        {/* ✨ Title */}
        <Animated.Text
          className="font-poppinsSemibold text-3xl text-muted-800 dark:text-muted-100 mb-8 text-center"
          entering={FadeIn.duration(600)}
        >
          Edith AI
        </Animated.Text>

        <Animated.View style={animatedStyles} className="w-full items-center">
          <Animated.View
            entering={FadeIn.duration(600)}
            className="w-full space-y-5 mb-6"
          >
            <InputField
              label="Username"
              placeholder="yourname"
              placeholderTextColor={
                scheme === "dark" ? Colors.muted[400] : Colors.muted[600]
              }
              value={username}
              onChangeText={setUsername}
              iconLeft={
                <Ionicons name="person-outline" size={20} color="#737373" />
              }
              className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
            />
            <InputField
              label="Password"
              placeholder="Your password"
              placeholderTextColor={
                scheme === "dark" ? Colors.muted[400] : Colors.muted[600]
              }
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
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#737373"
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              }
              className="w-full h-16 rounded-2xl bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700"
            />
          </Animated.View>

          <Animated.View entering={FadeIn.duration(600)} className="w-full">
            <Button
              title="Sign In"
              className="w-full bg-muted-800 dark:bg-muted-200 mb-4"
              onPress={handleSignIn}
            />
          </Animated.View>

          <Animated.View entering={FadeIn.duration(600)} className="w-full">
            <Link href="/(auth)/sign-up" asChild>
              <Text className="mt-4 font-poppins text-sm text-muted-500 dark:text-muted-400 text-center">
                Don&apos;t have an account?{" "}
                <Text className="underline">Sign Up</Text>
              </Text>
            </Link>
          </Animated.View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(600)}
          className="w-full flex-row items-center justify-center gap-3 my-6"
        >
          <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
          <Text className="text-sm text-muted-500 dark:text-muted-400">or</Text>
          <View className="flex-1 h-[1px] bg-muted-300 dark:bg-muted-700" />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(600)}
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
    </ScrollView>
  );
};

export default SignIn;
