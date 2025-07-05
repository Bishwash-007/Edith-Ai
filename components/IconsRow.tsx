import React from "react";
import { View, TouchableOpacity, useColorScheme } from "react-native";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

type IconsRowProps = {
  onCopy: () => void;
  onLike: () => void;
  onDislike: () => void;
  onRepeat: () => void;
};

const IconsRow: React.FC<IconsRowProps> = ({
  onCopy,
  onLike,
  onDislike,
  onRepeat,
}) => {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? Colors.muted[400] : Colors.muted[600];

  return (
    <View className="flex-row items-center justify-start gap-4">
      <TouchableOpacity onPress={onCopy} className="p-1">
        <Ionicons name="copy-outline" size={16} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onLike} className="p-1">
        <AntDesign name="sound" size={16} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onLike} className="p-1">
        <AntDesign name="like2" size={16} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDislike} className="p-1">
        <AntDesign name="dislike2" size={16} color={iconColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onRepeat} className="p-1">
        <Ionicons name="repeat-outline" size={16} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
};

export default IconsRow;
