import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { usePosts } from "../../context/PostContext";
import PostItem from "../../components/post-item";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Feed: undefined;
  CreatePost: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

export default function FeedScreen({ navigation }: Props) {
  const { posts } = usePosts();

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {posts.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <View className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-900 items-center justify-center mb-4">
            <Text className="text-4xl">📱</Text>
          </View>
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No posts yet
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-6">
            Be the first to share something with the community
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreatePost")}
            className="bg-gray-900 dark:bg-white px-6 py-3 rounded-xl"
          >
            <Text className="text-base font-semibold text-white dark:text-gray-900">
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
        />
      )}
    </View>
  );
}
