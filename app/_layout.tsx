// import React from "react";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";

// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { AuthProvider } from "../src/contexts/AuthContext";
// import { PostsProvider } from "../src/contexts/PostsContext";

// export const unstable_settings = {
//   anchor: "(tabs)",
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <AuthProvider>
//       <PostsProvider>
//         <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//           <Stack>
//             {/* Auth Screens Group */}
//             <Stack.Screen name="(auth)" options={{ headerShown: false }} />

//             {/* Main App Tabs */}
//             <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

//             {/* Optional Modal */}
//             <Stack.Screen
//               name="modal"
//               options={{ presentation: "modal", title: "Modal" }}
//             />
//           </Stack>
//           <StatusBar style="auto" />
//         </ThemeProvider>
//       </PostsProvider>
//     </AuthProvider>
//   );
// }
