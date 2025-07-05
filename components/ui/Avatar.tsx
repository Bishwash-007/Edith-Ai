import React from "react";
import { View, Image, ViewStyle, TouchableOpacity } from "react-native";

interface AvatarProps {
  uri: string;
  size?: number;
  style?: ViewStyle;
  className?: string;
  onPress?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  uri,
  size = 48,
  style,
  onPress,
  className = "",
}) => {
  return (
    <View
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      className={`overflow-hidden bg-muted-200 dark:bg-muted-800 ${className}`}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={{ width: size, height: size }}
          className="rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
