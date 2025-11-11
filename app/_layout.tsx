import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { PostsProvider } from "../context/PostContext";
import { View, ActivityIndicator, Text } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "../global.css";
import "react-native-reanimated";

import { SafeAreaProvider } from "react-native-safe-area-context";

function RootApp() {
  const { user, loading } = useAuth();
  const colorScheme = useColorScheme();

  if (loading) {
    return (
      <View 
        style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' 
        }}
      >
        <ActivityIndicator 
          size="large" 
          color={colorScheme === 'dark' ? '#fff' : '#000'} 
        />
        <Text 
          style={{ 
            marginTop: 10, 
            color: colorScheme === 'dark' ? '#fff' : '#000' 
          }}
        >
          Loading Framez...
        </Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="(auth)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PostsProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <RootApp />
            <StatusBar style="auto" />
          </ThemeProvider>
        </PostsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
