import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import { Ionicons } from "@expo/vector-icons";
import PostItem from "../../components/post-item";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { userPosts } = usePosts();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Header */}
      <View className="pt-15 pb-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Profile
          </Text>
          <TouchableOpacity
            onPress={handleLogout}
            className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg active:bg-gray-200 dark:active:bg-gray-700"
          >
            <Ionicons
              name="log-out-outline"
              size={18}
              color={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
              className="mr-2"
            />
            <Text className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* User Info */}
      <View className="p-6 border-b border-gray-200 dark:border-gray-800">
        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 bg-purple-600 rounded-full items-center justify-center mr-4 shadow-lg shadow-purple-500/25">
            <Text className="text-xl text-white font-bold">
              {user?.displayName?.[0]?.toUpperCase() || "U"}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.displayName || "User"}
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Posts Section */}
      <View className="flex-1">
        <View className="px-6 py-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            My Posts ({userPosts.length})
          </Text>
        </View>

        {userPosts.length === 0 ? (
          <View className="flex-1 items-center justify-center p-6">
            <View className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-6">
              <Ionicons
                name="document-text-outline"
                size={32}
                color={colorScheme === "dark" ? "#6b7280" : "#9ca3af"}
              />
            </View>
            <Text className="text-xl font-bold text-center text-gray-900 dark:text-white mb-3">
              No posts yet
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-6 leading-6">
              Start sharing your thoughts with the community
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/create-post")}
              className="bg-purple-600 px-6 py-3 rounded-xl active:bg-purple-700 shadow-lg shadow-purple-500/25"
            >
              <Text className="text-white text-base font-semibold">
                Create First Post
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            className="bg-white dark:bg-gray-950"
          />
        )}
      </View>
    </View>
  );
}
