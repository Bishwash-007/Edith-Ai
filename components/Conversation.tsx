import React from "react";
import { FlatList } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ChatMessageProps, sampleMessages } from "@/constants/message";
import MessageItem from "./MessageItem";

const Conversation = () => {
  const renderItem = ({ item }: { item: ChatMessageProps }) => {
    const isUser = item.sender === "user";
    const isBot = item.sender === "bot";

    return (
      <MessageItem
        message={item}
        onLongPress={() => console.log("Long pressed:", item.id)}
      />
    );
  };

  return (
    <Animated.FlatList
      entering={FadeIn}
      data={sampleMessages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

export default Conversation;
