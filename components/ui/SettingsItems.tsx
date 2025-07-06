import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/colors";

type SettingsListItemProps = {
  label: string;
  onPress?: () => void;
};

const SettingsListItem: React.FC<SettingsListItemProps> = ({
  label,
  onPress,
}) => {
  const scheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="w-full px-6 py-3 relative z-0"
    >
      <View className="flex-row justify-between items-center z-10">
        <Text
          className="text-muted-800 dark:text-muted-50 font-poppinsLight text-sm"
          numberOfLines={1}
        >
          {label}
        </Text>

        <View>
          <AntDesign
            name="right"
            size={16}
            color="#000"
            style={{ color: scheme === "light" ? Colors.black : Colors.white }}
            className="dark:text-muted-50"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsListItem;
