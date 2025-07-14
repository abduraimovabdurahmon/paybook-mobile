import { useFonts } from "expo-font";
import "react-native-reanimated";

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import Providers from "./_provider";

export default function RootLayout() {
  const [loaded] = useFonts({
    "JetBrainsMono-Bold": require("../assets/fonts/JetBrainsMono-Bold.ttf"),
    "JetBrainsMono-Regular": require("../assets/fonts/JetBrainsMono-Regular.ttf"),
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf")
  });

  if (!loaded) {
    return null;
  }




  return (
    <Providers>
        <StatusBar hidden />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" />
          <Stack.Screen name="(auth)" />
        </Stack>
    </Providers>
  );
}
