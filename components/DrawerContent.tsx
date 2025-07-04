import { chatList } from "@/constants/chats";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const router = useRouter();
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: "#fff", flex: 1 }}
    >
      <View>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/generate-ai-artificial-intelligence-logo-ai-logo-concept_268834-2200.jpg",
          }}
          resizeMode="contain"
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      </View>
      <DrawerItemList {...props} />
      {chatList.map((chat) => (
        <DrawerItem
          key={chat.id}
          label={chat.name}
          onPress={() => router.push(`/chat/${chat.id}`)}
          icon={() => <Ionicons name="chatbubble" size={20} color="black" />}
        />
      ))}
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderColor: "#ccc",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Footer</Text>
        <Ionicons name="exit-outline" size={24} color="black" />
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;
