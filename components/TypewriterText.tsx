import React, { useEffect, useState } from "react";
import { Text, TextStyle, StyleProp } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface TypewriterTextProps {
  text: string;
  duration?: number;
  fadeDuration?: number;
  style?: StyleProp<TextStyle>;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  duration = 200,
  fadeDuration = 300,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const opacity = useSharedValue(0);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText("");
    opacity.value = 0;

    const interval = setInterval(() => {
      currentIndex++;
      setDisplayedText(text.slice(0, currentIndex));
      if (currentIndex >= text.length) {
        clearInterval(interval);
        opacity.value = withTiming(1, {
          duration: fadeDuration,
          easing: Easing.out(Easing.ease),
        });
      }
    }, duration / Math.max(text.length, 1));

    return () => {
      clearInterval(interval);
      opacity.value = 0;
    };
  }, [text, duration, fadeDuration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <AnimatedText style={[style, animatedStyle]}>{displayedText}</AnimatedText>;
};

export default TypewriterText;