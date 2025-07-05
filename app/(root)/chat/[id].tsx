import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
  FadeInRight,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useLocalSearchParams, useRouter } from "expo-router";

import Colors from "@/constants/colors";
import ListHeaderComponent from "@/components/Header";
import Conversation from "@/components/Conversation";
import MessageField from "@/components/MessageField";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import { useMediaManager } from "@/hooks/useMediaManager";
import { useThemeStore } from "@/hooks/useThemeStore";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { mediaFiles, setMediaFiles, handleLibrary, loading, error } =
    useMediaManager();

  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));

  useEffect(() => {
    console.log("Chat ID:", id);
  }, [id]);

  const handleAddPress = async () => {
    await handleLibrary();
  };

  const handleSendPress = () => {
    console.log("Send Message");
    setMessage("");
    setMediaFiles([]);
  };

  const handleRemoveMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleDrawer = useDrawerStore((s) => s.toggleDrawer);

  const handleMenuPress = () => {
    toggleDrawer();
  };

  const handleCreatePress = () => {
    router.replace(`/(root)/chat/${Math.floor(Math.random() * 100 + 1)}`);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header */}
      <Animated.View entering={FadeInRight.duration(600)}>
        <ListHeaderComponent
          title="chatone"
          onMenuPress={handleMenuPress}
          onCreatePress={handleCreatePress}
        />
      </Animated.View>

      {/* Messages */}
      <Conversation />

      {/* Keyboard avoiding input */}
      <Animated.View style={[animatedStyles]} className="px-4 pb-2">
        <Animated.View entering={FadeInRight.duration(600)}>
          <MessageField
            placeholder="Type a message"
            mediaFiles={mediaFiles}
            onAddPress={handleAddPress}
            onSendPress={handleSendPress}
            onRemoveMedia={handleRemoveMedia}
            value={message}
            onChangeText={setMessage}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ChatScreen;
