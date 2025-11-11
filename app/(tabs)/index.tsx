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

export default function FeedScreen() {
  const { posts, loading } = usePosts();
  const router = useRouter();
  const colorScheme = useColorScheme();

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-950">
        <ActivityIndicator
          size="large"
          color={colorScheme === "dark" ? "#fff" : "#000"}
        />
        <Text className="mt-2.5 text-black dark:text-white">
          Loading posts...
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Header */}
      <View className="pt-15 pb-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Text className="text-3xl font-bold text-center text-black dark:text-white">
          Framez
        </Text>
      </View>

      {posts.length === 0 ? (
        <View className="flex-1 items-center justify-center p-6">
          <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
            <Text className="text-4xl">📱</Text>
          </View>
          <Text className="text-xl font-bold mb-2 text-center text-black dark:text-white">
            No posts yet
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-6">
            Be the first to share something with the community
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/create-post" as any)}
            className="bg-black dark:bg-white px-6 py-3 rounded-xl active:opacity-80"
          >
            <Text className="text-white dark:text-black text-base font-semibold">
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
  );
}
