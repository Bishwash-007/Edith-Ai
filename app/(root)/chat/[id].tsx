import Conversation from "@/components/Conversation";
import ListHeaderComponent from "@/components/Header";
import Message from "@/components/Message";
import MessageField from "@/components/MessageField";
import TypewriterText from "@/components/TypewriterText";
import Colors from "@/constants/colors";
import { sampleMessages } from "@/constants/message";
import { useDrawerStore } from "@/hooks/useDrawerStore";
import { useMediaManager } from "@/hooks/useMediaManager";
import { useThemeStore } from "@/hooks/useThemeStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Animated, {
  FadeInRight,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const { theme } = useThemeStore();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const {
    mediaFiles,
    setMediaFiles,
    handleLibrary,
    handleCamera,
    loading,
    error,
  } = useMediaManager();

  const keyboard = useAnimatedKeyboard();
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));
  useEffect(() => {
    console.log("Chat ID:", id);
  }, [id]);

  const handleAddpress = async () => {
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
    <View
      className="flex-1"
      style={{
        backgroundColor: theme === "dark" ? Colors.black : Colors.white,
      }}
    >
      {/* header  */}

      <Animated.View entering={FadeInRight.duration(600)}>
        <ListHeaderComponent
          onMenuPress={handleMenuPress}
          onCreatePress={handleCreatePress}
        />
      </Animated.View>

      {/* Message Screen */}
      <Conversation />

      {/* keyboardi avoiding view with reanimated */}
      <Animated.View style={[animatedStyles]} className="px-4 pb-2">
        <Animated.View entering={FadeInRight.duration(600)}>
          <MessageField
            placeholder="Type a message"
            mediaFiles={mediaFiles}
            onAddPress={handleAddpress}
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
