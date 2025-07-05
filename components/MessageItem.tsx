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
import IconsRow from "./IconsRow";
import { ChatMessageProps } from "@/constants/message";
import Colors from "@/constants/colors";

type MessageItemProps = {
  message: ChatMessageProps;
  onLongPress?: (event: GestureResponderEvent) => void;
};

const MessageItem: React.FC<MessageItemProps> = ({ message, onLongPress }) => {
  const { text, image, audio, sender } = message;
  const isBot = sender === "bot";
  const theme = useColorScheme();

  const handleCopy = () => {
    console.log("Copied:", text || "[No text]");
  };

  const handleLike = () => {
    console.log("Liked:", message.id);
  };

  const handleDislike = () => {
    console.log("Disliked:", message.id);
  };

  const handleRepeat = () => {
    console.log("Repeat message:", message.id);
  };

  return (
    <Pressable onLongPress={onLongPress} className="flex mb-6">
      <View
        className={`rounded-lg p-2 px-4 max-w-[80%] ${
          isBot
            ? "self-start bg-white dark:bg-black"
            : "self-end bg-muted-50 dark:bg-muted-900"
        }`}
      >
        {/* Text messsage*/}
        {text && (
          <TypewriterText
            text={text}
            duration={1500}
            fadeDuration={500}
            style={{
              fontFamily: "PoppinsLight",
              color: theme === "dark" ? Colors.muted[50] : Colors.muted[900],
            }}
          />
        )}

        {/* Image preview */}
        {image && (
          <Image
            source={{ uri: image }}
            className="w-60 h-40 mt-2 rounded-lg"
            resizeMode="cover"
          />
        )}
      </View>

      {/* Ai only action row */}
      {isBot && (
        <View className="mt-2 pl-2">
          <IconsRow
            onCopy={handleCopy}
            onLike={handleLike}
            onDislike={handleDislike}
            onRepeat={handleRepeat}
          />
        </View>
      )}
    </Pressable>
  );
};

export default MessageItem;
