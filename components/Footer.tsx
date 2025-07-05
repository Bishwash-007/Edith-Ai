import React from "react";
import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "./ui/Avatar";
import { useRouter } from "expo-router";
import Colors from "@/constants/colors";

type FooterProps = {
  onPressAvatar: () => void;
  onPressLogout: () => void;
};

const Footer: React.FC<FooterProps> = ({ onPressAvatar, onPressLogout }) => {
  const router = useRouter();
  const theme = useColorScheme();
  const iconColor = theme === "dark" ? Colors.muted[300] : Colors.muted[700];

  return (
    <View className="flex-row items-center justify-between px-4 border-t-hairline border-muted-200 dark:border-muted-700 bg-white dark:bg-black">
      {/* Profile Avatar */}
      <Avatar
        size={36}
        uri="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQLL8w1_4FONGQgnTnp4XVSPXVf1894SqS8z_yNNcKdfab3lze03CGvkm8HkKp8rE7DIi654PWlSZ0vFmY"
        onPress={onPressAvatar}
      />

      {/* Logout button */}
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
