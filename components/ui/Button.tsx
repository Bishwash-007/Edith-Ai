import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  style,
  onPress,
  activeOpacity = 0.8,
  iconLeft,
  iconRight,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
      className={`flex-row flex-1 justify-center gap-2
        bg-muted-900 dark:bg-muted-200
        border border-muted-300 dark:border-muted-700
        rounded-xl px-4 py-4
        ${className}
      `}
      {...props}
    >
      {iconLeft && <View className="self-start">{iconLeft}</View>}
      <Text className="text-center text-base font-poppinsSemibold text-white dark:text-black">
        {title}
      </Text>
      {iconRight && <View className="self-end">{iconRight}</View>}
    </TouchableOpacity>
  );
};

export default Button;
