import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface MessageProps {
  message: string;
  onEdit?: (updatedMessage: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [editedText, setEditedText] = useState(message);

  const handleLongPress = (_e: GestureResponderEvent) => {
    setShowIcon(true);
  };

  const handleEditConfirm = () => {
    setIsEditing(false);
    setShowIcon(false);
    if (onEdit) onEdit(editedText.trim());
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      activeOpacity={0.9}
      className="self-end max-w-[80%] my-1"
    >
      <View className="bg-muted-200 dark:bg-muted-800 px-4 py-2 rounded-2xl relative">
        {isEditing ? (
          <TextInput
            value={editedText}
            onChangeText={setEditedText}
            onBlur={handleEditConfirm}
            autoFocus
            placeholder="Edit your message..."
            className="text-base text-muted-light dark:text-muted-dark font-poppins bg-transparent"
          />
        ) : (
          <Text className="text-base text-black dark:text-white font-poppins">
            {editedText}
          </Text>
        )}

        {showIcon && !isEditing && (
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            className="absolute top-1 right-1 p-1"
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#a3a3a3"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Message;