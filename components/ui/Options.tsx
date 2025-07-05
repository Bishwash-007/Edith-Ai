import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Options: React.FC<{
  onRename?: () => void;
  onDelete?: () => void;
}> = ({ onRename, onDelete }) => {
  return (
    <Animated.View
      className="mt-2 ml-auto w-36 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 shadow-md"
      entering={FadeIn.springify(100).damping(200).stiffness(20).duration(300)}
    >
      <TouchableOpacity
        className="flex-row items-center py-2 px-1"
        onPress={onRename}
      >
        <Ionicons name="pencil-outline" size={20} />
        <Text className="ml-2 text-sm text-gray-800 dark:text-gray-200 font-poppinsLight">
          Rename
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row items-center py-2 px-1"
        onPress={onDelete}
      >
        <Ionicons name="trash-outline" size={20} color="red" />
        <Text className="ml-2 text-sm text-red-600 font-poppinsLight">
          Delete
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Options;
