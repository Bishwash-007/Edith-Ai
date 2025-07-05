export type ChatMessageProps = {
  id: string;
  sender: "user" | "bot";
  text?: string;
  image?: string; // image URL or local asset URI
  audio?: string; // audio URL or local file path
};

export const sampleMessages: ChatMessageProps[] = [
  {
    id: "1",
    text: "Hey ChatGPT, I'm trying to implement a complex animation using Reanimated v3. Ideas?",
    sender: "user",
  },
  {
    id: "2",
    text: "Absolutely! Use shared values for translation & opacity. Chain with `withSequence` or `withSpring`. Want a code snippet?",
    sender: "bot",
  },
  {
    id: "3",
    text: "Yeah! Also curious if callbacks are possible to trigger actions after animation ends.",
    sender: "user",
  },
  {
    id: "4",
    text: "Yep, check this out:\n\n```ts\ntranslateX.value = withSequence(\n  withSpring(0, ..., () => console.log('slide done')),\n  withTiming(1, ..., () => console.log('fade done'))\n);\n```",
    sender: "bot",
  },
  {
    id: "5",
    image: "https://placehold.co/300x200", // 🔥 example placeholder
    text: "Here's the animation flow diagram you might find helpful.",
    sender: "bot",
  },
  {
    id: "6",
    audio: "https://example.com/audio/blur-explanation.mp3",
    text: "And here’s a quick audio explanation for BlurView intensity sync logic.",
    sender: "bot",
  },
  {
    id: "7",
    text: "That’s super helpful. Gonna try it now. Thanks!",
    sender: "user",
  },
];
