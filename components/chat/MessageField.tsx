import React from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

interface MessageFieldProps extends TextInputProps {
  label?: string;
  placeholder: string;
  mediaFiles?: string[];
  isEmpty?: boolean;
  isResponding?: boolean;
  onSendPress?: () => void;
  onAddPress?: () => void;
  onCallPress?: () => void;
  onStopPress?: () => void;
  onRemoveMedia?: (index: number) => void;
}

const MessageField: React.FC<MessageFieldProps> = ({
  placeholder,
  mediaFiles = [],
  isEmpty = true,
  isResponding = false,
  onSendPress,
  onAddPress,
  onCallPress,
  onStopPress,
  onRemoveMedia,
  ...rest
}) => {
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? Colors.muted[400] : Colors.muted[600];

  const renderRightIcon = () => {
    if (mediaFiles.length === 0 && isEmpty) {
      return (
        <TouchableOpacity
          onPress={onCallPress}
          className="p-2 rounded-full dark:bg-muted-800 bg-white"
        >
          <MaterialIcons name="multitrack-audio" size={20} color={iconColor} />
        </TouchableOpacity>
      );
    }

    if (isResponding) {
      return (
        <TouchableOpacity
          onPress={onStopPress}
          className="p-2 rounded-full dark:bg-muted-800 bg-white"
        >
          <MaterialIcons name="stop-circle" size={20} color={iconColor} />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={onSendPress}
        className="p-2 rounded-full dark:bg-muted-800 bg-white"
      >
        <Ionicons name="send-outline" size={20} color={iconColor} />
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full px-2 py-2 bg-white dark:bg-muted-900 rounded-2xl border border-muted-200 dark:border-muted-800">
      {/* Media Preview */}
      {mediaFiles.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mb-2">
          {mediaFiles.map((uri, index) => (
            <View
              key={index}
              className="w-[22%] aspect-square relative rounded-md overflow-hidden"
            >
              <Image
                source={{ uri }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {onRemoveMedia && (
                <TouchableOpacity
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 z-10"
                  onPress={() => onRemoveMedia(index)}
                >
                  <Ionicons name="close" size={10} color="white" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Input + Icons */}
      <View className="flex-row items-center rounded-xl px-3 gap-2">
        <TouchableOpacity
          className="p-1.5 rounded-md active:opacity-70"
          onPress={onAddPress}
        >
          <Ionicons name="images-outline" size={20} color={iconColor} />
        </TouchableOpacity>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={
            scheme === "dark" ? Colors.muted[400] : Colors.muted[600]
          }
          className="flex-1 text-sm text-black dark:text-white font-poppins"
          multiline
          numberOfLines={4}
          {...rest}
        />

        {renderRightIcon()}
      </View>
    </View>
  );
};

export default MessageField;