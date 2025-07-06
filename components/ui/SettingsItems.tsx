import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/colors";

type SettingsListItemProps = {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
};

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  label,
  icon,
  onPress,
}) => {
  const scheme = useColorScheme();
  const textColor = scheme === "light" ? Colors.black : Colors.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-full px-6 py-4"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center space-x-3 gap-6">
          {icon}
          <Text
            className="font-poppinsLight text-sm dark:text-muted-50 text-muted-800"
            numberOfLines={1}
          >
            {label}
          </Text>
        </View>
        <AntDesign name="right" size={16} color={textColor} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsListItem;