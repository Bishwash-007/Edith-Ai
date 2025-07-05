import React from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Image,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/colors";

interface MessageFieldProps extends TextInputProps {
  label?: string;
  placeholder: string;
  mediaFiles?: string[];
  onSendPress?: () => void;
  onAddPress?: () => void;
  onRemoveMedia?: (index: number) => void;
}

const MessageField: React.FC<MessageFieldProps> = ({
  placeholder,
  onSendPress,
  onAddPress,
  mediaFiles,
  onRemoveMedia,
  ...rest
}) => {
  const scheme = useColorScheme();

  const iconColor = scheme === "dark" ? Colors.muted[400] : Colors.muted[600];
  const sendIconColor = iconColor;

  return (
    <View className="w-full px-2 py-2 bg-white dark:bg-muted-900 rounded-2xl border-hairline border-muted-900 dark:border-muted-50">
      {/* Media preview */}
      {Array.isArray(mediaFiles) && mediaFiles.length > 0 && (
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
                  className="absolute top-0.5 right-0.5 bg-black/70 rounded-full p-0.5 z-10"
                  onPress={() => onRemoveMedia(index)}
                >
                  <Ionicons name="close" size={10} color="white" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Message input + buttons */}
      <View className="flex-row items-center rounded-xl px-3 gap-2">
        <TouchableOpacity className="p-1 rounded-md" onPress={onAddPress}>
          <Ionicons name="images-outline" size={20} color={iconColor} />
        </TouchableOpacity>

        <TextInput
          placeholder={placeholder}
          className="flex-1 text-sm text-black dark:text-white font-poppins text-start"
          multiline
          numberOfLines={4}
          {...rest}
        />

        <TouchableOpacity
          onPress={onSendPress}
          className="p-2 rounded-full dark:bg-muted-800 bg-white"
        >
          <Ionicons name="send-outline" size={20} color={sendIconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessageField;
