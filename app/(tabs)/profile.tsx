import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import PostItem from "../../components/post-item";

export default function ProfileScreen() {
  const { user } = useAuth();
  const { posts } = usePosts();

  if (!user) return null;

  const myPosts = posts.filter((p) => p.authorId === user.uid);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-950">
      {/* HEADER WITH GRADIENT BACKGROUND */}
      <View className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 pb-6">
        {/* PROFILE SECTION */}
        <View className="items-center pt-12 px-6">
          {/* AVATAR WITH RING */}
          <View className="mb-4">
            {user.photoURL ? (
              <View className="relative">
                <View className="absolute inset-0 bg-gray-900 dark:bg-white rounded-full blur-xl opacity-20" />
                <Image
                  source={{ uri: user.photoURL }}
                  className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800"
                />
              </View>
            ) : (
              <View className="w-28 h-28 rounded-full bg-gray-900 dark:bg-white items-center justify-center border-4 border-white dark:border-gray-800">
                <Text className="text-4xl font-bold text-white dark:text-gray-900">
                  {(user.displayName || user.email || "U")[0].toUpperCase()}
                </Text>
              </View>
            )}
          </View>

          {/* USER INFO */}
          <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {user.displayName || "User"}
          </Text>

          <Text className="text-base text-gray-600 dark:text-gray-400 mb-6">
            {user.email}
          </Text>

          {/* STATS SECTION */}
          <View className="flex-row bg-white dark:bg-gray-900 rounded-2xl px-8 py-4 shadow-sm border border-gray-100 dark:border-gray-800">
            <View className="items-center px-6 border-r border-gray-200 dark:border-gray-700">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                {myPosts.length}
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Posts
              </Text>
            </View>

            <View className="items-center px-6 border-r border-gray-200 dark:border-gray-700">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                0
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Followers
              </Text>
            </View>

            <View className="items-center px-6">
              <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                0
              </Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Following
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* POSTS SECTION */}
      <View className="px-6 mt-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            My Posts
          </Text>
          {myPosts.length > 0 && (
            <View className="bg-gray-900 dark:bg-white rounded-full px-3 py-1">
              <Text className="text-sm font-semibold text-white dark:text-gray-900">
                {myPosts.length}
              </Text>
            </View>
          )}
        </View>

        {myPosts.length === 0 ? (
          <View className="items-center justify-center py-16">
            <View className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-900 items-center justify-center mb-4">
              <Text className="text-3xl">📝</Text>
            </View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No posts yet
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Start sharing your thoughts with the community
            </Text>
          </View>
        ) : (
          <View className="pb-6">
            {myPosts.map((item) => (
              <View key={item.id} className="mb-4">
                <PostItem post={item} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
