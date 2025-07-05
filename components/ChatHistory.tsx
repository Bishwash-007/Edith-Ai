import React, { useState } from "react";
import { View, Pressable } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import ListItem from "./ListItem";
import { useDrawerStore } from "@/hooks/useDrawerStore";

const chat = Array.from({ length: 17 }, (_, i) => i);

const ChatHistory = () => {
  const { closeDrawer } = useDrawerStore();
  const router = useRouter();
  const [optionsOpenId, setOptionsOpenId] = useState<string | null>(null);

  const handleCloseOptions = () => {
    setOptionsOpenId(null);
  };

  const handleChatRoute = (id: string) => {
    router.push(`/(root)/chat/${id}`);
    closeDrawer();
  };

  const renderBackdrop = () => {
    const tapGesture = Gesture.Tap().onEnd(() => {
      handleCloseOptions();
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
        data={chat}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollBeginDrag={handleCloseOptions}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => {
          const id = item.toString();
          return (
            <ListItem
              label={`Chat ${id}`}
              isOptionsOpen={optionsOpenId === id}
              onOpenOptions={() => setOptionsOpenId(id)}
              onCloseOptions={handleCloseOptions}
              onDelete={() => {
                console.log(`Delete Chat ${id}`);
                handleCloseOptions();
              }}
              onRename={() => {
                console.log(`Rename Chat ${id}`);
                handleCloseOptions();
              }}
              onPress={() => handleChatRoute(id)}
              renderBackdrop={renderBackdrop}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatHistory;