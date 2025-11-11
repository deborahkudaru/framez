import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { usePosts } from "../../context/PostContext";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import PostItem from "../../components/post-item";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function FeedScreen() {
  const { posts, loading } = usePosts();
  const router = useRouter();
  const colorScheme = useColorScheme();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-950">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#8b5cf6" : "#7c3aed"}
        />
        <Text className="mt-2.5 text-gray-600 dark:text-gray-400 text-lg font-medium">
          Loading posts...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-white dark:bg-gray-950">
        {/* Header */}
        <View className="pt-15 pb-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <View className="flex-row items-center justify-center">
            <View className="w-10 h-10 bg-purple-600 rounded-xl items-center justify-center mr-3 shadow-lg shadow-purple-500/25">
              <Ionicons name="camera" size={20} color="#ffffff" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white">
              Framez
            </Text>
          </View>
        </View>

        {posts.length === 0 ? (
          <View className="flex-1 items-center justify-center p-6">
            <View className="w-32 h-32 rounded-full bg-gray-50 dark:bg-gray-900 items-center justify-center mb-6 border-2 border-gray-200 dark:border-gray-800">
              <Ionicons
                name="images-outline"
                size={48}
                color={colorScheme === "dark" ? "#4b5563" : "#9ca3af"}
              />
            </View>
            <Text className="text-2xl font-bold mb-3 text-center text-gray-900 dark:text-white">
              No posts yet
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-8 leading-6">
              Be the first to share something with the community
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/create-post" as any)}
              className="bg-purple-600 px-8 py-4 rounded-xl active:bg-purple-700 shadow-lg shadow-purple-500/25 flex-row items-center"
            >
              <Ionicons name="add" size={20} color="#ffffff" className="mr-2" />
              <Text className="text-white text-base font-semibold">
                Create First Post
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            className="bg-white dark:bg-gray-950"
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}
