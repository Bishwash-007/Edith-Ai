import React from "react";
import {
  View,
  Pressable,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import ListItem from "./ListItem";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useDrawerStore } from "@/hooks/useDrawerStore";

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
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? Colors.muted[100] : Colors.muted[900];
  const tapGesture = Gesture.Tap().onEnd(() => {
    onCloseOptions();
  });

  const { closeDrawer } = useDrawerStore();

  const router = useRouter();

  const navigateToProfile = () => {
    closeDrawer();
    router.push("/(root)/profile");
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Only render backdrop if options menu is open */}
      {optionsOpenId && (
        <GestureDetector gesture={tapGesture}>
          <Pressable className="absolute inset-0 z-40" />
        </GestureDetector>
      )}

      <Animated.FlatList
        entering={FadeIn}
        data={data}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollBeginDrag={onCloseOptions}
        ListHeaderComponent={
          <>
            <View className="items-center mt-10 mb-6">
              <Image
                source={require("@/assets/images/illustration.png")}
                className="size-40 pt-4"
                resizeMode="cover"
              />
            </View>
          </>
        }
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
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-black dark:bg-white opacity-10" />
        )}
      />
      <View className="w-full items-start pl-6 py-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-2 rounded-full dark:bg-muted-800 bg-muted-100"
          onPress={navigateToProfile}
        >
          <AntDesign name="user" size={24} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHistory;
