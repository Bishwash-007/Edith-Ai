import React from "react";
import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./ui/Avatar";
import Colors from "@/constants/colors";

type FooterProps = {
  onPressLogout: () => void;
  onPressSettings: () => void;
};

const Footer: React.FC<FooterProps> = ({ onPressLogout, onPressSettings }) => {
  const theme = useColorScheme();
  const iconColor = theme === "dark" ? Colors.muted[300] : Colors.muted[700];

  return (
    <View className="flex-row items-center justify-between px-4 border-t-hairline border-muted-200 dark:border-muted-700 bg-white dark:bg-black">
      {/* Logout button */}
      <TouchableOpacity
        onPress={onPressSettings}
        className="p-2 rounded-full hover:bg-muted-100 dark:hover:bg-muted-800"
      >
        <Ionicons name="settings-outline" size={24} color={iconColor} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressLogout}
        className="p-2 rounded-full hover:bg-muted-100 dark:hover:bg-muted-800"
      >
        <Ionicons name="exit-outline" size={24} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
