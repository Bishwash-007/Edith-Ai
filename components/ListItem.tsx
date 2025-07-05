import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Options from "./ui/Options";
import { Link } from "expo-router";

interface ListItemsProps {
  id?: string;
  label?: string;
  onDelete?: () => void;
  onRename?: () => void;
}
const ListItem: React.FC<ListItemsProps> = ({
  label = "chat1",
  id,
  onDelete,
  onRename,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View className="w-full mb-2">
      <View className="flex-row justify-between items-center">
        <Link asChild href={`/(root)/chat/${id}`}>
          <Text
            className="flex-1 text-lg text-muted-800 dark:text-muted-50 font-poppinsLight"
            numberOfLines={1}
          >
            {label}
          </Text>
        </Link>

        <TouchableOpacity onPress={() => setShowOptions((prev) => !prev)}>
          <Ionicons name="ellipsis-vertical-sharp" size={24} />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <Options
          onRename={() => {
            setShowOptions(false);
            onRename?.();
          }}
          onDelete={() => {
            setShowOptions(false);
            onDelete?.();
          }}
        />
      )}
    </View>
  );
};

export default ListItem;
