import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

export const getSettingsOptions = (iconColor: string, size: number) => [
  {
    section: "Account",
    items: [
      {
        label: "Profile Settings",
        onPress: () => console.log("Change Email"),
        icon: <Feather name="user" size={size} color={iconColor} />,
      },
    ],
  },
  {
    section: "Preferences",
    items: [
      {
        label: "Theme",
        onPress: () => console.log("Theme"),
        icon: <Feather name="moon" size={size} color={iconColor} />,
      },
      {
        label: "Voice Preference",
        onPress: () => console.log("Voice Preference"),
        icon: (
          <MaterialIcons name="record-voice-over" size={size} color={iconColor} />
        ),
      },
    ],
  },
  {
    section: "Chat Settings",
    items: [
      {
        label: "Chat History",
        onPress: () => console.log("Chat History"),
        icon: <Feather name="clock" size={size} color={iconColor} />,
      },
      {
        label: "Data Controls",
        onPress: () => console.log("Data Controls"),
        icon: (
          <Ionicons
            name="shield-checkmark-outline"
            size={size}
            color={iconColor}
          />
        ),
      },
    ],
  },
  {
    section: "Other",
    items: [
      {
        label: "Beta Features",
        onPress: () => console.log("Beta Features"),
        icon: <Fontisto name="laboratory" size={18} color={iconColor} />,
      },
      {
        label: "Support",
        onPress: () => console.log("Support"),
        icon: <Feather name="help-circle" size={18} color={iconColor} />,
      },
      {
        label: "About",
        onPress: () => console.log("About"),
        icon: <FontAwesome5 name="info-circle" size={18} color={iconColor} />,
      },
    ],
  },
];
