import React from "react";
import { useColorScheme, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ChatMessageProps, sampleMessages } from "@/constants/message";
import MessageItem from "./MessageItem";
import { useThemeStore } from "@/hooks/useThemeStore";
import Colors from "@/constants/colors";

const Conversation = () => {
  const theme = useColorScheme();

  const renderItem = ({ item }: { item: ChatMessageProps }) => {
    return (
      <MessageItem
        message={item}
        onLongPress={() => console.log("Long pressed:", item.id)}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? Colors.black : Colors.white,
      }}
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        entering={FadeIn}
        data={sampleMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Conversation;
