import React from "react";
import {
  Pressable,
  GestureResponderEvent,
  View,
  Image,
  Text,
  useColorScheme,
} from "react-native";
import TypewriterText from "./TypewriterText";
import { ChatMessageProps } from "@/constants/message";
import Colors from "@/constants/colors";

type MessageItemProps = {
  message: ChatMessageProps;
  onLongPress?: (event: GestureResponderEvent) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, onLongPress }) => {
  const { text, image, audio, sender } = message;
  const isBot = sender === "bot";
  const isUser = sender === "user";

  const theme = useColorScheme();

  return (
    <Pressable onLongPress={onLongPress} className="flex mb-6">
      <View
        className={`rounded-lg p-2 px-4 ${
          isBot
            ? "self-start bg-white dark:bg-black"
            : "self-end bg-muted-50 dark:bg-muted-900 max-w-[80%]"
        }`}
      >
        {text && (
          <TypewriterText
            text={text}
            duration={1500} // total duration of typing animation
            fadeDuration={500} // fade-in duration after typing completes
            style={{
              fontFamily: "PoppinsLight",
              color: theme === "dark" ? Colors.muted[50] : Colors.muted[900],
            }}
          />
        )}

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
            className="mt-2 p-2 rounded-md bg-muted-200 dark:bg-muted-700"
          >
            <Text className="text-muted-600 dark:text-muted-400 font-poppins">
              ▶️ Play Audio
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default MessageItem;
