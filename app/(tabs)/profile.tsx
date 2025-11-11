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
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Header */}
      <View className="pt-15 pb-4 px-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <Text className="text-3xl font-bold text-center text-black dark:text-white">
          Profile
        </Text>
      </View>

      {/* User Info */}
      <View className="p-4 border-b border-gray-200 dark:border-gray-800">
        <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4 self-center">
          <Text className="text-2xl text-black dark:text-white font-semibold">
            {user?.displayName?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>
        
        <Text className="text-xl font-bold text-center mb-1 text-black dark:text-white">
          {user?.displayName || "User"}
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-4">
          {user?.email}
        </Text>

        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center justify-center p-3 border border-red-600 dark:border-red-500 rounded-lg self-center active:opacity-80"
        >
          <Ionicons 
            name="log-out-outline" 
            size={18} 
            color={colorScheme === 'dark' ? '#ef4444' : '#dc2626'} 
          />
          <Text className="text-red-600 dark:text-red-500 ml-2 font-semibold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* User's Posts */}
      <View className="flex-1">
        <Text className="text-lg font-bold p-4 text-black dark:text-white">
          My Posts ({userPosts.length})
        </Text>

        {userPosts.length === 0 ? (
          <View className="flex-1 items-center justify-center p-6">
            <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 items-center justify-center mb-4">
              <Text className="text-4xl">✍️</Text>
            </View>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-4">
              No posts yet
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/create-post")}
              className="bg-black dark:bg-white px-6 py-3 rounded-xl active:opacity-80"
            >
              <Text className="text-white dark:text-black text-base font-semibold">
                Create Your First Post
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            className="bg-white dark:bg-gray-950"
          />
        )}
      </View>
    </View>
  );
}