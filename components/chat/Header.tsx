import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

type ListHeaderComponentProps = {
  title: string;
  onCreatePress?: () => void;
  onMenuPress?: () => void;
};

const ListHeaderComponent = ({
  title = "Edith AI",
  onCreatePress,
  onMenuPress,
}: ListHeaderComponentProps) => {
  const scheme = useColorScheme();

  const iconColor = scheme === "dark" ? Colors.muted[50] : Colors.muted[800];
  const textColor = scheme === "dark" ? Colors.muted[50] : Colors.muted[800];
  const backgroundColor = scheme === "dark" ? Colors.black : Colors.white;

  return (
    <View
      style={{ backgroundColor }}
      className="flex flex-row items-center justify-between px-4 pt-12 pb-4"
    >
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu-outline" size={24} color={iconColor} />
      </TouchableOpacity>

      <Text
        style={{ color: textColor }}
        className="text-center font-poppins text-xl"
        numberOfLines={1}
      >
        {title}
      </Text>

      <TouchableOpacity onPress={onCreatePress}>
        <Ionicons name="create-outline" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default ListHeaderComponent;
