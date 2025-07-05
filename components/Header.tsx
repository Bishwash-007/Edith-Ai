import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ListHeaderComponentProps = {
  title?: string;
  onCreatePress?: () => void;
  onMenuPress?: () => void;
};

const ListHeaderComponent: React.FC<ListHeaderComponentProps> = ({
  title = "Edith AI",
  onCreatePress,
  onMenuPress,
}) => {
  return (
    <View className={`flex flex-row items-center justify-between px-4 pt-12 `}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>

      <Text className={`text-center font-poppinsSemibold text-xl `}>
        {title}
      </Text>

      <TouchableOpacity onPress={onCreatePress}>
        <Ionicons name="create-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ListHeaderComponent;
