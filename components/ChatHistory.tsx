import React from "react";
import { View, Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import ListItem from "./ListItem";

export type ChatItem = {
  id: string;
  label: string;
};

type ChatHistoryProps = {
  data: ChatItem[];
  optionsOpenId: string | null;
  onCloseOptions: () => void;
  onOpenOptions: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string) => void;
  onItemPress: (id: string) => void;
};

const ChatHistory: React.FC<ChatHistoryProps> = ({
  data,
  optionsOpenId,
  onCloseOptions,
  onOpenOptions,
  onDelete,
  onRename,
  onItemPress,
}) => {
  const renderBackdrop = () => {
    const tapGesture = Gesture.Tap().onEnd(() => {
      onCloseOptions();
    });

    return (
      <GestureDetector gesture={tapGesture}>
        <Pressable className="absolute inset-0 z-40" />
      </GestureDetector>
    );
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <Animated.FlatList
        entering={FadeIn}
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollBeginDrag={onCloseOptions}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <ListItem
            id={item.id}
            label={item.label}
            isOptionsOpen={optionsOpenId === item.id}
            onOpenOptions={() => onOpenOptions(item.id)}
            onCloseOptions={onCloseOptions}
            onDelete={() => onDelete(item.id)}
            onRename={() => onRename(item.id)}
            onPress={() => onItemPress(item.id)}
            renderBackdrop={renderBackdrop}
          />
        )}
      />
    </View>
  );
};

export default ChatHistory;