import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import Options from "./ui/Options";

interface ListItemsProps {
  id?: string;
  label?: string;
  isOptionsOpen?: boolean;
  onOpenOptions?: () => void;
  onCloseOptions?: () => void;
  onDelete?: () => void;
  onRename?: () => void;
  onPress?: () => void;
  renderBackdrop?: () => React.ReactNode;
}

const ListItem: React.FC<ListItemsProps> = ({
  label = "chat1",
  isOptionsOpen,
  onOpenOptions,
  onCloseOptions,
  onDelete,
  onRename,
  onPress,
  renderBackdrop,
}) => {
  return (
    <View className="w-full py-3 relative z-0">
      <View className="flex-row justify-between items-center z-10">
        <TouchableOpacity
          onPress={onPress}
          className="flex-1 pr-4"
          activeOpacity={0.8}
        >
          <Text
            className=" text-muted-800 dark:text-muted-50 font-poppinsLight"
            numberOfLines={1}
          >
            {label}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpenOptions}>
          <View style={{ transform: [{ rotate: "90deg" }] }}>
            <AntDesign name="ellipsis1" size={20} color="gray" />
          </View>
        </TouchableOpacity>
      </View>

      {isOptionsOpen && (
        <>
          {renderBackdrop?.()}

          <Animated.View className="absolute right-0 top-full mt-2 z-50">
            <Options onRename={onRename} onDelete={onDelete} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default ListItem;
