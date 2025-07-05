import React from "react";
import {
  Pressable,
  GestureResponderEvent,
  View,
  Image,
  Text,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import TypewriterText from "./TypewriterText";
import { ChatMessageProps } from "@/constants/message"; // Adjust this import if needed
import { useCustomFonts } from "@/hooks/useCustomFonts";

type MessageItemProps = {
  message: ChatMessageProps;
  onLongPress?: (event: GestureResponderEvent) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, onLongPress }) => {
  const { text, image, audio, sender } = message;
  const isBot = sender === "bot";
  const isUser = sender === "user";

  return (
    <Pressable onLongPress={onLongPress} className="flex mb-6">
      <View
        className={`rounded-lg p-2 px-4 max-w-[80%] ${
          isBot
            ? "self-start bg-muted-50 dark:bg-muted-900"
            : "self-end bg-white dark:bg-muted-900"
        }`}
      >
        {text && <TypewriterText text={text} />}

        {image && (
          <Image
            source={{ uri: image }}
            className="w-60 h-40 mt-2 rounded-lg"
            resizeMode="cover"
          />
        )}

        {audio && (
          <Pressable
            onPress={() => console.log("play audio")}
            className="mt-2 p-2 rounded-md bg-muted-200 dark:bg-muted-800"
          >
            <Text className="text-muted-light dark:text-muted-dark font-poppins">
              ▶️ Play Audio
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default MessageItem;
