import React from "react";
import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import Animated, { Easing, SlideInRight } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Avatar from "@/components/ui/Avatar";
import SettingsListItem from "@/components/ui/SettingsItems";
import { getSettingsOptions } from "@/constants/Settings";
import Colors from "@/constants/colors";
import { useRouter } from "expo-router";

type ProfileScreenProps = {
  username?: string;
  email?: string;
};

const AVATAR_URL =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM1jTVtbPfNfH1g4KO2bz9TWyxouQGQsOtT5EoY5nGz7x7fy2E-Hm2rXTTy9mxIuL0P1O4YBt1T_wQGYRhbwc8Mw";

const ProfileCard: React.FC<ProfileScreenProps> = ({
  username = "",
  email = "",
}) => (
  <View className="flex justify-center items-center py-4">
    <Avatar imageSource={AVATAR_URL} size={80} />
    <View className="flex flex-col items-center justify-center py-4">
      <Text className="text-lg font-poppinsLight text-center text-muted-900 dark:text-muted-100">
        {username.toLowerCase()}
      </Text>
      <Text className="text-sm font-poppinsLight text-center text-muted-900 dark:text-muted-100">
        {email.toLowerCase()}
      </Text>
    </View>
  </View>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  username = "Bishwash007",
  email = "drewwsbiwash@mgail.com",
}) => {
  const router = useRouter();
  const scheme = useColorScheme();
  const iconColor = scheme === "dark" ? Colors.muted[100] : Colors.muted[900];

  return (
    <Animated.View
      entering={SlideInRight.springify().duration(400).easing(Easing.linear)}
      className="flex-1 bg-white dark:bg-black"
    >
      <TouchableOpacity
        className="pt-12 items-start pl-6 w-[22%]"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back-outline" size={26} color={iconColor} />
      </TouchableOpacity>

      <Animated.FlatList
        data={getSettingsOptions(iconColor, 18)}
        keyExtractor={(section, index) => `${section.section}-${index}`}
        ListHeaderComponent={<ProfileCard username={username} email={email} />}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-full px-4 py-2">
            <Text className="text-base px-4 font-poppinsLight text-muted-800 dark:text-muted-100 mb-2">
              {item.section}
            </Text>

            <Animated.FlatList
              data={item.items}
              keyExtractor={(subItem, subIndex) =>
                `${item.section}-${subItem.label}-${subIndex}`
              }
              scrollEnabled={false}
              renderItem={({ item: subItem }) => (
                <SettingsListItem
                  label={subItem.label}
                  onPress={subItem.onPress}
                  icon={subItem.icon}
                />
              )}
            />
          </View>
        )}
      />
    </Animated.View>
  );
};

export default ProfileScreen;
